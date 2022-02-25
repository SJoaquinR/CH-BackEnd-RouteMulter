const socket = io.connect();

//------------------------------------------------------------------------------------

const formAddProduct = document.querySelector("#formAddProduct");
formAddProduct.addEventListener("submit", (e) => {
  e.preventDefault();
  const product = {
    title: formAddProduct.querySelector("#title").value,
    price: formAddProduct.querySelector("#price").value,
    image: formAddProduct.querySelector("#image").value,
  };

  socket.emit("addProduct", product);
  formAddProduct.reset();
});

socket.on("products", (products) => {
  makeHtmlTable(products).then((html) => {
    document.querySelector("#products").innerHTML = html;
  });
});

function makeHtmlTable(products) {
  return fetch("pages/products.hbs")
    .then((respuesta) => respuesta.text())
    .then((plantilla) => {
      const template = Handlebars.compile(plantilla);
      const html = template({ products });
      return html;
    });
}

//-------------------------------------------------------------------------------------

const inputAddEmail = document.querySelector("#inputAddEmail");
const inputMessage = document.querySelector("#inputMessage");
const btnSend = document.querySelector("#btnSend");

const formMessage = document.querySelector("#formMessage");
formMessage.addEventListener("submit", (e) => {
  e.preventDefault();

  const message = { author: inputAddEmail.value, text: inputMessage.value };
  socket.emit("newMessage", message);
  formMessage.reset();
  inputMessage.focus();
});

const makeHtmlList = (messages) => {
  return messages
    .map((messages) => {
      const { author, fyh, text } = messages;
      return `
              <div>
                  <b style="color:blue;">${author}</b>
                  [<span style="color:brown;">${fyh}</span>] :
                  <i style="color:green;">${text}</i>
              </div>
          `;
    })
    .join(" ");
};

socket.on("messages", (messages) => {
  console.log(messages);
  const html = makeHtmlList(messages);
  document.querySelector("#messages").innerHTML = html;
});

inputAddEmail.addEventListener("input", () => {
  const inputEmail = inputAddEmail.value.length;
  const inputText = inputMessage.value.length;
  inputMessage.disabled = !inputEmail;
  btnSend.disabled = !inputEmail || !inputText;
});

inputMessage.addEventListener("input", () => {
  const inputText = inputMessage.value.length;
  btnSend.disabled = !inputText;
});
