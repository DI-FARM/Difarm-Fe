import PerfectScrollbar from "react-perfect-scrollbar";
import { isLoggedIn } from "@/hooks/api/auth";
import { IRootState } from "@/store";
import { toggleSidebar } from "@/store/themeConfigSlice";
import { Cog6ToothIcon } from "@heroicons/react/24/outline";
import { useState, useEffect } from "react";
import { FaAnchor, FaSwatchbook } from "react-icons/fa";
import { useSelector, useDispatch } from "react-redux";
import { useLocation, Link } from "react-router-dom";
import IconBolt from "../Icon/IconBolt";
import IconCaretsDown from "../Icon/IconCaretsDown";
import IconHelpCircle from "../Icon/IconHelpCircle";
import IconHome from "../Icon/IconHome";
import IconShoppingBag from "../Icon/IconShoppingBag";
import IconTrashLines from "../Icon/IconTrashLines";
import IconUsers from "../Icon/IconUsers";
import IconUsersGroup from "../Icon/IconUsersGroup";
import AnimateHeight from "react-animate-height";
import IconCaretDown from "../Icon/IconCaretDown";

const Sidebar = () => {
  const [currentMenu, setCurrentMenu] = useState<string>("");
  const themeConfig = useSelector((state: IRootState) => state.themeConfig);
  const location = useLocation();
  const dispatch = useDispatch();
  const user = isLoggedIn();

  const toggleMenu = (value: string) => {
    setCurrentMenu((oldValue) => (oldValue === value ? "" : value));
  };

  const navigation = [
    {
      name: "Dashboard",
      to: "/account",
      icon: IconHome,
      current: location.pathname === "/account",
      roles: ["SUPERADMIN", "ADMIN", "MANAGER"],
    },
    {
      name: "Users",
      to: "/account/users",
      icon: IconUsers,
      current: location.pathname === "/account/users",
      roles: ["SUPERADMIN"],
    },
    {
      name: "Farms",
      to: "/account/farms",
      icon: IconHome,
      current: location.pathname === "/account/farms",
      roles: ["SUPERADMIN", "ADMIN", "MANAGER"],
    },
    {
      name: "Cattle",
      to: "/account/cattle",
      icon: FaAnchor,
      current: location.pathname === "/account/cattle",
      roles: ["SUPERADMIN", "ADMIN", "MANAGER"],
    },
    {
      name: "Production",
      to: "",
      icon: FaSwatchbook,
      current: location.pathname.startsWith("/account/production"),
      roles: ["SUPERADMIN", "ADMIN", "MANAGER"],
      children: [
        {
          name: "Production Overview",
          to: "/account/production",
          current: location.pathname === "/account/production",
        },
        {
          name: "Production Totals",
          to: "/account/production_totals",
          current: location.pathname === "/account/production_totals",
        },
        {
          name: "Production Transactions",
          to: "/account/production_transactions",
          current: location.pathname === "/account/production_transactions",
        },
      ],
    },
    {
      name: "Waste Production",
      to: "/account/waste-logs",
      icon: IconTrashLines,
      current: location.pathname === "/account/waste-logs",
      roles: ["SUPERADMIN", "ADMIN", "MANAGER"],
    },
    {
      name: "Stock",
      to: "/account/stock",
      icon: IconShoppingBag,
      current: location.pathname === "/account/stock",
      roles: ["SUPERADMIN", "ADMIN", "MANAGER"],
    },
    {
      name: "Stock Transactions",
      to: "/account/stock_transactions",
      icon: IconShoppingBag,
      current: location.pathname === "/account/stock_transactions",
      roles: ["SUPERADMIN", "ADMIN", "MANAGER"],
    },
    {
      name: "Vaccination",
      to: "/account/vaccine",
      icon: IconHelpCircle,
      current: location.pathname === "/account/vaccine",
      roles: ["SUPERADMIN", "ADMIN", "MANAGER"],
    },
    {
      name: "Veterinarian",
      to: "/account/veterinarian",
      icon: IconUsersGroup,
      current: location.pathname === "/account/veterinarian",
      roles: ["SUPERADMIN", "ADMIN", "MANAGER"],
    },
    {
      name: "Inseminations",
      to: "/account/inseminations",
      icon: IconBolt,
      current: location.pathname === "/account/inseminations",
      roles: ["SUPERADMIN", "ADMIN", "MANAGER"],
    },
  ];

  return (
    <div className={"dark"}>
      <nav
        className={`sidebar capitalize fixed min-h-screen h-full top-0 bottom-0 w-[260px] shadow-[5px_0_25px_0_rgba(94,92,154,0.1)] z-50 transition-all duration-300`}
      >
        <div className="bg-white dark:bg-green-900 h-full">
          <div className="flex justify-between items-center px-4 py-3">
            <div className="w-full flex flex-col items-center justify-center">
              <div className="flex flex-col items-center justify-center">
                <p className="text-lg font-extrabold text-primary">
                  <span className="text-3xl text-white">DiFarm</span>
                </p>
              </div>
            </div>

            <button
              type="button"
              className="collapse-icon w-8 h-8 rounded-full flex items-center hover:bg-gray-500/10 dark:hover:bg-white/10 dark:text-white-light transition duration-300 rtl:rotate-180"
              onClick={() => dispatch(toggleSidebar())}
            >
              <IconCaretsDown className="m-auto rotate-90" />
            </button>
          </div>
          <div className="h-10"></div>
          <PerfectScrollbar className="h-[calc(100vh)] relative">
            <ul className="relative space-y-0.5 p-4 py-0">
              <li className="nav-item">
                <ul>
                  {navigation
                    .filter((item) => item.roles.includes(user.role))
                    .map((item, index) => (
                      <li key={index} className="nav-item">
                        {!item.children ? (
                          <Link
                            to={item.to}
                            className={`group ${
                              item.current ? "active text-white" : ""
                            }`}
                          >
                            <div className="flex items-center">
                              <item.icon className="group-hover:!text-white shrink-0" />
                              <span className="ltr:pl-3 rtl:pr-3 text-black dark:text-white/80 dark:group-hover:text-white">
                                {item.name}
                              </span>
                            </div>
                          </Link>
                        ) : (
                          <ItemDropDown
                            currentMenu={currentMenu}
                            toggleMenu={toggleMenu}
                            item={{
                              name: item.name,
                              items: item.children,
                              Icon: item.icon,
                            }}
                          />
                        )}
                      </li>
                    ))}

                  <li className="nav-item">
                    <Link
                      to="/account/profile"
                      className={`group ${
                        location.pathname === "/account/profile"
                          ? "active text-white"
                          : ""
                      }`}
                    >
                      <div className="flex items-center">
                        <Cog6ToothIcon className="group-hover:!text-white shrink-0" />
                        <span className="ltr:pl-3 rtl:pr-3 text-black dark:text-white/80 dark:group-hover:text-white">
                          Profile
                        </span>
                      </div>
                    </Link>
                  </li>
                </ul>
              </li>
            </ul>
          </PerfectScrollbar>
        </div>
      </nav>
    </div>
  );
};

