import React from 'react'
import { Link as RouterLink } from 'react-router-dom';

import '../sass/link/link.scss'

const Link = ({to, children, className}) => {
  return (
    <RouterLink to={to} 
      className={"link " + className}>
        {children}
      </RouterLink>
  )
}

export default Link
