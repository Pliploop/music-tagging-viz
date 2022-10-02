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
          <div id="spec" className="h-1/2 w-full lg:ml-24 lg:w-[45%]">
            <Spectrogram />
          </div>
          <div id = "menu" className="lg:grow h-1/2">
            <TaggingMenu/>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
