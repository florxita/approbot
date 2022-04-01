// const e = require("express");

// ESTA FUNCION FETCH LLAMA AL ARCHIVO QUE SE NECESITE REEMPLAZAR EN EL HTML MAIN
const cargarPagina = (pagina) => {
  let archivoHtml = `${pagina}.html`;
  return fetch(archivoHtml)
    .then((res) => res.text())
    .then((data) => data);
};

/**
 * Para cargar la pagina: ejecutar cargarPagina y guardar el resultado en una variable, luego hacer el innerHTMl
 */

// ESTA FUNCION FETCH LLAMA AL JSON
const getRobot = () => {
  return fetch("http://127.0.0.1:5500/robots.json")
    .then((resp) => resp.json())
    .then((data) => data);
};

/* INICIO FUNCIONES DEL HOME */

// MENU HAMBURGUESA
const menuHam = () => {
  const catalogo = document.querySelectorAll('nav__link')
    window.addEventListener('click', async (e) => {
    switch(e.target.id) {
      case "catalogo":
        let catalogoSection = await cargarPagina("catalogoSection");
        main.innerHTML = catalogoSection;
        insertarCardRobot()
        navMenu.classList.remove("show-menu");
        break;
      case "nosotros":
        console.log('estas en nosotros');
        break;
      case "precios":
        console.log('estas en precios');
        break;
      case "contacto":
        console.log('estas en contacto');
        break;
      case "miCuenta":
        console.log('estas en Mi Cuenta')
        break;
        default:
        break;
    }

  })

}

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
  imagenRobot.src = robots[indiceRobot][0].img[0].preview;
  tituloRobot.textContent = robots[indiceRobot][0].name;
  typeRobot.textContent = robots[indiceRobot][0].type;
  descriptionRobot.textContent = robots[indiceRobot][0].description;

  console.log(robots) // < -------------------- eliminar esto 
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

/************************************************************************ */

/* INICIO FUNCIONES DE PERFIL ROBOT */

//ESCUCHO EL BOTON DE VER FICHA FICHA COMPLETA
const accederPerfilRobot = async () => {
  let robots = await getRobot();
  // history.pushState(null, "", "perfil-robot");
  let perfilRobot = await cargarPagina("perfil-robot"); // llama a perfilRobot una vez que cargo puedo crear variables
  main.innerHTML = perfilRobot; // y puedo insertar contenido

  let avatarRobot = document.getElementById("avatarRobot");
  let avatarName = document.getElementById("avatarName");
  let avatarType = document.getElementById("avatarType");
  let avatarDescription = document.getElementById("avatarDescription");
  let backBtn = document.getElementById("backBtn");

  avatarRobot.src = robots[indiceRobot][0].img[0].perfilImg;
  avatarName.textContent = robots[indiceRobot][0].name;
  avatarType.textContent = robots[indiceRobot][0].type;
  avatarDescription.textContent = robots[indiceRobot][0].description;

  header.classList.add("display__none");
  main.classList.add('margin-0')
  
  //LLAMA A la pagina de crear ficha
  //ejecuto los eventos de las pestanas del perfil de robot
  crearFichaEstadisticas(robots);
  obtenerDatosTabAdvices(robots);
  obtenerDatosTabDataSheet(robots);
  crearEventoTabs();  /** <------------ evento click sobre cada pestana */
  contratarRobot()


  backBtn.addEventListener("click", async () => {
    // history.pushState(null, "", "home");
    let paginaInicial = await cargarPagina("home");
    main.innerHTML = paginaInicial;
    header.classList.remove("display__none");
    main.classList.remove('margin-0')

    insertarRobot(indiceRobot);
  });
};

