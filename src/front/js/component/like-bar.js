import React, { useContext, useState } from "react";
import { Context } from "../store/appContext";
import "../../styles/like-bar.css";

export const Likebar = (props) => {
  const { store, actions } = useContext(Context);

  const [like, setLike] = useState(false);
  const [dislike, setDislike] = useState(false);
  const [troll, setTroll] = useState(false);

  const [done, setDone] = useState(false);

  const [reject, setReject] = useState(false);

  const handleLike = () => {
    // 👇️ toggle
    setLike((current) => !current);
    if (dislike) {
      setDislike((current) => !current);
    }
    if (troll) {
      setTroll((current) => !current);
    }
  };

  const handleDislike = () => {
    // 👇️ toggle
    setDislike((current) => !current);
    if (like) {
      setLike((current) => !current);
    }
  };

  const handleTroll = () => {
    // 👇️ toggle
    setTroll((current) => !current);
    if (like) {
      setLike((current) => !current);
    }
  };

  const recuento =
    props.indexPregunta.likes.length - props.indexPregunta.dislikes.length;

  return (
    <div class="questionCard bg-dark px-3">
      <div class="card-body">
        <div class="border-bottom pb-3">
          <h5 class="card-title h-dash">{props.indexPregunta.user}</h5>
          <p class="card-text text-white">
            <span class="text-info">Categoría:</span>{" "}
            {props.indexPregunta.category}
          </p>
          <h6 class="card-text text-white">
            <span class="text-info questionText">Pregunta:</span> {props.indexPregunta.text}
          </h6>
        </div>

        <p class="card-text text-white mt-3">
          <span class="text-info">Total de likes:</span> {recuento}
        </p>
        {store.logged &&
        !props.indexPregunta.done &&
        !props.indexPregunta.reject ? (
          <div class="d-flex justify-content-between">
            <div class="likes">
              <button
                type="button"
                style={{
                  color: like ? "#3452FF" : "",
                }}
                class="fas fa-thumbs-up questionButton"
                onClick={() => {
                  actions.Likes(
                    props.indexPregunta.id,
                    store.user.id,
                    props.indexPregunta.interviewer_id
                  );
                  handleLike(); /* Este hace que cambie el color...... Pero de todos! */
                  /* handleClickLike(); */
                }}

                /* disabled={disabledLike} */
              ></button>
              {/* {props.indexPregunta.likes.length} */}

              <button
                type="button"
                style={{
                  color: dislike ? "#FF1053" : "",
                }}
                class="questionButton fas fa-thumbs-down"
                onClick={() => {
                  actions.Dislikes(
                    props.indexPregunta.id,
                    store.user.id,
                    props.indexPregunta.interviewer_id
                  );
                  handleDislike(); /* handleClickDislike(likes); */
                }}
                /* disabled={disabledDislike} */
              ></button>
              {/* {props.indexPregunta.dislikes.length} */}
            </div>
            <div class="trollAndDelete">
              <div class="popover__wrapper">
                <button
                  type="button"
                  style={{
                    color: troll ? "red" : "",
                  }}
                  class="trollAndDeleteButton fas fa-solid fa-ban"
                  onClick={() => {
                    actions.Trolls(
                      props.indexPregunta.id,
                      store.user.id,
                      props.indexPregunta.interviewer_id
                    );
                    handleTroll();
                  }}
                  /* disabled={disabledTroll} */
                ></button>
                <div class="popover__content">
                  <p class="popover__message">
                    Presiona este botón si consideras que esta pregunta es
                    troll, abusiva o viola las reglas de la comunidad
                  </p>
                </div>
              </div>
              {/* {props.indexPregunta.trolls.length} */}

              {store.user.id == props.indexPregunta.user_id ? (
                <button
                  class="trollAndDeleteButton fa-solid fa-trash text-danger"
                  onClick={() => {
                    actions.deletequestion(
                      props.indexPregunta.id,
                      props.indexPregunta.interviewer_id
                    );
                  }}
                ></button>
              ) : null}
            </div>
          </div>
        ) : null}

        {store.user.rol == 1 ? (
          (store.user.rol == 1 && props.indexPregunta.reject) ||
          props.indexPregunta.done ? ( // primero condicionar por rol, después por done o reject//
            <button
              onClick={() => {
                actions.done(props.indexPregunta.id, false);
                actions.reject(props.indexPregunta.id, false);
              }}
            >
              Deshacer
            </button>
          ) : (
            <>
              <button
                onClick={() => {
                  actions.done(props.indexPregunta.id, true);
                }}
              >
                Hecho
              </button>
              <button
                onClick={() => {
                  actions.reject(props.indexPregunta.id, true);
                }}
              >
                Rechazar
              </button>
            </>
          )
        ) : null}

        {/* {store.user.rol ==1 && props.indexPregunta.reject || props.indexPregunta.done ? ( // primero condicionar por rol, después por done o reject//
          <button
            onClick={() => {
              actions.done(props.indexPregunta.id, false);
              actions.reject(props.indexPregunta.id, false);
            }}
          >
            Deshacer
          </button>
        ) : store.user.rol == 1 ? (
          <>
            {" "}
            <button
              onClick={() => {
                actions.done(props.indexPregunta.id, true);
              }}
            >
              Hecho
            </button>
            <button
              onClick={() => {
                actions.reject(props.indexPregunta.id, true);
              }}
            >
              Rechazar
            </button>
          </>
        ) : null} */}
      </div>
    </div>
  );
};
