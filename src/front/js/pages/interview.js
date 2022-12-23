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
              <p className="h-dash">Entrevistas</p>
              <div className="row bg-light"></div>
              <Card2/>
            </div>
          </div>
        </section>
      </>
    );
}


export default Interview;