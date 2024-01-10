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
            minHeight: 200.00,
            minWidth: 200.00,
            scale: 2.00,
            size: 0.60,
            THREE: THREE,
            speed: 1.90,
            highlightColor: 0xff00a5
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
