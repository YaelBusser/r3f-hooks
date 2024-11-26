import {useFrame, useThree} from "@react-three/fiber";
import {memo, useCallback, useRef} from "react";

/*
    memo ici n'est pas très utile ici car il permet juste de ne pas rerender si un props change mais là pas besoin car
    pas trop de props qui vont changer de valeur
 */
const Cube = memo((props: any) => {
    /*
        const {camera} = useThree();
        Pas bien car le fait d'appeler la caméra utilisée dans R3F ça rerender donc on doit utiliser une méthode de callback
        Le state est l'état de R3F, on peut récupérer par exemple la caméra sans pour autant rerender notre composant
     */
    const camera: any = useThree((state) => state.camera);
    const cameraRef: any = useRef(camera);
    const cubeRef: any = useRef(null);
    console.log("test");

    const updateFov = useCallback(() => {
        cameraRef.current.fov += 5;
        /*
            Pour mettre à jour le state de la caméra, on doit obligatoirement dire à threejs de faire la mise à jour
            de ce state car comme on ne rerender pas il faut lui dire manuellement de le prendre en compte
         */
        camera.updateProjectionMatrix();
    }, []);
    /*
        state correspond à l'état actuel de la frame
        delta correspond au temps écoulé entre la frame précédente et la frame actuelle
        useFrame est considéré comme une fonction de callback
        delta est très utile car cela permet de faire des animations qui ne sont pas liées aux perfs de la machine
        par exemple : la vitesse d'un joueur doit restée immuable, ça serait idiot que cela soit dépendant des perfs
        en revanche il peut y avoir des lags et des sauts mais on ne doit pas voir l'animation ralentir et galérer
        On veut un résultat identique !
     */
    const speed = {
        value: 5
    }
    // En utilisant delta, le taux de rafraichissemnt n'impactera pas la vitesse
    // Pour dire qu'on utilise pas un paramètre on doit mettre un "_"
    /*
        Attention à ne pas faire de très gros calcules dans un useFrame car c'est basé sur le taux de rafraichissement
        Donc par exemple avec un 144Hz (soit 144 fois par seconde => la fonction est appelée 144 fois par seconde) ça fait déjà beaucoup
        => Eviter l'instanciation d'objets à l'intérieur mais juste créer des variables et les utilisées ici
     */
    useFrame((_state, delta) => {
        cubeRef.current.rotation.y += delta * speed.value;
    });

    return (
        <>
            <mesh {...props} onClick={() => updateFov()} ref={cubeRef}>
                <boxGeometry/>
                <meshNormalMaterial/>
            </mesh>
        </>
    )
});

export default Cube;