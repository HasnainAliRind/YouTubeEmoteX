import React from 'react'
import { setShadow, setSidebar } from '../../ReduxStore/ReduxSlice';
import { useDispatch , useSelector } from 'react-redux';

function Shadow() {
  let dispatch = useDispatch();
  return (
    <div className='Shadow' onClick={()=>{
      dispatch(setSidebar(false))
      dispatch(setShadow(false))
      
      
    }}>
      
    </div>
  )
}

export default Shadow
