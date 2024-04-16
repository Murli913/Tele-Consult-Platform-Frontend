

import PageContent from './components/PageContent/PageContent';
import RightSide from './components/RigtSide/RightSide';
import Sidebar from './components/Sidebar/Sidebar';
import "./SeniorDoctor.css";

function SeniorDoctor() {
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
