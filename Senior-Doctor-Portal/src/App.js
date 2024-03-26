import './App.css'
import MainDash from './components/MainDash/MainDash';
import PageContent from './components/PageContent/PageContent';
import RightSide from './components/RigtSide/RightSide';
import Sidebar from './components/Sidebar';

function App() {
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

export default App;
