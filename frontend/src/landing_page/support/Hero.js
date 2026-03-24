import React from "react";

function Hero() {
  return (
    <section className="container-fluid" id="supportHero">
      <div id="supportWrapper">
        <h4 className="mb-0 fw-semibold">Support Portal</h4>
        <a href="">Track Tickets</a>
      </div>
      <div className="row px-3 px-md-5 py-4">
        <div className="col-12 col-md-6 p-3">
          <h2 className="fs-4 fw-semibold mb-3">
            Search for an answer or browse help topics to create a ticket
          </h2>
          <input placeholder="Eg. how do I activate F&O" />
          <div className="mt-3 d-flex flex-wrap gap-3">
            <a href="">Track account opening</a>
            <a href="">Track segment activation</a>
            <a href="">Intraday margins</a>
            <a href="">Kite user manual</a>
          </div>
        </div>
        <div className="col-12 col-md-6 p-3">
          <h2 className="fs-4 fw-semibold mb-3">Featured</h2>
          <ol>
            <li className="mb-2">
              <a href="">Current Takeovers and Delisting - January 2024</a>
            </li>
            <li className="mb-2">
              <a href="">Latest Intraday leverages - MIS &amp; CO</a>
            </li>
          </ol>
        </div>
      </div>
    </section>
  );
}

export default Hero;
