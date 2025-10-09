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

  const { viewportHeight, viewportWidth } = useViewport();

  const thumbnailHeightVh = () => {
    if (isMobile) {
      return 13;
    } else if (viewportWidth >= 768 && viewportWidth <= 1080) {
      return 36;
    } else {
      return 65;
    }
  };
  const gap = 1.6;
  const thumbnailsList = homepage.youtubeVideoCollection.items;

  // Memoized calculations
  const thumbnailHeight = useMemo(() => {
    const thumbnailHeight = thumbnailHeightVh();
    if (viewportHeight === 0) return 75;
    return Math.floor((viewportHeight * thumbnailHeight) / 100);
  }, [viewportHeight, thumbnailHeightVh]);

  const generatedThumbnailWidths = useMemo(() => {
    return thumbnailsList.map((project, index) =>
      calculateImageWidth(project, index, thumbnailHeight),
    );
  }, [thumbnailsList, thumbnailHeight]);

  const thumbnailPositions = useMemo(() => {
    return calculateThumbnailPositions(generatedThumbnailWidths, gap);
  }, [generatedThumbnailWidths, gap]);

  useEffect(() => {
    // let animations finish before setting isDone
    setTimeout(() => {
      useLoader.setState({ showLoader: false, isDone: true });
    }, 1000);
  }, []);

  // Wheel or trackpad y-scroll to x-scroll conversion
  useEffect(() => {
    if (thumbnailsList.length === 0 || !carouselRef.current) return;

    let ticking = false;
    const handleWheel = (e) => {
      console.log(e);
      if (!ticking) {
        requestAnimationFrame(() => {
          const scrollDelta =
            Math.abs(e.wheelDeltaX) > Math.abs(e.wheelDeltaY)
              ? -e.wheelDeltaX
              : -e.wheelDeltaY;
          carouselRef.current.scrollBy({ left: scrollDelta });
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("wheel", handleWheel, { passive: false });
    return () => window.removeEventListener("wheel", handleWheel);
  }, [thumbnailsList.length]);

  useEffect(() => {
    let scrollTicking = false;
    const handleScroll = (e) => {
      if (isScrollingProgrammatically.current) return;

      if (!scrollTicking) {
        requestAnimationFrame(() => {
          if (scrollTimeoutRef.current) {
            clearTimeout(scrollTimeoutRef.current);
          }

          const activeThumb = determineActiveThumbnail(e);
          setActiveThumbnail(activeThumb);
          scrollTimeoutRef.current = setTimeout(() => {
            handleThumbnailClick(activeThumb);
          }, 100);
          scrollTicking = false;
        });
        scrollTicking = true;
      }
    };

    carouselRef.current.addEventListener("scroll", handleScroll, {
      passive: true,
    });
    return () =>
      carouselRef?.current?.removeEventListener("scroll", handleScroll);
  }, [thumbnailPositions, generatedThumbnailWidths, gap]);

  const determineActiveThumbnail = (e) => {
    const scrollLeft = e.target.scrollLeft;
    // Find the single valid index where scrollLeft is between thumbnailPositions[i] and thumbnailPositions[i+1]
    for (let i = 0; i < thumbnailPositions.length; i++) {
      if (scrollLeft < 0) return 0; //iOS inertia scroll can produce out of bounds values
      if (scrollLeft >= thumbnailPositions[thumbnailPositions.length - 1])
        return thumbnailPositions.length - 1;
      if (
        scrollLeft >= thumbnailPositions[i] &&
        scrollLeft < thumbnailPositions[i] + generatedThumbnailWidths[i]
      ) {
        return i;
      }
    }
  };

  const handleThumbnailClick = useCallback((index) => {
    if (index >= carouselRef.current.children.length) return;

    let targetOffset = carouselRef.current.children[index].offsetLeft - 12;

    // Set flag before scrolling
    isScrollingProgrammatically.current = true;

    requestAnimationFrame(() => {
      carouselRef.current.scrollTo({ left: targetOffset, behavior: "smooth" });

      // Clear flag
      setTimeout(() => {
        isScrollingProgrammatically.current = false;
      }, smoothScrollDuration);
    });
    setActiveThumbnail(index);
  }, []);

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