export default Sidebar;

type DropDownProps = {
  items: {
    name: string;
    to: string;
    current: boolean;
  }[];
  name: string;
  Icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
};

type ItemDropDownProps = {
  currentMenu: string;
  toggleMenu: (value: string) => void;
  item: DropDownProps;
};

const ItemDropDown: React.FC<ItemDropDownProps> = ({
  currentMenu,
  toggleMenu,
  item,
}) => {
  return (
    <li className="menu nav-item">
      <button
        type="button"
        className={`nav-link group w-full ${
          currentMenu === item.name ? "" : ""
        }`}
        onClick={() => toggleMenu(item.name)}
      >
        <div className="flex items-center">
          <item.Icon className="group-hover:!text-white shrink-0" />
          <span className="ltr:pl-3 rtl:pr-3 text-black dark:text-white/80 dark:group-hover:text-white">
            {item.name}
          </span>
        </div>
        <div
          className={
            currentMenu !== item.name ? "rtl:rotate-90 -rotate-90" : ""
          }
        >
          <IconCaretDown className="text-white" />
        </div>
      </button>

      <AnimateHeight
        duration={300}
        height={currentMenu === item.name ? "auto" : 0}
      >
        <ul className=" px-2 ml-3">
          {item.items.map((subItem, index) => (
            <li
              key={index}
              className={`flex items-center ${
                subItem.current ? "font-bold " : ""
              }`}
            >
              <Link
                to={subItem.to}
                className={`!px-4 text-gray-300 block p-2  ${
                  subItem.current ? "text-white" : ""
                }`}
              >
                {subItem.name}
              </Link>
            </li>
          ))}
        </ul>
      </AnimateHeight>
    </li>
  );
};
