const _ = require(`lodash`);
const Promise = require(`bluebird`);
const path = require(`path`);
const slash = require(`slash`);
const webpackLodashPlugin = require('lodash-webpack-plugin');

// const { DEPLOY_ENV } = process.env;

/**
 * Generate node edges
 *
 * @param {any} { node, boundActionCreators, getNode }
 */
exports.onCreateNode = ({ node, boundActionCreators }) => {
  if (!Object.prototype.hasOwnProperty.call(node, 'meta')) {
    return;
  }
};

// Will create pages for Wordpress pages (route : /{slug})
// Will create pages for Wordpress posts (route : /{slug})

exports.createPages = ({ graphql, boundActionCreators }) => {
  const { createPage } = boundActionCreators;
  return new Promise((resolve, reject) => {
    // First, query all the pages on your WordPress
    graphql(
      `
        {
          allWordpressPage {
            edges {
              node {
                id
                slug
                status
                template
              }
            }
          }
        }
      `,
    )
      .then(result => {
        if (result.errors) {
          console.log(result.errors);
          reject(result.errors);
        }
        // Create those pages with the wp_page.jsx template.
        const pageTemplate = path.resolve(`./src/templates/wp_page.js`);
        _.each(result.data.allWordpressPage.edges, edge => {
          createPage({
            path: `/${edge.node.slug}/`,
            component: slash(pageTemplate),
            context: {
              id: edge.node.id,
            },
          });
        });
      })
      // Create Custom Post Type pages.
      // allWordpressWp{CustomPostTypeName}
      // Example: "Project" => allWordpressWpProject
      // You must create a template .js file for the pageTemplate variable.
      // Also, you must to adapt the GraphQL Query inside the template.
      .then(() => {
        graphql(
          `
            {
              allWordpressWpProject {
                edges {
                  node {
                    id
                    slug
                    status
                    template
                  }
                }
              }
            }
          `,
        ).then(result => {
          if (result.errors) {
            console.log(result.errors);
            reject(result.errors);
          }
          // Create those pages with the wp_project.js template.
          const pageTemplate = path.resolve(`./src/templates/wp_project.js`);
          _.each(result.data.allWordpressWpProject.edges, edge => {
            createPage({
              path: `/${edge.node.slug}/`,
              component: slash(pageTemplate),
              context: {
                id: edge.node.id,
              },
            });
          });
        });
      })
      // Now, querying all wordpressPosts
      .then(() => {
        graphql(
          `
            {
              allWordpressPost {
                edges {
                  node {
                    id
                    slug
                    modified
                    categories {
                      name
                    }
                  }
                }
              }
            }
          `,
        ).then(result => {
          if (result.errors) {
            console.log(result.errors);
            reject(result.errors);
          }

          const categories = [];
          const postTemplate = path.resolve(`./src/templates/blog-post.js`);
          // We want to create a detailed page for each
          // post node. We'll just use the Wordpress Slug for the slug.
          // The Post ID is prefixed with 'POST_'

          _.each(result.data.allWordpressPost.edges, edge => {
            // grab all the tags and categories for later use
            edge.node.categories.forEach(category => {
              categories.push(category.name);
            });

            createPage({
              path: `/${edge.node.slug}`,
              component: slash(postTemplate),
              context: {
                id: edge.node.id,
              },
            });
          });
          // ==== END POSTS ====

          // Create pages for each unique category

          const categoriesTemplate = path.resolve(
            `./src/templates/category.js`,
          );

          const catSet = new Set(categories);

          catSet.forEach(cat => {
            createPage({
              path: `/category/${_.kebabCase(cat)}/`,
              component: slash(categoriesTemplate),
              context: {
                id: cat,
              },
            });
          });
          resolve();
        });
      });
    // === END TAGS ===
    resolve();
  });
};

exports.modifyWebpackConfig = ({ config, stage }) => {
  if (stage === 'build-javascript') {
    config.plugin('Lodash', webpackLodashPlugin, null);
  }
};
