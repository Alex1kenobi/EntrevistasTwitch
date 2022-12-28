import React, { useEffect, useContext, useState } from "react";
import { useParams } from "react-router-dom";
import { Context } from "../store/appContext";

import "../../styles/responsive.css";
import "../../styles/interviewer-profile.css";
import { Likebar } from "../component/like-bar";

export const InterviewerProfile = () => {
  const {store, actions} = useContext(Context);
  const [text, setText] = useState("");

  const [selectcategory, setSelectcategory] = useState("");
  const [filtercategory, setFiltercategory] = useState("");

  // const [Done, setDone] = useState("");
  // const [Reject, setReject] = useState("");

  const [mensaje, setMensaje] = useState("");

  const [isActive, setIsActive] = useState(false);

  const handleClick = () => {
    // 👇️ toggle
    setIsActive((current) => !current);
  };

  let { id } = useParams();

  useEffect(() => {
    actions.getEntrevistado(id);
    actions.getcategories();
  }, []);


  var ordenLikes;

  if (filtercategory == "") {
    ordenLikes = store.preguntas_entrevistado.sort(function (a, b) {
      if (
        a.likes.length - a.dislikes.length <
        b.likes.length - b.dislikes.length
      ) {
        return 1;
      }
      if (
        a.likes.length - a.dislikes.length >
        b.likes.length - b.dislikes.length
      ) {
        return -1;
      }
      return 0;
    });
  } else {
    ordenLikes = store.filterCategory.sort(function (a, b) {
      if (
        a.likes.length - a.dislikes.length <
        b.likes.length - b.dislikes.length
      ) {
        return 1;
      }
      if (
        a.likes.length - a.dislikes.length >
        b.likes.length - b.dislikes.length
      ) {
        return -1;
      }
      return 0;
    });
  }

  const handleQuestion = async () => {
    await actions.preguntas(
      store.entrevistado.id,
      text,
      selectcategory,
      store.user.id
    );
    if (selectcategory && text) {
      setText("");
      setSelectcategory("");
    }
    setMensaje(store.message_response);
  };

  return (
    <div>
      <div>
        <body class="profile-page">
          <div class="page-header header-filter"></div>
          <div class="main main-raised">
            <div class="profile-content">
              <div class="container">
                <div class="row">
                  <div class="ml-auto mr-auto">
                    <div class="profile">
                      <div class="avatar">
                        <img
                          src={store.entrevistado.photo}
                          alt="Circle Image"
                          class="img-raised rounded-circle img-fluid"
                        />
                      </div>
                      <div class="name">
                        <h3 class="title">{store.entrevistado.name}</h3>
                        <h6>{store.entrevistado.position}</h6>
                      </div>
                      <p>{store.entrevistado.description}</p>
                    </div>
                  </div>
                </div>
                <h1>CREA TU PREGUNTA</h1>
                <div classname="needs-validation">
                  {store.logged ? (
                    <>
                      <div for="validationCustom04" class="form-label">
                        <select
                          class="form-select"
                          aria-label="Floating label select example"
                          id="validationCustom04"
                          required
                          value={selectcategory}
                          onChange={(e) => {
                            setSelectcategory(e.target.value);
                          }}
                        >
                          <option selected disabled value="">
                            Selecciona una opción
                          </option>
                          {store.categories.map((category) => {
                            return (
                              <>
                                <option value={category.id}>
                                  {category.name}
                                </option>
                              </>
                            );
                          })}
                        </select>
                        <label for="floatingSelect"></label>
                      </div>

                      <div class="form-floating">
                        <textarea
                          class="form-control"
                          placeholder="Leave a comment here"
                          id="floatingTextarea2"
                          style={{ height: "100px" }}
                          value={text}
                          onChange={(e) => {
                            setText(e.target.value);
                          }}
                        ></textarea>
                        <label for="floatingTextarea2">
                          Pon aquí tu pregunta
                        </label>
                      </div>

                      <p>{mensaje}</p>
                      <button
                        type="submit"
                        class="btn btn-primary"
                        onClick={async () => {
                          handleQuestion();
                        }}
                      >
                        Enviar
                      </button>
                    </>
                  ) : (
                    <>
                      <div for="validationCustom04" class="form-label">
                        <select
                          class="form-select"
                          aria-label="Floating label select example"
                          id="validationCustom04"
                          required
                          value={selectcategory}
                          onChange={(e) => {
                            setSelectcategory(e.target.value);
                          }}
                          disabled
                        >
                          <option selected disabled value="">
                            Selecciona una opción
                          </option>
                          {store.categories.map((category) => {
                            return (
                              <>
                                <option value={category.id}>
                                  {category.name}
                                </option>
                              </>
                            );
                          })}
                        </select>
                        <label for="floatingSelect"></label>
                      </div>

                      <div class="form-floating">
                        <textarea
                          class="form-control"
                          placeholder="Leave a comment here"
                          id="floatingTextarea2"
                          style={{ height: "100px" }}
                          value={text}
                          onChange={(e) => {
                            setText(e.target.value);
                          }}
                          disabled
                        ></textarea>
                        <label for="floatingTextarea2">
                          Inicia sesión para hacer una pregunta
                        </label>
                      </div>

                      <p>{mensaje}</p>
                      <button
                        type="submit"
                        class="btn btn-primary"
                        onClick={async () => {
                          handleQuestion();
                        }}
                        disabled
                      >
                        Enviar
                      </button>
                    </>
                  )}
                  <div for="validationCustom04" class="form-label">
                    <select
                      class="form-select"
                      aria-label="Floating label select example"
                      id="validationCustom04"
                      required
                      value={filtercategory}
                      onChange={(e) => {
                        setFiltercategory(e.target.value);
                      }}
                      onClick={() => {
                        actions.filterCategory(filtercategory);
                      }}
                    >
                      <option selected value="">
                        Ver todas las preguntas
                      </option>
                      {store.categories.map((category) => {
                        return (
                          <>
                            <option value={category.id}>{category.name}</option>
                          </>
                        );
                      })}
                    </select>
                    <label for="floatingSelect"></label>
                  </div>

                  <div>
                  <h1>PREGUNTAS PENDIENTES</h1>
                    {ordenLikes.length > 0 ? (
                      ordenLikes.map((indexPregunta) => {
                        console.log(indexPregunta);

                        if (
                          indexPregunta.done == false &&
                          indexPregunta.reject == false
                        ) {
                          return (
                            <div className="card-group">
                              <Likebar indexPregunta={indexPregunta} />
                            </div>
                          );
                        }
                      })
                    ) : (
                      <p>Escribe tu pregunta</p>
                    )}
                  </div>
                  <div></div>

                  <div>
                    <h1>PREGUNTAS REALIZADAS</h1>
                    {ordenLikes.length > 0
                      ? ordenLikes.map((indexPregunta) => {
                          if (
                            indexPregunta.done == true &&
                            indexPregunta.reject == false
                          ) {
                            return (
                              <div className="card-group">
                                <Likebar indexPregunta={indexPregunta} />
                              </div>
                            );
                          }
                        })
                      : null}
                  </div>

                  <div>
                    <h1>PREGUNTAS RECHAZADAS</h1>
                    {ordenLikes.length > 0
                      ? ordenLikes.map((indexPregunta) => {
                          if (
                            indexPregunta.done == false &&
                            indexPregunta.reject == true
                          ) {
                            return (
                              <div className="card-group">
                                <Likebar indexPregunta={indexPregunta} />
                              </div>
                            );
                          }
                        })
                      : null}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </body>
      </div>
    </div>
  );
};
