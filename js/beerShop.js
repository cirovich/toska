let APA = 0;
let EPA = 0;
let Negra = 0;
let IPA = 0;

// Llamar a la funcion que inyecta el HTML desde JS alimentado por JSON 
birraDiVContainer();

// la funcion que fetchea el JSOn
async function loadJson() {
  const response = await fetch("../JSON/toska_json.json");
  const data = await response.json();
  return data;
}

// Funcion que inyecta el HTML desde JS alimentado por JSON 
// Convertir a la funcion en async para que pueda awaitear el llamado de la otra funcion LoadJson
async function birraDiVContainer() {
  // Llamar a la funcion que consigue los datos y esperar que se carguen antes de continuar.
  const data = await loadJson();
  // contenedor en el dom
  const DiVContainer = document.getElementById("principal_beershop");
  // Para cada cerveza del array:
  data.cervezas.forEach((cerveza) => {
    // El string formateado para cada cerveza - es bootstrap 5
    const cardString = `
    <div class="col">
    <div class="card">
    <img src="${cerveza.img}" class="card-img-top" alt="${cerveza.nombre}">
    <div class="card-body">
          <h5 class="card-title">${cerveza.nombre}</h5>
          <p class="card-text">${cerveza.descripcion}</p>
          <button id="${cerveza.buttonRestar}" class="btn btn-outline-dark" type="number"> QUITAR </button>
          <button id="${cerveza.buttonCant}" class="btn btn-outline-dark" type="button"> CANTIDAD PEDIDA : 0 </button>
          <button id="${cerveza.buttonSumar}" class="btn btn-outline-dark" type="button" max="5"> AGREGAR </button>
          </div>
        <div class="accordion accordion-flush" id="accordionFlushExample">
          <div class="accordion-item">
            <h2 class="accordion-header" id="flush-headingOne">
              <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse"
                data-bs-target="#flush-collapseOne" aria-expanded="false" aria-controls="flush-collapseOne">
                ▼ Detalles :
              </button>
            </h2>
            <div id="flush-collapseOne" class="accordion-collapse collapse" aria-labelledby="flush-headingOne"
            data-bs-parent="#accordionFlushExample">
            <div class="accordion-body"> ${cerveza.detalles}${cerveza.precio} </div>
            </div>
            </div>
            </div>
            </div>
            </div>
            </div>
            `;
    // Transformar el string que devuelve de mas arriba en un elemento del DOM (esto nunca lo habia hecho lo saque de google)
    const parser = new DOMParser();
    const card = parser.parseFromString(cardString, "text/html").body;
    // append la card al contenedor del dom
    DiVContainer.append(card);
  });

  // botones birras . Suma una o resta 1 apa   - van aca adentro de esta funcion para que de tiempo a crear el htnm que toma getElenebtById
  var btnpedirUnaApa = document.getElementById(pedirUnaApa);
  pedirUnaApa.addEventListener(
    "click",
    () => (
      APA++,
      Number(localStorage.setItem("APA", APA)),
      mostrarBirras(APA, "cantidadApa")
    )
  );
  var btnrestarUnaApa = document.getElementById(restarUnaApa);
  restarUnaApa.addEventListener(
    "click",
    () => (
      (APA <= 0 ? APA = APA : --APA),
      Number(localStorage.setItem("APA", APA)),
      mostrarBirras(APA, "cantidadApa")
    )
  );

  // botones birras . Suma una o resta 1 epa
  var btnpedirUnaEpa = document.getElementById(pedirUnaEpa);
  pedirUnaEpa.addEventListener(
    "click",
    () => (
      EPA++,
      Number(localStorage.setItem("EPA", EPA)),
      mostrarBirras(EPA, "cantidadEpa")
    )
  );
  var btnrestarUnaEpa = document.getElementById(restarUnaEpa);
  restarUnaEpa.addEventListener(
    "click",
    () => (
      (EPA <= 0 ? EPA = EPA : --EPA),
      Number(localStorage.setItem("EPA", EPA)),
      mostrarBirras(EPA, "cantidadEpa")
    )
  );

  // botones birras . Suma una o resta 1 Ipa
  var btnpedirUnaIpa = document.getElementById(pedirUnaIpa);
  pedirUnaIpa.addEventListener(
    "click",
    () => (
      (IPA = ++IPA),
      Number(localStorage.setItem("IPA", IPA)),
      mostrarBirras(IPA, "cantidadIpa")
    )
  );
  var btnrestarUnaIpa = document.getElementById(restarUnaIpa);
  restarUnaIpa.addEventListener(
    "click",
    () => (
      (IPA <= 0 ? IPA = IPA : --IPA),
      Number(localStorage.setItem("IPA", IPA)),
      mostrarBirras(IPA, "cantidadIpa")
    )
  );

  // botones birras . Suma una o resta 1 Negra
  var btnpedirUnaNegra = document.getElementById(pedirUnaNegra);
  pedirUnaNegra.addEventListener(
    "click",
    () => (
      Negra++,
      Number(localStorage.setItem("Negra", Negra)),
      mostrarBirras(Negra, "cantidadNegra")
    )
  );
  var btnrestarUnaNegra = document.getElementById(restarUnaNegra);
  restarUnaNegra.addEventListener(
    "click",
    () => (
      (Negra <= 0 ? Negra = Negra : --Negra),
      Number(localStorage.setItem("Negra", Negra)),
      mostrarBirras(Negra, "cantidadNegra")
    )
  );
}

// la funcion que actualiza el numero de birras pedidas en el display de su sabor correspondiente
async function mostrarBirras(EPA, cantidadEpa) {
  //impide que el numero entre en terreno negativo
  if (EPA <= 0) {
    EPA = 0;
  }
  const displayCAntidadBirras = document.getElementById(cantidadEpa);
  displayCAntidadBirras.innerHTML = "";
  const birrasInternas = document.createElement("div");
  birrasInternas.classList.add("cantidad");
  birrasInternas.innerHTML = "CANTIDAD PEDIDA : " + EPA;
  displayCAntidadBirras.append(birrasInternas);
}

//confirma la compra. Si las birras son igual a 0 no deja pasar
function guardarCompraEnStorage(IPA, APA, EPA, Negra) {
  //comprueba que birraPedida !=0
  setTimeout(botonConfirmarCompraRefresh, 2000);
  birraPedida = IPA + APA + EPA + Negra;
  if (birraPedida === 0) {
    const noAvanzar = document.getElementById("confirmarPedido");
    noAvanzar.innerText =
      "No podes avanzar si no compraste por lo menos una birra!";
    noAvanzar.addEventListener("click", () => {
      guardarCompraEnStorage;
    });
    document.getElementById("confirmarPedido").prepend(noAvanzar);
  } else {
    // si compro birras, guardas las variables en localstorage y deja pasar al siguiente html
    localStorage.setItem("IPA", IPA);
    localStorage.setItem("APA", APA);
    localStorage.setItem("EPA", EPA);
    localStorage.setItem("Negra", Negra);
    window.location.href = "confirmarCompra.html";
  }
}

//tras 2 segundos cambia la leyenda del boton en caso de haber querido comprar 0 CERO birras
function botonConfirmarCompraRefresh() {
  noAvanzar = document.getElementById("confirmarPedido");
  noAvanzar.innerText = "CONFIRMAR COMPRA";
  document.getElementById("confirmarPedido").prepend(noAvanzar);
}

//Boton Confrima compra
var btnConfirmar = document.getElementById("confirmarPedido");
btnConfirmar.addEventListener("click", () =>
  guardarCompraEnStorage(IPA, APA, EPA, Negra)
);