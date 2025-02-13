/* eslint-disable no-unused-vars */
//import { useState } from 'react'

import { DashboardLayout } from "@toolpad/core/DashboardLayout";
import DrawerAppBar from "./Components/DrawerAppBar";
import DashboardLayoutBasic from "./Components/DashboardLayoutBasic";
import Dashboard from "./Components/Dashboard";
import Navbar from "./Components/NavBar";
import ElevateAppBar from "./Components/ElevateAppBar";

function App() {
  //const [count, setCount] = useState(0)

  return (
    <>
      <div>
        {/* <DrawerAppBar /> */}
        {/* <DashboardLayoutBasic /> */}

        {/* <ElevateAppBar /> */}

        <Dashboard />
      </div>
    </>
  );
}

export default App;
