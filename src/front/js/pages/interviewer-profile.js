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


  const [mensaje, setMensaje] = useState("");

  const [isActive, setIsActive] = useState(false);

  const handleClick = () => {
    // 👇️ toggle
    setIsActive(current => !current);
  };

  let { id } = useParams();

  useEffect(() => {
    actions.getEntrevistado(id);
    actions.getcategories()
  }, []);

var ordenLikes 

if (filtercategory == "") {

  ordenLikes = store.preguntas_entrevistado.sort(function(a, b) {
    if ((a.likes.length-a.dislikes.length) < (b.likes.length-b.dislikes.length)) {
      return 1;
    }
    if ((a.likes.length-a.dislikes.length) > (b.likes.length-b.dislikes.length)) {
      return -1;
    }
    return 0;
  });
  
} else {
  ordenLikes = store.filterCategory.sort(function(a, b) {
    if ((a.likes.length-a.dislikes.length) < (b.likes.length-b.dislikes.length)) {
      return 1;
    }
    if ((a.likes.length-a.dislikes.length) > (b.likes.length-b.dislikes.length)) {
      return -1;
    }
    return 0;
  });
}

 

  const handleQuestion = async () => {
    await actions.preguntas(store.entrevistado.id, text, selectcategory,store.user.id);
    if (selectcategory && text) {
      setText("");
      setSelectcategory("");
    }
    setMensaje(store.message_response);

  };

  return (
    <div>
      <div className="container">
        <div className="box">
          <div className="">
            <p className="h-dash text-center">{store.entrevistado.name}</p>
            <div className="avatar">
              <img
                src={store.entrevistado.photo}
                alt="Interviewed Picture"
                className="interviewedPicture "
              />
              <div className="interviewedPictureFrontText">
                <h3>{store.entrevistado.name}</h3>
                <p className="mb-2">{store.entrevistado.position}</p>
              </div>
            </div>
            <p>{store.entrevistado.description}</p>
          </div>

          <div className="needs-validation">
            {store.logged ? (
              <>
                <div htmlFor="validationCustom04" className="form-label">
                  <select
                    className="form-select"
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
                    className="form-control"
                    placeholder="Leave a comment here"
                    id="floatingTextarea2"
                    style={{ height: "100px" }}
                    value={text}
                    onChange={(e) => {
                      setText(e.target.value);
                    }}
                  ></textarea>
                  <label htmlFor="floatingTextarea2">
                    Pon aquí tu pregunta
                  </label>
                </div>

                <p>{mensaje}</p>
                <button
                  type="submit"
                  className="btn btn-primary"
                  onClick={async () => {
                    handleQuestion();
                  }}
                >
                  Enviar
                </button>
              </>
            ) : (
              <>
                <div htmlFor="validationCustom04" className="form-label">
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

                <p>{mensaje}</p>
                <button
                  type="submit"
                  className="btn btn-primary"
                  onClick={async () => {
                    handleQuestion();
                  }}
                  disabled
                >
                  Enviar
                </button>
              </>
            )}
            <div htmlFor="validationCustom04" className="form-label">
              <select
                className="form-select"
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

            <div>
              {ordenLikes.length > 0 ? (
                ordenLikes.map((indexPregunta) => {
                  return (
                    <div className="card-group">
                      <Likebar indexPregunta={indexPregunta} />
                    </div>
                  );
                })
              ) : (
                <p>Escribe tu pregunta</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
