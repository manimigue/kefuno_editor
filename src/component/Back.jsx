import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom'

const Back = ({ type, delHome, selectHome, children }) => {
  const home = useSelector(selectHome)
  const dispatch = useDispatch()
  let history = useHistory();

  useEffect(() => {
    return () => dispatch(delHome()) 
  })

  const goBack = (home) => {
    history.push('/')
  }

  return (
    <button className='back-button' onClick={()=>goBack(home)}>{children}</button>
  );
}

export default Back;
