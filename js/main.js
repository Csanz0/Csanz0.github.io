const d = document,
  storage = localStorage;

let now = new Date().getTime();
const days = 1000 * 60 * 60 * 24;

d.getElementById("dateForm").addEventListener("submit", addEvent);
// adding the events to the localStorage
function addEvent(e) {
  let eventName = d.getElementById("title").value;
  let description = d.getElementById("description").value;
  let dateInput = Math.floor(
    (new Date(d.getElementById("dateInfo").value).getTime() - now) / days
  );

  e.preventDefault();
  const eventContents = {
    eventName,
    description,
    dateInput,
  };
  if (storage.getItem("events") == null) {
    let events = [];
    events.push(eventContents);
    storage.setItem("events", JSON.stringify(events));
  } else {
    let events = JSON.parse(storage.getItem("events"));
    events.push(eventContents);
    storage.setItem("events", JSON.stringify(events));
  }
  d.getElementById("dateForm").reset();
  showEvent();
}
//show dates in the container
showEvent();
function showEvent() {
  let events = JSON.parse(storage.getItem("events"));
  let dateDiv = d.getElementById("container-dates");
  dateDiv.innerHTML = "";

  for (let i = 0; i < events.length; i++) {
    let title = events[i].eventName;
    let date = events[i].dateInput;
    let description = events[i].description;
    dateDiv.innerHTML += `<div class='container-dates-content' data-dark>
    <div class='container-dates --container'>
    <h3 class='title-date'>Faltan: ${date} Dias</h3>
    <h4 class='title-date'>Para: ${title}</h4>
    <p class='description'>${description}</p>
    <a class='btn-remove'onclick='removeDate("${title}")'>Eliminar</a>
    </div>
    </div>
    `;
  }
}
function removeDate(title) {
  let events = JSON.parse(storage.getItem("events"));
  for (let i = 0; i < events.length; i++) {
    if (events[i].eventName == title) {
      events.splice(i, 1);
    }
  }

  storage.setItem("events", JSON.stringify(events));
  showEvent();
}

removeDate();
// Dark theme
const btn = d.getElementById("btn");
btn.addEventListener("click", changeColor);

function changeColor() {
  if (!btn.classList.contains("dark")) {
    dark();
  } else {
    light();
  }
}
const dark = () => {
  let dataDarks = d.querySelectorAll("[data-dark]");
  btn.classList.add("dark");
  dataDarks.forEach((el) => {
    if (!el.classList.contains("dark")) {
      el.classList.add("dark");
    }
  });
  storage.setItem("theme", "dark");
};
const light = () => {
  let dataDarks = d.querySelectorAll("[data-dark]");
  btn.classList.remove("dark");
  dataDarks.forEach((el) => {
    if (el.classList.contains("dark")) {
      el.classList.remove("dark");
    }
  });
  storage.setItem("theme", "light");
};
d.addEventListener("DOMContentLoaded", (e) => {
  if (storage.getItem("theme") == null) storage.setItem("theme", "light");
  if (storage.getItem("theme") == "dark") dark();
  if (storage.getItem("theme") == "light") light();
});
