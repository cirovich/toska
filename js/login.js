IPA = localStorage.getItem("IPA");
APA = localStorage.getItem("APA");
EPA = localStorage.getItem("EPA");
Negra = localStorage.getItem("Negra");
let LoginStatus = "false" 
x = sessionStorage.getItem("x")

//usuarios hardcodeados fuera del json
var users = [
  {
    user: 'ciro',
    passWord: 'franco'
  },
  {
    user: 'admin',
    passWord: 'admin'
  },
  {
    user: 'root',
    passWord: 'toor'
  },
];

//remplaza la var users con lo que el usuario haya creado en login
// x se transforma en 1 cuando se ejectua la funcion  crearNuevoUsuarioObjeto
// este es el fix Old School. Creo que se podria usar sugar cuando declaras al variable al principio, pero con NulliSh C no me  funco
if (x == 1){
var users = JSON.parse(localStorage.getItem('users'))
console.log (x)
}

// trae desde el HTML los valores que el usuario ingresa y llama a la funcion verificarUser
document.getElementById("login").addEventListener("submit", verificarUser,);

//verifica que el usuario ingresado este en el objeto, y a su vez que el passWord ingrsado conincida con el del objeto
function verificarUser(e) {
  e.preventDefault();
  userNameImput = document.getElementById("username").value;
  passWordImput = document.getElementById("password").value;
  let userActive = users.find(user => user.user === userNameImput);
  console.log(userActive)
  // si no encuentra al usuaraio en el objeto tons
  if (!userActive) {
    {
      Swal.fire({
        title: 'Usuario NO encontrado',
        icon: 'warning',
        showCancelButton: true,
        cancelButtonText: 'Volver a intentar',
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#716add',
        confirmButtonText: 'Crear nuevo usuario'
      }).then((result) => {
        if (result.isConfirmed) {
          if (result.isConfirmed) {
            crearNuevoUsuarioHTML()
          }
        }
      }
      )
    }

  }
  // si la comprobacion es correcta lo muestra por Sweet Alert y lo guarda en SessionStorage para poder utilizarlo en otros HTMLS
  if (userActive.passWord === passWordImput) {
    sessionStorage.setItem("LoginStatus", "true");
    sessionStorage.setItem("userActive", userNameImput)
    Swal.fire({
      icon: 'success',
      title: 'Usuario logeado con exito',
      text: 'Volver a la pagina para continuar con tu comrpra ',
    })
      .then((result) => {
        window.open("../htmls/confirmarCompra.html", "_self",)
      })
  } else {
    Swal.fire({
      title: 'Usuario NO encontrado',
      icon: 'warning',
      showCancelButton: true,
      cancelButtonText: 'Volver a intentar',
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#716add',
      confirmButtonText: 'Crear nuevo usuario'
    }).then((result) => {
       {
        if (result.isConfirmed) {
          window.open("../htmls/confirmarCompra.html", "_self",
          )
        }
      }
    })
  }
}

//Funcion que crea nuevo usuario haciendo un push al objeto donde que atesora username y password
function crearNuevoUsuarioHTML() {
  // encuentra el elemento html y lo borra
  const contenedorLogin = document.getElementById("login");
  contenedorLogin.innerHTML =" "
  //crea nuevo html 
  const div = document.createElement("div")
  div.innerHTML = `
  <form id="loginNew" class = "animate__animated animate__zoomInDown">
  <h1>[TOSKA] <br> Crear Usuario</h1>
  <input
    type="submit"
    name="username"
    id="username"
    class="login-form-field"
    placeholder="Cree su Usuario"
    required
  />
  <input
    type="password"
    name="password"
    id="password"
    class="login-form-field"
    placeholder="Cree su Password"
    required
  />
  <input type="submit" value="Crear Usuario" id="boton"/>
</form>
`
contenedorLogin.appendChild(div)
document.getElementById("boton").addEventListener("click", crearNuevoUsuarioObjeto,);
}
// trae desde el HTML los valores que el nuevo usuario ingresa y llama a la funcion crearNuevoUsuarioObjeto
function crearNuevoUsuarioObjeto(e) {
  e.preventDefault();
  userNameImput = document.getElementById("username").value;
  passWordImput = document.getElementById("password").value;
  users.push ({"user": userNameImput, "passWord": passWordImput});
  //guardo en local storage 
 localStorage.setItem("users", JSON.stringify(users));
 // esta bandera le sirve para 
 sessionStorage.setItem("x", "1");
  // sweet alert
  Swal.fire({
    icon: 'success',
    title: 'Usuario creado con exito',
    text: 'Volver a la pagina para continuar con tu comrpra ',
  })
    .then((result) => {
      window.open("../htmls/login.html", "_self",)
    })
}