//////////////////////////
const crearFichaEstadisticas = (robots) => {
  let batteryLifeNumb = document.getElementById("batteryLifeNumb");
  let chargeTimeNumb = document.getElementById("chargeTimeNumb");
  let robotStadistics = robots[indiceRobot][0].statistics[0];

  // avatarCarga.innerHTML = robotStadistics.other[0].batteryLife[0].value;

  // chargeTimeNumb.innerHTML = robotStadistics.other[0].chargeTime[0].value;

  /** Guardo los valores de cada barra */
  energy = robotStadistics.energy[0];
  maintenance = robotStadistics.maintenance[0];
  complexity = robotStadistics.complexity[0];
  security = robotStadistics.security[0];
  // batteryLife = robots

  // para darle % a cada barra
  barBlue.style.width = `${energy.value}%`;
  barPink.style.width = `${maintenance.value}%`;
  barOrange.style.width = `${complexity.value}%`;
  barGreen.style.width = `${security.value}%`;

  insertarTooltip()
  recorrerCircleProgress(robotStadistics)
};

/** NO PODES SELECCIONAR UN SVG con document, AVERIGUAR COMO */
// const batteryLifeCircle = document.querySelectorAll('.batteryLife');
// console.log(batteryLifeCircle)
// const bate = document.getElementById('bateria')
// console.log(bate)
// const svg = document.querySelectorAll('svg')
// const arraySvg = Array.from(svg)
// console.log(svg)
// console.log(arraySvg)


const circleProgress = document.querySelectorAll('circle');
const arrayCircle = Array.from(circleProgress)
  console.log(arrayCircle.length)

const battery = document.getElementById('battery')
console.log(battery)

// batteryLifeCircle.style.strokeDashOffset = 'calc(310 - (310 * 60) / 100)';

const recorrerCircleProgress = (robotStadistics) => {
  const batteryValue = robotStadistics.other[0].batteryLife[0].value;
  const chargeValue = robotStadistics.other[0].chargeTime[0].value;
  
  batteryLifeNumb.innerHTML = batteryValue;
  chargeTimeNumb.innerHTML = chargeValue;

//   const arrayCircleProgress = Array.from(circleProgress);
//   console.log(arrayCircleProgress);
//   let target = arrayCircleProgress;

//     batteryLife.style.strokeDashoffset = `cal(310 - (310 * 60) / ${battery})`;
}

/** TABS / ficha tecnica / contenido estadisticas y consejos */

const crearEventoTabs = e =>{ // localizo las pestanas de la ficha
  const tabs = document.querySelectorAll('.tab');

  const stadisticsItems = document.getElementById('stadisticsItems'),
        dataSheet = document.getElementById('dataSheet'),
        advice = document.getElementById('advice');
  
  tabs.forEach((tab) => {
    tab.addEventListener('click', e => {
      const target = e.currentTarget;      
      removerClase() // remuevo la clase activa, antes de darla
      tab.classList.add('tab__active')

      if(target.id == 'tabStadistics'){
        stadisticsItems.style.display="flex";
        dataSheet.style.display="none";
        advice.style.display="none";
      }
      if(target.id == 'tabDataSheet'){
        stadisticsItems.style.display="none";
        dataSheet.style.display="flex";
        advice.style.display="none";
      }
      if(target.id == 'tabAdvices'){
        stadisticsItems.style.display="none";
        dataSheet.style.display="none";
        advice.style.display="flex";
      }
  })
})

const removerClase = () => {
  tabs.forEach((tab) => {
    tab.classList.remove('tab__active')
  })
}
}

const insertarTooltip = () => {
  const barItem = document.querySelectorAll('.bar__item');
  const arrayBarItem = Array.from(barItem);

  arrayBarItem.forEach((item) => {
    item.addEventListener('mouseenter', (e) => {
      switch(e.target.id){
      case "energyBar":
          crearTooltip(energy , barBlue);
        break;
        case "maintenanceBar":
          crearTooltip(maintenance, barPink);
        break;
        case "complexBar":
          crearTooltip(complexity, barOrange);
        break;
        case "securityBar":
          crearTooltip(security, barGreen);
        break;
        default:
        break;
      }
    })
  })
};

