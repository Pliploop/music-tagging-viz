import SideBar from "./SideBar";
import Spectrogram from "./Spectrogram";
import TaggingMenu from "./TaggingMenu"
import React, { useState } from "react";

function HomeSideBar (isHome) {
  
  if(isHome.home){return (<></>)} else {return(<SideBar/>)}
}

function App() {
    const [isHome,setHome] = useState(false)
    

    return (
      <div>
        <HomeSideBar home={isHome}/>
        <div className="h-screen w-screen flex flex-col lg:flex-row">
          
          <div id = "menu" className=" h-1/2 lg:ml-44 lg:w-[50%]">
            <TaggingMenu/>
          </div>
          <div id="spec" className="h-1/2 lg:grow mt-24 lg:mt-0">
            <Spectrogram id="spectrogram"/>
          </div>
        </div>
      </div>
    );
  
}

export default App;
