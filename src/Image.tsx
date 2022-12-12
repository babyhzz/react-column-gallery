import React from 'react';
import { Photo } from '.';

export interface ImageProps {
  photo: Photo;
}

const Image = ({ photo }: ImageProps): JSX.Element => {
  console.log(photo);
  return <img {...photo} style={{ width: '100%' }} />;
};

export default Image;
