/* eslint-disable react/prop-types */

import { PersonaComponent } from "./PersonaComponent";

export const TablaPersonas = ({ setPersonas, marcarCampoVacio, personas, filtro }) => {
  // Función para ordenar las personas por id, así
  // no cambia el orden cuando se modifiquen

  const personasOrdenadas = [...personas.lista_personas].sort(
    (a, b) => a.id - b.id
  );

  return (
    <>
      <div className="contenedor-resultados">
        <table border="1">
          <thead>
            <tr>
              <th>Nombres</th>
              <th>Apellidos</th>
              <th>Género</th>
              <th>Estado Civil</th>
              <th>Sueldo</th>
              <th className="accion-form-editar">Acción (Editar)</th>
              <th className="accion-form-eliminar">Acción (Eliminar)</th>
            </tr>
          </thead>
          <tbody id="lista-personas">
            {!filtro &&
              personasOrdenadas.map((element) => (
                <PersonaComponent
                  key={element.id}
                  setPersonas={setPersonas}
                  personas={personas}
                  persona={element}
                  marcarCampoVacio={marcarCampoVacio}
                />
              ))}
            {filtro &&
              personasOrdenadas
                .filter((element) => element.genero.includes(filtro))
                .map((element) => (
                  <PersonaComponent
                    key={element.id}
                    setPersonas={setPersonas}
                    personas={personas}
                    persona={element}
                    marcarCampoVacio={marcarCampoVacio}
                  />
                ))}
          </tbody>
        </table>
      </div>
    </>
  );
};
