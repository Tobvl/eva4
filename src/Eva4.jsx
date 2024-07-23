import { useEffect, useState } from "react";
import "./Eva4.css";
// Importar todos los componentes desde el archivo de barril
import { FormPersonas, TablaPersonas } from "./components";

const Eva4 = () => {

  const [marcandoErrores, setMarcandoErrores] = useState(false);
  
  const marcarCampoVacio = (campo) => {
    if (marcandoErrores) {
      return;
    }
    setMarcandoErrores(true);
    if (campo == "genero") {
      campo = "generoInputs";
    }
    const buscarCampoPorId  = document.getElementById(campo);
    const borde_original = buscarCampoPorId.style.border;
    buscarCampoPorId.style.border = "1px solid red";
    setTimeout(() => {
      buscarCampoPorId.style.border = borde_original;
      setMarcandoErrores(false);
    }, 2000);
  }

  const [personasState, setPersonasState] = useState({
    id_ultima_persona: 2,
    lista_personas: [
      {
        id: 1,
        nombre: "Cristóbal",
        apellido: "Sánchez",
        genero: "Masculino",
        estado_civil: "Soltero",
        sueldo: 1750000,
      },
      {
        id: 2,
        nombre: "Constanza",
        apellido: "Rivadeneira",
        genero: "Femenino",
        estado_civil: "Soltero",
        sueldo: 1990000,
      },
    ],
  });

  useEffect(() => {
    // console.log(personasState);
  }, [personasState]);
  
  
  const [filtro, setFiltro] = useState("");

  return (
    <div className="contenedor-principal" style={{ zIndex: "0" }}>
      {/* div con el logo de react entremedio del formulario y el contenedor principal */}
      <div>
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/a/a7/React-icon.svg"
          alt="React"
          className="react_bkg"
        />
      </div>
      <div className="contenedor-secundario">
        <div className="title">
          <h1>Evaluación 4 - CRUD con React</h1>
          <h3>Cristóbal Sánchez Díaz</h3>
        </div>
        <FormPersonas
          personas={personasState}
          setPersonas={setPersonasState}
          filtro={filtro}
          setFiltro={setFiltro}
          marcarCampoVacio={marcarCampoVacio}
        />
        <TablaPersonas
          personas={personasState}
          marcarCampoVacio={marcarCampoVacio}
          setPersonas={setPersonasState}
          filtro={filtro}
        />
      </div>
    </div>
  );
};

export default Eva4;
