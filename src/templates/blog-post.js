import React from 'react';
import Helmet from 'react-helmet';
import Link from 'gatsby-link';
import SEO from '../components/SEO/SEO';
import config from '../../data/SiteConfig';
import TopNavigation from '../components/Layout/Navigation/Navigation'

export default class PostTemplate extends React.Component {
  render() {
    const { slug } = this.props.pathContext;
    const postNode = this.props.data.wordpressPost;
    if (!postNode.id) {
      postNode.id = slug;
    }
    if (!postNode.category_id) {
      postNode.category_id = config.postDefaultCategoryID;
    }
    return (
      <div>
        <Helmet>
          <title>{`${postNode.title} | ${config.siteTitle}`}</title>
        </Helmet>
        <SEO postPath={slug} postNode={postNode} postSEO />
        <TopNavigation />
        <div>
          <h1>{postNode.title} </h1>
          <div>
            <div className="info">
              <h5>
                <Link
                  className="cat-link"
                  to={`category/${postNode.categories[0].name}`}
                >
                  {postNode.categories[0].name}{' '}
                </Link>
              </h5>
            </div>
          </div>

          <div dangerouslySetInnerHTML={{ __html: postNode.content }} />
          <div className="tags">
            <h4> More Like This: </h4>
          </div>
          <hr />
          <div className="post-meta">
          </div>
        </div>
      </div>
    );
  }
}
export const pageQuery = graphql`
  query PostById($id: String!) {
    wordpressPost(id: { eq: $id }) {
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
`;
