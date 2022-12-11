import React from 'react';
import { Photo } from '.';

export interface ImageProps {
  photo: Photo;
  top: number;
  left: number;
}

const Image = ({ top, left, photo }: ImageProps): JSX.Element => {
  return (
    <img
      {...photo}
      style={{ display: 'block', position: 'absolute', left, top }}
    />
  );
};

export default Image;
