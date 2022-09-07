import SideBar from "./SideBar";
import Spectrogram from "./Spectrogram";
import React from "react";


class App extends React.Component {
  
  render () {
    return ( 
    <div>
      <SideBar />   
      <div id = 'spec'>
        <Spectrogram/>
      </div>
    </div>
  );};
}


export default App;
