import React, { Suspense, useState, useEffect } from "react";
import { BsGlobe } from "react-icons/bs";
import { RiLinkedinFill } from "react-icons/ri";
import { VscGithub } from "react-icons/vsc";
import { AiFillTags } from "react-icons/ai";
import { GiDrumKit } from "react-icons/gi";
import { GiDoubled } from "react-icons/gi";
import { MdRecordVoiceOver } from "react-icons/md";
import Canvas from "../components/Canvas";
import Spline from "@splinetool/react-spline";

function Home() {
  return (
    <div className="h-auto min-h-screen w-screen flex 2xl:flex-row flex-col content-evenly justify-evenly home-bg">
      <div className="flex flex-col h-full w-full 2xl:w-[55%] content-between md:p-20 p-6 md:pb-14">
        <div className="w-full  h-auto mb-14">
          <h1 className="homeheading bg-gradient-to-r from-sky-600 to-blue-400 bg-clip-text lg:text-[65px] text-[40px] text-transparent drop-shadow-sm">
            The Music Playground
          </h1>
          <span className="w-[80%] lg:text-lg text-md font-mono text-gray-800">
            Music is fun to play with, especially with machine learning. Try out
            various AI algorithms on your favorite audio clips and music!{" "}
          </span>
        </div>
        <div className="h-full grow content-evenly justify-evenly mb-10 sm:grid sm:grid-cols-2 flex flex-col sm:gap-12 gap-3  ">
          <PageLink
            link={"music-tagging"}
            icon={<AiFillTags size={20} />}
            text="Music tagging"
          />
          <PageLink
            link={"music-tagging"}
            icon={<GiDrumKit size={20} />}
            text="Drum sample generation"
            WIP={true}
          />
          <PageLink
            link={"music-tagging"}
            icon={<GiDoubled size={20} />}
            text="Voice cloning"
            WIP={true}
          />
          <PageLink
            link={"music-tagging"}
            icon={<MdRecordVoiceOver size={20} />}
            text="Vocal register detection"
            WIP={true}
          />
        </div>
        <div className="h-auto grow flex flex-row align-middle">
          <h2 className="homeabout bg-gradient-to-r from-sky-700 to-blue-500 bg-clip-text text-transparent">
            About
          </h2>
          <div className="h-[2px] w-full self-center ml-10 bg-gradient-to-r from-blue-500 to-sky-400 shadow-lg"></div>
        </div>
        <div className="flex flex-row mb-6">
          <span className="font-mono text-xs w-full pt-8 text-justify">
            This project was born out of my passion for music and music
            information retrieval - a field of Artificial intelligence which
            deals with musical audio - and my desire to learn more about web
            development.
            <br />
            <br />
            The goal was to challenge myself with building a full website from
            scratch, including design, front-end and back-end development while
            implementing state of the art machine learning models to build what
            essentially is an AI playground to have fun with music.
            <br />
            <br />
            <br />
            If you want to learn more about my other projects, you can check
            out:
          </span>
          {/* <div className="grow w-1/3">
          <Spline scene="https://prod.spline.design/zaPUC-L2q6DvYj05/scene.splinecode" />
          </div> */}
        </div>

        <div className="flex md:flex-row flex-col items-center justify-evenly py-1">
          <HomeLink
            icon={<BsGlobe size={20} />}
            link="https://www.julienguinot.com"
            text="My website"
          />
          <HomeLink
            icon={<RiLinkedinFill size={20} />}
            link="https://www.linkedin.com/in/julien-guinot"
            text="My Linkedin"
          />
          <HomeLink
            icon={<VscGithub size={20} />}
            link="https://www.github.com/Pliploop"
            text="My Github"
          />
        </div>
      </div>

      <div className="grow h-auto lg:px-20 md:visible invisible">
      <Spline scene="https://prod.spline.design/LCM5DGZIdXwyGffV/scene.splinecode"/>
      </div>
    </div>
  );
}

const HomeLink = ({ text, link, icon }) => {
  return (
    <a
      href={link}
      className="flex p-2 flex-row align-middle rounded-full group transition-all ease-linear hover:shadow-md duration-75 border-[1px]
    border-transparent hover:border-sky-300 hover:scale-[101%] hover:shadow-gray-400  hover: cursor-pointer hover-parent hover:bg-white hover:bg-opacity-10"
    >
      <div className="mr-3 text-sky-600 group-hover:text-sky-800 transition-all duration-100 rounded-full group-hover:shadow-md p-4 group-hover:bg-white group-hover:bg-opacity-10">
        {icon}
      </div>
      <span className="self-center font-mono text-sm hover-underline-animation group-hover:text-[#0087ca] mr-6">
        {text}
      </span>
    </a>
  );
};

const PageLink = ({ text, description = null, link, icon, WIP = false }) => {
  if (!WIP) {
    return (
      <a
        href={link}
        className="flex p-2 flex-row align-middle rounded-full group transition-transform ease-linear duration-75 active:scale-90 active:duration-[30ms]
    border-transparent border-black hover:border-sky-700 border-[1px] border-b-4 hover:scale-[101%]  hover: cursor-pointer hover-parent hover:bg-white hover:bg-opacity-10"
      >
        <div className="mr-3 text-black group-hover:text-sky-700 transition-all duration-100 rounded-full p-4 group-hover:bg-white group-hover:bg-opacity-10">
          {icon}
        </div>
        <span className="self-center font-mono text-sm hover-underline-animation group-hover:text-[#0087ca] mr-6">
          {text}
        </span>
        <span>{description}</span>
      </a>
    );
  } else {
    return (
      <div
        className="flex p-2 flex-row align-middle rounded-full group transition-transform ease-linear duration-75 active:scale-90 active:duration-[30ms]
    border-transparent border-gray-400 hover:border-gray-500 border-[1px] border-b-4 bg-gray-300 bg-opacity-25"
      >
        <div className="mr-3 text-gray-400 rounded-full p-4">{icon}</div>
        <span className="self-center font-mono text-sm mr-6 text-gray-400 cursor-default">
          {text}
        </span>
        <span>{description}</span>
      </div>
    );
  }
};

export default Home;
