module.exports = {
  presets: [
    [
      '@babel/preset-env',
      {
        targets: { chrome: '51', firefox: '54' },
      },
    ],
  ],
};
