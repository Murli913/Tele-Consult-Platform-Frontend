import React, { useEffect } from 'react'
// import AppRoutes from '../Routes/AppRoutes'
import AppRoutes from '../Routes/AppRoutes'
import { useNavigate } from 'react-router-dom';
const PageContent = () => {
  const navigate = useNavigate();
  useEffect(() => {
    if (!localStorage.getItem("token")) {
      navigate("/");
    } 
},[]);

  return (
    <div>
        <AppRoutes/>
    </div>
  )
}

export default PageContent