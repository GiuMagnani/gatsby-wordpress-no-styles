import React, { Component } from 'react';
import styled from 'styled-components';
// import TopNavigation from '../components/Layout/Navigation/Navigation'

class wpProject extends Component {
  render() {
    const pageNode = {
      title: this.props.data.wordpressWpProject.title,
      content: this.props.data.wordpressWpProject.content,
      id: this.props.data.wordpressWpProject.id,
      slug: this.props.data.wordpressWpProject.slug,
    };

    return (
      <div>
        {/*<TopNavigation />*/}
        <div>
          <h1>{pageNode.title}</h1>
          <main>
            <div dangerouslySetInnerHTML={{ __html: pageNode.content }} />
          </main>
        </div>
      </div>
    );
  }
}

export default wpProject;

/* eslint no-undef: "off" */
export const pageQuery = graphql`
  query WordpressProject($slug: String) {
    wordpressWpProject(slug: { eq: $slug }) {
      id
      wordpress_id
      slug
      title
      content
    }
  }
`;
