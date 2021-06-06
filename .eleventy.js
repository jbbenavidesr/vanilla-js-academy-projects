const syntaxHighlight = require("@11ty/eleventy-plugin-syntaxhighlight");

module.exports = function (eleventyConfig) {
    eleventyConfig.addPlugin(syntaxHighlight);
    eleventyConfig.addPassthroughCopy("./src/css");
    eleventyConfig.addWatchTarget("./src/css");

    eleventyConfig.addCollection("orderedProjects", function (collection) {
        return collection.getFilteredByTag("projects").sort((a, b) => {
            return a.data.order - b.data.order;
        });
    });

    return {
        dir: {
            input: "src",
            output: "dist",
        },
    };
};
