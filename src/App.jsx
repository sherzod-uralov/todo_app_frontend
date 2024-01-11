import Nav from "./components/todos/Nav.jsx";
import CreateTodo from "./components/todos/CreateTodo.jsx";
import Footer from "./components/todos/Footer.jsx";
import {useEffect, useRef} from "react";
import Topology from "vanta/src/vanta.fog.js";
import * as THREE from "three";

function App() {


    const vantaRef = useRef(null);

    useEffect(() => {
        const vantaEffect = Topology({
            el: vantaRef.current,
            mouseControls: true,
            backgroundColor: "#243392",
            touchControls: true,
            gyroControls: false,
            highlightColor: 0xff00a5,
            midtoneColor: 0x50088e,
            lowlightColor: 0x3918c5,
            baseColor: 0xc06f6f,
            blurFactor: 0.25,
            speed: 1.90,
        });


        return () => {
            if (vantaEffect) vantaEffect.destroy();
        };
    }, []);




  return (
<div ref={vantaRef} className="h-screen">


    <Nav />
    <CreateTodo />
    <Footer/>

</div>

  );
}

export default App;
