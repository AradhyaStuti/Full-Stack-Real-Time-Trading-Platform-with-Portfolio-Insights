import React from "react";

function Hero() {
  return (
    <div className="container">
      <div className="row py-4 py-md-5 mt-3 mt-md-5 mb-3 mb-md-5 text-center">
        <h1 className="fw-bold" style={{ color: "#1a1a2e" }}>
          We pioneered the discount broking model in India.
          <br className="d-none d-md-block" />
          {" "}Now, we are breaking ground with our technology.
        </h1>
      </div>

      <div className="row py-4 py-md-5 border-top text-muted" style={{ lineHeight: "1.8", fontSize: "1.05rem" }}>
        <div className="col-12 col-md-6 px-3 px-md-5 mb-4 mb-md-0">
          <p>
            We kick-started operations on the 15th of August, 2010 with the goal
            of breaking all barriers that traders and investors face in India in
            terms of cost, support, and technology.
          </p>
          <p>
            Today, our disruptive pricing models and in-house technology have
            made us the biggest stock broker in India.
          </p>
          <p>
            Over 1+ Crore clients place millions of orders every day through our
            powerful ecosystem of investment platforms, contributing over 15% of
            all Indian retail trading volumes.
          </p>
        </div>
        <div className="col-12 col-md-6 px-3 px-md-5">
          <p>
            In addition, we run a number of popular open online educational and
            community initiatives to empower retail traders and investors.
          </p>
          <p>
            <a href="" style={{ textDecoration: "none", color: "#387ed1" }}>
              Rainmatter
            </a>
            , our fintech fund and incubator, has invested in several fintech
            startups with the goal of growing the Indian capital markets.
          </p>
          <p>
            And yet, we are always up to something new every day. Catch up on
            the latest updates on our blog or see what the media is saying about
            us.
          </p>
        </div>
      </div>
    </div>
  );
}

export default Hero;
