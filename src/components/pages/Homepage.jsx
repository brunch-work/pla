"use client";

import { useState, useRef, useEffect, useCallback, useMemo } from "react";

import { calculateImageWidth, calculateThumbnailPositions, calculateTotalWidth, clampOffset } from "@/utils/helpers";
import { useViewport } from "@/hooks/useViewport";
import { useMobile } from "@/hooks/useMobile";
import { VideoPlayer } from "@/components/VideoPlayer";
import Link from "next/link";

export default function Homepage({homepage}) {
  const [activeThumbnail, setActiveThumbnail] = useState(0);
  const [scrollOffset, setScrollOffset] = useState(0);
  const [isTouchDevice, setIsTouchDevice] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [isKeyboardNavigating, setIsKeyboardNavigating] = useState(false);
  const [isSafari, setIsSafari] = useState(false);


  // Refs
  const thumbnailsRef = useRef([]);
  const carouselRef = useRef(null);
  const animationFrameRef = useRef(null);
  const momentumRef = useRef(null);
  const dragStateRef = useRef({
    isDragging: false,
    startX: 0,
    startOffset: 0,
    lastX: 0,
    lastTime: 0,
  });
  const currentScrollOffsetRef = useRef(0);
  const featuredRef = useRef(null);

  const { viewportHeight, viewportWidth } = useViewport();

  const thumbnailHeightVh = 13;
  const gap = 1.6;

  const thumbnailsList = homepage.youtubeVideoCollection.items;

  // Detect Safari
  useEffect(() => {
    const userAgent = navigator.userAgent.toLowerCase();
    setIsSafari(userAgent.includes("safari") && !userAgent.includes("chrome"));
  }, []);

  // Memoized calculations
  const thumbnailHeight = useMemo(() => {
    if (viewportHeight === 0) return 75;
    return Math.floor((viewportHeight * thumbnailHeightVh) / 100);
  }, [viewportHeight, thumbnailHeightVh]);

  const generatedThumbnailWidths = useMemo(() => {
    return thumbnailsList.map((project, index) =>
      calculateImageWidth(project, index, thumbnailHeight)
    );
  }, [thumbnailsList, thumbnailHeight]);

  const thumbnailPositions = useMemo(() => {
    return calculateThumbnailPositions(generatedThumbnailWidths, gap);
  }, [generatedThumbnailWidths, gap]);

  const totalWidth = useMemo(() => {
    return calculateTotalWidth(thumbnailPositions, generatedThumbnailWidths);
  }, [thumbnailPositions, generatedThumbnailWidths]);

  // Touch device detection
  useEffect(() => {
    const checkTouchDevice = () => {
      setIsTouchDevice(
        "ontouchstart" in window || navigator.maxTouchPoints > 0
      );
    };
    checkTouchDevice();
    window.addEventListener("resize", checkTouchDevice);
    return () => window.removeEventListener("resize", checkTouchDevice);
  }, []);

  const leftPadding = useMemo(() => {
    return isTouchDevice ? 1.2 : 1.6;
  }, [isTouchDevice]);

  const { minOffset, maxOffset } = useMemo(() => {
    const max = 0;
    const min =
      generatedThumbnailWidths.length === 0
        ? 0
        : -(thumbnailPositions[thumbnailPositions.length - 1] + leftPadding);
    return { minOffset: min, maxOffset: max };
  }, [thumbnailPositions, generatedThumbnailWidths.length]);

  const updateScrollTransform = useCallback((offset) => {
    if (carouselRef.current) {
      carouselRef.current.style.transform = `translate3d(${offset}px, 0, 0)`;
    }
    currentScrollOffsetRef.current = offset;
  }, []);

  // Active thumbnail detection based on scroll offset
  const updateActiveThumbnailFromOffset = useCallback(
    (offset) => {
      if (
        isKeyboardNavigating ||
        thumbnailsList.length === 0 ||
        thumbnailPositions.length === 0
      )
        return;

      const adjustedOffset = -offset;
      let closestIndex = 0;
      let closestDistance = Math.abs(adjustedOffset - thumbnailPositions[0]);

      for (let i = 1; i < thumbnailPositions.length; i++) {
        const distance = Math.abs(adjustedOffset - thumbnailPositions[i]);
        if (distance < closestDistance) {
          closestDistance = distance;
          closestIndex = i;
        }
      }

      if (closestIndex < thumbnailsList.length) {
        setActiveThumbnail(closestIndex);
      }
    },
    [isKeyboardNavigating, thumbnailsList.length, thumbnailPositions]
  );

  // Single RAF loop for momentum
  const startAnimationLoop = useCallback(() => {
    if (animationFrameRef.current) return;

    const animate = () => {
      let needsUpdate = false;

      if (
        Math.abs(momentumRef.current) > 0.1 &&
        !dragStateRef.current.isDragging
      ) {
        const decayRate = isTouchDevice ? 0.92 : 0.95;
        momentumRef.current *= decayRate;

        const newOffset = clampOffset(
          currentScrollOffsetRef.current + momentumRef.current,
          minOffset,
          maxOffset
        );

        setScrollOffset(newOffset);
        updateScrollTransform(newOffset);
        updateActiveThumbnailFromOffset(newOffset);

        needsUpdate = true;

        const stopThreshold = isTouchDevice ? 0.05 : 0.1;
        if (Math.abs(momentumRef.current) < stopThreshold) {
          momentumRef.current = 0;
          // setTimeout(snapToPosition, isTouchDevice ? 100 : 200);
        }
      }

      if (needsUpdate || Math.abs(momentumRef.current) > 0.1) {
        animationFrameRef.current = requestAnimationFrame(animate);
      } else {
        animationFrameRef.current = null;
      }
    };

    animationFrameRef.current = requestAnimationFrame(animate);
  }, [
    minOffset,
    maxOffset,
    updateScrollTransform,
    updateActiveThumbnailFromOffset,
    isTouchDevice,
    isSafari,
  ]);

  useEffect(() => {
    if (thumbnailsList.length === 0) return;

    const handleWheel = (e) => {
      e.preventDefault();
      setIsKeyboardNavigating(false);

      if (isSafari) {
        const scrollDelta = e.deltaY + e.deltaX;
        const newOffset = clampOffset(
          currentScrollOffsetRef.current - scrollDelta,
          minOffset,
          maxOffset
        );

        // Disable CSS transitions on Safari
        if (carouselRef.current) {
          carouselRef.current.style.transition = "none";
        }

        updateScrollTransform(newOffset);
        updateActiveThumbnailFromOffset(newOffset);
      } else {
        // Other browsers: Use RAF
        let ticking = false;
        if (!ticking) {
          requestAnimationFrame(() => {
            const scrollDelta = e.deltaY + e.deltaX;
            momentumRef.current = 0;

            const newOffset = clampOffset(
              currentScrollOffsetRef.current - scrollDelta,
              minOffset,
              maxOffset
            );

            setScrollOffset(newOffset);
            updateScrollTransform(newOffset);
            updateActiveThumbnailFromOffset(newOffset);

            ticking = false;
          });
          ticking = true;
        }
      }
    };

    window.addEventListener("wheel", handleWheel, { passive: false });
    return () => window.removeEventListener("wheel", handleWheel);
  }, [
    thumbnailsList.length,
    minOffset,
    maxOffset,
    updateScrollTransform,
    updateActiveThumbnailFromOffset,
    isSafari,
  ]);

  // Touch handling
  useEffect(() => {
    if (thumbnailsList.length === 0) return;

    const handleTouchStart = (e) => {
      setIsKeyboardNavigating(false);
      const touch = e.touches[0];

      dragStateRef.current = {
        isDragging: true,
        startX: touch.clientX,
        startOffset: currentScrollOffsetRef.current,
        lastX: touch.clientX,
        lastTime: performance.now(),
        velocityHistory: [],
      };
      setIsDragging(true);
      momentumRef.current = 0;

      if (carouselRef.current) {
        carouselRef.current.style.transition = "none";
      }
    };

    const handleTouchMove = (e) => {
      if (!dragStateRef.current.isDragging) return;
      e.preventDefault();

      const touch = e.touches[0];
      const currentTime = performance.now();
      const deltaX = touch.clientX - dragStateRef.current.startX;
      const newOffset = clampOffset(
        dragStateRef.current.startOffset + deltaX,
        minOffset,
        maxOffset
      );

      setScrollOffset(newOffset);
      updateScrollTransform(newOffset);
      updateActiveThumbnailFromOffset(newOffset);

      const timeDelta = currentTime - dragStateRef.current.lastTime;
      const positionDelta = touch.clientX - dragStateRef.current.lastX;

      if (timeDelta > 0) {
        const velocity = positionDelta / timeDelta;

        dragStateRef.current.velocityHistory.push({
          velocity,
          time: currentTime,
        });

        dragStateRef.current.velocityHistory =
          dragStateRef.current.velocityHistory.filter(
            (entry) => currentTime - entry.time < 100
          );
      }

      dragStateRef.current.lastX = touch.clientX;
      dragStateRef.current.lastTime = currentTime;
    };

    const handleTouchEnd = (e) => {
      if (!dragStateRef.current.isDragging) return;

      dragStateRef.current.isDragging = false;
      setIsDragging(false);

      // Mobile (all browsers) and non-Safari desktop: Calculate momentum
      let finalVelocity = 0;

      if (dragStateRef.current.velocityHistory.length > 0) {
        const recentVelocities = dragStateRef.current.velocityHistory.slice(-3);
        finalVelocity =
          recentVelocities.reduce((sum, entry) => sum + entry.velocity, 0) /
          recentVelocities.length;

        const velocityMultiplier = isTouchDevice ? 20 : 16;
        finalVelocity *= velocityMultiplier;

        if (Math.abs(finalVelocity) > 2) {
          finalVelocity =
            Math.sign(finalVelocity) * Math.min(Math.abs(finalVelocity), 50);
          momentumRef.current = finalVelocity;
          startAnimationLoop();
        }
      }

      setTimeout(() => {
        if (carouselRef.current && !isTouchDevice) {
          carouselRef.current.style.transition = "transform 0.3s ease-out";
        }
      }, 50);
    };

    document.addEventListener("touchstart", handleTouchStart, {
      passive: false,
    });
    document.addEventListener("touchmove", handleTouchMove, { passive: false });
    document.addEventListener("touchend", handleTouchEnd, { passive: false });

    return () => {
      document.removeEventListener("touchstart", handleTouchStart);
      document.removeEventListener("touchmove", handleTouchMove);
      document.removeEventListener("touchend", handleTouchEnd);
    };
  }, [
    thumbnailsList.length,
    minOffset,
    maxOffset,
    updateScrollTransform,
    isTouchDevice,
    startAnimationLoop,
    updateActiveThumbnailFromOffset,
    isSafari,
  ]);

  // Keyboard navigation
  useEffect(() => {
    if (thumbnailsList.length === 0) return;

    const handleKeyDown = (e) => {
      if (e.key === "ArrowLeft" || e.key === "ArrowRight") {
        e.preventDefault();
        setIsKeyboardNavigating(true);
        momentumRef.current = 0;

        const currentActive = activeThumbnail;
        let newActive;

        if (e.key === "ArrowLeft") {
          newActive = currentActive > 0 ? currentActive - 1 : currentActive;
        } else {
          newActive =
            currentActive < thumbnailsList.length - 1
              ? currentActive + 1
              : currentActive;
        }

        if (newActive !== currentActive) {
          setActiveThumbnail(newActive);

          const targetOffset = -thumbnailPositions[newActive];
          const clampedOffset = clampOffset(targetOffset, minOffset, maxOffset);

          setScrollOffset(clampedOffset);
          updateScrollTransform(clampedOffset);
        }

        // Reset keyboard navigation mode
        setTimeout(() => {
          setIsKeyboardNavigating(false);
        }, 500);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [
    thumbnailsList.length,
    activeThumbnail,
    thumbnailPositions,
    minOffset,
    maxOffset,
    updateScrollTransform,
  ]);

  // Update active thumbnail on scroll offset changes
  useEffect(() => {
    if (momentumRef.current === 0) {
      updateActiveThumbnailFromOffset(currentScrollOffsetRef.current);
    }
  }, [scrollOffset, updateActiveThumbnailFromOffset]);

  // Update active thumbnail on window resize
  useEffect(() => {
    if (thumbnailsList.length === 0) return;

    const handleResize = () => {
      if (!isKeyboardNavigating) {
        requestAnimationFrame(() => {
          if (momentumRef.current === 0) {
            updateActiveThumbnailFromOffset(currentScrollOffsetRef.current);
          }
        });
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [
    isKeyboardNavigating,
    updateActiveThumbnailFromOffset,
    thumbnailsList.length,
  ]);

  // Thumbnail click handler
  const handleThumbnailClick = useCallback(
    (index) => {
      if (index >= thumbnailPositions.length) return;

      setIsKeyboardNavigating(false);

      const targetOffset = -thumbnailPositions[index];
      const clampedOffset = clampOffset(targetOffset, minOffset, maxOffset);

      setScrollOffset(clampedOffset);
      setActiveThumbnail(index);
      updateScrollTransform(clampedOffset);
    },
    [
      thumbnailPositions,
      minOffset,
      maxOffset,
      updateScrollTransform,
      isTouchDevice,
    ]
  );

  // Cleanup
  useEffect(() => {
    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, []);

  // Initialize
  useEffect(() => {
    setScrollOffset(0);
    setActiveThumbnail(0);
    updateScrollTransform(0);
  }, [updateScrollTransform]);

  return (
    <main className="home page subgrid">
      <div className="top subgrid">
        <div className="intro">
          <h1>A Video Gallery of Poets in Southern California</h1>
          <Link href="/about">About Us</Link>
        </div>
        <div className="featured" ref={featuredRef}>
          <VideoPlayer
            video={thumbnailsList[activeThumbnail]}
            // originalVideoUrl={thumbnailsList[activeThumbnail].videoUrl}
            // thumbnailUrl={thumbnailsList[activeThumbnail].thumbnail.url}
            // title={thumbnailsList[activeThumbnail].title}
            // description={thumbnailsList[activeThumbnail].description}
            // publicationDate={thumbnailsList[activeThumbnail].publicationDate}
          />
        </div>
      </div>
      <div className="thumbnails">
        <h3>Latest</h3>
        <div className="carousel" ref={carouselRef}>
          {homepage.youtubeVideoCollection.items.map((video, index) => (
            <div
              className={`carousel-item ${
                index === activeThumbnail ? "active" : ""
              }`}
              key={index}
              ref={thumbnailsRef[index]}
              onClick={() => handleThumbnailClick(index)}
              onKeyDown={(e) =>
                e.key === "Enter" && handleThumbnailClick(index)
              }
              tabIndex={0}
              role="button"
            >
              <div className="overlay"/>
              <img src={video.thumbnail.url} alt={video.title} />
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
