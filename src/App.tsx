import './App.css'
import {Canvas} from "@react-three/fiber";
import {OrbitControls} from "@react-three/drei";
import Cube from "./components/models/Cube"

function App() {
    return (
        <Canvas camera={{
            position: [3, 3, 3]
        }}>
            <OrbitControls/>
            <Cube/>
        </Canvas>
    )
}

export default App
