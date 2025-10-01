"use client";

import { useState, useRef, useEffect, useCallback, useMemo } from "react";

import { calculateImageWidth, calculateThumbnailPositions, calculateTotalWidth, clampOffset } from "@/utils/helpers";
import { useViewport } from "@/hooks/useViewport";
import { VideoPlayer } from "@/components/VideoPlayer";
import { Link } from "next-view-transitions";

export default function Homepage({ homepage }) {
  const [activeThumbnail, setActiveThumbnail] = useState(0);

  // Refs
  const thumbnailsRef = useRef([]);
  const carouselRef = useRef(null);
  const scrollTimeoutRef = useRef();
  const featuredRef = useRef(null);

  const { viewportHeight } = useViewport();

  const thumbnailHeightVh = 13;
  const gap = 1.6;
  const thumbnailsList = homepage.youtubeVideoCollection.items;

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

  // Wheel or trackpad y-scroll to x-scroll conversion
  useEffect(() => {
    if (thumbnailsList.length === 0 || !carouselRef.current) return;

    const handleWheel = (e) => {
      const scrollDelta = Math.abs(e.wheelDeltaX) > Math.abs(e.wheelDeltaY) ? -e.wheelDeltaX : -e.wheelDeltaY;
      carouselRef.current.scrollBy({ left: scrollDelta });
    };

    window.addEventListener("wheel", handleWheel, { passive: false });
    return () => window.removeEventListener("wheel", handleWheel);
  }, [
    thumbnailsList.length,
  ]);

  // scrollSnapchange and scroll (if scrollSnapChange isn't supported) event handling
  useEffect(() => {

    // Debounce handleScroll so it only runs 100ms after the last scroll event
    // Move scrollTimeoutRef outside useEffect to avoid invalid hook call
    const handleScroll = (e) => {
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
      }
      const scrollLeft = e.target.scrollLeft;
      scrollTimeoutRef.current = setTimeout(() => {
        // Find the single valid index where scrollLeft is between thumbnailPositions[i] and thumbnailPositions[i+1]
        for (let i = 0; i < thumbnailPositions.length; i++) {
          if (scrollLeft >= thumbnailPositions[i] &&
            scrollLeft < (thumbnailPositions[i] + generatedThumbnailWidths[i]) &&
            activeThumbnail !== i) {
            handleThumbnailClick(i);
            break;
          }
        }
      }, 100);
    }

    carouselRef.current.addEventListener('scroll', handleScroll);
    return () => carouselRef?.current?.removeEventListener("scroll", handleScroll);
  }, [thumbnailPositions, generatedThumbnailWidths, gap, activeThumbnail]);

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
  ]);

  // Thumbnail click handler
  const handleThumbnailClick = useCallback(
    (index) => {
      if (index >= carouselRef.current.children.length) return;

      let targetOffset = carouselRef.current.children[index].offsetLeft - 12; // 12 is the page's left gap

      carouselRef.current.scrollTo({ left: targetOffset, behavior: 'smooth' });
      setActiveThumbnail(index);
    },
    []
  );
  return (<>
    <main className="home page subgrid">
      <div className="top subgrid">
        <div className="intro">
          <h1>A Video Gallery of Poets in Southern California</h1>
          <Link href="/about">About Us</Link>
        </div>
        <div className="featured" ref={featuredRef}>
          <VideoPlayer
            video={thumbnailsList[activeThumbnail]}
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
                style={{ "--w": `${generatedThumbnailWidths[index]}px` }}
                key={index}
                ref={el => thumbnailsRef.current[index] = el}
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
