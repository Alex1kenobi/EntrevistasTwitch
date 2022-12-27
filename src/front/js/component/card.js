import React from "react";
import "../../styles/card.css";
import people1 from "../../../../docs/assets/cards/people1.jpg";
import people2 from "../../../../docs/assets/cards/people2.jpg";
import people3 from "../../../../docs/assets/cards/people3.jpg";
import people4 from "../../../../docs/assets/cards/people4.jpg";
import { Link } from "react-router-dom";

export const Card = () => {
  return (
    <>
      {/* Card 1 */}
      <div className="rotatingCard mx-2 my-2">
        <div className="cardFace cardFront">
          <img src={people1}></img>
          <div className="cardFrontText">
            <h3>Michael Libri</h3>
            <p className="mb-2">Content Creator</p>
          </div>
        </div>
        <div className="cardFace cardBack">
          <h3> Michael Libri</h3>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean
            vitae dapibus turpis. Sed ut odio vitae nulla placerat rhoncus.
            Maecenas ut mollis tellus. Maecenas dapibus.
          </p>
          <div className="cardLink d-flex justify-content-center my-3">
            <Link to="">
              <button className="callToAction" role="button">
                Mas Info
              </button>
            </Link>
          </div>
        </div>
      </div>
      {/* End of Card 1 */}
      {/* Card 2 */}
      <div className="rotatingCard mx-2 my-2">
        <div className="cardFace cardFront">
          <img src={people2}></img>
          <div className="cardFrontText">
            <h3>Jessica Biel</h3>
            <p className="mb-2">Actress</p>
          </div>
        </div>
        <div className="cardFace cardBack">
          <h3>Jessica Biel</h3>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean
            vitae dapibus turpis. Sed ut odio vitae nulla placerat rhoncus.
            Maecenas ut mollis tellus. Maecenas dapibus.
          </p>
          <div className="cardLink d-flex justify-content-center my-3">
            <Link to="">
              <button className="callToAction" role="button">
                Mas Info
              </button>
            </Link>
          </div>
        </div>
      </div>
      {/* End of Card 2 */}
      {/* Card 3 */}
      <div className="rotatingCard mx-2 my-2">
        <div className="cardFace cardFront">
          <img src={people3}></img>
          <div className="cardFrontText">
            <h3>Rafael Rowe</h3>
            <p className="mb-2">Documentalist</p>
          </div>
        </div>
        <div className="cardFace cardBack">
          <h3>Rafael Rowe</h3>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean
            vitae dapibus turpis. Sed ut odio vitae nulla placerat rhoncus.
            Maecenas ut mollis tellus. Maecenas dapibus.
          </p>
          <div className="cardLink d-flex justify-content-center my-3">
            <Link to="">
              <button className="callToAction" role="button">
                Mas Info
              </button>
            </Link>
          </div>
        </div>
      </div>
      {/* End of Card 3 */}
      {/* Card 4 */}
      <div className="rotatingCard mx-2 my-2">
        <div className="cardFace cardFront">
          <img src={people4}></img>
          <div className="cardFrontText">
            <h3>Nina Adams</h3>
            <p className="mb-2">Primary teacher</p>
          </div>
        </div>
        <div className="cardFace cardBack">
          <h3>Nina Adams</h3>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean
            vitae dapibus turpis. Sed ut odio vitae nulla placerat rhoncus.
            Maecenas ut mollis tellus. Maecenas dapibus.
          </p>
          <div className="cardLink d-flex justify-content-center my-3">
            <Link to="">
              <button className="callToAction" role="button">
                Mas Info
              </button>
            </Link>
          </div>
        </div>
      </div>
      {/* End of Card 4 */}
    </>
  );
};
