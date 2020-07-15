module.exports = function (api) {
  api.cache(true);

  const presets = [
    [
      "@babel/preset-env",
      {
        targets: {
          node: "current",
          browsers: [
            "last 2 versions",
            "> 0.2%",
            "maintained node versions",
            "not dead"
          ]
        }
      }
    ],
    ["@babel/preset-react"],
  ];
  const plugins = [
  ];

  return {
    presets,
    plugins
  };
};
