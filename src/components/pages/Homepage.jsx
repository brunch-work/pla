"use client";

import { useState, useRef, useEffect, useCallback, useMemo } from "react";

import { calculateImageWidth, calculateThumbnailPositions, calculateTotalWidth, clampOffset } from "@/utils/helpers";
import { useViewport } from "@/hooks/useViewport";
import { useMobile } from "@/hooks/useMobile";
import { VideoPlayer } from "@/components/VideoPlayer";
import Link from "next/link";

export default function Homepage({ homepage }) {
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
  const featuredRef = useRef(null);

  const { viewportHeight } = useViewport();

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

  // Wheel handling
  useEffect(() => {
    if (thumbnailsList.length === 0) return;

    const handleWheel = (e) => {
      if (Math.abs(e.deltaX) > Math.abs(e.deltaY)) return; //discard trackpad horizontal scrolls

      const scrollDeltaY = e.deltaY;
      carouselRef.current.scrollBy({ left: scrollDeltaY, behavior: 'smooth' });

      updateActiveThumbnailFromOffset();
      return;
    };

    window.addEventListener("wheel", handleWheel, { passive: false });
    return () => window.removeEventListener("wheel", handleWheel);
  }, [
    thumbnailsList.length,
    minOffset,
    maxOffset,
    updateActiveThumbnailFromOffset,
    isSafari,
  ]);

  // Keyboard navigation
  useEffect(() => {
    if (thumbnailsList.length === 0) return;

    const handleKeyDown = (e) => {
      if (e.key === "ArrowLeft" || e.key === "ArrowRight") {
        e.preventDefault();

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

        carouselRef.current.querySelectorAll("button")[newActive].click();
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
  ]);

  // Thumbnail click handler
  const handleThumbnailClick = useCallback(
    (index) => {
      if (index >= thumbnailPositions.length) return;

      const targetOffset = thumbnailPositions[index];
      carouselRef.current.scrollTo(targetOffset, 0);

      setActiveThumbnail(index);
    },
    [
      thumbnailPositions,
      minOffset,
      maxOffset,
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
  /*   useEffect(() => {
      setScrollOffset(0);
    }, []); */

  return (<>
    <main className="home page subgrid">
      <div className="top subgrid">
        <div className="intro">
          <h1>A Video Gallery of Poets in Southern California</h1>
          <Link href="/about">About Us</Link>
        </div>
        <div className="featured" ref={featuredRef}>
          <VideoPlayer
            originalVideoUrl={thumbnailsList[activeThumbnail].videoUrl}
            thumbnailUrl={thumbnailsList[activeThumbnail].thumbnail.url}
            title={thumbnailsList[activeThumbnail].title}
            description={thumbnailsList[activeThumbnail].description}
            publicationDate={thumbnailsList[activeThumbnail].publicationDate}
          />
        </div>
      </div>
      <div className="thumbnails">
        <h3>Latest</h3>
        <div className="carousel">
          <ul className="carousel-track" ref={carouselRef}>
            {homepage.youtubeVideoCollection.items.map((video, index) => (
              <li
                className={`carousel-item ${index === activeThumbnail ? "active" : ""
                  }`}
                key={index}
                ref={thumbnailsRef[index]}
              >
                <button
                  onClick={() => handleThumbnailClick(index)}>
                  <img src={video.thumbnail.url} alt={video.title} />
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </main>
  </>
  );
}
