import React, { useContext } from "react";
import "../../styles/card2.css";
import { Context } from "../store/appContext";
import { Link } from "react-router-dom";

export const QuestionCard = () => {
  const { store, actions } = useContext(Context);

  return (
    <>
      <div class="card" style={{ width: "18rem" }}>
        <div class="card-body">
          {store.preguntas_entrevistado.length > 0 ? (
            store.preguntas_entrevistado.map((indexPregunta) => {
              return (
                <>
                  <h5 class="card-title">{indexPregunta.user}</h5>
                  <p class="card-text">{indexPregunta.text}</p>
                  <p class="card-text">{indexPregunta.category}</p>
                </>
              );
            })
          ) : (
            <p>Escribe tu pregunta</p>
          )}

          <div class="input-group">
            <button type="button" class="btn btn-primary fas fa-thumbs-up">
              Like
            </button>
            <button type="button" class="btn btn-primary fas fa-thumbs-down">
              Dislike
            </button>
            <button
              type="button"
              class="btn btn-primary fas fa-meh-rolling-eyes"
            >
              Pregunta troll
            </button>

            <a href="#" class="btn btn-primary">
              Borrar Pregunta
            </a>
          </div>
        </div>
      </div>
    </>
  );
};
