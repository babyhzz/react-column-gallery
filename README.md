# React Column Gallery

- 响应式可定制的图片展示组件
- 保持图片宽高比
- 自定义底部内容
- SSR支持

## Preview

![效果图](https://github.com/babyhzz/react-column-gallery/blob/ed7320a49e826081eb2b1991320a73d7394210ed/images/react-column-gallery.gif)

## Installation

```
yarn add react-column-gallery	
or
npm install react-column-gallery
```

## Minimal Setup Example

```js
const photos = [
  {
    src: 'http://example.com/example/img1.jpg',
    width: 4,
    height: 3
  },
  {
    src: 'http://example.com/example/img2.jpg',
    width: 1,
    height: 1
  }
];

<Gallery photos={photos} />;
```

## API Documentation

可以查看 `index.d.ts` 查看具体的定义

| 属性                  | 类型                                                         | 默认值    | 描述                                                         |
| :-------------------- | :----------------------------------------------------------- | :-------- | :----------------------------------------------------------- |
| photos                | array                                                        | undefined | 一个Photo的数组，每一个项Photo的定义查看下面。               |
| columns               | number or function                                           | -         | 可选；列的数目或一个返回列数量的函数，参数为容器的宽度。若不设置，将使用内部的断点进行列的自适应变化。 |
| spacing               | number or { horizontal: number, vertical: number } or function | -         | 可选的；用于设置横向和纵向的间距。                           |
| initialContainerWidth | number                                                       | 0         | 可选的；初始的容器宽度，用于SSR。                            |
| renderPhoto           | function                                                     | undefined | 可选的；用于自定义图片渲染。                                 |
| footerHeight          | number                                                       | 0         | 可选的；图片底部内容高度，用于增加图片渲染额外信息。         |
| renderFooter          | function                                                     | undefined | 可选的；用于渲染底部内容。                                   |

### Photo每一项属性定义

| 属性    | 类型              | 默认值    | 描述                                                         |
| :------ | :---------------- | :-------- | :----------------------------------------------------------- |
| key     | string or number  | src       | 可选；组件中使用，确保列表内唯一。                           |
| src     | string            | undefined | 必传；图像地址。                                             |
| width   | number            | undefined | 必传;；图像的宽度（用于计算宽高比，可以不是真实值，但宽高比必须和原图一致）。 |
| height  | number            | undefined | 必传；图像的高度（用于计算宽高比，可以不是真实值，但宽高比必须和原图一致）。 |
| alt     | string            | undefined | 可选；图像的alt文本。                                        |
| loading | "lazy" or "eager" | "eager"   | 可选；用于设置 img 的loading 属性。                          |

