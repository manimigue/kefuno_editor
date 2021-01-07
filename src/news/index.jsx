import React from 'react';

import routes from '../article';
import components from './component'
import { delHome, selectHome } from '../store/news'

const NewsRoutes = () => {
  const routeList = routes(components, 'news', delHome, selectHome)
  return (
    <React.Fragment>
      {routeList}
    </React.Fragment>
  )
}

export default NewsRoutes
