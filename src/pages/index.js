import React from 'react';
import Helmet from 'react-helmet';
import styled from 'styled-components';
import config from '../../data/SiteConfig';
import PostListing from '../Posts/PostListing/PostListing'
import SEO from '../components/SEO/SEO'
// import TopNavigation from '../components/Layout/Navigation/Navigation'

class Index extends React.Component {
  render() {
    console.log(this.props.data);
    const postEdges = this.props.data.allWordpressPost.edges;
    return (
      <div>
        <Helmet title={config.siteTitle} />
        <SEO postEdges={postEdges} />
        <div>
          Hola Gatsby + WordPress.org
          <PostListing postEdges={postEdges} />
        </div>
      </div>
    );
  }
}

export default Index;

// TODO:
// featured_media {
//   source_url
// }

export const pageQuery = graphql`
  query IndexQuery {
    allWordpressPost {
      edges {
        node {
          date
          slug
          title
          modified
          excerpt
          id
          author {
            name
          }
          categories {
            name
          }
          content
        }
      }
    }
  }
`;
