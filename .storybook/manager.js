import { addons } from '@storybook/addons';
import { create } from '@storybook/theming';
import { STORY_RENDERED } from '@storybook/core-events';

const githubLogo = 'https://avatars.githubusercontent.com/u/329985?s=100';

const logo = `<img aria-hidden src="${githubLogo}"/>`;

const theme = create({
  base: 'light',
  brandTitle: `${logo}<br />availity-react`,
  brandUrl: 'https://github.com/Availity/availity-react',
});

addons.setConfig({
  showPanel: true,
  panelPosition: 'bottom',
  theme,
  sidebar: {
    collapsedRoots: ['components', 'form-components', 'hooks', 'legacy-form-components', 'deprecated'],
  },
});

addons.register('TitleAddon', (api) => {
  const customTitle = 'Availity-React Storybook';
  let interval = null;
  const setTitle = () => {
    clearTimeout(interval);

    let storyData = null;
    try {
      storyData = api.getCurrentStoryData();
      // eslint-disable-next-line no-empty
    } catch {}

    let title;
    if (!storyData) {
      title = customTitle;
    } else if (storyData.name === 'Page' || storyData.name === 'default') {
      title = `${storyData.kind} ⋅ ${customTitle}`;
    } else {
      title = `${storyData.kind} - ${storyData.name} ⋅ ${customTitle}`;
    }

    if (document.title !== title) {
      document.title = title;
    }
    interval = setTimeout(setTitle, 100);
  };
  setTitle();
  api.on(STORY_RENDERED, () => {
    setTitle();
  });
});
