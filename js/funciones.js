// ESTA FUNCION FETCH LLAMA AL ARCHIVO QUE SE NECESITE REEMPLAZAR EN EL HTML MAIN
const cargarPagina = (pagina) => {
  let archivoHtml = `${pagina}.html`;
  return fetch(archivoHtml)
    .then((res) => res.text())
    .then((data) => data);
};

/**
 * Para cargar la pagina ejecutar cargarPagina y guardar el resultado en una variabvle y luego hacer el innerHTMl de esa web
 * deberia andar
 * ]
 *
 */

// ESTA FUNCION FETCH LLAMA AL JSON
const getRobot = () => {
  return fetch("http://127.0.0.1:5500/robots.json")
    .then((resp) => resp.json())
    .then((data) => data);
};

/* INICIO FUNCIONES DEL HOME */

// ESTA FUNCION CREA EL SLIDER
const crearSliderRobot = () => {
  // CREO VARIABLES
  let imagenRobot = document.getElementById("imagenRobot");
  let tituloRobot = document.getElementById("tituloRobot");
  let typeRobot = document.getElementById("typeRobot");
  let descriptionRobot = document.getElementById("descriptionRobot");
  //INSERTO CONTENIDO A VARIABLES
  insertarRobot();
};

// ESTA FUNCION CARGA EL PRIMER ROBOT Y ES EJECUTADA POR PRIMERA VEZ POR CREARSLIDERROBOT
const insertarRobot = async () => {
  // console.log(indiceRobot);
  let robots = await getRobot();
  imagenRobot.src = robots[indiceRobot][0].preview;
  tituloRobot.textContent = robots[indiceRobot][0].name;
  typeRobot.textContent = robots[indiceRobot][0].type;
  descriptionRobot.textContent = robots[indiceRobot][0].description;
};

// ESTA FUNCION CARGA LA TABLA DE PRECIOS
const crearTablaDePrecios = () => {
  let lista = document.getElementById("lista");
  let planTitulo = document.getElementById("planTitulo");
  let anualPrice = document.getElementById("anualPrice");
  let mensualPrice = document.getElementById("mensualPrice");

  planTitulo.textContent = planes.title;
  anualPrice.textContent = "$" + planes.anualPrice + " ";
  mensualPrice.textContent = planes.mensualPrice + " x mes";

  let itemsLista = planes.items;
  itemsLista.forEach((item) => {
    lista.innerHTML += `<li>${item}</li>`;
  });

  // let datosPlanes = Object.entries(planes);
  // console.log(datosPlanes);
  // return datosPlanes
  //   .map(([key, value]) => {
  //     if (key == "item") {
  //       return itemsArray.map((x) => `<li>${x}</li>`).join("");
  //     }
  //   })
  //   .join("");
};

// ESCUCHA LA FLECHA DERECHA DEL SLIDER
const navegarDerecha = async () => {
  let robots = await getRobot();
  indiceRobot++;
  if (indiceRobot == robots.length) {
    indiceRobot = 0;
    insertarRobot();
  } else {
    insertarRobot();
  }
};
// ESCUCHA LA FLECHA IZQUIERDA DEL SLIDER
const navegarIzquierda = async () => {
  let robots = await getRobot();
  indiceRobot--; //resto el indice
  if (indiceRobot < 0) {
    indiceRobot = robots.length - 1;
    insertarRobot();
  } else {
    insertarRobot();
  }
};

/* FIN FUNCIONES DEL HOME */

/* INICIO FUNCIONES DE PERFIL ROBOT */

//ESCUCHO EL BOTON DE VER FICHA FICHA COMPLETA
const accederPerfilRobot = async () => {
  let robots = await getRobot();
  // history.pushState(null, "", "perfil-robot");
  let perfilRobot = await cargarPagina("perfil-robot"); // llama a la pagina perfilRobot una vez que cargo puedo crear variables
  main.innerHTML = perfilRobot; // y puedo insertar contenido

  let avatarRobot = document.getElementById("avatarRobot");
  let avatarName = document.getElementById("avatarName");
  let avatarType = document.getElementById("avatarType");
  let avatarDescription = document.getElementById("avatarDescription");
  let backBtn = document.getElementById("backBtn");

  avatarRobot.src = robots[indiceRobot][0].perfilImg;
  avatarName.textContent = robots[indiceRobot][0].name;
  avatarType.textContent = robots[indiceRobot][0].type;
  avatarDescription.textContent = robots[indiceRobot][0].description;

  header.classList.add("display__none");

  //LLAMA A la pagina de crear ficha
  crearFichaEstadisticas(robots);

  backBtn.addEventListener("click", async () => {
    // history.pushState(null, "", "home");
    let paginaInicial = await cargarPagina("home");
    main.innerHTML = paginaInicial;
    header.classList.remove("display__none");

    insertarRobot(indiceRobot);
  });
};

//////////////////////////
const crearFichaEstadisticas = (robots) => {
  let avatarCarga = document.getElementById("avatarCarga");
  let chargeTimeNumb = document.getElementById("chargeTimeNumb");
  let barBlue = document.getElementById("barBlue");

  avatarCarga.innerHTML =
    robots[indiceRobot][0].statistics[0].other[0].batteryLife[0].value;

  chargeTimeNumb.innerHTML =
    robots[indiceRobot][0].statistics[0].other[0].chargeTime[0].value;

  energy = robots[indiceRobot][0].statistics[0].energy[0].value;
  maintenance = robots[indiceRobot][0].statistics[0].maintenance[0].value;
  complexity = robots[indiceRobot][0].statistics[0].complexity[0].value;
  security = robots[indiceRobot][0].statistics[0].security[0].value;

  // para darle elcolor y % a cada barra
  barBlue.style.width = `${energy}%`;
  barBlue.style.background = "var(--blueGradient)";
  barPink.style.width = `${maintenance}%`;
  barPink.style.background = "var(--pinkGradient)";
  barOrange.style.width = `${complexity}%`;
  barOrange.style.background = "var(--orangeGradient)";
  barGreen.style.width = `${security}%`;
  barGreen.style.background = "var(--greenGradient)";

  // circleBarBlue.style.strokeDasharray = 200;
  // circleBarPink.style.strokeDasharray = 170;
  // obtenerCircunsferencia()
};

/* FIN FUNCIONES DE PERFIL ROBOT */
