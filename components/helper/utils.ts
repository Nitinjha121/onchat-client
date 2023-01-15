import crypto from "crypto";

export const getRandomUUID = () => {
  if (typeof window != "undefined") return window.crypto.randomUUID();

  return crypto.randomUUID();
};

export interface ImageDimensions {
  width: number;
  height: number;
}

export const getImageDimensions = (src: string) => {
  return new Promise<ImageDimensions>((resolve, reject) => {
    const image = new Image();
    image.onload = () => {
      resolve({ width: image.width, height: image.height });
    };
    image.onerror = (error) => {
      reject(error);
    };
    image.src = src;
  });
};
