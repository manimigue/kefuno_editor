import React from 'react';
import { Route } from 'react-router-dom';
import Back from '../component/Back'

import '../sass/main/article.scss'

const routes = (components, type, delHome, selectHome) => {
  return (
    components.map((article,i) => {
      const url = '/' + type + '/' + article.url;
      const component = () => (
        <div className="articleContent">
          <Back type={type} delHome={delHome} selectHome={selectHome}>&#8249; 戻る</Back>
          <article.component />
          <Back type={type} delHome={delHome} selectHome={selectHome}>&#8249; 戻る</Back>
        </div>
      )
      return (
        <Route exact path={url} component={component} key={i+'rout'}/>
      );
    })
  );
}

export default routes;
