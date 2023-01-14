
import React, { useState, useEffect, useContext } from "react";
import { Context } from "../store/appContext";

import "../../styles/profile-dashboard.css";
import "../../styles/profile.css";
import { QuestionTable } from "../component/question-table";
import swal from 'sweetalert'
import cuteMonster from "../../../../docs/assets/cards/cuteMonster.png"

/* 
import { MdLocationPin, MdEmail } from "react-icons/md"; */

export const UserProfile = () => {
  const { actions, store } = useContext(Context);

  const [show, setShow] = useState(true);
  const [show2, setShow2] = useState(true);

  const [user, setUser] = useState({});
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setInfo({
      ...info,
      [e.target.name]: e.target.value,
    });
  };

  const [password2, setPassword2] = useState("");

  const verificarPasswords = async (user) => {
    // Verificamos si las constraseñas no coinciden
    if (user.password || password2) {
      
      if (user.password != password2) {
        
        // Si las constraseñas no coinciden mostramos un mensaje
        setError("La contraseña no coincide");
      } else {
        await actions.editUser(user);
        
        if (store.message == "Cambios guardados") {
         
          swal({
            icon: "success",
            text: store.message,
          });
        }
      }
    } else {
      await actions.editUser(user);
      if (store.message == "Cambios guardados") {
        
        swal({
          icon: "success",
          text: store.message,
        });
      }
      
    }
  };

  return (
    <section>
      <div className="container profileContainer">
        <div className="box ">
          <p className="h-dash">Resumen de preguntas</p>
          <div className="d-flex mx-0 mt-2">
            <div className="col-md-4 p-0 border-end">
              <div className="viewbox">
                <p>Preguntas que has hecho</p>
                <p className="blue">{store.preguntas_current_user.length}</p>
              </div>
            </div>
            <div className="col-md-4 p-0 border-end">
              <div className="viewbox">
                <p>Preguntas aprobadas</p>
                <p className="blue">8</p>
              </div>
            </div>
            <div className="col-md-4 p-0">
              <div className="viewbox">
                <p>Entrevistas en las que has participado</p>
                <p className="blue">1</p>
              </div>
            </div>
          </div>
          <div>
            <div className="">
              <div className="d-flex mt-2 ">
                <span className="fas fa-users-cog mt-1"></span>
                <div className="w-100 border-top">
                  <p className="h-dash mt-3">Mi perfil</p>
                  <p className="textmuted mb-2">
                    Acceso a tus datos y contraseña
                  </p>
                  <div className="container">
                    <div className="container">
                      <div className="d-flex">
                        <div className="col-md-6 border-right">
                          <div className="d-flex flex-column align-items-center text-center p-3 py-5">
                            <img className="mt-5" src={cuteMonster} width="200" />
                            <div className="h-dash d-flex align-items-center">
                              <p className="textmuted me-3">Nombre de usuario</p>
                              <p className="h-dash">{store.user.username}</p>
                            </div>
                            <div className="h-dash d-flex align-items-center">
                              <p className="textmuted me-3">Email de usuario</p>
                              <p className="h-dash">{store.user.email}</p>
                            </div>
                          </div>
                        </div>
                        <div className="col-md-6">
                          <div className="p-3 py-5">
                            <div className="d-flex justify-content-between align-items-center mb-3">
                              <div className="d-flex flex-row align-items-center back"></div>
                            </div>
                            <div className="mt-2">
                              <div className="col-md-12">
                                <label>Cambia el nombre de usuario</label>
                                <input
                                  type="text"
                                  className="form-control"
                                  placeholder="Nombre de usuario"
                                  defaultValue={store.user.username}
                                  onChange={(e) =>
                                    setUser({
                                      ...user,
                                      username: e.target.value,
                                    })
                                  }
                                />
                              </div>
                            </div>
                            <div className="mt-3">
                              <div className="col-md-12">
                                <label>Cambia el email de usuario</label>
                                <input
                                  type="text"
                                  className="form-control"
                                  defaultValue={store.user.email}
                                  placeholder="Email"
                                  onChange={(e) =>
                                    setUser({ ...user, email: e.target.value })
                                  }
                                />
                              </div>
                            </div>
                            <div className="mt-3">
                              <div className="col-md-12">
                                <label>Cambia la contraseña de usuario</label>
                                <input
                                  type="password"
                                  className="form-control"
                                  placeholder="Cambia contraseña"
                                  onChange={(e) =>
                                    setUser({
                                      ...user,
                                      password: e.target.value,
                                    })
                                  }
                                />
                              </div>
                            </div>
                            <div className="mt-3">
                              <div className="col-md-12">
                                <label>Repite la nueva contraseña</label>
                                <input
                                  type="password"
                                  className="form-control"
                                  onChange={(e) => setPassword2(e.target.value)}
                                  placeholder="Confirmar Contraseña"
                                />
                              </div>
                            </div>
                            <p>{error}</p>
                            <div className="mt-5 text-right d-flex justify-content-center">
                              <button
                                className=" callToAction"
                                type="button"
                                onClick={() => {
                                  verificarPasswords(user);
                                }}
                              >
                                Guardar cambios
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="d-flex mt-2">
                <span className="fas fa-bookmark ms-0 mt-1"></span>
                <div className="w-100 border-top ps-2">
                  <p className="h-dash mt-3">Mis interacciones</p>
                  <p className="textmuted mb-2">
                    Registro de preguntas y a quien se las hiciste
                  </p>
                </div>
              </div>
              <QuestionTable />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
