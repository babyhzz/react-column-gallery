import React from 'react';
import Gallery from '../index';
import { getPhotos } from './data';

const photos = getPhotos(40);

export default function SimpleGallery() {
  return <Gallery photos={photos} spacing={16} />;
}
