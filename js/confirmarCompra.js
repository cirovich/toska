IPA = localStorage.getItem("IPA");
APA = localStorage.getItem("APA");
EPA = localStorage.getItem("EPA");
Negra = localStorage.getItem("Negra");
LoginStatus = sessionStorage.getItem("LoginStatus") // este valor lo va a tomar del sistema de logueo, que es posterior cronologicamente. Por eso es Null o True
userActive = sessionStorage.getItem("userActive")


document.getElementById("IPA").innerHTML = IPA;
document.getElementById("APA").innerHTML = APA;
document.getElementById("EPA").innerHTML = EPA;
document.getElementById("Negra").innerHTML = Negra;
// llama a la funcion que chequea si el usuario esta logeado y lo muestra en pantalla 
chequeaSiLogon ()

//Busca los datos de la API de bebidas
fetch("https://www.thecocktaildb.com/api/json/v1/1/random.php")
  .then((response) => response.json())
  .then((json) => {
    const receta = json;

    //Muestra los datos de la API en HTML
    const recetaDiaria = document.getElementById("recetaDiaria");
    recetaDiaria.innerHTML = `¿ No aguantas a que llegue el delivery? Traigan puertas que manijas sobran! Podes esquivar la realidad con un riquisimo ${receta.drinks[0].strDrink}. Nada mas necesitas ${receta.drinks[0].strIngredient1} y ${receta.drinks[0].strIngredient2}`
    const div   = document.createElement("div");
    div.innerHTML = `
    <img src=${receta.drinks[0].strDrinkThumb} class="container-fluid">" 
    <br>
    ${receta.drinks[0].strInstructions}
    
    `;
    recetaDiaria.appendChild(div)
  });


// Calcula  el precio subtotal y modifica el HTML total"
const mostrarDetalleCompra = document.getElementById("total");
mostrarDetalleCompra.innerHTML = " ";
mostrarDetalleCompra.innerHTML = `Sutotal : $${(subtotal =
  IPA * 690 + APA * 550 + EPA * 620 + Negra * 270)}`;

//Lee el valor seleccionado en el dropdown para saber cuantas cuotas
const select = document.getElementById("selectorCuotas");
select.addEventListener("change", function handleChange(event) {
  // levanta el valor de la opcion elegida en el dropdown
  cuotasNro = select.options[select.selectedIndex].value;
  const cuotasNroVar = document.getElementById("totalCuotas");
  cuotasNroVar.innerHTML = " ";

  // Hace la cuenta segun la cantidad de cuotas seleccionadas. Intente hacerlo en una sola linea pero no pude al requerir dos valores (cuotas e interes)

  switch (cuotasNro) {
    case "1":
      cuotasNroVar.innerHTML = ` Pagas ${cuotasNro} cuota(s) de  $${
        (subtotal * 1) / cuotasNro
      }. Monto final $${subtotal * 1}`;
      break;
    case "6":
      cuotasNroVar.innerHTML = ` Pagas ${cuotasNro} cuota(s) de  $${
        (subtotal * 1.5) / cuotasNro
      }. Monto final $${subtotal * 1.5}`;
      break;
    case "12":
      cuotasNroVar.innerHTML = ` Pagas ${cuotasNro} cuota(s) de  $${
        (subtotal * 2) / cuotasNro
      }. Monto final $${subtotal * 2}`;
      break;
  }

  crearBotonLogin();
});

// crea boton login una vez seleccionadas las cuotas, pero si ya existe lo borra antes
function crearBotonLogin() {
  const botonLogin = document.getElementById("confirmarCompraBoton");
  const btn = document.getElementById("btnlogin");
  btn !== null && botonLogin.removeChild(btn);
  const botonLoginBtn = document.createElement("button");
  botonLoginBtn.id = "btnlogin";     
  botonLoginBtn.innerText = "Logueate para poder comprar tu pedido";
  botonLoginBtn.addEventListener("click", () => {
    window.open("login.html", "_self");
  });
  document.getElementById("confirmarCompraBoton").prepend(botonLoginBtn);
}

//Chequea si el usuario esta logeado y lo muestra en pantalla  
//Como ya esta logeado, sobreescribe el boton de logueo con el de  pagar
function chequeaSiLogon () {
  if (LoginStatus == "true")
  { 
  // para que quede ultra cheto, borramos el selector de cuotas
  const selectorCuotas = document.getElementById("selectorCuotas");
  selectorCuotas.remove();
  // muesta arriba a la izquierda una notificacion de bienvenida
  const loginStatus = document.getElementById("loginStatus");
  loginStatus.innerHTML = `Bienvenido ${userActive.toUpperCase()}`
  // sobreescribe el boton de logueo con el de  pagar
  const botonLoginBtn = document.createElement("button");
  botonLoginBtn.id = "btnloginListo";     
  botonLoginBtn.innerText = "CONFIRMAR COMPRA - ABONAR ";
  document.getElementById("confirmarCompraBoton").prepend(botonLoginBtn);
  }
}
