IPA = localStorage.getItem("IPA");
APA = localStorage.getItem("APA");
EPA = localStorage.getItem("EPA");
Negra = localStorage.getItem("Negra");

const users = [
  {
    userName: "admin",
    passWord: "admin",
  },

  {
    userName: "root",
    passWord: "toor",
  },
  {
    userName: "ciro",
    passWord: "franco",
  }
]

document.getElementById("login").addEventListener("submit", verificarUser,);

function verificarUser(e) {
  e.preventDefault();
  userNameImput = document.getElementById("username").value;
  passWord = document.getElementById("password").value;
  console.log(userNameImput, passWord)
  const checkUser = users.some(users => users.userName === userNameImput);
  console.log(checkUser);
  //esto esta mal. Deberia ser un find() para encotrar si ese usernamen especifico esta en el obj

  if (checkUser == false) {
    Swal.fire({
      title: 'Usuario erroneo o inexistente',
      showDenyButton: true,
      confirmButtonText: 'Crear nuevo usuario ',
      denyButtonText: `Volver a intentar`,
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire('Saved!', '', 'success')
      } else if (result.isDenied) {
        Swal.fire('Ingrese nuevamente usuario y password', '', 'info')
      }
    })
  } else {
    Swal.fire(
      "Login correcto",
      'Continuá con tu compra',
      'success'
    )
  }
}



