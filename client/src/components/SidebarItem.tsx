import type { ReactElement } from "react";

function SidebarItem({ text, icon }: { text: string; icon: ReactElement }) {
  return (
    <div className="flex text-gray-700 py-2 mb-3 cursor-pointer hover:bg-gray-100 rounded max-w-48 transition-all duration-150">
      <div className="pr-2">{icon}</div>
      <div>{text}</div>
    </div>
  );
}

export default SidebarItem;
