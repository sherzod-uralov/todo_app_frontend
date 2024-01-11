import React, {useEffect, useState} from "react";
import {Link} from "react-router-dom";
import {RiLogoutBoxFill} from "react-icons/ri";
import axios from "axios";
import api_url from "../../api/api_url.js";

const Footer = () => {
    const [name, setName] = useState("");
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
    const clerStorage = () => {
        localStorage.clear();
    };
    useEffect(() => {
        getData();
    }, []);

    return (
        <div className="w-full h-[150px]  flex justify-items-start items-center fixed bottom-0 ">
            <Link to="/register">
                <RiLogoutBoxFill
                    className="text-6xl text-[#4EA8DE] ml-4"
                    onClick={clerStorage}
                />
            </Link>
            <div>
                <h1 className="text-[#5E60CE] text-[40px] font-black not-italic ml-3 ">
                    {name.username}
                </h1>
            </div>
        </div>
    );
};

export default Footer;
