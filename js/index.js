// CREO VARIABLES ACCESIBLES DESDE EL INDEX
let header = document.getElementById("header");
let main = document.getElementById("main");
let indiceRobot = 0;
const navMenu = document.getElementById("nav-menu"),
  navToggle = document.getElementById("nav-toggle"),
  navClose = document.getElementById("nav-close");

//mostrar menu
if (navToggle) {
  navToggle.addEventListener("click", () => {
    navMenu.classList.add("show-menu");
  });
}
if (navClose) {
  navClose.addEventListener("click", () => {
    navMenu.classList.remove("show-menu");
  });
}

const planes = {
  title: "Plan Anual",
  anualPrice: 60000,
  mensualPrice: 5000,
  items: [
    "Control Remoto y Accesorios",
    "Cobertura 100% en daños de la unidad",
    "Asistencia Técnica Virtual 24/7",
    "Mantenimiento mensual sin cargo",
    "Elección de Color de pintura",
    "Beneficios Socio Robot",
  ],
};

// MANIANA TOCA ESTA PARTE

// tabs.forEach((tab) => {
//   tab.addEventListener("click", (e) => {
//     const target = e.currentTarget;
//     const adviceItems = document.querySelector("adviceItems");
//     console.log(target);

//     if (target.id == "tabConsejos") {
//       console.log("entre a consejos");
//       stadisticsItems.style.display = "hidden";
//       crearConsejos();
//     }
//     if (target.id == "tabEstadisticas") {
//       console.log("entro en estadisticas");
//       adviceItems.style.display = "hidden";
//       // crearEstadisticas(robots)
//     }
//     if (target.id == "tabFicha") {
//       console.log("entre a ficha");
//     }

//     target.classList.add("tab__active");
//     const arrayHermanos = tabs.filter((tab) => tab.id != target.id);
//     arrayHermanos.forEach((tab) => {
//       tab.classList.remove("tab__active");
//       // insertarConsejos()
//     });
//   });
// });

//ESTA FUNCION CARGA EL HOME APENAS SE CARGA LA WEB EJECUTA EL HOME Y EL ROBOT
window.addEventListener("load", async () => {
  let paginaInicial = await cargarPagina("home");
  main.innerHTML = paginaInicial;
  crearSliderRobot();
  crearTablaDePrecios();

  window.addEventListener("click", async (e) => {
    switch (e.target.id) {
      case "arrowRight":
        navegarDerecha();
        break;
      case "arrowLeft":
        navegarIzquierda();
        break;
      case "fileRobotBtn":
        accederPerfilRobot();
        break;
      default:
        break;
    }
  });
});
