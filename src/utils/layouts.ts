import { ColumnsProvider, Photo, Spacing, SpacingProvider } from '..';

type PhotoPositioned = Photo & {
  left: number;
  top: number;
};

const round = (value: number, decimals?: number): number => {
  if (!decimals) decimals = 0;
  return Number(Math.round(Number(value + 'e' + decimals)) + 'e-' + decimals);
};

export const computeColumnLayout = (
  photos: Photo[],
  columns: number,
  containerWidth: number,
  spacing: Spacing
): { photosPositioned: PhotoPositioned[]; containerHeight: number } => {
  let horizontalGap = 0;
  let verticalGap = 0;

  if (typeof spacing === 'number') {
    horizontalGap = spacing;
    verticalGap = spacing;
  } else {
    horizontalGap = spacing.horizontal;
    verticalGap = spacing.vertical;
  }

  // calculate each colWidth based on total width and column amount
  const colWidth = (containerWidth - horizontalGap * (columns - 1)) / columns;

  // map through each photo to assign adjusted height and width based on colWidth
  const photosWithSizes = photos.map(photo => {
    const newHeight = (photo.height / photo.width) * colWidth;
    return {
      ...photo,
      width: round(colWidth, 1),
      height: round(newHeight, 1),
    };
  });

  // store all possible left positions
  // and current top positions for each column
  const colLeftPositions: number[] = [];
  const colCurrTopPositions: number[] = [];
  for (let i = 0; i < columns; i++) {
    colLeftPositions[i] = round(i * (colWidth + horizontalGap), 1);
    colCurrTopPositions[i] = 0;
  }

  let containerHeight = 0;
  // map through each photo, then reduce thru each "column"
  // find column with the smallest height and assign to photo's 'top'
  // update that column's height with this photo's height
  const photosPositioned: PhotoPositioned[] = photosWithSizes.map(photo => {
    const smallestCol = colCurrTopPositions.reduce((acc, item, i) => {
      acc = item < colCurrTopPositions[acc] ? i : acc;
      return acc;
    }, 0);

    const top = colCurrTopPositions[smallestCol];
    const left = colLeftPositions[smallestCol];

    colCurrTopPositions[smallestCol] =
      colCurrTopPositions[smallestCol] + photo.height + verticalGap;

    const tallestCol = colCurrTopPositions.reduce((acc, item, i) => {
      acc = item > colCurrTopPositions[acc] ? i : acc;
      return acc;
    }, 0);
    containerHeight = colCurrTopPositions[tallestCol];

    return { ...photo, left, top };
  });
  return { photosPositioned, containerHeight };
};

export const defaultColumnsProvider: ColumnsProvider = containerWidth => {
  if (containerWidth >= 1500) {
    return 4;
  } else if (containerWidth >= 900) {
    return 3;
  } else if (containerWidth > 500) {
    return 2;
  } else {
    return 1;
  }
};

export const defaultSpacingProvider: SpacingProvider = containerWidth => {
  if (containerWidth >= 1500) {
    return 24;
  } else if (containerWidth >= 900) {
    return 16;
  } else if (containerWidth > 500) {
    return 8;
  } else {
    return 4;
  }
};
