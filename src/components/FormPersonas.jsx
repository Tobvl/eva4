/* eslint-disable react/prop-types */
import { useState } from "react";

export const FormPersonas = ({ personas, marcarCampoVacio, setPersonas, filtro, setFiltro }) => {
  const formularioDefault = {
    nombres: "",
    apellidos: "",
    genero: "",
    estadoCivil: "",
    sueldo: "",
  };

  const [formulario, setFormulario] = useState(formularioDefault);

  const resetFiltro = () => {
    setFiltro("");
  };

  const handleFiltroChange = (e) => {
    const { value } = e.target;
    const nuevoFiltro = value;
    setFiltro(nuevoFiltro);
    //console.log(nuevoFiltro);
  };

  const handleChange = (e) => {
    const { id, value } = e.target;
    const nuevoFormulario = {
      ...formulario,
      [id]: value,
    };
    setFormulario(nuevoFormulario);
    //console.log(nuevoFormulario)
  };

  const agregar = () => {
    const personaCapturada = capturar();

    if (personaCapturada != undefined || personaCapturada != null) {
      limpiarFormulario();
      setPersonas({
        ...personas,
        id_ultima_persona: personaCapturada.id,
        lista_personas: [...personas.lista_personas, personaCapturada],
      });
    } else {
      return;
    }
  };

  const limpiarFormulario = () => {
    setFormulario(formularioDefault);
  };

  const validarFormulario = (formulario) => {
    const campos_faltantes = [];
    for (const key in formulario) {
      if (formulario[key].trim() == "") {
        campos_faltantes.push(key);
      }
    }
    if (campos_faltantes.length > 0) {
      for (const campo of campos_faltantes) {
        marcarCampoVacio(campo);
      }
      return false;
    }
    return true;
  };

  const capturar = () => {
    // console.log(formulario)
    if (validarFormulario(formulario)) {
      return {
        id: personas.id_ultima_persona + 1,
        nombre: formulario.nombres,
        apellido: formulario.apellidos,
        genero: formulario.genero,
        estado_civil: formulario.estadoCivil,
        sueldo: formulario.sueldo,
      };
    } else {
      return;
    }
  };

  return (
    <>
      <div className="contenedor-form">
        <div className="contenedor-opcion">
          <label htmlFor="nombres">Nombres:</label>
          <input
            onChange={handleChange}
            type="text"
            id="nombres"
            value={formulario.nombres}
          />
        </div>
        <div className="contenedor-opcion">
          <label htmlFor="apellidos">Apellidos:</label>
          <input
            onChange={handleChange}
            type="text"
            id="apellidos"
            value={formulario.apellidos}
          />
        </div>
        <div className="contenedor-opcion">
          <label htmlFor="genero">Género:</label>
          <div className="genero-inputs" id="generoInputs">
            <input
              onChange={handleChange}
              id="genero"
              type="radio"
              name="genero"
              value="Femenino"
              checked={formulario.genero == "Femenino"}
            />{" "}
            Femenino
            <input
              onChange={handleChange}
              id="genero"
              type="radio"
              name="genero"
              value="Masculino"
              checked={formulario.genero == "Masculino"}
            />{" "}
            Masculino
          </div>
        </div>
        <div className="contenedor-opcion">
          <label htmlFor="estadoCivil">Estado Civil:</label>
          <select
            onChange={handleChange}
            id="estadoCivil"
            value={formulario.estadoCivil}>
            <option value="" disabled>
              Seleccionar
            </option>
            <option value="Soltero">Soltero</option>
            <option value="Casado">Casado</option>
            <option value="Divorciado">Divorciado</option>
            <option value="Viudo">Viudo</option>
          </select>
        </div>
        <div className="contenedor-opcion">
          <label htmlFor="sueldo">Sueldo:</label>
          <input
            onChange={handleChange}
            type="number"
            id="sueldo"
            value={formulario.sueldo}
          />
        </div>
        <div className="contenedor-boton">
          <button id="agregar" onClick={agregar}>
            Agregar
          </button>
        </div>
        <div className="contenedor-filtro">
          <label htmlFor="filtrarDatos">Filtrar por:</label>
          <select
            id="filtrarDatos"
            onChange={handleFiltroChange}
            value={filtro}>
            <option value="" disabled>
              Seleccionar
            </option>
            <option value="Femenino">Genero Femenino</option>
            <option value="Masculino">Genero Masculino</option>
          </select>
          <span className="quitar-filtro" onClick={resetFiltro}>
            Quitar filtro
          </span>
        </div>
      </div>
    </>
  );
};
