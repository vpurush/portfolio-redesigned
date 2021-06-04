const path = require("path");

module.exports.createPages = ({ actions }) => {
  const { createPage } = actions;

  const mhCharacterMapTemplate = path.resolve(
    `src/templates/mh-character-map.tsx`
  );
  createPage({
    path: `mahabharat-character-map`,
    component: mhCharacterMapTemplate,
    context: {
      data: {
        abc: "def",
      },
    },
  });
};
