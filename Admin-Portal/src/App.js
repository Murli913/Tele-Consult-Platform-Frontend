import React from 'react'
import AppHeader from './Components/AppHeader/AppHeader'
import SideMenu from './Components/SideMenu/SideMenu'
import AppFooter from './Components/AppFooter/AppFooter'
import PageContent from './Components/PageContent/PageContent'
import "./App.css";
const App = () => {
  return (
    <div className-="App">

    <AppHeader/>
    <div className="SideMenuAndPageContent">
        <SideMenu>

        </SideMenu>
        <PageContent>

        </PageContent>
      </div>
      <AppFooter />
    </div>
  )
}

export default App
