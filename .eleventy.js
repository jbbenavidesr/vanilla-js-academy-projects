const syntaxHighlight = require("@11ty/eleventy-plugin-syntaxhighlight");
const CleanCSS = require("clean-css");

module.exports = function (eleventyConfig) {
    eleventyConfig.addPlugin(syntaxHighlight);

    eleventyConfig.addFilter("cssmin", function (code) {
        return new CleanCSS({}).minify(code).styles;
    });

    // For the moment need some passthroughs to handle modules
    eleventyConfig.addPassthroughCopy({
        "src/_includes/js/jan2022": "js",
    });

    return {
        dir: {
            input: "src",
            output: "dist",
        },
    };
};
