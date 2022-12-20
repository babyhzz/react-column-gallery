import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";

import Gallery from "..";
import { getAvatars, getPhotos } from "./data";

export default {
  title: "Example/Gallery",
  component: Gallery,
  argTypes: {
    backgroundColor: { control: "color" },
  },
} as ComponentMeta<typeof Gallery>;

const photos = getPhotos(40);
const avatars = getAvatars(40);

const Template: ComponentStory<typeof Gallery> = (args) => (
  <Gallery {...args} photos={photos} />
);

export const SimpleGallery = Template.bind({});
SimpleGallery.args = {};

export const WithFooterGallery = Template.bind({});
WithFooterGallery.args = {
  footerHeight: 32,
  renderFooter: (_, index) => (
    <div
      style={{
        height: 24,
        marginTop: 8,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
      }}
    >
      <img src={avatars[index]} style={{ borderRadius: "50%" }} />
      <span style={{ fontSize: 14, color: "#787878" }}>这是图片描述</span>
    </div>
  ),
};

export const FullCustomizeGallery = Template.bind({});
FullCustomizeGallery.args = {
  spacing: 18,
  footerHeight: 32,
  renderPhoto: (p, index) => (
    <div
      style={{
        width: "100%",
        height: "100%",
      }}
    >
      <img
        src={p.src}
        alt={p.alt}
        loading={p.loading}
        width={p.width}
        height={p.height}
        style={{ verticalAlign: "bottom", borderRadius: 12 }}
      />
      <div
        style={{
          height: 24,
          marginTop: 8,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <img src={avatars[index]} style={{ borderRadius: "50%" }} />
        <span style={{ fontSize: 14, color: "#787878" }}>这是图片描述</span>
      </div>
    </div>
  ),
};
