import header from "./components/header";
import main from "./components/main";
import footer from "./components/footer";

const parentNode = document.querySelector(".content");

function setup() {
  header(parentNode);
  main(parentNode);
  footer(parentNode);
}

export default setup;
