module.exports = function (api) {
  api.cache(true);

  const presets = [
    [
      '@babel/preset-env',
      {
        targets: { chrome: '87' },
      },
    ],
  ];
  const plugins = [];

  return {
    presets,
    plugins,
  };
};
