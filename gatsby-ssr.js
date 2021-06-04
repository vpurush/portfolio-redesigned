const React = require("react");

module.exports.onPreRenderHTML = function ({
  getHeadComponents,
  replaceHeadComponents,
}) {
  const headComponents = getHeadComponents();
  headComponents.push(
    <link rel="preconnect" href="https://fonts.gstatic.com"></link>
  );
  headComponents.push(
    <link
      href="https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,100;0,400;0,700;1,100;1,400&display=swap"
      rel="stylesheet"
    ></link>
  );
  replaceHeadComponents(headComponents);
};
