import React, {useEffect, useRef, useState} from 'react';
import {Link, Navigate, useNavigate} from "react-router-dom";
import {RiLogoutBoxFill} from "react-icons/ri";
import Topology from "vanta/src/vanta.fog.js";
import * as THREE from "three";
import axios from "axios";
import api_url from "../../api/api_url.js";

const Footer = () => {
const navigate=useNavigate()
    const [name, setName] = useState('')
    const getData = async () => {
        try {
            const getResponse = await axios.get(`${api_url}/todo`, {
                headers: {
                    Authorization: localStorage.getItem("authToken"),
                },
            });
            setName(getResponse?.data?.users[0]);
        } catch (e) {
            console.log(e);
        }
    };
const clerStorage=()=>{
    localStorage.clear()

}
    // const vantaRef = useRef(null);
    //
    useEffect(() => {
        // const vantaEffect = Topology({
        //     el: vantaRef.current,
        //     mouseControls: true,
        //     backgroundColor: "#243392",
        //     touchControls: true,
        //     gyroControls: false,
        //     minHeight: 200.00,
        //     minWidth: 200.00,
        //     scale: 2.00,
        //     size: 0.60,
        //     THREE: THREE,
        //     speed: 1.00,
        //     highlightColor: 0xff00a5
        // });
        getData()

        // return () => {
        //     if (vantaEffect) vantaEffect.destroy();
        // };
    }, []);


    return (
        <div
            className="w-full h-[150px]  flex justify-items-start items-center fixed bottom-0 "

        >
            <Link to='/register'>
                <RiLogoutBoxFill className="text-6xl text-[#4EA8DE] ml-4" onClick={clerStorage}/>
            </Link>
            <div>
                <h1 className="text-[#5E60CE] text-[40px] font-black not-italic ml-3 ">{name.username}</h1>
            </div>
        </div>
    );
};

export default Footer;