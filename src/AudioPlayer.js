import React from "react";
import { BsPauseFill, BsPlayFill } from "react-icons/bs";

class AudioPlayer extends React.Component {
  componentDidMount() {
    this.play = false;
    this.audioplayer = document.getElementById("audioplayer");
    this.fileupload = document.getElementById("dropzone-file");
    this.timevalue = 0;
    this.timebar = document.getElementById("timebar");
    this.timebar.disabled = true;
    this.loaded = false;

    document.getElementById("duration").innerHTML = this.pretty_seconds(
      this.audioplayer.duration
    );
    document.getElementById("currenttime").innerHTML = this.pretty_seconds(
      this.audioplayer.currentTime
    );

    this.audioplayer.ontimeupdate = (event) => {
      document.getElementById("currenttime").innerHTML = this.pretty_seconds(
        this.audioplayer.currentTime
      );
      this.loaded
        ? (this.timevalue =
            Math.floor(
              (1000 * this.audioplayer.currentTime) / this.audioplayer.duration
            ) / 10)
        : (this.timevalue = 0);
      if (this.audioplayer.currentTime === 0 && this.timevalue !== 0) {
        this.timevalue = 0;
      }
      document.getElementById("timebar").value = this.timevalue;
      this.setBackgroundSize();
    };

    this.audioplayer.onloadedmetadata = (event) => {
      document.getElementById("duration").innerHTML = this.pretty_seconds(
        this.audioplayer.duration
      );
      this.timebar.disabled = false;
      this.loaded = true;
    };
  }

  str_pad_left = (string, pad, length) => {
    return (new Array(length + 1).join(pad) + string).slice(-length);
  };

  pretty_seconds = (time) => {
    time = Math.floor(time);
    var minutes = Math.floor(time / 60);
    var seconds = time % 60;
    var finalTime =
      this.str_pad_left(minutes, "0", 2) +
      ":" +
      this.str_pad_left(seconds, "0", 2);
    return finalTime;
  };

  getBackgroundSize = () => {
    const min = +this.timebar.min || 0;
    const max = +this.timebar.max || 100;
    const value = +this.timebar.value;

    const size = ((value - min) / (max - min)) * 100;
    return size;
  };

  setBackgroundSize = () => {
    this.timebar.style.setProperty(
      "--background-size",
      `${this.getBackgroundSize()}%`
    );
  };

  handlepause = () => {
    this.play = !this.play;
    if (this.play) {
      document.getElementById("audioplayer").play();
    } else {
      document.getElementById("audioplayer").pause();
    }
    this.forceUpdate();
  };

  render() {
    return (
      <>
        <audio controls id="audioplayer" className="w-full mt-6 hidden" />
        <div className="grow bg-gray-100 flex flex-col items-center align-middle justify-center mt-6">
          <div className="flex flex-col bg-white ease-linear duration-75 transition-all overflow-hidden w-full group items-center justify-center">
            <div className="relative p-4 inset-0 flex flex-col justify-end  text-black w-full ">
              <h3 className="font-bold hover:text-emerald-500" id="songtitle"> </h3>
            </div>
            <input
              type={"range"}
              id="timebar"
              defaultValue={0}
              step={0.1}
              className="appearance-none  w-[95%] h-1 bg-gray-100 slider-thumb transition-all ease-in duration-100"
              onChange={() => {
                this.timevalue = document.getElementById("timebar").value;
                this.audioplayer.currentTime =
                  (this.timevalue * this.audioplayer.duration) / 100;
                this.setBackgroundSize();
              }}
            />
            <div className="flex justify-between align-middle w-full text-xs font-semibold text-gray-500 px-3 py-4">
              <div>
                <p id="currenttime"></p>
              </div>
              <div className="flex">
                <button
                  className={
                    "rounded-full w-10 h-10 flex items-center justify-center  hover:bg-gray-100 active:bg-gray-200 active:text-emerald-500 active:scale-90 transition-all ease-in-out duration-[10ms]" +
                    (!this.play
                      ? "text-blue-500 shadow-md hover:shadow-lg"
                      : "shadow-none text-emerald-500")
                  }
                  onClick={() => this.handlepause()}
                >
                  {!this.play ? (
                    <BsPlayFill size={28}/>
                  ) : (
                    <BsPauseFill size={28} />
                  )}
                </button>
              </div>
              <div>
                <p id="duration"></p>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default AudioPlayer;
