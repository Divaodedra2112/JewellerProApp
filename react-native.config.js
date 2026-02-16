module.exports = {
  project: {
    ios: {
      sourceDir: './ios',
      automaticPodsInstallation: true,
    },
    android: {
      sourceDir: './android',
      appName: 'app',
    },
  },
  assets: ['./src/assets/fonts'],
  dependencies: {},
};
