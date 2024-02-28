import React from 'react';
import IMG from '@/assets/images/Farm logo.png';
import { Link, Outlet, useNavigate } from 'react-router-dom';
import { InputField } from '@/components/input';

function Login() {
    const navigate = useNavigate(); // Initialize useHistory hook

    const handleLogin = () => {
        navigate('/admin');
    };
    return (
        <>
            <div className="bg-white dark:bg-black ">
                <div className="flex h-screen justify-center">
                    <div className="mx-auto flex w-full max-w-md items-center  px-6  h-full lg:w-2/6">
                        <div className="flex-1">
                            <div className="text-center">
                                <div className="mx-auto flex  flex-col items-center justify-center my-5 ">
                                    <img className="w-32  " alt="" />
                                    <p className="text-lg font-medium text-gray-600 dark:text-gray-400">
                                        Farm
                                    </p>
                                </div>
                            </div>

                            <div className="mt-10">
                                <>
                                    <div className="flex flex-row items-center  justify-center">
                                        <p className="my-10 mt-3  text-3xl text-teal-500 ">
                                            Login
                                        </p>
                                    </div>

                                    <form className="mt-10">
                                        <div className="space-y-4">
                                            <InputField
                                                type="text"
                                                label="Username"
                                                placeholder="Username"
                                                focus
                                                className="h-13"
                                                registration={undefined}
                                            />

                                            <InputField
                                                type="password"
                                                label="Password"
                                                placeholder="********"
                                                className="h-13"
                                                registration={undefined}
                                            />

                                            <div className="flex flex-col  ">
                                                <div className="flex flex-row items-center  justify-between">
                                                    <Link
                                                        to="/reset-password"
                                                        className="text-sm font-medium text-primary"
                                                    >
                                                        Forgot password?
                                                    </Link>
                                                </div>
                                            </div>
                                        </div>

                                        <button
                                            type="submit"
                                            className="mt-6 h-12 w-full rounded bg-primary font-semibold uppercase text-white"
                                            onClick={handleLogin} // Call handleLogin function when button is clicked
                                        >
                                            Log In
                                        </button>
                                    </form>

                                    {/* <div>
        <p className="text-md mt-2 text-gray-500">
          Don't have an acount?{" "}
          <Link to="/register" className="font-medium text-primary">
            Sign Up
          </Link>
        </p>
      </div> */}
                                </>
                            </div>
                        </div>
                    </div>
                    <div className="bg-green-800  hidden bg-cover lg:block lg:w-2/3">
                        <div className="flex h-full items-center bg-gray-900 bg-opacity-40 px-20">
                            <div>
                                <h2 className="text-2xl font-bold text-white sm:text-3xl">
                                    Farm
                                </h2>

                                <p className="mt-3 max-w-2xl text-2xl text-gray-300">
                                   some quotes
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
export default Login;
