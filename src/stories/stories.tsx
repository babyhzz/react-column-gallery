import * as React from 'react';
import { storiesOf } from '@storybook/react';

import StaticGallery from './SimpleGallery';
import CustomizePhotoGallery from './CustomizePhotoGallery';

const stories = storiesOf('Components', module);

stories.add('StaticGallery', () => <StaticGallery />, {
  info: { inline: false },
});

stories.add('CustomizePhotoGallery', () => <CustomizePhotoGallery />, {
  info: { inline: false },
});
