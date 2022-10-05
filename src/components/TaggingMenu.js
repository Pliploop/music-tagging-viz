import React from "react";
import { BsFillFileEarmarkMusicFill, BsFileMusic } from "react-icons/bs";
import { AiOutlineCloudUpload } from "react-icons/ai";
import AudioPlayer from "./AudioPlayer";

class TaggingMenu extends React.Component {
  componentDidMount() {
    document
      .getElementById("dropzone-file")
      .addEventListener("change", this.changeHandler);
    this.filehandler = document.getElementById("dropzone-file");
    this.fileloaded = false;

  }

  changeHandler = ({ target }) => {
    // Make sure we have files to use

    if (!target.files.length) return;

    // Create a blob that we can use as an src for our audio element
    const urlObj = URL.createObjectURL(target.files[0]);
    this.audio = document.getElementById("audioplayer");
    
    // Create an audio element

    this.audio.addEventListener("load", () => {
      URL.revokeObjectURL(urlObj);
    });
    this.audio.src = urlObj;
    this.fileloaded = this.filehandler.value !== "";
    var name = this.filehandler.value
      .split("\\")
      .pop();
    document.getElementById("filename").innerHTML = name
    document.getElementById("songtitle").innerHTML = name.split(".")[0]
    
    this.forceUpdate();
  };

  render() {
    return (
      <div className="flex flex-col align-top p-10 items-start text-left">
        <div className="flex flex-row group">
          <BsFillFileEarmarkMusicFill
            size={"36"}
            className="mr-5 text-emerald-500 group-hover:scale-[105%] transition-all ease-linear duration-75"
          />
          <span className=" bg-gradient-to-r from-emerald-500 to-sky-500 text-transparent bg-clip-text text-left font-extrabold text-3xl">
            Yo tag your shit
          </span>
        </div>
        <div className="w-full h-0.5 mt-5 bg-gradient-to-r from-emerald-500 to-sky-500 opacity-50"></div>
        <div id="upload_music" className="flex flex-col mt-5 w-full">
          <label
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300 mt-5"
            htmlFor="file_input"
          >
            Upload audio
          </label>
          <div className="flex justify-center items-center w-full">
            <label
              htmlFor="dropzone-file"
              className="flex flex-col justify-center items-center w-full h-26 bg-gray-50 rounded-lg border-2 border-gray-300 border-dashed cursor-pointer dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 active:bg-gray-200 group"
            >
              <div className="flex flex-col justify-center items-center pt-5 pb-6">
                {!this.fileloaded ? (
                  <AiOutlineCloudUpload
                    size={32}
                    className="mb-3 text-emerald-500 group-active:text-black transition-all duration-75"
                  />
                ) : (
                  <BsFileMusic
                    size={28}
                    className="mb-3 text-gray-400 group-active:text-black transition-all duration-75 group-hover:text-emerald-400"
                  />
                )}
                <p className="mb-2 text-sm text-gray-300" id="filename"></p>
                <p className="mb-2 text-md text-gray-500">
                  <span className="font-semibold">Click to upload</span> or drag and
                  drop
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  MP3 or WAV
                </p>
              </div>
              <input id="dropzone-file" type="file" className="hidden" />
            </label>
          </div>

          <AudioPlayer />
        </div>
      </div>
    );
  }
}

export default TaggingMenu;
