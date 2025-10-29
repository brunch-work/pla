"use client";

import { useState, useRef, useEffect, useCallback, useMemo } from "react";
import { motion } from "motion/react";

import {
  calculateImageWidth,
  calculateThumbnailPositions,
} from "@/utils/helpers";
import { useViewport } from "@/hooks/useViewport";
import { VideoPlayer } from "@/components/VideoPlayer";
import { useMobile } from "@/hooks/useMobile";
import {
  homeVariants,
  homeItemVariants,
  featuredVariants,
  latestVariants,
} from "@/motion/home";
import { useLoader } from "@/utils/loader";

export default function Homepage({ homepage }) {
  const [activeThumbnail, setActiveThumbnail] = useState(0);

  // Refs
  const thumbnailsRef = useRef([]);
  const carouselRef = useRef(null);
  const scrollTimeoutRef = useRef();
  const featuredRef = useRef(null);
  const isMobile = useMobile();
  const isScrollingProgrammatically = useRef(false);
  const smoothScrollDuration = 300; // ms
  const { showLoader } = useLoader.getState();

  // Momentum scrolling refs and state
  const momentumRef = useRef(0);
  const lastScrollTimeRef = useRef(0);
  const momentumAnimationRef = useRef(null);
  const isMomentumScrollingRef = useRef(false);
  const lastWheelTimeRef = useRef(0);

  const { viewportHeight, viewportWidth } = useViewport();

  const gap = 1.6;
  const thumbnailsList = homepage.youtubeVideoCollection.items;

  const generatedThumbnailWidths = useMemo(() => {
    const height = carouselRef.current?.offsetHeight || 0;
    return thumbnailsList.map((project, index) =>
      calculateImageWidth(project, index, height),
    );
  }, [thumbnailsList, viewportHeight, viewportWidth]);

  const thumbnailPositions = useMemo(() => {
    return calculateThumbnailPositions(generatedThumbnailWidths, gap);
  }, [generatedThumbnailWidths, gap]);

  useEffect(() => {
    // let animations finish before setting isDone
    setTimeout(() => {
      useLoader.setState({ showLoader: false, isDone: true });
    }, 1500);
  }, []);

  const handleThumbnailClick = useCallback((index) => {
    if (index >= carouselRef.current.children.length) return;

    momentumRef.current = 0;
    if (momentumAnimationRef.current) {
      cancelAnimationFrame(momentumAnimationRef.current);
      momentumAnimationRef.current = null;
    }
    isMomentumScrollingRef.current = false;

    let targetOffset = carouselRef.current.children[index].offsetLeft - 12;
    console.info(targetOffset);

    isScrollingProgrammatically.current = true;

    requestAnimationFrame(() => {
      carouselRef.current.scrollTo({ left: targetOffset, behavior: "smooth" });

      setTimeout(() => {
        isScrollingProgrammatically.current = false;
      }, smoothScrollDuration);
    });
    setActiveThumbnail(index);
  }, []);

  // Momentum scrolling animation loop
  const applyMomentum = useCallback(() => {
    if (!carouselRef.current || Math.abs(momentumRef.current) < 1) {
      // Momentum has stopped, snap to nearest thumbnail
      if (isMomentumScrollingRef.current) {
        isMomentumScrollingRef.current = false;
        const currentScrollLeft = carouselRef.current.scrollLeft;

        const activeThumb = determineActiveThumbnail(currentScrollLeft);
        handleThumbnailClick(activeThumb);
      }
      return;
    }

    const currentTime = performance.now();
    const deltaTime = (currentTime - lastScrollTimeRef.current) / 16.67; // Normalize to 60fps

    carouselRef.current.scrollLeft += momentumRef.current * deltaTime * 0.3;

    // Apply friction to momentum
    momentumRef.current *= 0.9;

    lastScrollTimeRef.current = currentTime;
    momentumAnimationRef.current = requestAnimationFrame(applyMomentum);
  }, [thumbnailPositions, generatedThumbnailWidths, handleThumbnailClick]);

  useEffect(() => {
    if (thumbnailsList.length === 0 || !carouselRef.current) return;

    const handleWheel = (e) => {
      const isSearchOpen = document.querySelector(".search-dialog")?.open;
      if (isSearchOpen) return;

      e.preventDefault();

      const currentTime = performance.now();
      const timeDelta = currentTime - lastWheelTimeRef.current;
      lastWheelTimeRef.current = currentTime;

      // Calculate scroll delta
      const scrollDelta =
        Math.abs(e.wheelDeltaX) > Math.abs(e.wheelDeltaY)
          ? -e.wheelDeltaX
          : -e.wheelDeltaY;

      // For stepped scrolling (mouse wheel), add momentum
      if (Math.abs(e.wheelDeltaY) > 0 && e.wheelDeltaY % 1 === 0) {
        // This is likely a stepped mouse wheel - use custom momentum
        const momentumMultiplier = Math.min(timeDelta / 16, 3);
        momentumRef.current += scrollDelta * momentumMultiplier * 0.15;

        // Start momentum animation if not already running
        if (
          !isMomentumScrollingRef.current &&
          Math.abs(momentumRef.current) > 0.1
        ) {
          isMomentumScrollingRef.current = true;
          lastScrollTimeRef.current = currentTime;

          // Cancel any existing animation
          if (momentumAnimationRef.current) {
            cancelAnimationFrame(momentumAnimationRef.current);
          }

          momentumAnimationRef.current = requestAnimationFrame(applyMomentum);
        }
      } else {
        // For smooth trackpad scrolling, use native scrolling - no custom momentum
        carouselRef.current.scrollBy({ left: scrollDelta });
        // Don't add any momentum or start animation - let native trackpad momentum handle it
      }

      if (
        !isMomentumScrollingRef.current &&
        Math.abs(momentumRef.current) > 0.1
      ) {
        isMomentumScrollingRef.current = true;
        lastScrollTimeRef.current = currentTime;

        if (momentumAnimationRef.current) {
          cancelAnimationFrame(momentumAnimationRef.current);
        }

        momentumAnimationRef.current = requestAnimationFrame(applyMomentum);
      }
    };

    const carousel = document.body;
    carousel.addEventListener("wheel", handleWheel, { passive: false });

    return () => {
      carousel.removeEventListener("wheel", handleWheel);
      if (momentumAnimationRef.current) {
        cancelAnimationFrame(momentumAnimationRef.current);
      }
    };
  }, [thumbnailsList.length, applyMomentum]);

  useEffect(() => {
    const carousel = carouselRef.current;
    if (!carousel) return;

    let scrollTicking = false;
    const handleScroll = (e) => {
      if (
        isScrollingProgrammatically.current ||
        isMomentumScrollingRef.current ||
        !e.target
      )
        return;

      if (!scrollTicking) {
        requestAnimationFrame(() => {
          if (scrollTimeoutRef.current) {
            clearTimeout(scrollTimeoutRef.current);
          }

          const activeThumb = e.target?.scrollLeft
            ? determineActiveThumbnail(e.target.scrollLeft)
            : activeThumbnail;
          setActiveThumbnail(activeThumb);

          scrollTimeoutRef.current = setTimeout(() => {
            if (!isMomentumScrollingRef.current) {
              handleThumbnailClick(activeThumb);
            }
          }, 150);
          scrollTicking = false;
        });
        scrollTicking = true;
      }
    };

    carousel.addEventListener("scroll", handleScroll);

    return () => {
      carousel.removeEventListener("scroll", handleScroll);
    };
  }, [
    thumbnailPositions,
    generatedThumbnailWidths,
    gap,
    isMobile,
    handleThumbnailClick,
    activeThumbnail,
  ]);

  const determineActiveThumbnail = (scrollLeft) => {
    // Early returns for out of bounds
    if (scrollLeft < 0) return 0;
    if (scrollLeft >= thumbnailPositions[thumbnailPositions.length - 1])
      return thumbnailPositions.length - 1;

    // Find the single valid index where scrollLeft is between thumbnailPositions[i] and thumbnailPositions[i+1]
    for (let i = 0; i < thumbnailPositions.length; i++) {
      if (
        scrollLeft >= thumbnailPositions[i] &&
        scrollLeft < thumbnailPositions[i] + generatedThumbnailWidths[i]
      ) {
        return i;
      }
    }

    // Fallback: return the last index if nothing matches
    return thumbnailPositions.length - 1;
  };

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

        // Directly invoke the thumbnail click handler to avoid triggering nested buttons inside slides
        requestAnimationFrame(() => {
          handleThumbnailClick(newActive);
        });
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [
    thumbnailsList.length,
    activeThumbnail,
    thumbnailPositions,
    handleThumbnailClick,
  ]);

  useEffect(() => {
    if (!carouselRef.current || thumbnailPositions.length === 0) return;
    carouselRef.current.scrollLeft =
      carouselRef.current.children[activeThumbnail].offsetLeft - 12;
  }, [viewportWidth, thumbnailPositions]);

  // Cleanup momentum animation on unmount
  useEffect(() => {
    return () => {
      if (momentumAnimationRef.current) {
        cancelAnimationFrame(momentumAnimationRef.current);
      }
    };
  }, []);

  if (isMobile) {
    return (
      <>
        <main className="home page subgrid">
          <div className="top subgrid">
            <div className="intro">
              <motion.h1
                className="body-text"
                layout="position"
                layoutId="home-title"
                transition={{ duration: 1, ease: "easeInOut" }}
              >
                A Video Gallery of Poets
                <br />
                in Southern California
              </motion.h1>
            </div>
            <div className="featured" ref={featuredRef}>
              <motion.div
                variants={featuredVariants}
                initial="hidden"
                animate="visible"
                transition={{ delay: showLoader ? 0 : 1 }}
              >
                <VideoPlayer video={thumbnailsList[activeThumbnail]} />
              </motion.div>
            </div>
          </div>
          <div className="thumbnails">
            <motion.h3
              className="body-text"
              variants={latestVariants}
              initial="hidden"
              animate="visible"
            >
              Latest
            </motion.h3>
            <div className="carousel">
              <motion.ul
                className="carousel-track"
                ref={carouselRef}
                variants={homeVariants}
                initial="hidden"
                animate="visible"
              >
                {homepage.youtubeVideoCollection.items.map((video, index) => (
                  <motion.li
                    className={`carousel-item ${
                      index === activeThumbnail ? "active" : ""
                    }`}
                    style={{
                      "--w": `${generatedThumbnailWidths[index]}px`,
                    }}
                    key={index}
                    ref={(el) => (thumbnailsRef.current[index] = el)}
                    variants={homeItemVariants}
                    transition={{ delay: showLoader ? 0 : 0.75 }}
                  >
                    <button onClick={() => handleThumbnailClick(index)}>
                      <img src={video.thumbnail.url} alt={video.title} />
                    </button>
                  </motion.li>
                ))}
              </motion.ul>
            </div>
          </div>
        </main>
      </>
    );
  }

  return (
    <main className="home page subgrid">
      <div className="top subgrid">
        <div className="intro">
          <motion.h1
            className="body-text"
            layout="position"
            layoutId="home-title"
            transition={{ duration: 1, ease: "easeInOut" }}
          >
            A Video Gallery of Poets
            <br />
            in Southern California
          </motion.h1>
        </div>
      </div>
      <div className="thumbnails">
        <div className="carousel">
          <motion.ul
            className="carousel-track"
            ref={carouselRef}
            variants={homeVariants}
            initial="hidden"
            animate="visible"
          >
            {homepage.youtubeVideoCollection.items.map((video, index) => (
              <motion.li
                className={`carousel-item ${
                  index === activeThumbnail ? "active" : ""
                }`}
                key={index}
                ref={(el) => (thumbnailsRef.current[index] = el)}
                variants={homeItemVariants}
                transition={{ delay: showLoader ? 0 : 0.75 }}
              >
                <div
                  className="button"
                  onClick={() => handleThumbnailClick(index)}
                  onKeyDown={(e) =>
                    e.key === "Enter" && handleThumbnailClick(index)
                  }
                  tabIndex={0}
                >
                  <VideoPlayer video={video} />
                </div>
              </motion.li>
            ))}
          </motion.ul>
        </div>
      </div>
    </main>
  );
}
