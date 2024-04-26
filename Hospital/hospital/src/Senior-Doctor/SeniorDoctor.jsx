

import { useNavigate } from 'react-router-dom';
import PageContent from './components/PageContent/PageContent';
import RightSide from './components/RigtSide/RightSide';
import Sidebar from './components/Sidebar/Sidebar';
import "./SeniorDoctor.css";
import { useEffect } from 'react';

function SeniorDoctor() {
  const navigate=useNavigate();
  useEffect(() => {
    if (!localStorage.getItem("token")) {
      navigate("/");
    } 
},[]);
  return (
    <div className="App">
      <div className="AppGlass">
        <Sidebar/>
        <PageContent/>
        <RightSide/>
      </div>
    </div>
  );
}

export default SeniorDoctor;
