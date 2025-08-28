import DocumentIcon from "../icons/DocumentIcon";
import LogoIcon from "../icons/LogoIcon";
import TwitterIcon from "../icons/TwitterIcon";
import YoutubeIcon from "../icons/YoutubeIcon";
import SidebarItem from "./SidebarItem";

function Sidebar() {
  return (
    <div className="h-screen bg-white border-r border-gray-200 w-72 fixed left-0 top-0 pl-6 flex flex-col">
      <div className="flex text-2xl pt-8 items-center cursor-pointer">
        <div className="pr-2 text-purple-600">
          <LogoIcon />
        </div>
        OpenBrain
      </div>
      <div className="pt-8 pl-4 cursor-pointer">
        <SidebarItem text="Twitter" icon={<TwitterIcon />} />
        <SidebarItem text="Youtube" icon={<YoutubeIcon />} />
        <SidebarItem text="Article" icon={<DocumentIcon size="6" />} />
      </div>
    </div>
  );
}

export default Sidebar;
