import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, NavLink, useNavigate, useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { IRootState, useAppSelector } from '@/store';
import {
    toggleRTL,
    toggleSidebar,
    toggleTheme,
} from '@/store/themeConfigSlice';

import profile from '@/assets/images/background/widgets/second.png';

import { storage } from '@/utils';
import toast from 'react-hot-toast';
import IconBellBing from '@/components/Icon/IconBellBing';
import IconCaretDown from '@/components/Icon/IconCaretDown';
import IconLaptop from '@/components/Icon/IconLaptop';
import IconLogout from '@/components/Icon/IconLogout';
import IconMenu from '@/components/Icon/IconMenu';
import IconMoon from '@/components/Icon/IconMoon';
import IconSearch from '@/components/Icon/IconSearch';
import IconSun from '@/components/Icon/IconSun';
import IconUser from '@/components/Icon/IconUser';
import IconXCircle from '@/components/Icon/IconXCircle';
import IconMenuApps from '@/components/Icon/Menu/IconMenuApps';
import IconMenuComponents from '@/components/Icon/Menu/IconMenuComponents';
import IconMenuDashboard from '@/components/Icon/Menu/IconMenuDashboard';
import IconMenuDatatables from '@/components/Icon/Menu/IconMenuDatatables';
import IconMenuElements from '@/components/Icon/Menu/IconMenuElements';
import IconMenuForms from '@/components/Icon/Menu/IconMenuForms';
import IconMenuMore from '@/components/Icon/Menu/IconMenuMore';
import IconMenuPages from '@/components/Icon/Menu/IconMenuPages';
import Dropdown from '@/components/dropdown';

