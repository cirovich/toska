let APA = localStorage.getItem('APA') || 0;
let EPA = localStorage.getItem('EPA') || 0;
let Negra = localStorage.getItem('Negra') || 0;
let IPA = localStorage.getItem('IPA') || 0;

const result = LoadJson () 
console.log (result)
birraDiVContainer()

//BUENO, ACA LA PAPA ES FETCHEAR EL JSON y HACERLO DE ALCANCE GLOBAL PARA PODER USAR SUS VALUES EN function birraDiVContainer()
async function LoadJson () {
  const response = await fetch ('../JSON/toska_json.json')
  const data = await response.json()
  return data
  }
  
//encuentra en punto de insercion en el html, e inyecta el html tras haber iterado el objeto del json. creo que llevaria un for of, pero como no anda
//no lo impremente. 

//las variables estan puestas a modo explicativo, ya que como no las puedo leer no puedo estimar su estructura. Pero por ahi debe andar, salvo que tenga un
//sub indice [x] para especificar que posicion del array lee
//es bootstrap 5

function birraDiVContainer() {
  const DiVContainer = document.getElementById("principal_beershop");
  DiVContainer.innerHTML = ` `;
    let col = document.createElement("col")
    col.innerHTML = `
      <div class="card">
        <img src="${data.cervezas.img}" class="card-img-top" alt="${data.cervezas.nombre}">
        <div class="card-body">
          <h5 class="card-title"> ${data.cervezas.nombre}</h5>
          <p class="card-text">${data.cervezas.descripcion}</p>
          <button ID=${data.cervezas.buttonRestar} class="btn btn-outline-dark" type="number">  QUITAR </button> 
          <button ID=${data.cervezas.buttonCant} class="btn btn-outline-dark" type="button"> CANTIDAD PEDIDA : 0 </button>
          <button ID=${data.cervezas.buttonSumar} class="btn btn-outline-dark" type="button" max="5"> AGREGAR </button>
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
              <div class="accordion-body"> ${data.cervezas.detalles} </div>
            </div>
          </div>
        </div>
      </div>
    </div>
     `
     DiVContainer.appendChild(DiVContainer)  // redundante 
  
  }






