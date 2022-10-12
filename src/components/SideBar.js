import { BsPersonFill } from "react-icons/bs";
import { FaLinkedinIn } from "react-icons/fa";
import { AiFillTags } from "react-icons/ai";
import { GiDrumKit } from "react-icons/gi";
import { FaHome } from "react-icons/fa";
import { GiDoubled } from "react-icons/gi";
import { MdRecordVoiceOver } from "react-icons/md";

const SideBar = () => {
  return (
    <div className="fixed top-0 m-0 mb-100 pt-5 h-screen z-30 w-24 flex flex-col text-white bg-white shadow-xl hover:w-64 hover:bg-opacity-100 transition-all duration-200 ease-in-out group bg-opacity-60">
      <SideBarIcon icon={<FaHome size="24" />} text="Home" link="." />
      <div className="sidebar-separator"></div>
      <SideBarIcon icon={<AiFillTags size="24" />} text="Music auto tagging" />
      <SideBarIcon
        icon={<GiDrumKit size="24" />}
        text="Generate drum samples"
      />
      <SideBarIcon icon={<GiDoubled size="24" />} text="Voice Cloning" />
      <SideBarIcon
        icon={<MdRecordVoiceOver size="24" />}
        text="Vocal segmentation"
      />
      <div className="sidebar-separator"></div>
      <SideBarIcon
        icon={<BsPersonFill size="24" />}
        text="Check out my website!"
        link="https://www.julienguinot.com"
      />
      <SideBarIcon
        icon={<FaLinkedinIn size="24" />}
        text="My linkedin"
        link="https://linkedin.com/in/julien-guinot"
      />
      <div className="sidebar-separator"></div>
      <a className="link-to-content" href="mailto:jul.guinot@gmail.com">
        jul.guinot@gmail.com
      </a>
      <a className="link-to-content" href="https://github.com/Pliploop">
        My github
      </a>
    </div>
  );
};

const SideBarIcon = ({ icon, text = "tooltip ", link = null }) => (
  <a href={link}>
    <div className="sidebar-icon">
      {icon}

      <span className="sidebar-tooltip group-hover:scale-100">{text}</span>
    </div>
  </a>
);

export default SideBar;
