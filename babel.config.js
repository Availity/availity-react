module.exports = (api) => {
  api.cache(true);

  return {
    presets: [
      [
        'babel-preset-react-app',
        {
          absoluteRuntime: false,
          useESModules: false,
        },
      ],
      '@babel/preset-typescript',
    ],
  };
};
