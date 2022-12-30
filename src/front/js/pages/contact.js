import React, { useState, useEffect, useContext } from "react";
import { Context } from "../store/appContext";
import "../../styles/contact.css";

export const Contact = () => {
  return (
    <section>
      <div className="container profileContainer">
        <div className="box">
          <p className="h-dash">Contáctanos para una entrevista</p>
          <div className="">
            <form className="contactForm p-5">
              <div className="mb-3">
                <label htmlFor="exampleInputName" className="form-label">
                  Tu Nombre Completo
                </label>
                <input
                  type="text"
                  className="form-control bg-dark text-light"
                  id="exampleInputName"
                />
              </div>
              <div className="mb-3">
                <label htmlFor="exampleInputEmail1" className="form-label">
                  Tu dirección de correo
                </label>
                <input
                  type="email"
                  className="form-control bg-dark text-light"
                  id="exampleInputEmail1"
                  aria-describedby="emailHelp"
                />
                <div id="emailHelp" className="form-text text-info">
                  Recuerda que no compartiremos tu cuenta de correo electrónico
                  con nadie más.
                </div>
              </div>
              <div className="mb-3">
                <label htmlFor="exampleInputPhoneNumber" className="form-label">
                  Tu Número de teléfono
                </label>
                <input
                  type="text"
                  className="form-control bg-dark text-light"
                  id="exampleInputPhoneNumber"
                />
              </div>
              <div className="mb-3">
                <label htmlFor="exampleInputTopic" className="form-label">
                  El tema de tu entrevista
                </label>
                <input
                  type="text"
                  className="form-control bg-dark text-light"
                  id="exampleInputTopic"
                />
              </div>
              <div className="mb-3">
                <label htmlFor="exampleInputMoreDetails" className="form-label">
                  Más detalles de la entrevista
                </label>
                <input
                  type="text"
                  className="form-control bg-dark text-light"
                  id="exampleInputMoreDetails"
                />
              </div>
              <div className="mb-3">
                <label
                  htmlFor="exampleInputPossibleDates"
                  className="form-label"
                >
                  Posibles fechas para la entrevista
                </label>
                <input
                  type="text"
                  className="form-control bg-dark text-light"
                  id="exampleInputPossibleDates"
                />
              </div>
              <div className="form-text text-info">
                Nos pondremos en contacto contigo a la mayor brevedad
              </div>
              <div className=" d-flex justify-content-center mt-5">
                <button type="submit" className="callToAction">
                  Enviar
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};
