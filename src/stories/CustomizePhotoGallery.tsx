import React from 'react';
import Gallery, { Photo } from '../index';
import { getPhotos } from './data';

const photos = getPhotos(40);

export default function CustomizePhotoGallery() {
  const renderPhoto = (p: Photo) => (
    <img
      src={p.src}
      alt={p.alt}
      style={{ borderRadius: 16, width: '100%' }}
      loading="lazy"
    />
  );

  return <Gallery photos={photos} spacing={12} renderPhoto={renderPhoto} />;
}