const Header = () => {
    const isRtl =
        useSelector((state: IRootState) => state.themeConfig.rtlClass) === 'rtl'
            ? true
            : false;

    const themeConfig = useSelector((state: IRootState) => state.themeConfig);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { productId } = useParams();
    const [search, setSearch] = useState(false);
    const [serial_number, setSerial_number] = useState('');
    

   
    const { t } = useTranslation();

    return (
        <header
            className={`z-40 ${
                themeConfig.semidark && themeConfig.menu === 'horizontal'
                    ? 'dark'
                    : ''
            }`}
        >
            <div className="shadow-sm">
                <div className="relative flex w-full items-center bg-white px-5 py-2.5 dark:bg-black">
                    <div className="horizontal-logo flex items-center justify-between ltr:mr-2 rtl:ml-2 lg:hidden">
                        <Link
                            to="/"
                            className="main-logo flex shrink-0 items-center"
                        >
                            <img
                                className="inline w-8 ltr:-ml-1 rtl:-mr-1"
                                src={profile}
                                alt="logo"
                            />
                        </Link>
                        <button
                            type="button"
                            className="collapse-icon flex flex-none rounded-full bg-white-light/40 p-2 hover:bg-white-light/90 hover:text-primary ltr:ml-2 rtl:mr-2 dark:bg-dark/40 dark:text-[#d0d2d6] dark:hover:bg-dark/60 dark:hover:text-primary lg:hidden"
                            onClick={() => {
                                dispatch(toggleSidebar());
                            }}
                        >
                            <IconMenu className="h-5 w-5" />
                        </button>
                    </div>

                    <div className="flex items-center space-x-1.5 ltr:ml-auto rtl:mr-auto rtl:space-x-reverse dark:text-[#d0d2d6] sm:flex-1 ltr:sm:ml-0 sm:rtl:mr-0 lg:space-x-2">
                        <div className="sm:ltr:mr-auto sm:rtl:ml-auto">
                            <form
                                className={`${
                                    search && '!block'
                                } absolute inset-x-0 top-1/2 z-10 mx-4 hidden -translate-y-1/2 sm:relative sm:top-0 sm:mx-0 sm:block sm:translate-y-0`}
                                
                            >
                                <div className="relative">
                                    <input
                                        type="text"
                                        className="peer form-input 
                                        bg-gray-100 placeholder:tracking-widest ltr:pl-9 ltr:pr-9 rtl:pl-9 rtl:pr-9 sm:bg-transparent ltr:sm:pr-4 rtl:sm:pl-4"
                                        placeholder="Search..."
                                        onChange={e =>
                                            setSerial_number(e.target.value)
                                        }
                                    />
                                    <button
                                        type="button"
                                        className="absolute inset-0 h-9 w-9 appearance-none peer-focus:text-primary ltr:right-auto rtl:left-auto"
                                    >
                                        <IconSearch className="mx-auto" />
                                    </button>
                                    <button
                                        type="button"
                                        className="absolute top-1/2 block -translate-y-1/2 hover:opacity-80 ltr:right-2 rtl:left-2 sm:hidden"
                                        onClick={() => setSearch(false)}
                                    >
                                        <IconXCircle />
                                    </button>
                                </div>
                            </form>
                            <button
                                type="button"
                                onClick={() => setSearch(!search)}
                                className="search_btn rounded-full bg-white-light/40 p-2 hover:bg-white-light/90 dark:bg-dark/40 dark:hover:bg-dark/60 sm:hidden"
                            >
                                <IconSearch className="mx-auto h-4.5 w-4.5 dark:text-[#d0d2d6]" />
                            </button>
                        </div>
                        <div>
                            {themeConfig.theme === 'light' ? (
                                <button
                                    className={`${
                                        themeConfig.theme === 'light' &&
                                        'flex items-center rounded-full bg-white-light/40 p-2 hover:bg-white-light/90 hover:text-primary dark:bg-dark/40 dark:hover:bg-dark/60'
                                    }`}
                                    onClick={() => {
                                        dispatch(toggleTheme('dark'));
                                    }}
                                >
                                    <IconSun />
                                </button>
                            ) : (
                                ''
                            )}
                            {themeConfig.theme === 'dark' && (
                                <button
                                    className={`${
                                        themeConfig.theme === 'dark' &&
                                        'flex items-center rounded-full bg-white-light/40 p-2 hover:bg-white-light/90 hover:text-primary dark:bg-dark/40 dark:hover:bg-dark/60'
                                    }`}
                                    onClick={() => {
                                        dispatch(toggleTheme('system'));
                                    }}
                                >
                                    <IconMoon />
                                </button>
                            )}
                            {themeConfig.theme === 'system' && (
                                <button
                                    className={`${
                                        themeConfig.theme === 'system' &&
                                        'flex items-center rounded-full bg-white-light/40 p-2 hover:bg-white-light/90 hover:text-primary dark:bg-dark/40 dark:hover:bg-dark/60'
                                    }`}
                                    onClick={() => {
                                        dispatch(toggleTheme('light'));
                                    }}
                                >
                                    <IconLaptop />
                                </button>
                            )}
                        </div>
                        {/* <div className="dropdown shrink-0">
                            <Link
                                to="/admin/notifications"
                                className="relative block rounded-full bg-white-light/40 p-2 hover:bg-white-light/90 hover:text-primary dark:bg-dark/40 dark:hover:bg-dark/60"
                            >
                                <span>
                                    <IconBellBing />
                                    <span className="absolute top-0 flex h-3 w-3 ltr:right-0 rtl:left-0">
                                        <span className="absolute -top-[3px] inline-flex h-full w-full animate-ping rounded-full bg-success/50 opacity-75 ltr:-left-[3px] rtl:-right-[3px]"></span>
                                        <span className="relative inline-flex h-[6px] w-[6px] rounded-full bg-success"></span>
                                    </span>
                                </span>
                            </Link>
                        </div> */}
                        <div className="dropdown flex shrink-0">
                            <Dropdown
                                offset={[0, 8]}
                                placement={`${
                                    isRtl ? 'bottom-start' : 'bottom-end'
                                }`}
                                btnClassName="relative group block"
                                button={
                                    <img
                                        className="h-9 w-9 rounded-full object-cover saturate-50 group-hover:saturate-100"
                                        src={profile}
                                        alt="userProfile"
                                    />
                                }
                            >
                                <ul className="w-[230px] !py-0 font-semibold text-dark dark:text-white-dark dark:text-white-light/90">
                                    <li>
                                        <div className="flex items-center px-4 py-4">
                                            <img
                                                className="h-10 w-10 rounded-md object-cover"
                                                src={profile}
                                                alt="userProfile"
                                            />
                                            <div className="truncate ltr:pl-4 rtl:pr-4">
                                                <h4 className="text-base">
                                                    ineza
                                                    <span className="rounded bg-success-light px-1 text-xs text-success ltr:ml-2 rtl:ml-2">
                                                        {' '}
                                                     manager
                                                    </span>
                                                </h4>
                                                <button
                                                    type="button"
                                                    className="text-black/60 hover:text-primary dark:text-dark-light/60 dark:hover:text-white"
                                                >
                                                 farm@gmail.com
                                                </button>
                                            </div>
                                        </div>
                                    </li>
                                    <li>
                                        <Link
                                            to={`profile`}
                                            className="dark:hover:text-white"
                                        >
                                            <IconUser className="h-4.5 w-4.5 shrink-0 ltr:mr-2 rtl:ml-2" />
                                            Profile
                                        </Link>
                                    </li>
                                    <li className="border-t border-white-light dark:border-white-light/10">
                                        <button >
                                            <Link
                                                to="/auth/boxed-signin"
                                                className="flex flex-row !py-3 text-danger "
                                            >
                                                <IconLogout className="h-4.5 w-4.5 shrink-0 rotate-90 ltr:mr-2 rtl:ml-2" />
                                                Sign Out
                                            </Link>
                                        </button>
                                    </li>
                                </ul>
                            </Dropdown>
                        </div>
                    </div>
                </div>

                {/* horizontal menu */}
            </div>
        </header>
    );
};

export default Header;