const crearTooltip = (id, bar) => {
 bar.innerHTML =  `<div class="tooltip">
    <h5>${id.title}  ${id.value} %</h5>
    <p>${id.description}</p>
    </div>`
};


/** ADVICE */
/** Obtengo los datos del Json y los inserto como <li> en la pestana consejos(#advice)*/
const obtenerDatosTabAdvices = robots => {
  let adviceList = document.getElementById('adviceList'),
      adviceItems = robots[indiceRobot][0].advice;
  
  adviceItems.forEach((item) => {
  adviceList.innerHTML += `<li>${item}</li`;
  })
}

/** DATASHEET */
/** Obtengo los datos del Json e inseto template de Ficha(#dataSheet) */
const obtenerDatosTabDataSheet = robots => {
  const dataSheetText = document.getElementById('dataSheetText');
  let data = robots[indiceRobot][0].dataSheet;

  dataSheetText.innerHTML = `
          <div>${data[0].description}</div>
          <a class="link" href="#">Accesorios disponibles en nuestra tienda</a>
          <h3>${data[0].operation[0].title}</h3>
          <span>${data[0].operation[0].description}</span>
          <h3>${data[0].accesorios[0].title}</h3>
          <ul id="accesoriesList"></ul>
          <a href="" class="link">  Descarga la Ficha completa aqui</a>
          `
    crearLiFicha(robots)
}

// Funcion que inserta el <li> en la lista de accesorios
const crearLiFicha = (robots) =>{
  
  const accesoriesList = document.getElementById('accesoriesList'),
        listSize = document.getElementById('listSize'),  
        listTable = document.getElementById('listTable');

  let data = robots[indiceRobot][0].dataSheet,
      dataAcc = data[0].accesorios[0].items,
      dataSize = data[0].size,
      dataItems = data[0].items;
  
  dataItems.forEach((item) => {
    listTable.innerHTML += `<li>${item}</li>`
  })

  dataAcc.forEach((item) => {
    accesoriesList.innerHTML += `<li>${item}</li>`
  })
  
  Object.entries(dataSize[0]).forEach(([key, value]) => {
    listSize.innerHTML += `<li>${(key + ': ' + value + ' cm')}</li>`
  })
};


const contratarRobot = (robots) =>{
  const getRobotBtn = document.getElementById('getRobotBtn')

  getRobotBtn.addEventListener('click', () => {
    // let robots = await getRobot();
    // let previewCart = await cargarPagina("preview"); // llama a perfilRobot una vez que cargo puedo crear variables
    // main.innerHTML = previewCart; // y puedo insertar contenido
    console.log('estas agregando un robot')
  })
}

/* FIN FUNCIONES DE PERFIL ROBOT */


/** ********************************************  **/


/** SECCION CATALOGO */
const insertarCardRobot = async () => {
  let robots = await getRobot();
  let card = document.getElementById('preview');

  robots.forEach((robot) => {
    // console.log(robots[indiceRobot][0].id)
    imgCard = robots[indiceRobot][0].img[0].perfilImg;
    nameRobot = robots[indiceRobot][0].name;
    workRobot = robots[indiceRobot][0].work;
    idRobot = robots[indiceRobot][0].id;
    indiceRobot++
    /** creo el template que se inserta en la seccion CATALOGO
     * x cada robot e indentifico con un ID para darle styles css
     */
    card.innerHTML += `<div id="${idRobot}" class="preview__robot trans">
      <img class="trans" src="${imgCard}" alt="imagen robot">
      <div class="content__preview trans">
      <h2>${nameRobot}</h2>
      <p>${workRobot}</p>
      <button class="btn fill__btn">Conoce a ${nameRobot}</button>

    </div>`

    window.addEventListener('click', e => {
      if(e.target.id == "r1"){
        console.log('entraste a R1')
      }
    })
  })
};
