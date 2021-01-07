import React from 'react'
import { Route } from 'react-router-dom'
import NewsRoutes from './news'
import Home from './containers/Home'


function App() {
  return (
    <React.Fragment>
      <Route exact path='/' component={Home} />
      <NewsRoutes />
    </React.Fragment>
  );
}

export default App;
