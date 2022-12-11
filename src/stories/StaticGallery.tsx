import React from 'react';
import Gallery from '../index';
import { getPhotos } from './data';

const photos = getPhotos(40);

export default function StaticGallery() {
  return <Gallery photos={photos} spacing={30} />;
}
