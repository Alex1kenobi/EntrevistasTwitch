import React, { useContext, useEffect, useState } from "react";
import "../../styles/question-table.css";
import { Context } from "../store/appContext";

export const QuestionTable = () => {
  const { store, actions } = useContext(Context);

  const [preguntas, setPreguntas] = useState ()

  useEffect(() => {
    actions.getpreguntas();
  }, []);

  useEffect (()=>{
setPreguntas (store.preguntas_current_user)
}, [store.preguntas_current_user])


console.log(store.preguntas_current_user)
  return (
    <div class="padding">
      <div class="row container d-flex justify-content-center">
        <div class="col grid-margin stretch-card">
          <div class="card">
            <div class="card-body">
              <div class="row">
                <div class="col">
                  <h4 class="card-title">Tabla de preguntas</h4>
                </div>
              </div>
              <div class="table-responsive">
                <table id="htmltable" class="table">
                  <thead>
                    <tr>
                      <th>Entrevistado</th>
                      <th>Categoría</th>
                      <th>Pregunta</th>
                    </tr>
                  </thead>
                  <tbody>
                    
                    {preguntas && preguntas.map((cadapregunta) => {
                          return (
                            <tr>
                              <td>{cadapregunta.interviewer}</td>
                              <td>{cadapregunta.category}</td>
                              <td>{cadapregunta.text}</td>
                            </tr>
                          );
                        })
                      }
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
