import SideBar from "../components/SideBar";
import Spectrogram from "../components/Spectrogram";
import TaggingMenu from "../components/TaggingMenu"
import React from "react";


function MusicTagging(isHome) {
    
    return (
      <div>
        <SideBar/>
        <div className="h-screen w-screen flex flex-col lg:flex-row mtag-bg">
          
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

export default MusicTagging;
