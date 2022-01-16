import React from "react";
import { useParams, Link } from "react-router-dom";

export default function EditEvent({}) {
  let routeID = useParams().id;
  let errorCount = 0;
  // const refArray = React.useRef({title:'',description:"",money:'',place:'',time:''});
  const [obj, objHandler] = React.useState(null);
  async function getData() {
    let response = await fetch("http://localhost:3000/tasks/" + routeID);
    let content = await response.json();
    if (response.status === 200) objHandler(content);
  }
  function SubmitEvent(event) {
    event.preventDefault();
    Object.keys(obj).forEach((el) => {
      if (el == "money" && el != "data" && el != "id") {
       
        if (obj[el].length < 1) {
          errorCount++;
        }
      } else {
        if (obj[el].length < 4) {
          errorCount++;
          
          
        }
      }
    });
    if (errorCount === 0) {
      fetch("http://localhost:3000/tasks/" + obj.id, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json;charset=utf-8",
        },
        body: JSON.stringify(obj),
      });

      return (window.location = "/");
    }
  }

  function titleHandler(event) {
    objHandler({ ...obj, title: event.target.value });
  }

  function descriptionHandler(event) {
    objHandler({ ...obj, description: event.target.value });
  }

  function timeHandler(event) {
    objHandler({ ...obj, time: event.target.value });
  }

  function moneyHandler(event) {
    objHandler({ ...obj, money: event.target.value });
  }

  function placeHandler(event) {
    objHandler({ ...obj, place: event.target.value });
  }

  React.useEffect(() => {
    getData();
  }, []);
  return (
    <div className="container text-center">
      {obj && (
        <div className="container text-center">
          <form method="post" onSubmit={SubmitEvent}>
            <h1>Добавить событие</h1>
            <div>
              <label htmlFor="nameEvent">Название события</label>
              <input
                value={obj.title}
                onChange={(e) => {
                  titleHandler(e);
                  console.log(obj.title.length);
                }}
                // ref={refArray.title}
                className="form-control"
                id="nameEvent"
              />
              <small className="text-danger">
                {obj.title.length < 4 &&
                  "{Обязательно для заполнения/минимум 4 символа}*"}
              </small>
            </div>
            {obj.typeEvent === "Праздничные дни" && (
              <div>
                <label htmlFor="moneyEvent">Сумма денег</label>
                <input
                  // ref={refArray.money}
                  value={obj.money}
                  onChange={(e) => moneyHandler(e)}
                  className="form-control"
                  id="moneyEvent"
                />
                <small className="text-danger">
                  {obj.money.length < 1 && "{Обязательно для заполнения}*"}
                </small>
              </div>
            )}
            {obj.typeEvent === "Мероприятия" && (
              <div>
                <label htmlFor="place">Куда идти ?</label>
                <input
                  // ref={refArray.palce}
                  value={obj.place}
                  onChange={(e) => placeHandler(e)}
                  className="form-control"
                  id="place"
                />
                <small className="text-danger">
                  {obj.place.length < 4 &&
                    "{Обязательно для заполнения/минимум 4 символа}*"}
                </small>
              </div>
            )}
            {obj.typeEvent === "Мероприятия" && (
              <div>
                <label htmlFor="time">Во сколько ?</label>
                <input
                  // ref={refArray.palce}
                  value={obj.time}
                  onChange={(e) => timeHandler(e)}
                  className="form-control"
                  id="time"
                />
                <small className="text-danger">
                  {obj.time.length < 4 &&
                    "{Обязательно для заполнения/минимум 4 символа}*"}
                </small>
              </div>
            )}
            {obj.typeEvent === "Заметки" && (
              <div>
                <label htmlFor="description">Описание</label>
                <textarea
                  // ref={refArray.description}
                  value={obj.description}
                  onChange={(e) => descriptionHandler(e)}
                  className="form-control"
                  id="description"
                />
                <small className="text-danger">
                  {obj.description.length < 4 &&
                    "{Обязательно для заполнения/минимум 4 символа}*"}
                </small>
              </div>
            )}

            <div className="btn-group mt-3">
              <Link to="/">
                <button>Отмена</button>
              </Link>

              <button type="submit">Обновить</button>
            </div>
          </form>
        </div>
      )}
      {!obj && (
        <h1>
          Ошибка!!!! <br></br> Отсутствует запись или неверный id
        </h1>
      )}
      <div> {routeID}</div>
    </div>
  );
}
