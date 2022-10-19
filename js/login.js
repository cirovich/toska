IPA = localStorage.getItem("IPA");
APA = localStorage.getItem("APA");
EPA = localStorage.getItem("EPA");
Negra = localStorage.getItem("Negra");
let LoginStatus = "false" 

let users = [
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

// trae desde el HTML los valores que el usuario ingresa y llama a la funcion verificarUser
document.getElementById("login").addEventListener("submit", verificarUser,);

//verifica que el usuario ingresado este en el objeto, y a su vez que el passWord ingrsado conincida con el del objeto
function verificarUser(e) {
  e.preventDefault();
  userNameImput = document.getElementById("username").value;
  passWordImput = document.getElementById("password").value;
  let userActive = users.find(user => user.user === 'ciro');
  console.log(userActive.passWord)

  // si la comprobacion es correcta lo muestra por Sweet Alert y lo guarda en SessionStorage para poder utilizarlo en otros HTMLS
  if (userActive.passWord === passWordImput)  
  {
    sessionStorage.setItem("LoginStatus" , "true");
    sessionStorage.setItem("userActive" , userNameImput)
    Swal.fire({
    icon: 'success',
    title: 'Usuario logeado con exito',
    text: 'Volver a la pagina para continuar con tu comrpra ',
  })
  .then((result) => {
    if (result.isConfirmed) {
      window.open("../htmls/confirmarCompra.html", "_self",
      )
    }
  })

} else

  {Swal.fire({
    title: 'Usuario NO encontrado',
    text: "You won't be able to revert this!",
    icon: 'warning',
    showCancelButton: true,
    cancelButtonText: 'Volver a intentar',
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#716add',
    confirmButtonText: 'Crear nuevo usuario'
  }).then((result) => {
    if (result.isConfirmed) {
      Swal.fire(
        'Deleted!',
        'Your file has been deleted.',
        'success'
      )
    }
  })}
}
