import React from 'react';
import Link from 'gatsby-link';

class Template extends React.Component {
  render() {
    const { location, children } = this.props;
    let header;
    if (location.pathname === '/') {
      header = (
        <h1>
          <Link to={'/'}>Blog</Link>
        </h1>
      );
    } else {
      header = (
        <h3>
          <Link to={'/'}>Blog</Link>
        </h3>
      );
    }
    return (
      <div>
        {header}
        {children()}
      </div>
    );
  }
}

export default Template;
