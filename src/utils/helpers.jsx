// Function to calculate width from image dimensions
export const calculateImageWidth = (
  project,
  index,
  thumbnailHeight,
) => {
  const projectType = project._modelApiKey;
  const fileType = projectType === "photo" ? "photo" : "thumbnail";

  if (project[fileType].width && project[fileType].height) {
    return Math.floor(
      (project[fileType].width / project[fileType].height) * thumbnailHeight
    );
  }

  return thumbnailHeight;
};

// Calculate cumulative positions for each thumbnail
export const calculateThumbnailPositions = (thumbnailWidths, gap) => {
  return thumbnailWidths.reduce((acc, width, index) => {
    if (index === 0) {
      acc.push(0);
    } else {
      acc.push(acc[index - 1] + thumbnailWidths[index - 1]);
    }
    return acc;
  }, []);
};

// Calculate total width of all thumbnails
export const calculateTotalWidth = (thumbnailPositions, thumbnailWidths) => {
  if (thumbnailPositions.length === 0) return 0;
  return (
    thumbnailPositions[thumbnailPositions.length - 1] +
    thumbnailWidths[thumbnailWidths.length - 1]
  );
};

// Clamp offset within boundaries
export const clampOffset = (offset, minOffset, maxOffset) => {
  return Math.max(minOffset, Math.min(maxOffset, offset));
};

// Calculate which thumbnail should be active based on offset
export const calculateActiveThumbnail = (offset, thumbnailPositions) => {
  if (thumbnailPositions.length === 0) return 0;

  const adjustedOffset = -offset;

  // Find which thumbnail position is closest to the current offset
  let closestIndex = 0;
  let closestDistance = Math.abs(adjustedOffset - thumbnailPositions[0]);

  for (let i = 1; i < thumbnailPositions.length; i++) {
    const distance = Math.abs(adjustedOffset - thumbnailPositions[i]);
    if (distance < closestDistance) {
      closestDistance = distance;
      closestIndex = i;
    }
  }

  return closestIndex;
};
