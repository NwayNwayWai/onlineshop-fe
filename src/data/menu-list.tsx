import { Icons } from "@/components/ui/icons";
import { Image } from "@/components/ui/image";

export interface Menu {
  name: string;
  icon: JSX.Element;
  activeIcon?: JSX.Element;
  path: string;
  dropdown?: boolean;
  parent?: string;
}

export const menuList: Menu[] = [
  {
    name: "Dashboard",
    icon: <Icons.dashboard className="w-[28px] h-[28px]" />,
    activeIcon: <Icons.dashboard className="w-[28px] h-[28px]" />,

    path: "/dashboard",
  },
  {
    name: "Boy Faction",
    icon: <Icons.boy className="w-[28px] h-[28px]" />,
    activeIcon: <Icons.boy className="w-[28px] h-[28px]" />,
    path: "/boy-clothes",
  },
  {
    name: "Girl Faction",

    icon: <Icons.girl className="w-[28px] h-[28px]" />,
    activeIcon: <Icons.girl className="w-[28px] h-[28px]" />,
    path: "/girl-clothes",
  },

  {
    name: "Settings",
    icon: <Icons.setting className="w-[28px] h-[28px]" />,
    activeIcon: <Icons.setting className="w-[28px] h-[28px]" />,
    path: "/setting",
  },
];
