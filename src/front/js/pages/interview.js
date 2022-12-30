import React, { useContext } from "react";
import { Context } from "../store/appContext";
import "../../styles/interview.css";
import {Card} from "../component/card"
import {Card2} from "../component/card2"


export const Interview = () => {
    return (
      <>
        <section>
          <div className="container profileContainer text-center">
            <div className="box">
            <h2 className="my-5">Próximas Entrevistas</h2>
              <p className="ms-5">
                Apúntate o pregunta cosas bonitas a las próximas entrevistas del magestuoso shrek
              </p>
              <Card2 />
            </div>
          </div>
        </section>

        <section className="">
          <div className="container text-center">
            <div className="homeSection flex-column">
              <h2 className="my-5">Entrevistas pasadas</h2>
              <p className="ms-5">
                Consulta las entrevistas que hemos hecho hasta el momento
              </p>
              <div className="d-flex align-items-center justify-content-center mb-5 flex-wrap">
                <Card />
              </div>
            </div>
          </div>
        </section>
      </>
    );
}


export default Interview;