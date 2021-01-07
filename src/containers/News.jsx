import React , { Component } from 'react';

import log from '../news/log.json';
import tags from '../news/tag.json';
import Articles from './Articles'

import '../sass/main/news.scss';

class News extends Component {
  componentDidMount() {
    window.scrollTo(0, 0)
  }

  render() {
    const logReverse = log.slice(0).reverse()
    return (
      <Articles title='News' log={logReverse} type='news' range={5} tags={tags}/>
    );
  }
}



export default News;
