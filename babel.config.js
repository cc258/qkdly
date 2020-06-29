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
    ["@babel/preset-typescript"]
  ];
  const plugins = [
    [
      "@babel/plugin-proposal-decorators",
      {
        legacy: true
      }
    ],
    [
      "@babel/plugin-proposal-class-properties",
      {
        loose: true
      }
    ],
    "react-hot-loader/babel"
  ];

  return {
    presets,
    plugins
  };
};
