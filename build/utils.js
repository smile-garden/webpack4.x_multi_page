const isProd = process.env.NODE_ENV === "production";

// 生成entry配置
exports.generateEntryConfig = function(pages) {
  let entny = {};

  pages.forEach(page => {
    const name = page.name;
    entny[name] = `./src/pages/${name}/index.js`;
  });

  return entny;
}

// 生成Html模板配置
exports.generateHtmlConfig = function(page) {
  return {
    title: page.title,
    chunks: page.chunks,
    template: `./src/pages/${page.name}/index.html`,
    filename: `${page.name}.html`,
    inject: true,
    hash: true,
    minify: isProd ? {
      removeComments: true,
      collapseWhitespace: true,
      removeAttributeQuotes: true
    } : false
  };
}
