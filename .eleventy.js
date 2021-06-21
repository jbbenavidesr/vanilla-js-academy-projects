const syntaxHighlight = require("@11ty/eleventy-plugin-syntaxhighlight");
const CleanCSS = require("clean-css");

module.exports = function (eleventyConfig) {
    eleventyConfig.addPlugin(syntaxHighlight);

    eleventyConfig.addCollection("orderedProjects", function (collection) {
        return collection.getFilteredByTag("projects").sort((a, b) => {
            return a.data.order - b.data.order;
        });
    });

    eleventyConfig.addFilter("cssmin", function(code) {
        return new CleanCSS({}).minify(code).styles;
      });

    return {
        dir: {
            input: "src",
            output: "dist",
        },
    };
};
