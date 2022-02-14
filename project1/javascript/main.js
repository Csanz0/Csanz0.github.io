const d = document;

const show = d.getElementById("show");
const form = d.getElementById("form");
form.addEventListener("submit", verifyNumber);

const sel = {
  decimal: function (number) {
    this.result = parseInt(Number(number), 2);
    {
      show.value = this.result;
    }
  },
  binary: function (number) {
    this.result = Number(number).toString(2);
    if (!isNaN(this.result)) {
      return (show.value = this.result);
    }
  },
};

function verifyNumber(e) {
  e.preventDefault();
  let number = d.getElementById("number").value;
  let slt = d.getElementById("slt").value;
  switch (slt) {
    case "2":
      sel.binary(number);
      break;
    case "10":
      sel.decimal(number);
      break;
    default:
      console.log("nada", slt);
      break;
  }
  console.log(number);
  form.reset();
}
