import Nav from "./components/todos/Nav.jsx";
import CreateTodo from "./components/todos/CreateTodo.jsx";
import Footer from "./components/todos/Footer.jsx";
import { useEffect, useRef } from "react";
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
      gyroControls: true,
      highlightColor: 0xde12e8,
      midtoneColor: 0x0922ffe,
      lowlightColor: 0x55ffffe,
      baseColor: 0x243392,
      blurFactor: 0.25,
      THREE,
      speed: 1,
    });

    return () => {
      if (vantaEffect) vantaEffect.destroy();
    };
  }, []);

  return (
    <div ref={vantaRef} className="h-screen overflow-y-hidden">
      <Nav />
      <CreateTodo />
      <Footer />
    </div>
  );
}

export default App;
