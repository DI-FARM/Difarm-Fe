import PerfectScrollbar from 'react-perfect-scrollbar';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';

import AnimateHeight from 'react-animate-height';

import { useState, useEffect } from 'react';

import logo from '@/assets/logo/logo_small.png';
import {
    BellIcon,
    ChartBarIcon,
    ChartBarSquareIcon,
    Cog6ToothIcon,
    HomeIcon,
    QuestionMarkCircleIcon,
    ShoppingCartIcon,
    UsersIcon,
} from '@heroicons/react/24/outline';

import {
    FaCodeBranch,
    FaHome,
    FaHouseUser,
    FaLocationArrow,
    FaSearchLocation,
    FaSellcast,
    FaSellsy,
    FaUsers,
} from 'react-icons/fa';
import { IRootState } from '@/store';
import { toggleSidebar } from '@/store/themeConfigSlice';
import IconCaretsDown from '@/components/Icon/IconCaretsDown';
import IconCaretDown from '@/components/Icon/IconCaretDown';

const Sidebar = () => {
    const [currentMenu, setCurrentMenu] = useState<string>('');
    const themeConfig = useSelector((state: IRootState) => state.themeConfig);
    const semidark = useSelector(
        (state: IRootState) => state.themeConfig.semidark
    );
    const location = useLocation();
    const dispatch = useDispatch();
    const toggleMenu = (value: string) => {
        setCurrentMenu(oldValue => {
            return oldValue === value ? '' : value;
        });
    };

    console.log(location.pathname);

    const navigation = [
        {
            name: 'Dashboard',
            to: '/admin',
            icon: FaHome,
            current: location.pathname === '/admin',
        },
        {
            name: 'Cattle',
            to: '/admin/users',
            icon: FaUsers,
            current: location.pathname === '/admin/users',
        },
        {
            name: 'Calender',
            to: '/admin/clients',
            icon: FaHouseUser,
            current: location.pathname === '/admin/clients',
        },
        {
            name: 'Finacial',
            to: '/admin/branches',
            icon: FaCodeBranch,
            current: location.pathname === '/admin/branches',
        },
        {
            name: 'Reports',
            to: '/admin/reports',
            icon: FaSearchLocation,
            current: location.pathname === '/admin/reports',
        },
    ];

    useEffect(() => {
        if (window.innerWidth < 1024 && themeConfig.sidebar) {
            dispatch(toggleSidebar());
        }
    }, [location]);

    return (
        <div className={'dark'}>
            <nav
                className={`sidebar capitalize fixed min-h-screen h-full top-0 bottom-0 w-[260px] shadow-[5px_0_25px_0_rgba(94,92,154,0.1)] z-50 transition-all duration-300`}
            >
                <div className="bg-white dark:bg-green-900 h-full">
                    <div className="flex justify-between items-center px-4 py-3">
                        <div className="w-full  flex   flex-col  items-center justify-center">
                            <div className="flex flex-col items-center justify-center">
                                <p className="text-lg font-extrabold text-primary">
                                    <span className="text-3xl text-white">
                                        Farm
                                    </span>
                                    Maanager
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
                        <ul className="relative  space-y-0.5 p-4 py-0">
                            <li className="nav-item">
                                <ul>
                                    {navigation.map((item, index) => (
                                        <li key={index} className="nav-item">
                                            <Link
                                                to={item.to}
                                                className={`group ${
                                                    item.current
                                                        ? 'active text-white'
                                                        : ' '
                                                }`}
                                            >
                                                <div className="flex items-center">
                                                    <item.icon className="group-hover:!text-white  shrink-0" />
                                                    <span className="ltr:pl-3 rtl:pr-3 text-black dark:text-white/80 dark:group-hover:text-white">
                                                        {item.name}
                                                    </span>
                                                </div>
                                            </Link>
                                        </li>
                                    ))}

                                    
                                    <li className="nav-item">
                                        <Link
                                            to="/admin/profile"
                                            className={`group ${
                                                location.pathname ===
                                                '/dashboard/profile'
                                                    ? 'active text-white'
                                                    : ' '
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
    }[];
    name: string;
    Icon: React.ForwardRefExoticComponent<
        Omit<React.SVGProps<SVGSVGElement>, 'ref'> & {
            title?: string | undefined;
            titleId?: string | undefined;
        } & React.RefAttributes<SVGSVGElement>
    >;
};

function ItemDropDown(
    currentMenu: string,
    toggleMenu: (value: string) => void,
    item: DropDownProps
) {
    return (
        <li className="menu nav-item">
            <button
                type="button"
                className={`${
                    currentMenu === item.name ? '' : ''
                } nav-link group w-full`}
                onClick={() => toggleMenu(item.name)}
            >
                <div className="flex items-center">
                    <item.Icon className="group-hover:!text-white shrink-0" />
                    <span className="ltr:pl-3 rtl:pr-3 text-black dark:text-white/80 dark:group-hover:text-white">
                        Products{' '}
                    </span>
                </div>

                <div
                    className={
                        currentMenu !== item.name
                            ? 'rtl:rotate-90 -rotate-90'
                            : ''
                    }
                >
                    <IconCaretDown />
                </div>
            </button>

            <AnimateHeight
                duration={300}
                height={currentMenu === item.name ? 'auto' : 0}
            >
                <ul className="sub-menu text-white/80">
                    {item.items.map((item, index) => (
                        <li key={index}>
                            <Link to={item.to}>{item.name}</Link>
                        </li>
                    ))}
                </ul>
            </AnimateHeight>
        </li>
    );
}