/*

// botones birras . Suma una o resta 1 apa
var btnpedirUnaApa = document.getElementById(pedirUnaApa)
pedirUnaApa.addEventListener("click", () => (APA++, Number(localStorage.setItem("APA", APA)), mostrarBirras(APA, "cantidadApa")))
var btnrestarUnaApa = document.getElementById(restarUnaApa)
restarUnaApa.addEventListener("click", () => ((APA = APA <= 0 || --APA), Number(localStorage.setItem("APA", APA)), mostrarBirras(APA, "cantidadApa")))

// botones birras . Suma una o resta 1 epa
var btnpedirUnaEpa = document.getElementById(pedirUnaEpa)
pedirUnaEpa.addEventListener("click", () => (EPA++, Number(localStorage.setItem("EPA", EPA)), mostrarBirras(EPA, "cantidadEpa")))
var btnrestarUnaEpa = document.getElementById(restarUnaEpa)
restarUnaEpa.addEventListener("click", () => ((EPA = EPA <= 0 || --EPA), Number(localStorage.setItem("EPA", EPA)), mostrarBirras(EPA, "cantidadEpa")))

// botones birras . Suma una o resta 1 Ipa
var btnpedirUnaIpa = document.getElementById(pedirUnaIpa)
pedirUnaIpa.addEventListener("click", () => (IPA = ++IPA, Number(localStorage.setItem("IPA", IPA)), mostrarBirras(IPA, "cantidadIpa")))
var btnrestarUnaIpa = document.getElementById(restarUnaIpa)
restarUnaIpa.addEventListener("click", () => ((IPA = IPA <= 0 || --IPA), Number(localStorage.setItem("IPA", IPA)), mostrarBirras(IPA, "cantidadIpa")))

// botones birras . Suma una o resta 1 Negra
var btnpedirUnaNegra = document.getElementById(pedirUnaNegra)
pedirUnaNegra.addEventListener("click", () => (Negra++, Number(localStorage.setItem("Negra", Negra)), mostrarBirras(Negra, "cantidadNegra")))
var btnrestarUnaNegra = document.getElementById(restarUnaNegra)
restarUnaNegra.addEventListener("click", () => ((Negra = Negra <= 0 || --Negra), Number(localStorage.setItem("Negra", Negra)), mostrarBirras(Negra, "cantidadNegra")))


// la funcion que actualiza el numero de birras pedidas en el display de su sabor correspondiente 
function mostrarBirras(EPA, cantidadEpa) {

  if (EPA <= 0) {EPA = 0 }

  const displayCAntidadBirras = document.getElementById(cantidadEpa);
  displayCAntidadBirras.innerHTML = "";
  const birrasInternas = document.createElement("div");
  birrasInternas.classList.add("cantidad");
  birrasInternas.innerHTML = (("CANTIDAD PEDIDA : ") + EPA);
  displayCAntidadBirras.append(birrasInternas);

}

//Boton Confrima compra
var btnConfirmar = document.getElementById("confirmarPedido")
btnConfirmar.addEventListener("click", () => guardarCompraEnStorage(IPA, APA, EPA, Negra),)

//confirma la compra. Si las birras son igual a 0 no deja pasar
function guardarCompraEnStorage(IPA, APA, EPA, Negra) {
  //comprueba que birraPedida !=0 
  setTimeout(botonConfirmarCompraRefresh, 2000);
  birraPedida = (IPA + APA + EPA + Negra)
  if (birraPedida === 0) {
    const noAvanzar = document.getElementById("confirmarPedido")
    noAvanzar.innerText = "No podes avanzar si no compraste por lo menos una birra!";
    noAvanzar.addEventListener("click", () => { guardarCompraEnStorage })
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

CODIGO VIEJO DE REFERENCIA 
CODIGO VIEJO DE REFERENCIA 
CODIGO VIEJO DE REFERENCIA 
CODIGO VIEJO DE REFERENCIA 
CODIGO VIEJO DE REFERENCIA :::::::

let x = 0
let birrasTipos = ["Epa", "Apa", "Negra"]
let precios = [500, 400, 350]
let birrasPedidas = [0, 0, 0]
let birrasTotales = 0
let birrasMax = 0
let cuotas = 0
let subTotal = 0
let i = 1
let user = [{ userName: "userName", Name: "Name", passWord: "passWord" }];
const bodyMostrarDetalle = document.getElementById("body");
  bodyMostrarDetalle.innerHTML = "";

  bodyMostrarDetalle.innerHTML = `
  Compraste${IPA} IPA <br>
  Compraste${APA} APA   <br>
  Compraste${EPA}  EPA   <br>
  Compraste${Negra} Negra  <br>
`;
  crearBotonVolver()
  crearBotonEncargar()

function crearBotonVolver() {
  const botonVolver = document.createElement("button");
  botonVolver.classList.add("boton-volver");
  botonVolver.innerText = "Atras";
  botonVolver.addEventListener("click", () => {
    window.open("beershop.html", "_self");
  }
  )
  document.getElementById("body").prepend(botonVolver);
}

function crearBotonEncargar() {
  const botonEncargar = document.createElement("button");
  botonEncargar.classList.add("boton-encargar");
  botonEncargar.innerText = "Encargar";
  botonEncargar.addEventListener("click", () => {
    window.open("https://www.youtube.com/watch?v=dQw4w9WgXcQ", "_self");
  }
  )
  document.getElementById("body").prepend(botonEncargar);
}

// comprueba isNan
function compruebaIsNaN(variable) {
  if (isNaN(variable)) {
    alert("Por favor ingrese solo numeros")
    return true
  } else {
    return false
  }
}

// Se ejecuta por cada tipo de birra
function expermiental() {
  for (let i = 0; i < 3; i++) {
    do {
      var pedido = Number(prompt("Cuantas " + birrasTipos[i] + " vas a llevar? Cuestan $ " + precios[i] + " C/U. Te quedan " + birrasMax))
    }
    while (compruebaIsNaN(pedido) === true || compruebaBirrasMax(birrasMax, pedido) === true)
    birrasMax = birrasMax - pedido
    birrasPedidas[i] = pedido
  }
}

do {
  birrasMax1 = birrasMax = Number(prompt("Cuantas cervezas en total vas a comprar?"))
}

while (compruebaIsNaN(birrasMax) === true)

do {
  var e = expermiental()
}

while (e === true)

if ((birrasPedidas[0] + birrasPedidas[1] + birrasPedidas[2]) < (birrasMax1)) {
  alert("Al principio dijiste que ibas a pedir " + birrasMax1 + " birras, pero terminaste encargando solamente " + (birrasPedidas[0] + birrasPedidas[1] + birrasPedidas[2]) + " . Si queres pedir mas, comunicate con soporte")
}

do {
  cuotas = Number(prompt("Pediste :\n" + (birrasPedidas[0]) + " Epas a $500 c/u,\n" + (birrasPedidas[1]) + " Apas a $400 c/u, y\n" + (birrasPedidas[2]) + " Negras a $350 c/u.\nPor un total de $ " + (((subTotal = (birrasPedidas[0] * precios[0]) + (birrasPedidas[1] * precios[1]) + (birrasPedidas[2] * precios[2])))) + "\n\nPodes pagar en hasta 3 cuotas sin interes, o hasta 9 cuotas con el 50 % de interes o por ulitmo hasta en 12 cuotas con el 95 % de interes. ¿En cuantas cuotas queres abonar?"))
}

while ((i !== 2) && compruebaIsNaN(cuotas) === true || compruebaCuotas(cuotas) === true) {  //aca estaria bueno que en vez de llamar a la funcion compruebaCuotas esto lo haga con un "default case", pero no anda

  switch (cuotas) {
    case 1: case 2: case 3: {
      i = i + i                                                                                // el acumulador hace que salga despues de ejecutarse una vez
      alert("Abonás entonces " + cuotas + " cuota(s) de $" + subTotal / cuotas)

      for (let i = 1; i <= cuotas; i++) {
        alert("Cuota Numero " + i + " de $" + (subTotal / cuotas))
      }

    }
      break
    case 4: case 5: case 6: case 7: case 8: case 9: {
      i = i + i
      alert("Abonás entonces " + cuotas + " cuota(s) de $" + ((subTotal * 1.50 / cuotas)))

      for (let i = 1; i <= cuotas; i++) {
        alert("Cuota Numero " + i + " de $" + ((subTotal * 1.50 / cuotas)))
      }

    }
      break
    case 10: case 11: case 12: {

      alert("Abonás entonces " + cuotas + " cuota(s) de $" + ((subTotal * 1.95 / cuotas)))
      i = i + i
      for (let i = 1; i <= cuotas; i++) {
        alert("Cuota Numero " + i + " de $" + ((subTotal * 1.95 / cuotas)))
      }
      break;
    }
  }
*/
