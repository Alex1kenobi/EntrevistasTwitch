import React, {useContext} from "react";
import "../../styles/card.css";
import { Context } from "../store/appContext";
import { Link } from "react-router-dom";

export const Card = () => {
  const {store, actions} = useContext (Context)

  let yourDate = new Date();

  let pasadasEntrevistas = store.entrevistados.filter(function (a) {
    const dateObject = new Date(Date.parse(a.date));
    const isoDate = dateObject.toLocaleDateString();
    console.log(isoDate, "Isodate");

    if (isoDate < yourDate.toLocaleDateString().split("T")[0]) {
      return 1;
    }
    return 0;
  });

  return (
    <>
      {/* Card 1 */}
      <div className="rotatingCard mx-2 my-2">
        {pasadasEntrevistas.map((invitado) => {
          let dayinvitado = new Date(Date.parse(invitado.date));
          let isoInvitadoDate = dayinvitado.toLocaleDateString();
          return (
            <>
              <div className="cardFace cardFront">
                <img src={invitado.photo}></img>
                <div className="cardFrontText">
                  <h3>{invitado.name}</h3>
                  <p className="mb-2">{invitado.position}</p>
                </div>
              </div>
              <div className="cardFace cardBack">
                <h3> {invitado.name}</h3>
                <p>{invitado.description}</p>
                <p>{isoInvitadoDate}</p>
                <p>{invitado.hour.slice(0, 5)}</p>
                <div className="cardLink d-flex justify-content-center my-3">
                  <Link
                    to={"/entrevistas/" + invitado.id + "/" + invitado.name}
                  >
                    <button className="callToAction" role="button">
                      Mas Info
                    </button>
                  </Link>
                </div>
              </div>
            </>
          );
        })}
      </div>
      {/* End of Card 1 */}
    </>
  );
};
