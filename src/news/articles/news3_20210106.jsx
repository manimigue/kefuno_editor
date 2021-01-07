import React, { useState, useEffect } from 'react'
import MarkdownRender from "@nteract/markdown";
import path from "../markdown/Formの設定方法.md";
import replace_assets from '../../article/replace_assets';
import I0 from '../markdown/assets/register.png'
import I1 from '../markdown/assets/dashboard.png'
import I2 from '../markdown/assets/create_project.png'
import I3 from '../markdown/assets/add_form.png'
import I4 from '../markdown/assets/endpoint.png'
const paths = {
  'register.png' : I0,
  'dashboard.png' : I1,
  'create_project.png' : I2,
  'add_form.png' : I3,
  'endpoint.png' : I4
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
