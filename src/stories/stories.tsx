import * as React from 'react';
import { storiesOf } from '@storybook/react';

import StaticGallery from './StaticGallery';

const stories = storiesOf('Components', module);

stories.add('StaticGallery', () => <StaticGallery />, {
  info: { inline: false },
});
