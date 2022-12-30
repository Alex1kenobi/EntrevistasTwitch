import React, { useContext } from "react";
import { Context } from "../store/appContext";
import "../../styles/interview.css";
import {Card} from "../component/card"
import {Card2} from "../component/card2"


export const Interview = () => {
    return (
      <>
        <section>
          <div className="container profileContainer">
            <div className="box">
              <h3 className="h-dash text-center">Entrevistas</h3>
              <p className="ms-5">
                Consulta las entrevistas que hemos hecho hasta el momento
              </p>
              <Card2 />
            </div>
          </div>
        </section>

        <section className="">
          <div className="container text-center">
            <div className="homeSection flex-column">
              <h2 className="my-5">Próximas Entrevistas</h2>

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