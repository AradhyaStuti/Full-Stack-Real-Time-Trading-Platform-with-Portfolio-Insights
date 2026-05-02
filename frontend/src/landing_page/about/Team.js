import React from "react";

function Team() {
  return (
    <div className="container py-5">
      <div className="text-center border-top pt-5 mb-5">
        <h2 className="fw-bold" style={{ color: "#1a1a2e" }}>People</h2>
      </div>

      <div className="row align-items-center justify-content-center pb-5">
        <div className="col-md-4 text-center mb-4 mb-md-0">
          <img
            src="media/avatar.png"
            alt="Aradhya Stuti"
            style={{ borderRadius: "50%", width: "160px", height: "160px", objectFit: "cover", border: "3px solid #e8eaf0" }}
          />
          <h5 className="mt-4 mb-1 fw-semibold">Aradhya Stuti</h5>
          <p style={{ color: "#387ed1", fontSize: "0.9rem" }}>AI/ML Engineer &amp; Full-Stack Developer</p>
          <div className="d-flex justify-content-center gap-3 mt-2">
            <a
              href="https://github.com/AradhyaStuti"
              target="_blank"
              rel="noreferrer"
              className="btn btn-sm"
              style={{ border: "1px solid #ddd", borderRadius: "6px", fontSize: "0.85rem", color: "#333" }}
            >
              <i className="fa fa-github me-1" aria-hidden="true"></i> GitHub
            </a>
            <a
              href="https://linkedin.com/in/aradhya-stuti-9b2b9529a"
              target="_blank"
              rel="noreferrer"
              className="btn btn-sm"
              style={{ border: "1px solid #ddd", borderRadius: "6px", fontSize: "0.85rem", color: "#333" }}
            >
              <i className="fa fa-linkedin me-1" aria-hidden="true"></i> LinkedIn
            </a>
          </div>
        </div>

        <div className="col-md-6 ps-md-5">
          <p className="text-muted" style={{ lineHeight: "1.8", fontSize: "1rem" }}>
            Aradhya works across machine learning and full-stack web. Most of her time goes into deep learning and
            computer vision, with the rest split between Node, React, and the bits that hold them together.
          </p>
          <p className="text-muted" style={{ lineHeight: "1.8", fontSize: "1rem" }}>
            Past projects include a PCB defect detector, a student depression prediction model, and a handful of
            full-stack apps built on the React + Node + MongoDB stack.
          </p>
          <p className="text-muted" style={{ lineHeight: "1.8", fontSize: "1rem" }}>
            This trading platform is one of those side projects — built to play with real-time data, websocket
            streaming, and the kind of UI patterns you find in actual broker dashboards.
          </p>
          <p className="text-muted" style={{ lineHeight: "1.8", fontSize: "1rem" }}>
            On the ML side, she spends a lot of time on model tuning, deployment, and getting things to run fast
            enough to be useful on real data.
          </p>
        </div>
      </div>
    </div>
  );
}

export default Team;
