const soketio = io();

let textarea = document.querySelector("#textare");
let massege_area = document.querySelector(".massege_area");

let myname;
do {
  myname = prompt("Plese enter your name");
} while (!myname);

textarea.addEventListener("keyup", (e) => {
  if (e.key === "Enter") {
    sendMaessage(e.target.value);
  }
});

const sendMaessage = (massage) => {
  let msg = {
    user: myname,
    massage: massage.trim(),
  };
  appendMassege(msg, "outgoing");
  textarea.value = "";
  ScrolTopToButtom();

  //send to server

  soketio.emit("massage", msg);
};

const appendMassege = (msg, type) => {
  let maindiv = document.createElement("div");

  let className = type;
  console.log(type);
  maindiv.classList.add(className, "massege");

  let markup = `
    <h4>${msg.user}</h4>
    <p>${msg.massage} </p>

    `;
  maindiv.innerHTML = markup;
  console.log(maindiv);
  massege_area.appendChild(maindiv);
};

//Reacive Massage

soketio.on("massage", (msg) => {
  console.log(msg);
  appendMassege(msg, "incomin");
  ScrolTopToButtom();
});

const ScrolTopToButtom = () => {
  massege_area.scrollTop = massege_area.scrollHeight;
};
