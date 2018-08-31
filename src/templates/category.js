import React from 'react';
import Helmet from 'react-helmet';
import config from '../../data/SiteConfig';
import PostListing from '../Posts/PostListing/PostListing';

export default class CategoryTemplate extends React.Component {
  render() {
    console.log(this);
    const category = this.props.pathContext.id;
    const postEdges = this.props.data.allWordpressPost.edges;
    return (
      <div className="tag-container">
        <Helmet title={`Posts tagged as "${category}" | ${config.siteTitle}`} />
        <div>
          <h1>Category: {category}</h1>
          <PostListing postEdges={postEdges} />
        </div>
      </div>
    );
  }
}

/* eslint no-undef: "off" */
export const pageQuery = graphql`
  query category($id: String) {
    allWordpressPost(filter: { categories: { name: { eq: $id } } }) {
      edges {
        node {
          author {
            name
            avatar_urls {
              wordpress_24
              wordpress_48
              wordpress_96
            }
          }
          date
          slug
          title
          modified
          excerpt
          id
          categories {
            name
          }
          content
        }
      }
    }
  }
`;
