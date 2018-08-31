import React, { Component } from 'react';

class wpPage extends Component {
  render() {
    const pageNode = {
      title: this.props.data.wordpressPage.title,
      content: this.props.data.wordpressPage.content,
      id: this.props.data.wordpressPage.id,
      slug: this.props.data.wordpressPage.slug,
    };

    return (
      <div>
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

export default wpPage;

/* eslint no-undef: "off" */
export const pageQuery = graphql`
  query WordpressPage($slug: String) {
    wordpressPage(slug: { eq: $slug }) {
      id
      wordpress_id
      slug
      title
      template
      content
    }
  }
`;
