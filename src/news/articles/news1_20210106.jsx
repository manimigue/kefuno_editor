import React, { useState, useEffect } from 'react'
import MarkdownRender from "@nteract/markdown";
import path from "../markdown/記事更新.md";
import replace_assets from '../../article/replace_assets';
import I0 from '../markdown/assets/kefunoApp.zip'
import I1 from '../markdown/assets/typora_download.png'
import I2 from '../markdown/assets/typora_setting1.png'
import I3 from '../markdown/assets/assets2.png'
import I4 from '../markdown/assets/imgset4.png'
import I5 from '../markdown/assets/imgset3.png'
import I6 from '../markdown/assets/kefunoApp.png'
import I7 from '../markdown/assets/typoraex.png'
import I8 from '../markdown/assets/kefunoStyle.zip'
import I9 from '../markdown/assets/style.png'
import I10 from '../markdown/assets/upload1.png'
import I11 from '../markdown/assets/upload2.png'
const paths = {
  'kefunoApp.zip' : I0,
  'typora_download.png' : I1,
  'typora_setting1.png' : I2,
  'assets2.png' : I3,
  'imgset4.png' : I4,
  'imgset3.png' : I5,
  'kefunoApp.png' : I6,
  'typoraex.png' : I7,
  'kefunoStyle.zip' : I8,
  'style.png' : I9,
  'upload1.png' : I10,
  'upload2.png' : I11
}

const NewsArticle = () => {
  const [markdown, setMarkdown] = useState('loading...')

  useEffect(() => {

    fetch(path)
    .then(response => {
      return response.text()
    })
    .then(text => {    
      setMarkdown(replace_assets(text,paths))
    })
  })
  return (
    <MarkdownRender 
      className='article' 
      source={markdown} 
      escapeHtml={false}
    />
  )
}

export default NewsArticle
