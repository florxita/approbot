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

/** PLANES OBJETO  *********************************************  */
const planes = {
  title: "Plan Mensual",
  anualPrice: 6000,
  mensualPrice: 6000,
  items: [
    "Control Remoto y Accesorios",
    "Asistencia Técnica Virtual 24/7",
    "Cobertura 20% en daños de la unidad",
    "Beneficios Socio Robot",
  ],
  title: "Plan Trimestral",
  anualPrice: 15500,
  mensualPrice: 5166,
  items: [
    "Control Remoto y Accesorios",
    "Cobertura 40% en daños de la unidad",
    "Asistencia Técnica Virtual 24/7",
    "Mantenimiento mensual con 50% de descuento",
    "Beneficios Socio Robot",
    "Descuentos exclusivos en tiendas asociadas",
  ],
  title: "Plan Semestral",
  anualPrice: 25200,
  mensualPrice: 4200,
  items: [
    "Control Remoto y Accesorios",
    "Cobertura 60% en daños de la unidad",
    "Asistencia Técnica Virtual 24/7",
    "Mantenimiento mensual sin cargo",
    "Elección de color de pintura",
    "Beneficios Socio Robot",
    "Descuentos en tiendas asociadas",
  ],
  title: "Plan Anual",
  anualPrice: 47000,
  mensualPrice: 3916,
  items: [
    "Control Remoto y Accesorios",
    "Cobertura 100% en daños de la unidad",
    "Asistencia Técnica Virtual 24/7",
    "Mantenimiento mensual sin cargo",
    "Elección de color de pintura y apariencia",
    "Beneficios Socio Robot",
    "Descuentos en tiendas asociadas",
  ],
  
};
/** ***********************************************************************  */

//ESTA FUNCION CARGA EL HOME APENAS SE CARGA LA WEB EJECUTA EL HOME Y EL ROBOT
window.addEventListener("DOMContentLoaded", async () => { 
  let paginaInicial = await cargarPagina("home");
  main.innerHTML = paginaInicial;
  crearSliderRobot();
  crearTablaDePrecios();
  menuHam()

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

