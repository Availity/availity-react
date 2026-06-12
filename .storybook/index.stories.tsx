import React from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';

const HomePage = () => (
  <div>
    <h1>Availity-React Storybook</h1>
    <p>Demo of all components within the availity-react library.</p>
    <h2>Links</h2>
    <ul>
      <li><a href="https://github.com/Availity/availity-react">availity-react github</a></li>
      <li><a href="https://availity.github.io/availity-react">availity-react docs</a></li>
    </ul>
    <h2>Navigating the Storybook</h2>
    <p>Stories are grouped into the following sections:</p>
    <ul>
      <li><strong>Components</strong> — Active, supported components (Analytics, Authorize, Feature, Help, JsonViewer)</li>
      <li><strong>Hooks</strong> — Active, supported hooks</li>
      <li><strong>Deprecated</strong> — Packages that are no longer actively maintained. Migrate to <a href="https://availity.github.io/element">@availity/element</a>.</li>
    </ul>
  </div>
);

const meta: Meta<typeof HomePage> = {
  title: 'Home',
  component: HomePage,
  parameters: {
    previewTabs: { canvas: { hidden: true } },
    viewMode: 'docs',
  },
  tags: ['!autodocs'],
};

export default meta;

export const Docs: StoryObj<typeof HomePage> = {};
