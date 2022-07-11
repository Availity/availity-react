import { render, screen } from '@testing-library/react';
import AppTiles from '.';

const parent = {
  images: {
    tile: '/path/to/image',
    name: 'alt text',
  },
};

describe('AppIcon', () => {
  test('should render', () => {
    const { container } = render(<AppTiles />);
    expect(container).toBeDefined();
  });

  test('should render image when provided', () => {
    const image = '/path/to/image';
    const { container } = render(<AppTiles image={image} />);
    const src = container.querySelectorAll('img')[0].getAttribute('src');
    expect(src).toBe(image);
  });

  test('should render parent image when no image is provided and only one parent exists, not in tile-container', () => {
    const { container } = render(<AppTiles parents={[parent]} />);
    const tileContainer = container.querySelector('.tile-container');
    const images = container.querySelectorAll('img');
    const src = images[0].getAttribute('src');
    const alt = images[0].getAttribute('alt');
    expect(tileContainer).toBeFalsy();
    expect(images.length).toBe(1);
    expect(src).toBe(parent.images.tile);
    expect(alt).toBe(parent.images.name);
  });

  test('should render multiple parents in tile-container', () => {
    const { container } = render(<AppTiles parents={[parent, parent]} />);
    const tileContainer = container.querySelector('.tile-container');
    expect(tileContainer).toBeTruthy();
  });

  test('should render 4 parent images inside tile-container when no image is provided and 4+ parents exist', () => {
    const { container } = render(<AppTiles parents={[parent, parent, parent, parent, parent]} />);
    const tileContainer = container.querySelector('.tile-container');
    const images = container.querySelectorAll('img');
    expect(tileContainer).toBeTruthy();
    expect(images.length).toBe(4);
  });

  test('should render shortName when no image or parents are provided', () => {
    render(<AppTiles shortName="SN" />);
    const text = screen.getByText('SN');
    expect(text).toBeTruthy();
  });
});
