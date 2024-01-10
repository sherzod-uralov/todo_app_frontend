import React, { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Api_url from "../api/api_url.js";
import Halo from "vanta/src/vanta.halo.js";
import * as THREE from "three";
const Register = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`http://localhost:5600/api/register`, {
        username,
        email,
        password,
      });
      console.log(response);
      if (response.status === 201) {
        navigate("/login");
      }
    } catch (error) {
      console.log(error);
    }
  };
  const vantaRef = useRef(null);

  useEffect(() => {
    const vantaEffect = Halo({
      el: vantaRef.current,
      mouseControls: true,
      touchControls: true,
      gyroControls: false,
      minHeight: 200.0,
      minWidth: 200.0,
      scale: 2.0,
      scaleMobile: 1.0,
      size: 1.6,
      THREE: THREE,
      backgroundColor: "#243392",
    });

    return () => {
      if (vantaEffect) vantaEffect.destroy();
    };
  }, []);

  return (
    <div className="" ref={vantaRef}>
      <div
        className="flex flex-col items-center min-h-screen pt-6 sm:justify-center sm:pt-0
      "
      >
        <div>
          <a href="/"></a>
        </div>
        <div className="w-full px-6 py-4 mt-6 overflow-hidden h-full bg-gray-400 rounded-md bg-clip-padding backdrop-filter backdrop-blur-2xl bg-opacity-30  shadow-md sm:max-w-lg sm:rounded-3xl">
          <form onSubmit={onSubmit}>
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-white"
              >
                Username
              </label>
              <div className="flex flex-col items-start">
                <input
                  required
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  type="text"
                  name="username"
                  className="block w-full mt-1  pl-2 h-12 rounded-xl opacity-[0.5] shadow-sm bg-transparent border-[3px] border-white outline-none "
                />
              </div>
            </div>
            <div className="mt-4">
              <label
                htmlFor="email"
                className="block text-sm font-medium text-white undefined"
              >
                Email
              </label>
              <div className="flex flex-col items-start">
                <input
                  required
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  name="email"
                  className="block  w-full h-12 pl-2 outline-none mt-1 border-[3px] opacity-[0.5] border-white bg-transparent rounded-xl shadow-sm"
                />
              </div>
            </div>
            <div className="mt-4">
              <label
                htmlFor="password"
                className="block text-sm font-medium text-white undefined"
              >
                Password
              </label>
              <div className="flex flex-col items-start">
                <input
                  value={password}
                  required
                  onChange={(e) => setPassword(e.target.value)}
                  type="password"
                  name="password"
                  className="block outline-none pl-2 w-full h-12 mt-1 border-white bg-transparent opacity-[0.5] border-[3px] rounded-xl shadow-sm"
                />
              </div>
            </div>
            <div className="flex items-center mt-8">
              <button className="w-full px-4 py-2 tracking-wide text-white border-[3px] border-white transition-colors duration-200 transform bg-[#white] rounded-tl-3xl rounded-br-3xl hover:bg-[#pink] focus:outline-none focus:bg-[#F71735]">
                Register
              </button>
            </div>
          </form>
          <div className="mt-4 text-white">
            Already have an account:{" "}
            <span>
              <Link className="text-[#F71735] hover:underline" to="/login">
                Log in
              </Link>
            </span>
          </div>
          <div className="flex items-center w-full my-4">
            <hr className="w-full" />
            <p className="px-3 text-white">OR</p>
            <hr className="w-full" />
          </div>
          <div className="my-6 space-y-2">
            <button
              aria-label="Login with Google"
              type="button"
              className="flex items-center justify-center w-full p-2 space-x-4 border-[3px] rounded-md focus:ring-2 focus:ring-offset-1 dark:border-gray-400 focus:ring-violet-400"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 32 32"
                className="w-5 h-5 fill-white"
              >
                <path d="M16.318 13.714v5.484h9.078c-0.37 2.354-2.745 6.901-9.078 6.901-5.458 0-9.917-4.521-9.917-10.099s4.458-10.099 9.917-10.099c3.109 0 5.193 1.318 6.38 2.464l4.339-4.182c-2.786-2.599-6.396-4.182-10.719-4.182-8.844 0-16 7.151-16 16s7.156 16 16 16c9.234 0 15.365-6.49 15.365-15.635 0-1.052-0.115-1.854-0.255-2.651z"></path>
              </svg>
              <p className="text-white">Login with Google</p>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
