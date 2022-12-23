import React, { useContext, useState } from "react";
import { Context } from "../store/appContext";

export const Likebar = (props) => {
  const { store, actions } = useContext(Context);

  const [isActive, setIsActive] = useState(false);

  const handleClick = () => {
    // 👇️ toggle
    setIsActive((current) => !current);
  };

  const recuento = props.indexPregunta.likes.length-props.indexPregunta.dislikes.length

  return (
    <div class="card" style={{ width: "18rem" }}>
      <div class="card-body">
        <>{recuento}
          <h5 class="card-title">{props.indexPregunta.user}</h5>
          <p class="card-text">{props.indexPregunta.text}</p>
          <p class="card-text">{props.indexPregunta.category}</p>
        </>
        {store.logged ? (
          <div class="input-group">
            {}
            <button
              type="button"
              style={{
                backgroundColor: isActive ? "salmon" : "",
                color: isActive ? "white" : "",
              }}
              class="btn btn-primary fas fa-thumbs-up"
              onClick={() => {
                actions.Likes(
                  props.indexPregunta.id,
                  store.user.id,
                  props.indexPregunta.interviewer_id
                );
                handleClick(); /* Este hace que cambie el color...... Pero de todos! */
                /* handleClickLike(); */
              }}

              /* disabled={disabledLike} */
            >
              Like
            </button>
            {props.indexPregunta.likes.length}

            <button
              type="button"
              class="btn btn-primary fas fa-thumbs-down"
              onClick={() => {
                actions.Dislikes(
                  props.indexPregunta.id,
                  store.user.id,
                  props.indexPregunta.interviewer_id
                ); /* handleClickDislike(likes); */
              }}
              /* disabled={disabledDislike} */
            >
              Dislike
            </button>
            {props.indexPregunta.dislikes.length}

            <button
              type="button"
              class="btn btn-primary fas fa-thumbs-down"
              onClick={() => {
                actions.Trolls(
                  props.indexPregunta.id,
                  store.user.id,
                  props.indexPregunta.interviewer_id
                ); /* handleClickTroll(); */
              }}
              /* disabled={disabledTroll} */
            >
              Troll / Repetido
            </button>
            {props.indexPregunta.trolls.length}

            {store.user.id == props.indexPregunta.user_id ? (
              <button
                class="btn btn-primary"
                onClick={() => {
                  actions.deletequestion(
                    props.indexPregunta.id,
                    props.indexPregunta.interviewer_id
                  );
                }}
              >
                Borrar Pregunta
              </button>
            ) : null}
          </div>
        ) : null}
      </div>
    </div>
  );
};
