import React, { useRef, useState } from "react";
import { Link } from "react-router-dom";


export default function AddEvent() {

  //   const typesEvent_eng = ["publicHolidays", "Notes", "Events"];
  const typesEvent_ru = ["Праздничные дни", "Заметки", "Мероприятия"];
  const [typeEvent, typeHandler] = useState("Праздничные дни");
  const [title, titleHandler] = useState("");
  const [money, moneyHandler] = useState("");
  const [description, descriptionHandler] = useState("");
  const [time, timeHandler] = useState("");
  const [place, placeHandler] = useState("");

  //константы для вывода сообщений в форме
  const titleError = useRef(null);
  const [titleError_, titleError_Handler] = useState(null);
  const descriptionError = useRef(null);
  const [descriptionError_, descriptionError_Handler] = useState(null);
  const timeError = useRef(null);
  const [timeError_, timeError_Handler] = useState(null);
  const moneyError = useRef(null);
  const [moneyError_, moneyError_Handler] = useState(null);
  const placeError = useRef(null);
  const [placeError_, placeError_Handler] = useState(null);

  //Проверка на присутствие даты в localstorage
  React.useEffect(() => {
    if (!localStorage.getItem("currentDate")) window.location = "/";
  }, []);

  React.useEffect(() => {
    console.log(typeEvent);
  }, [typeEvent]);

  function SubmitEvent(event) {
    let data;
    let errorCount = 0;
    event.preventDefault();

    if (!title || title.length < 4) {
      errorCount++;
      titleError.current.style.background = "red";
      titleError_Handler(
        "Обязательно для заполнения , минимальная длина 4 символа"
      );
    } else {
      console.log("test");
      titleError.current.style.background = "white";
      titleError_Handler("");
    }
    switch (typeEvent) {
      case typesEvent_ru[0]:
        if (!money) {
          errorCount++;
          moneyError.current.style.background = "red";
          moneyError_Handler("Обязательно для заполнения*");
        } else {
          console.log("test");
          moneyError.current.style.background = "white";
          moneyError_Handler("");
          data = {
            title: title,
            typeEvent: typeEvent,
            money: money,
            data: localStorage.getItem("currentDate"),
          };
        }
        break;
      case typesEvent_ru[1]:
        if (!description || description.length < 4) {
          errorCount++;
          descriptionError.current.style.background = "red";
          descriptionError_Handler(
            "Обязательно для заполнения , минимальная длина 4 символа"
          );
        } else {
          console.log("test");
          descriptionError.current.style.background = "white";
          descriptionError_Handler("");

          data = {
            title: title,
            typeEvent: typeEvent,
            description: description,
            data: localStorage.getItem("currentDate"),
          };
        }

        break;
      case typesEvent_ru[2]:
        if (!place || place.length < 4) {
          errorCount++;
          placeError.current.style.background = "red";
          placeError_Handler(
            "Обязательно для заполнения , минимальная длина 4 символа"
          );
        } else {
          console.log("test");
          placeError.current.style.background = "white";
          placeError_Handler("");
        }
        if (!time || place.length < 4) {
          errorCount++;
          timeError.current.style.background = "red";
          timeError_Handler(
            "Обязательно для заполнения , минимальная длина 4 символа"
          );
        } else {
          console.log("test");
          timeError.current.style.background = "white";
          placeError_Handler("");
        }
        data = {
          title: title,
          typeEvent: typeEvent,
          place: place,
          time: time,
          data: localStorage.getItem("currentDate"),
        };
        break;
      default:
        alert("error");
        break;
    }
    if (errorCount === 0) {
      fetch("http://localhost:3000/tasks", {
        method: "POST",
        headers: {
          "Content-Type": "application/json;charset=utf-8",
        },
        body: JSON.stringify(data),
      });
      
      return window.location = "/";
    }
  }

  return (
    <div className="container text-center">
      <form method="post" onSubmit={SubmitEvent}>
        <h1>Добавить событие</h1>
        <div>
          <label htmlFor="nameEvent">Название события</label>
          <input
            value={title}
            onChange={(e) => titleHandler(e.target.value)}
            ref={titleError}
            className="form-control"
            id="nameEvent"
          />
          <small className="text-danger">{titleError_}</small>
        </div>
        <div>
          <label htmlFor="typeEvent">Тип события</label>
          <select
            className="form-select"
            value={typeEvent}
            id="typeEvent"
            onChange={(e) => typeHandler(e.target.value)}
            aria-label="Тип события"
          >
            {typesEvent_ru.map((element, id) => (
              <option key={id} value={element}>
                {element}
              </option>
            ))}
          </select>
        </div>
        {typeEvent === "Праздничные дни" && (
          <div>
            <label htmlFor="moneyEvent">Сумма денег</label>
            <input
              ref={moneyError}
              value={money}
              onChange={(e) => moneyHandler(e.target.value)}
              className="form-control"
              id="moneyEvent"
            />
            <small className="text-danger">{moneyError_}</small>
          </div>
        )}
        {typeEvent === "Мероприятия" && (
          <div>
            <label htmlFor="place">Куда идти ?</label>
            <input
              ref={placeError}
              value={place}
              onChange={(e) => placeHandler(e.target.value)}
              className="form-control"
              id="place"
            />
            <small className="text-danger">{placeError_}</small>
          </div>
        )}
        {typeEvent === "Мероприятия" && (
          <div>
            <label htmlFor="time">Во сколько ?</label>
            <input
              ref={timeError}
              value={time}
              onChange={(e) => timeHandler(e.target.value)}
              className="form-control"
              id="time"
            />
            <small className="text-danger">{timeError_}</small>
          </div>
        )}
        {typeEvent === "Заметки" && (
          <div>
            <label htmlFor="description">Описание</label>
            <textarea
              ref={descriptionError}
              value={description}
              onChange={(e) => descriptionHandler(e.target.value)}
              className="form-control"
              id="description"
            />
            <small className="text-danger">{descriptionError_}</small>
          </div>
        )}

        <div className="btn-group mt-3">
          <Link to="/">
            <button>Отмена</button>
          </Link>

          <button type="submit">Сохранить</button>
        </div>
      </form>
    </div>
  );
}
