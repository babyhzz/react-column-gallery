import { Photo } from '..';

type Size = {
  w: number;
  h: number;
};
const imageResolutions: Size[] = [
  { w: 320, h: 180 }, // 16:9
  { w: 360, h: 640 }, // 9:16
  { w: 512, h: 512 }, // 1:1
  { w: 640, h: 480 }, // 4:3
  { w: 480, h: 640 }, // 3:4
];

const getRandomResolution = (): Size => {
  const index = Math.floor(Math.random() * imageResolutions.length);
  return imageResolutions[index];
};

export const getPhotos = (count: number): Photo[] => {
  const photos: Photo[] = [];

  for (let i = 0; i < count; i++) {
    const { w, h } = getRandomResolution();

    photos.push({
      key: i,
      src: `https://picsum.photos/${w}/${h}?id=${i}`,
      width: w,
      height: h,
      alt: '',
    });
  }

  return photos;
};

export const getAvatars = (count: number) => {
  const urls: string[] = []

  for (let i = 0; i < count; i++) {
    urls.push(`https://picsum.photos/24/24?id=${i}`)
  }

  return urls;
}