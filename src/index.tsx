import React, { ReactNode, useCallback, useState } from "react";
import {
  computeColumnLayout,
  defaultColumnsProvider,
  defaultSpacingProvider,
} from "./utils/layouts";
import "./index.css";

export type Photo = {
  key: string | number;
  src: string;
  width: number;
  height: number;
  alt: string;
  loading?: "lazy" | "eager";
};

export type ColumnsProvider = (containerWidth: number) => number;

export type Spacing = number | { horizontal: number; vertical: number };
export type SpacingProvider = (containerWidth: number) => Spacing;

export interface GalleryProps {
  photos: Photo[];
  /** provider column number or column function */
  columns?: number | ColumnsProvider;
  /** vertical or horizontal space provider */
  spacing?: Spacing | SpacingProvider;
  /** For SSR env */
  initialContainerWidth?: number;
  /** customize photo renderer */
  renderPhoto?: (photo: Photo, index: number) => ReactNode;
  /** optional: footer height */
  footerHeight?: number;
  /** optional: customize footer renderer */
  renderFooter?: (photo: Photo, index: number) => ReactNode;
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

  const measuredRef = useCallback((node: HTMLDivElement) => {
    let observer: ResizeObserver | null = null;

    if (node !== null) {
      setContainerWidth(Math.floor(node.getBoundingClientRect().height));

      observer = new ResizeObserver((entries) => {
        const newWidth = entries[0].contentRect.width;
        if (containerWidth !== newWidth) {
          window.requestAnimationFrame(() => {
            setContainerWidth(Math.floor(newWidth));
          });
        }
      });
      observer.observe(node);
    }
  }, []);

  columns = columns || defaultColumnsProvider;

  if (typeof columns === "function") {
    columns = columns(containerWidth);
  }

  spacing = spacing || defaultSpacingProvider;
  if (typeof spacing === "function") {
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
    <div className="react-column-gallery">
      <div
        ref={measuredRef}
        style={{
          position: "relative",
          height: containerHeight,
        }}
      >
        {photosPositioned.map((p, index) => (
          <div
            key={p.key}
            className="photo-wrapper"
            style={{
              position: "absolute",
              left: p.left,
              top: p.top,
              width: p.width,
              height: p.height,
            }}
          >
            {renderPhoto ? (
              renderPhoto(p, index)
            ) : (
              <div className="photo-card">
                <img
                  src={p.src}
                  alt={p.alt}
                  loading={p.loading}
                  width={p.width}
                  height={p.height}
                  style={{ verticalAlign: 'bottom'}}
                />
                {renderFooter && renderFooter(p, index)}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Gallery;
