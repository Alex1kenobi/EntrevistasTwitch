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
          <h3 className="text-center my-5">Entrevistas</h3>
            <div className="box">
              <p className=" ms-5">Consulta las entrevistas que hemos hecho hasta el momento</p>
              <div className="row bg-light"></div>
              <Card2/>
            </div>
          </div>
        </section>
      </>
    );
}


export default Interview;