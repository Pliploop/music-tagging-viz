import SideBar from "./SideBar";
import Spectrogram from "./Spectrogram";
import TaggingMenu from "./TaggingMenu"
import React from "react";

class App extends React.Component {
  
  render() {
    

    return (
      <div>
        <SideBar />
        <div className="h-screen w-screen flex flex-col lg:flex-row">
          
          <div id = "menu" className=" h-1/2 lg:ml-24 lg:w-[45%]">
            <TaggingMenu/>
          </div>
          <div id="spec" className="h-1/2 lg:grow mt-24 lg:mt-0">
            <Spectrogram id="spectrogram"/>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
