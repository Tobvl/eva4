/* eslint-disable react/prop-types */
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { useState } from "react";

export const PersonaComponent = ({ setPersonas, marcarCampoVacio, personas, persona }) => {
  const [edicion, setEdicion] = useState({
    id: persona.id,
    nombre: persona.nombre,
    apellido: persona.apellido,
    genero: persona.genero,
    estado_civil: persona.estado_civil,
    sueldo: persona.sueldo,
  });



  const handleChangeEdicion = (e) => {
    const { id, value } = e.target;
    const nuevaEdicion = {
      ...edicion,
      [id]: value,
    };
    setEdicion(nuevaEdicion);
    // console.log(nuevaEdicion);
  };

  const validarEdicion = (edicion) => {
    const campos_faltantes = [];
    for (const key in edicion) {
      if (!(typeof edicion[key] == "number")) {
        if (edicion[key].trim() == "") {
          campos_faltantes.push(key);
        }
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

  const guardar = () => {
    if (!validarEdicion(edicion)) {
      return;
    }
    const persona_editada = edicion;
    const personas_filtradas = personas.lista_personas.filter(
      (element) => element.id != persona.id
    );
    const nueva_lista_personas = [...personas_filtradas, persona_editada];
    setPersonas({
      ...personas,
      lista_personas: nueva_lista_personas,
    });
  };

  const editar = () => {
    setEdicion({
      id: persona.id,
      nombre: persona.nombre,
      apellido: persona.apellido,
      genero: persona.genero,
      estado_civil: persona.estado_civil,
      sueldo: persona.sueldo,
    });
    handleOpen();
  };

  const eliminar = () => {
    handleCloseEliminar();
    const personas_filtradas = personas.lista_personas.filter(
      (element) => element.id != persona.id
    );
    setPersonas({
      ...personas,
      lista_personas: personas_filtradas,
    });
    // console.log("Eliminar a la persona con id: ", persona.id);
    // console.log(personas)
  };

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [openEliminar, setOpenEliminar] = useState(false);
  const handleOpenEliminar = () => setOpenEliminar(true);
  const handleCloseEliminar = () => setOpenEliminar(false);

  const estilo_modal = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 500,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  };
  return (
    <>
      <tr key={persona.id}>
        <td>{persona.nombre}</td>
        <td>{persona.apellido}</td>
        <td>{persona.genero}</td>
        <td>{persona.genero=='Masculino'? persona.estado_civil : persona.estado_civil.slice(0,-1)+"a"}</td>
        <td>{persona.sueldo}</td>
        <td>
          <button className="boton" onClick={editar}>
            Editar
          </button>
        </td>
        <td>
          <button className="boton" onClick={handleOpenEliminar}>
            Eliminar
          </button>
        </td>
      </tr>
      {/* Modal para editar persona */}
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description">
        <Box sx={estilo_modal}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Editar a {persona.nombre} {persona.apellido}
          </Typography>
          <div className="contenedor-form-editar">
            <div className="contenedor-opcion">
              <label htmlFor="nombre">Nombres:</label>
              <input
                onChange={handleChangeEdicion}
                type="text"
                id="nombre"
                value={edicion.nombre}
              />
            </div>
            <div className="contenedor-opcion">
              <label htmlFor="apellido">Apellidos:</label>
              <input
                onChange={handleChangeEdicion}
                type="text"
                id="apellido"
                value={edicion.apellido}
              />
            </div>
            <div className="contenedor-opcion">
              <label htmlFor="genero">Género:</label>
              <div className="genero-inputs" id="generoInputs">
                <input
                  onChange={handleChangeEdicion}
                  id="genero"
                  type="radio"
                  name="genero"
                  value="Femenino"
                  checked={edicion.genero == "Femenino"}
                />{" "}
                Femenino
                <input
                  onChange={handleChangeEdicion}
                  id="genero"
                  type="radio"
                  name="genero"
                  value="Masculino"
                  checked={edicion.genero == "Masculino"}
                />{" "}
                Masculino
              </div>
            </div>
            <div className="contenedor-opcion">
              <label htmlFor="estado_civil">Estado Civil:</label>
              <select
                onChange={handleChangeEdicion}
                id="estado_civil"
                value={edicion.estado_civil}>
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
                onChange={handleChangeEdicion}
                type="number"
                id="sueldo"
                value={edicion.sueldo}
              />
            </div>
          </div>
          <div className="footer_botones">
            <button className="footer_boton_eliminar" onClick={handleClose}>
              Cancelar
            </button>
            <button className="footer_boton_cancelar" onClick={guardar}>
              Guardar
            </button>
          </div>
        </Box>
      </Modal>
      {/* Modal para eliminar persona */}
      <Modal
        open={openEliminar}
        onClose={handleCloseEliminar}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description">
        <Box sx={estilo_modal}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            ¿Eliminar a {persona.nombre} {persona.apellido}?
          </Typography>
          <div className="footer_botones">
            <button
              className="footer_boton_cancelar"
              onClick={handleCloseEliminar}>
              Cancelar
            </button>
            <button className="footer_boton_eliminar" onClick={eliminar}>
              Eliminar
            </button>
          </div>
        </Box>
      </Modal>
    </>
  );
};
