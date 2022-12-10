import logo from "../img/logo.png";

function header(node) {
  const markup = ` 
    <header>
        <h1>todo list</h1>
        <div>
            <img src="${logo}" alt="logo" />
        </div>
    </header>`;

  node.insertAdjacentHTML("beforeend", markup);
}

export default header;
