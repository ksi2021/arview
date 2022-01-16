import React from "react";
import { Link } from "react-router-dom";
export default function Event({ data, removeItem }) {
  const [visability, visabilityHandler] = React.useState("hidden");
  return (
    <div
      style={{ textAlign: "left" }}
      onMouseEnter={() => visabilityHandler("visible")}
      onMouseLeave={() => visabilityHandler("hidden")}
    >
      <div className="d-flex justify-content-between">
        <div>
          {" "}
          <h5 style={{ textDecoration: "underline", color: "DodgerBlue" }}>
            {data.title}
          </h5>
        </div>

        <div style={{ visibility: visability, marginTop: "-5px" }}>
          <Link to={"/edit/" + data.id} >
            <button className="btn ">
              <img
                alt="edit"
                src="https://img.icons8.com/material/15/000000/edit--v1.png"
              />
            </button>
          </Link>
          <button onClick={() => removeItem(data.id)} className="btn ">
            <img
              alt="remove"
              src="https://img.icons8.com/material/15/000000/trash--v1.png"
            />
          </button>
        </div>
      </div>

      {data.money && <div>Бюджет: {data.money}</div>}
      {data.time && <div>Время: {data.time}</div>}
      {data.place && <div>Место: {data.place}</div>}
      {data.description && <div>Описание: {data.description}</div>}
      <hr></hr>
    </div>
  );
}
