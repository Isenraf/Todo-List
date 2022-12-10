function footer(node) {
  const markup = ` 
    <footer>
        copyright @ 2022 isenraf
    </footer>`;

  node.insertAdjacentHTML("beforeend", markup);
}

export default footer;
