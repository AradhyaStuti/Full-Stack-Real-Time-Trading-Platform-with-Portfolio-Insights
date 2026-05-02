import React from "react";

function Hero() {
  return (
    <section className="container-fluid" id="supportHero">
      <div id="supportWrapper">
        <h4 className="mb-0 fw-semibold">Support Portal</h4>
        <span>Track Tickets</span>
      </div>
      <div className="row px-3 px-md-5 py-4">
        <div className="col-12 col-md-6 p-3">
          <h2 className="fs-4 fw-semibold mb-3">
            Search for an answer or browse help topics to create a ticket
          </h2>
          <input placeholder="Eg. how do I activate F&O" />
          <div className="mt-3 d-flex flex-wrap gap-3">
            <span>Track account opening</span>
            <span>Track segment activation</span>
            <span>Intraday margins</span>
            <span>Kite user manual</span>
          </div>
        </div>
        <div className="col-12 col-md-6 p-3">
          <h2 className="fs-4 fw-semibold mb-3">Featured</h2>
          <ol>
            <li className="mb-2">Current Takeovers and Delisting - January 2024</li>
            <li className="mb-2">Latest Intraday leverages - MIS &amp; CO</li>
          </ol>
        </div>
      </div>
    </section>
  );
}

export default Hero;
