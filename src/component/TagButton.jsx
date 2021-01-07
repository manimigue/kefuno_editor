import React from 'react'
import '../sass/button/tagButton.scss'

const TagButton = (props) => {
  return (
    <button {...props} className={'tagButton ' + props.className}/>
  )
}

export default TagButton
