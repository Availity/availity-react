import { render, screen } from '@testing-library/react';
import css from './AppTiles.module.scss';
import AppTiles from '.';

const parent = {
  images: {
    tile: '/path/to/image',
    name: 'alt text',
  },
};
const parentShortName = { shortName: 'SN' };

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

  test('should render parent image when no image is provided and only one parent exists, not in container', () => {
    const { container } = render(<AppTiles parents={[parent]} />);
    const tileContainer = container.querySelector(css.container);
    const images = container.querySelectorAll('img');
    const src = images[0].getAttribute('src');
    const alt = images[0].getAttribute('alt');
    expect(tileContainer).toBeFalsy();
    expect(images.length).toBe(1);
    expect(src).toBe(parent.images.tile);
    expect(alt).toBe(parent.images.name);
  });

  test('should render parent shortName when no image is provided and one parent exists without image', () => {
    render(<AppTiles parents={[parentShortName]} />);
    const text = screen.getByText(parentShortName.shortName);
    expect(text).toBeTruthy();
  });

  test('should render multiple parents in container', () => {
    const { container } = render(<AppTiles parents={[parent, parent]} />);
    const tileContainer = container.querySelector(`.${css.container}`);
    expect(tileContainer).toBeTruthy();
  });

  test('should render parent images and short names in container', () => {
    const { container } = render(<AppTiles parents={[parent, parentShortName]} />);
    const tileContainer = container.querySelector(`.${css.container}`);
    const images = container.querySelectorAll('img');
    const text = screen.getByText(parentShortName.shortName);
    expect(tileContainer).toBeTruthy();
    expect(images.length).toBe(1);
    expect(text).toBeTruthy();
  });

  test('should render 4 parent images inside container when no image is provided and 4+ parents exist', () => {
    const { container } = render(<AppTiles parents={[parent, parent, parent, parent, parent]} />);
    const tileContainer = container.querySelector(`.${css.container}`);
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
