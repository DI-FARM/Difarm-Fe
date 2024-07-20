

const ProfilePage = () => {
    const user = isLoggedIn();
    return (
        <div className="">
          
            <main>
                <UserProfile user={user} />
            </main>
        </div>
    );
};

export default ProfilePage;

import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faUser,
    faEnvelope,
    faPhone,
    faCalendarAlt,
    faShieldAlt,
} from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import { isLoggedIn } from '@/hooks/api/auth';

const UserProfile = ({ user }: any) => {
    return (
        <div className="max-w-4xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
            <div className="panel">
                <div className="px-4 py-5 sm:px-6">
                    <h3 className="text-lg leading-6 font-medium text-gray-900 dark:text-gray-100">
                        User Profile
                    </h3>
                    <p className="mt-1 max-w-2xl text-sm text-gray-500 dark:text-gray-300">
                        Personal details 
                    </p>
                </div>
                <div className="border-t border-gray-200 dark:border-gray-700">
                    <dl>
                        <div className="bg-gray-50 dark:bg-gray-900 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                            <dt className="text-sm font-medium text-gray-500 dark:text-gray-300">
                                Username
                            </dt>
                            <dd className="mt-1 text-sm text-gray-900 dark:text-gray-100 sm:mt-0 sm:col-span-2 flex items-center">
                                <FontAwesomeIcon
                                    icon={faUser}
                                    className="mr-2 text-blue-500"
                                />
                                {user?.username}
                            </dd>
                        </div>
                        <div className="bg-white dark:bg-gray-800 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                            <dt className="text-sm font-medium text-gray-500 dark:text-gray-300">
                                Email address
                            </dt>
                            <dd className="mt-1 text-sm text-gray-900 dark:text-gray-100 sm:mt-0 sm:col-span-2 flex items-center">
                                <FontAwesomeIcon
                                    icon={faEnvelope}
                                    className="mr-2 text-green-500"
                                />
                                {user?.email}
                            </dd>
                        </div>
                        <div className="bg-gray-50 dark:bg-gray-900 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                            <dt className="text-sm font-medium text-gray-500 dark:text-gray-300">
                                Phone number
                            </dt>
                            <dd className="mt-1 text-sm text-gray-900 dark:text-gray-100 sm:mt-0 sm:col-span-2 flex items-center">
                                <FontAwesomeIcon
                                    icon={faPhone}
                                    className="mr-2 text-yellow-500"
                                />
                                {user?.phone}
                            </dd>
                        </div>
                        <div className="bg-white dark:bg-gray-800 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                            <dt className="text-sm font-medium text-gray-500 dark:text-gray-300">
                                Role
                            </dt>
                            <dd className="mt-1 text-sm text-gray-900 dark:text-gray-100 sm:mt-0 sm:col-span-2 flex items-center">
                                <FontAwesomeIcon
                                    icon={faShieldAlt}
                                    className="mr-2 text-purple-500"
                                />
                                <span className="badge bg-blue-500 text-white rounded-full px-2 py-1 text-xs font-semibold">
                                    {user?.role}
                                </span>
                            </dd>
                        </div>
                        <div className="bg-gray-50 dark:bg-gray-900 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                            <dt className="text-sm font-medium text-gray-500 dark:text-gray-300">
                                Status
                            </dt>
                            <dd className="mt-1 text-sm text-gray-900 dark:text-gray-100 sm:mt-0 sm:col-span-2 flex items-center">
                                <FontAwesomeIcon
                                    icon={faCalendarAlt}
                                    className="mr-2 text-red-500"
                                />
                                {user?.status ? (
                                    <span className="badge bg-green-500 text-white rounded-full px-2 py-1 text-xs font-semibold">
                                        Active
                                    </span>
                                ) : (
                                    <span className="badge bg-red-500 text-white rounded-full px-2 py-1 text-xs font-semibold">
                                        Inactive
                                    </span>
                                )}
                            </dd>
                        </div>
                        <div className="bg-white dark:bg-gray-800 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                            <dt className="text-sm font-medium text-gray-500 dark:text-gray-300">
                                Created At
                            </dt>
                            <dd className="mt-1 text-sm text-gray-900 dark:text-gray-100 sm:mt-0 sm:col-span-2 flex items-center">
                                <FontAwesomeIcon
                                    icon={faCalendarAlt}
                                    className="mr-2 text-teal-500"
                                />
                                {new Date(user?.createdAt).toLocaleDateString()}
                            </dd>
                        </div>
                        <div className="bg-gray-50 dark:bg-gray-900 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                            <dt className="text-sm font-medium text-gray-500 dark:text-gray-300">
                                Updated At
                            </dt>
                            <dd className="mt-1 text-sm text-gray-900 dark:text-gray-100 sm:mt-0 sm:col-span-2 flex items-center">
                                <FontAwesomeIcon
                                    icon={faCalendarAlt}
                                    className="mr-2 text-teal-500"
                                />
                                {new Date(user?.updatedAt).toLocaleDateString()}
                            </dd>
                        </div>
                    </dl>
                </div>
            </div>
        </div>
    );
};
