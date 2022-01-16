import React from "react";
import Action from "./Event";
import { Link } from "react-router-dom";

function App() {
  const currentDate = new Date();
  const [calendar, calendarHandler] = React.useState("");
  const [parsData, dataHandler] = React.useState("");

  async function getData() {
    let response = await fetch("http://localhost:3000/tasks/");
    let content = await response.json();
    localStorage.setItem("array", JSON.stringify(content));
  }

  function updateData() {
    getData();
    //костыль , без задержки данные не успевают нормально обновиться
    setTimeout(() => {
      let temp = JSON.parse(localStorage.getItem("array"));
      dataHandler(temp.filter((element) => element.data == calendar));
    }, 200);
  }
   
  

  React.useEffect(() => {
    // dataHandler(temp.filter((element) => element.data == calendar));
    updateData();
    let temp = JSON.parse(localStorage.getItem("array"));
    dataHandler(temp.filter((element) => element.data == calendar));
    // console.log("получение данных calendar");

  
  }, [calendar]);

  function RemoveItem(id) {
    dataHandler(parsData.filter((el) => el.id != id));
    fetch("http://localhost:3000/tasks/" + id, { method: "DELETE" });
    getData();
  }

  React.useEffect(() => {
    // getData();

    calendarHandler(
      currentDate.getFullYear() +
        "-" +
        currentDate.getMonth() +
        1 +
        "-" +
        currentDate.getDate()
    );

    // let temp = JSON.parse(localStorage.getItem("array"));
    // console.log('запись в dataHendler')
    // // dataHandler(temp);
    // updateData();
  }, []);

  function saveData() {
    !!calendar && localStorage.setItem("currentDate", calendar);
  }

  return (
    <div className="App container text-center monster d-flex justify-content-center mt-3">
      <div>
        <input
          type="date"
          value={calendar}
          onChange={(event) => calendarHandler(event.target.value)}
        />

        {calendar && (
          <Link
            to="/create"
            onClick={saveData}
            style={{ textDecoration: "none" }}
          >
            <div
              style={{ border: "1px solid black", borderRadius: "5px" }}
              className="p-1 mt-2 createButton"
            >
              Добавить
            </div>
          </Link>
        )}
      </div>
      <div className="events p-2" style={{ height: "autho" }}>
        {parsData &&
          parsData.map((el, id) => (
            <Action key={id} removeItem={RemoveItem} data={el} />
          ))}
        {parsData.length === 0 && <strong>На [{calendar}] нет записей</strong>}
      </div>
    </div>
  );
}

export default App;
