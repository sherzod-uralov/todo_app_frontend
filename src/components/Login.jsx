import {useState, useRef, useEffect} from "react";
import {useNavigate} from "react-router-dom";
import Topology from "vanta/src/vanta.halo.js";
import * as THREE from "three";
import axios from "axios";
import api_url from "../api/api_url.js";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
    const onSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(`${api_url}/login`, {
                email,
                password,
            });
            if (response.status === 200) {
                navigate("/");
            }

            localStorage.setItem("authToken", response.data.token);
        } catch (error) {
            console.log(error);
        }
    };

    const vantaRef = useRef(null);

    useEffect(() => {
        const vantaEffect = Topology({
            el: vantaRef.current,
            mouseControls: true,
            backgroundColor: "#243392",
            touchControls: true,
            gyroControls: false,
            minHeight: 200.00,
            minWidth: 200.00,
            scale: 2.00,
            size: 1.50,
            THREE: THREE,
            speed: 0.80
        });

        return () => {
            if (vantaEffect) vantaEffect.destroy();
        };
    }, []);


    return (
        <div>
            <div className="flex flex-col items-center min-h-screen pt-6 sm:justify-center sm:pt-0   " ref={vantaRef}>
                <div>

                    <h3 className="text-4xl font-bold text-white">Login</h3>

                </div>
                <div
                    className="w-full px-6 py-4 mt-6 x  shadow-md sm:max-w-lg sm:rounded-3xl h-full
                    rounded-md bg-clip-padding backdrop-filter backdrop-blur-2xl  bg-opacity-30">
                    <form onSubmit={onSubmit}>
                        <div className="mt-4">
                            <label
                                htmlFor="email"
                                className="block text-sm font-medium text-white "
                            >
                                Email
                            </label>
                            <div className="flex flex-col items-start">
                                <input
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    type="email"
                                    name="email"
                                    className="block w-full outline-none mt-1  border-[3px]  h-10 rounded-md shadow-sm bg-transparent pl-3"
                                />
                            </div>
                        </div>
                        <div className="mt-4">
                            <label
                                htmlFor="password"
                                className="block text-sm font-medium text-white"
                            >
                                Password
                            </label>
                            <div className="flex flex-col items-start">
                                <input
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    type="password"
                                    name="password"
                                    className="block w-full outline-none mt-1 border-white border-[3px]  h-10 rounded-md shadow-sm bg-transparent pl-3"
                                />
                            </div>
                        </div>

                        <div className="flex items-center mt-7">
                            <button
                                className="w-full px-4 py-2 tracking-wide text-white border-[3px] border-white
                                 transition-colors duration-200 transform bg-[#white] rounded-tl-3xl
                                  rounded-br-3xl hover:bg-[#pink] focus:outline-none focus:bg-[#F71735]">
                                Login
                            </button>
                        </div>
                    </form>
                    <div className="mt-4 text-white">
                        Don't you have an account?{" "}
                        <span>
              <a className="text-[#F71735] hover:underline" href="/register">
                Register
              </a>
            </span>
                    </div>
                    <div className="flex items-center w-full my-4">
                        <hr className="w-full"/>
                        <p className="px-3 text-white">OR</p>
                        <hr className="w-full"/>
                    </div>
                    <div className="my-6 space-y-2">
                        <button
                            aria-label="Login with Google"
                            type="button"
                            className="flex items-center justify-center w-full p-2 space-x-4 border rounded-md
                            focus:ring-2 focus:ring-offset-1 dark:border-gray-400 focus:ring-violet-400"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 32 32"
                                className="w-5 h-5 fill-white"
                            >
                                <path
                                    d="M16.318 13.714v5.484h9.078c-0.37 2.354-2.745 6.901-9.078 6.901-5.458
                                    0-9.917-4.521-9.917-10.099s4.458-10.099 9.917-10.099c3.109 0 5.193 1.318 6.38
                                     2.464l4.339-4.182c-2.786-2.599-6.396-4.182-10.719-4.182-8.844 0-16 7.151-16
                                     16s7.156 16 16 16c9.234 0 15.365-6.49 15.365-15.635 0-1.052-0.115-1.854-0.255-2.651z"></path>
                            </svg>
                            <p className="text-white">Login with Google</p>
                        </button>

                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
