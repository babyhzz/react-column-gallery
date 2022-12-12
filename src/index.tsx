import React, { ReactNode, useCallback, useState } from 'react';
import Image from './Image';
import {
  computeColumnLayout,
  defaultColumnsProvider,
  defaultSpacingProvider,
} from './utils/layouts';

export type Photo = {
  key: string | number;
  src: string;
  width: number;
  height: number;
  alt: string;
  loading?: 'lazy' | 'eager';
};

export type ColumnsProvider = (containerWidth: number) => number;

export type Spacing = number | { horizontal: number; vertical: number };
export type SpacingProvider = (containerWidth: number) => Spacing;

export interface GalleryProps {
  photos: Photo[];
  columns?: number | ColumnsProvider;
  spacing?: Spacing | SpacingProvider;
  /** For SSR env */
  initialContainerWidth?: number;
  /** customize photo renderer */
  renderPhoto?: (photo: Photo) => ReactNode;
  footerHeight?: number;
  renderFooter?: (photo: Photo) => ReactNode;
}

const Gallery = ({
  photos,
  columns,
  spacing,
  initialContainerWidth,
  footerHeight,
  renderPhoto,
  renderFooter,
}: GalleryProps): JSX.Element => {
  const [containerWidth, setContainerWidth] = useState(
    initialContainerWidth || 0
  );

  const measuredRef = useCallback(node => {
    let animationFrameID: number | null = null;
    let observer: ResizeObserver | null = null;

    if (node !== null) {
      setContainerWidth(Math.floor(node.getBoundingClientRect().height));

      observer = new ResizeObserver(entries => {
        const newWidth = entries[0].contentRect.width;
        if (containerWidth !== newWidth) {
          animationFrameID = window.requestAnimationFrame(() => {
            setContainerWidth(Math.floor(newWidth));
          });
        }
      });
      observer.observe(node);
    }

    return () => {
      if (observer !== null && animationFrameID !== null) {
        observer.disconnect();
        window.cancelAnimationFrame(animationFrameID);
      }
    };
  }, []);

  columns = columns || defaultColumnsProvider;

  if (typeof columns === 'function') {
    columns = columns(containerWidth);
  }

  spacing = spacing || defaultSpacingProvider;
  if (typeof spacing === 'function') {
    spacing = spacing(containerWidth);
  }

  const { photosPositioned, containerHeight } = computeColumnLayout(
    photos,
    columns,
    containerWidth,
    spacing,
    footerHeight || 0
  );

  return (
    <div className="react-infinite-column-gallery">
      <div
        ref={measuredRef}
        style={{
          position: 'relative',
          height: containerHeight,
        }}
      >
        {photosPositioned.map(p => (
          <div
            key={p.key}
            className="photo-wrapper"
            style={{
              position: 'absolute',
              left: p.left,
              top: p.top,
              width: p.width,
              height: p.height,
            }}
          >
            {renderPhoto ? renderPhoto(p) : <Image photo={p} />}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Gallery;
