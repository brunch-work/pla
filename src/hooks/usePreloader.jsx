export const usePreloader = async (assets, onProgress) => {
  let loaded = 0;

  const loadImage = (asset) => {
    return new Promise((resolve) => {
      const img = new Image();
      img.onload = img.onerror = () => {
        loaded++;
        onProgress(Math.round((loaded / assets.length) * 100));
        resolve();
      };
      img.src = asset.thumbnail.url;
    });
  };

  await Promise.all(assets.map(loadImage));
};
