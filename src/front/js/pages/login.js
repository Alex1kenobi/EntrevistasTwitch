import React, { useState, useContext } from "react";
import "../../styles/login.css";
import { Context } from "../store/appContext";

import { useNavigate } from "react-router-dom";

import { LoginTwitch } from "../component/loginTwitch";

export const Login = () => {
  const { store, actions } = useContext(Context);
  const [error, setError] = useState("");
  const [user, setUser] = useState({});
  const [password2, setPassword2] = useState("");

  const navigate = useNavigate();

  const loginNavigate = async (user) => {
    try {
      await actions.login(user);
      if (store.logged) {
        navigate("/entrevistas");
      } else {
        setError(store.message);
      }
    } catch (error) {}
  };

  const verificarPasswords = (user) => {
    // Verificamos si las constraseñas no coinciden
    if (user.password != password2) {
      // Si las constraseñas no coinciden mostramos un mensaje
      setError("La contraseña no coincide");
    } else {
      actions.register(user);
      if (localStorage.getItem("token")) {
        navigate("/entrevistas");
      }
    }
  };

  {
    return (
      <div>
        <div id="msg"></div>

        {/* <!-- Mensajes de Verificación --> */}
        <div id="error" className="alert alert-danger ocultar" role="alert">
          Las Contraseñas no coinciden, vuelve a intentar !
        </div>
        <div id="ok" className="alert alert-success ocultar" role="alert">
          Las Contraseñas coinciden ! (Procesando formulario ... )
        </div>
        {/* <!-- Fin Mensajes de Verificación --> */}


        <div className="section">
          <div className="container">
            <div className="row full-height justify-content-center login-body">
              <div className="col-12 text-center align-self-center py-5">
                <div className="section pb-5 pt-5 pt-sm-2 text-center">
                  <h6 className="mb-0 pb-3">
                    <span>Entrar </span>
                    <span>Registro</span>
                  </h6>
                  <input
                    className="checkbox"
                    type="checkbox"
                    id="reg-log"
                    name="reg-log"
                  />

                  <label htmlFor="reg-log"></label>
                  <div className="card-3d-wrap mx-auto">
                    <div className="card-3d-wrapper">
                      <div className="card-front">
                        <div className="center-wrap">
                          <div className="section text-center">
                            <h4 className="mb-4 pb-3">Entrar</h4>
                            <div className="form-group">
                              <input
                                type="email"
                                onChange={(e) => {
                                  setUser({ ...user, email: e.target.value });
                                }}
                                name="logemail"
                                className="form-style"
                                placeholder="Tu email"
                                id="logemail"
                                autoComplete="off"
                              />
                              <i className="input-icon fas fa-envelope"></i>
                            </div>
                            <div className="form-group mt-2">
                              <input
                                type="password"
                                onChange={(e) => {
                                  setUser({
                                    ...user,
                                    password: e.target.value,
                                  });
                                }}
                                name="logpass"
                                className="form-style"
                                placeholder="Tu contraseña"
                                id="logpass"
                                autoComplete="off"
                              />
                              <i className="input-icon fas fa-key"></i>
                            </div>
                            <p>{error}</p>
                            <button
                              className="btn mt-4"
                              onClick={() => {
                                loginNavigate(user);
                              }}
                            >
                              Enviar
                            </button>
                            <p className="mb-0 mt-4 text-center">
                              <a href="#0" className="link">
                                ¿Olvidaste la contraseña?
                              </a>
                            </p>
                          </div>
                        </div>
                      </div>
                      <div className="card-back">
                        <div className="center-wrap">
                          <div className="section text-center">
                            <h4 className="mb-4 pb-3">Registro</h4>
                            <div className="form-group">
                              <input
                                type="text"
                                onChange={(e) => {
                                  setUser({
                                    ...user,
                                    rol_id: 2, // Esto del rol_id le pone rol "2" (usuario) a todo cristo
                                    username: e.target.value,
                                  });
                                }}
                                name="logname"
                                className="form-style"
                                placeholder="Nombre de usuario"
                                id="logname"
                                autoComplete="off"
                              />
                              <i className="input-icon fas fa-user"></i>
                            </div>
                            <div className="form-group mt-2">
                              <input
                                type="email"
                                onChange={(e) => {
                                  setUser({ ...user, email: e.target.value });
                                }}
                                name="logemail"
                                className="form-style"
                                placeholder="Tu email"
                                id="logemail"
                                autoComplete="off"
                              />
                              <i className="input-icon fas fa-envelope"></i>
                            </div>
                            <div className="form-group mt-2">
                              <input
                                type="password"
                                name="pass1"
                                className="form-style"
                                placeholder="Tu contraseña"
                                id="pass1"
                                autoComplete="off"
                                onChange={(e) =>
                                  setUser({ ...user, password: e.target.value })
                                }
                              />
                              <i className="input-icon fas fa-key"></i>
                            </div>
                            <div className="form-group mt-2">
                              <input
                                type="password"
                                name="pass2"
                                className="form-style"
                                placeholder="Repite tu contraseña"
                                id="pass2"
                                autoComplete="off"
                                onChange={(e) => setPassword2(e.target.value)}
                              />
                              <i className="input-icon fas fa-key"></i>
                            </div>

                            <p>{error}</p>
                            <button
                              href="#"
                              type="submit"
                              id="login"
                              className="btn mt-4"
                              onClick={() => {
                                verificarPasswords(user);
                              }}
                            >
                              Enviar
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
};
export default Login;
