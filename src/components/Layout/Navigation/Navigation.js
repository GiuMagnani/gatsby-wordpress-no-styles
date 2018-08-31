import React, { Component } from 'react'
import Link from 'gatsby-link'
import styled from 'styled-components'
import { siteTitle } from '../../../../data/SiteConfig'

class TopNavigation extends Component {
  render() {
    return (
      <NavigationContainer>
        <div>
          <Link to="/">
            LOGO
          </Link>
          <Link to="/">
            <h3>{siteTitle}</h3>
          </Link>
        </div>
        <div>
          <li>
            <a href="#">A link...</a>
          </li>
        </div>
      </NavigationContainer>
    )
  }
}

const NavigationContainer = styled.div`
  width: 100%;
  margin: auto;
  padding: 10px 100px;
  background: #f2f2f2;
`

export default TopNavigation
