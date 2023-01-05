import React, { useEffect, useContext, useState } from "react";
import { useParams } from "react-router-dom";
import { Context } from "../store/appContext";

import "../../styles/responsive.css";
import "../../styles/interviewer-profile.css";
import { Likebar } from "../component/like-bar";

export const InterviewerProfile = () => {
  const { store, actions } = useContext(Context);
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
      <div className="container profileContainer">
        <div className="box">
          <p className="h-dash">Más detalles de la entrevista</p>
          <div className="d-flex my-5">
            <div className="col-6 border-end">
              <div className="d-flex justify-content-center">
                <div className="interviewCard mx-2 my-4">
                  <div className="interviewCardFace interviewCardFront">
                    <img src={store.entrevistado.photo}></img>
                    <div className="interviewCardText">
                      <h3>{store.entrevistado.name}</h3>
                      <p className="mb-2">{store.entrevistado.position}</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="text-center p-4">
                <h5>{store.entrevistado.description}</h5>
              </div>
            </div>

            <div className="needs-validation col-6 d-flex flex-column justify-content-around p-5">
              {store.logged ? (
                <>
                  <div htmlFor="validationCustom04" className="form-label">
                    <label> Selecciona una categoria de pregunta</label>
                    <select
                      className="form-select text-info bg-dark"
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
                            <option value={category.id}>{category.name}</option>
                          </>
                        );
                      })}
                    </select>
                    <label htmlFor="floatingSelect"></label>
                  </div>

                  <div className="form-floating">
                    <textarea
                      className="form-control bg-dark text-light"
                      placeholder="Leave a comment here"
                      id="floatingTextarea2"
                      style={{ height: "350px" }}
                      value={text}
                      onChange={(e) => {
                        setText(e.target.value);
                      }}
                    ></textarea>
                    <label htmlFor="floatingTextarea2">
                      Pon aquí tu pregunta
                    </label>
                  </div>

                  <h6 className="text-danger">{mensaje}</h6>
                  <div className="d-flex justify-content-center">
                    <button
                      type="submit"
                      className="callToAction mt-3"
                      onClick={async () => {
                        handleQuestion();
                      }}
                    >
                      Enviar
                    </button>
                  </div>
                </>
              ) : (
                <>
                  <div htmlFor="validationCustom04" className="form-label">
                    <label> Selecciona una categoria de pregunta</label>
                    <select
                      className="form-select"
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
                            <option value={category.id}>{category.name}</option>
                          </>
                        );
                      })}
                    </select>
                    <label htmlFor="floatingSelect"></label>
                  </div>

                  <div className="form-floating">
                    <textarea
                      className="form-control"
                      placeholder="Leave a comment here"
                      id="floatingTextarea2"
                      style={{ height: "100px" }}
                      value={text}
                      onChange={(e) => {
                        setText(e.target.value);
                      }}
                      disabled
                    ></textarea>
                    <label htmlFor="floatingTextarea2">
                      Inicia sesión para hacer una pregunta
                    </label>
                  </div>

                  <h6 className="text-danger">{mensaje}</h6>
                  <div className="d-flex justify-content-center">
                    <button
                      type="submit"
                      className="callToAction mt-3"
                      onClick={async () => {
                        handleQuestion();
                      }}
                      disabled
                    >
                      Enviar
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>
          {store.logged ? (
            <div className="needs-validation">
              <div htmlFor="validationCustom04" className="form-label">
                <label>Filtra las preguntas por categoría</label>
                <select
                  className="form-select bg-dark text-info"
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
                <label htmlFor="floatingSelect"></label>
              </div>

              <h1 className="h-dash mb-3">PREGUNTAS PENDIENTES</h1>
              <div className="d-flex flex-wrap">
                {ordenLikes.length > 0 ? (
                  ordenLikes.map((indexPregunta) => {
                    console.log(indexPregunta);

                    if (
                      indexPregunta.done == false &&
                      indexPregunta.reject == false
                    ) {
                      return (
                        <div className="card-group px-3 m-2">
                          <Likebar indexPregunta={indexPregunta} />
                        </div>
                      );
                    }
                  })
                ) : (
                  <p>Escribe tu pregunta</p>
                )}
              </div>
              <div className="d-flex justify-content-around mt-5">
                <div>
                  <h1 className="h-dash mb-3">PREGUNTAS REALIZADAS</h1>
                  <div className="d-flex flex-wrap border-end doneQuestions">
                    {ordenLikes.length > 0
                      ? ordenLikes.map((indexPregunta) => {
                          if (
                            indexPregunta.done == true &&
                            indexPregunta.reject == false
                          ) {
                            return (
                              <div className="card-group px-3 m-2">
                                <Likebar indexPregunta={indexPregunta} />
                              </div>
                            );
                          }
                        })
                      : null}
                  </div>
                  </div>

                  <div>
                    <h1 className="h-dash mb-3">PREGUNTAS RECHAZADAS</h1>
                    <div className=" doneQuestions d-flex flex-wrap border-start">
                      {ordenLikes.length > 0
                        ? ordenLikes.map((indexPregunta) => {
                            if (
                              indexPregunta.done == false &&
                              indexPregunta.reject == true
                            ) {
                              return (
                                <div className="card-group px-3 m-2">
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
          ) : (
            <p> Inicia sesión para hacer una pregunta </p>
          )}
        </div>
      </div>
    </div>
  );
};
