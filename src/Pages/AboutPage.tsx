import React from "react";
import Particles from "react-tsparticles";
import image from "../Resources/code.jpg";
import uaz from "../Resources/UAZ.jpg";
import unadm from "../Resources/unadm.png";
import marlen from "../Resources/marlen.jpg";
import imelda from "../Resources/imelda.jpg";
import sergio from "../Resources/sergio.jpg";
import male from "../Resources/male.jpg";
import female from "../Resources/female.jpg";
import { loadFull } from "tsparticles";
import { Stack } from "@fluentui/react";

import { Engine, IOptions, RecursivePartial } from "tsparticles-engine";

function AboutPage() {

    const particlesInit = async (main: Engine) => {
        await loadFull(main);
    };


    const particlesOptions: RecursivePartial<IOptions> = {
        background: {
            image: `url(${image})`,
            color: {
                value: "#555555",
            },
            size: "cover",
            opacity: 0,
        },
        fullScreen: {
            enable: true,
            zIndex: -1,
        },
        fpsLimit: 120,
        interactivity: {

            events: {
                onClick: {
                    enable: true,
                    mode: "push",
                },
                onHover: {
                    enable: true,
                    mode: "grab"
                },

                resize: true,
            },
            modes: {
                push: {
                    quantity: 4,
                },
                grab: {
                    distance: 200,
                    lineLinked: {
                        opacity: 0.5
                    }
                }

            },
        },
        particles: {
            color: {
                value: "#ffffff",
            },
            links: {
                color: "#ffffff",
                distance: 150,
                enable: true,
                opacity: 0.5,
                width: 1,
            },
            collisions: {
                enable: true,
            },
            move: {
                direction: "none",
                enable: true,
                outModes: {
                    default: "bounce",
                },
                random: false,
                speed: 1,
                straight: false,
            },
            number: {
                density: {
                    enable: true,
                    area: 800,
                },
                value: 80,
            },
            opacity: {
                value: 0.5,
            },
            shape: {
                type: "circle",
            },
            size: {
                value: { min: 1, max: 5 },
            },
        },
        detectRetina: true,
    };

    const imgStyle = {
        width: `150px`,
        height: `150px`,
        borderRadius: `50%`,
        backgroundColor: `#ffffff`,
        boxShadow: `5px 5px 5px 5px black`,
        cursor: `pointer`,
        zIndex: `1`,
    };

    const picStyle = {
        width: `150px`,
        height: `150px`,
        borderRadius: `15%`,
        backgroundColor: `#ffffff`,
        boxShadow: `2px 2px 2px 2px white`,
        cursor: `pointer`,
        zIndex: `1`,
        marginBottom: `10px`,
    };

    const nameStyle = {
        color: `white`,
        padding: 0,
        margin: 0,
    }

    const picStyleSecondary = {
        ...picStyle,
        borderRadius: `50%`,
    }

    return (
        <React.Fragment>
            <Stack horizontalAlign="center">
                <Stack horizontal style={{ alignItems: 'center', padding: `0 15px` }}>
                    <a href="https://www.uaz.edu.mx" target="_blank" rel="noreferrer">
                        <img src={uaz} alt="uaz logo" style={imgStyle} />
                    </a>
                    <h1 style={{
                        display: `flex`,
                        flexDirection: `column`,
                        color: `white`,
                        fontSize: `45px`,
                        textShadow: `4px 5px 6px black`,
                        textAlign: `center`,
                    }}>
                        Sistema experto para el manejo de modelos económicos: macroeconómicos y microeconómicos</h1>
                    <a href="https://www.unadmexico.mx" target="_blank" rel="noreferrer">
                        <img src={unadm} alt="uaz logo" style={imgStyle} />
                    </a>
                </Stack>

                <div className="card-port" style={{
                    display: `grid`,
                    borderRadius: `10px`,
                    width: `40%`,
                    alignContent: `center`,
                    justifyItems: `center`,
                    backgroundColor: `#fff`,
                    boxShadow: `1px 1px 15px #00040d`,
                    textAlign: `center`,
                    fontSize: `small`,
                    padding: `0 10px`,
                }}>
                    <p>La variedad de las teorías en microeconomía y macroeconomía junto con sus características intrínsecas, llevan a los estudiantes e investigadores a plantearse cuál sería el modelo más adecuado que se ajuste a cada caso de estudio. por lo que en el presente trabajo se logra desarrollar un sistema experto computacional de fácil acceso y manejo con el fin de permitir la búsqueda entre las diferentes teorías económicas y sus modelos matemáticos relacionados en base de la construcción de un árbol de decisión a través de un grafo de conocimiento que estará capturando las características, parámetros y/o variables de las teorías y su aplicación mediante los modelos matemáticos correspondientes.</p>
                    <div className="line" style={{ borderBottom: `1px solid whitesmoke`, width: `70%` }}></div>
                    <p><strong>Palabras claves: Modelos económicos, Sistema Experto, Herramienta pedagógica, Microeconomía y Macroeconomía</strong></p>
                </div>


                <h3 style={{
                    textAlign: `left`,
                    color: `whitesmoke`,
                    fontSize: `25px`,
                    fontFamily: `Arial, Helvetica, sans-serif`,
                    textShadow: `2px 2px 2px black, 3px 3px 3px rgb(255 255 255 / 48%), 0 0 3px grey`,
                }}>
                    <ul>
                        <li>Unidad Académica de Economía. Universidad Autónoma de Zacatecas “Francisco Garcia Salinas”</li>
                        <li>División de Ciencias Exactas, Ingeniería y Tecnología. Universidad Abierta y a Distancia de México</li>
                    </ul></h3>

                <Stack horizontal style={{ alignItems: 'baseline', padding: `0 15px`, display: "flex", flex: 5 }} tokens={{ childrenGap: 45 }}>

                    <Stack horizontalAlign="center">
                        <img src={sergio} alt="Sergio Marquez" style={picStyle} />
                        <h4 style={nameStyle}>Sergio Marquez</h4>
                        <h5 style={nameStyle}>Investigación y Desarrollo</h5>
                    </Stack>

                    <Stack horizontalAlign="center">
                        <img src={marlen} alt="Dra. Marlen Hernández Ortiz" style={picStyle} />
                        <h4 style={nameStyle}>Dra. Marlen Hernández Ortiz</h4>
                        <h5 style={nameStyle}>Asesora del proyecto</h5>
                    </Stack>

                    <Stack horizontal style={{ alignItems: 'baseline', paddingLeft: `35px`, display: "flex", flex: 5 }} tokens={{ childrenGap: 45 }}>

                        <Stack horizontalAlign="center">
                            <img src={imelda} alt="Dra. Imelda Ortiz Medina" style={picStyleSecondary} />
                            <h4 style={nameStyle}>Dra. Imelda Ortiz Medina</h4>
                            <h5 style={nameStyle}>Colaboradora</h5>
                        </Stack>

                        <Stack horizontalAlign="center">
                            <img src={female} alt="M. en C. Sandra V. Garcia Carrillo" style={picStyleSecondary} />
                            <h4 style={nameStyle}>M. en C. Sandra V. Garcia Carrillo</h4>
                            <h5 style={nameStyle}>Colaboradora</h5>
                        </Stack>

                        <Stack horizontalAlign="center">
                            <img src={male} alt="Dr. Hector A. Duran Muñoz" style={picStyleSecondary} />
                            <h4 style={nameStyle}>Dr. Hector A. Duran Muñoz</h4>
                            <h5 style={nameStyle}>Colaborador</h5>
                        </Stack>

                    </Stack>
                </Stack>
            </Stack>
            <Particles id="tsparticles" init={particlesInit} options={particlesOptions} />
        </React.Fragment>
    );
}

export default AboutPage;