import React, { useEffect, useContext } from "react";
import "../../styles/card2.css";
import { Context } from "../store/appContext";
import { Link } from "react-router-dom";

export const Card2 = () => {
  const { store, actions } = useContext(Context);
  useEffect(() => {
    actions.getEntrevistados();
    
    
  }, []);

  return (
    <div className="container">
      <div className="row justify-content-around">
        {store.entrevistados.map((invitado) => {
          return (
            <div className="col-12 col-sm-6 col-lg-3 mt-5 mx-2">
              <div
                className="single_advisor_profile wow fadeInUp"
                data-wow-delay="0.2s"
                style={{
                  visibility: "visible",
                  animationDelay: "0.2s",
                  animationName: "fadeInUp",
                }}
              >
                {/* <!-- Team Thumb--> */}
                <div className="advisor_thumb">
                  <img
                    src={invitado.photo}
                    alt=""
                  />
                  {/* <!-- Social Info--> */}
                  <div className="social-info">
                    <a href="#">
                      <i className="fa fa-facebook"></i>
                    </a>
                    <a href="#">
                      <i className="fa fa-twitter"></i>
                    </a>
                    <a href="#">
                      <i className="fa fa-linkedin"></i>
                    </a>
                  </div>
                </div>
                {/*   <!-- Team Details--> */}
                <Link to={"/entrevistas/"+invitado.id+"/"+invitado.name}>
                <div className="single_advisor_details_info">
                  <h6>{invitado.name}</h6>
                  <p className="designation">{invitado.position}</p>
                </div>
                </Link>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
