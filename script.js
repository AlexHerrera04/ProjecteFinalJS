window.onload = () => {
    // Crear tarjetas
    crearTarjetas(filosofos)

    // Crear handlers para los botones de control
    let botonCrearTarjeta = document.querySelector('.create-btn');
    botonCrearTarjeta.addEventListener('click',crearNuevaTarjeta);

  let botonesOrden = document.querySelectorAll('.sort-options .sort-btn');
if (botonesOrden.length >= 2) {
    botonesOrden[0].addEventListener('click', ordenarNombreAZ);
    botonesOrden[1].addEventListener('click', ordenarNombreZA);
}
 let botonGuardar = document.querySelector('.save-btn');
    let botonCargar = document.querySelector('.load-btn');
    if (botonGuardar) botonGuardar.addEventListener('click', guardarTarjetas);
    if (botonCargar) botonCargar.addEventListener('click', cargarTarjetas);


}

function crearTarjetas(filosofos) {
    filosofos.forEach((filosofo) => {

        // Creamos tarjeta vacía
        let tarjeta = document.createElement('div');
        tarjeta.classList.add('card');

        // Crear imagen
        let imagen = document.createElement('img');
        imagen.src = filosofo.imagen;
        imagen.alt = `Foto de ${filosofo.nombre}`;
        imagen.classList.add("photo");
        tarjeta.append(imagen);

        // Caja de información
        let info = document.createElement('div');
        info.classList.add('card-info');
        tarjeta.append(info);

        // Nombre
        let titulo = document.createElement('h3');
        titulo.classList.add('nombre');
        titulo.innerHTML = filosofo.nombre;
        info.append(titulo);

        // Fila de info
        let filaInfo = document.createElement('div');
        filaInfo.classList.add('info-row');
        info.append(filaInfo);

        // País
        let infoPais = document.createElement('div');
        infoPais.classList.add('info-pais');
        infoPais.innerHTML = `
            <img src="${filosofo.pais.bandera}">
            <span class="pais">${filosofo.pais.nombre}</span>
        `;
        filaInfo.append(infoPais);

        // Corriente
        let infoCorriente = document.createElement('div');
        infoCorriente.classList.add('info-corriente');
        infoCorriente.innerHTML = `
            <span>Corriente: </span>
            <span class="corriente">${filosofo.corriente}</span>
        `;
        filaInfo.append(infoCorriente);

        // Arma
        let infoArma = document.createElement('div');
        infoArma.classList.add('info-arma');
        infoArma.innerHTML = `
            <span>Arma: </span>
            <span class="arma">${filosofo.arma}</span>
        `;
        filaInfo.append(infoArma);

        // Caja de habilidades
        let habilidades = document.createElement('div');
        habilidades.classList.add('skills');
        info.append(habilidades);

        // Añadir cada habilidad
        for (let infoHabilidad of filosofo.habilidades) {

            let skill = document.createElement('div');
            skill.classList.add('skill');
            habilidades.append(skill);

            // Icono – ara es un placeholder
            let icono = document.createElement('img');
            icono.src = "https://via.placeholder.com/16";
            skill.append(icono);

            // Nombre habilidad
            let nombreSkill = document.createElement('span');
            nombreSkill.classList.add('skill-name');
            nombreSkill.innerHTML = infoHabilidad.habilidad;
            skill.append(nombreSkill);

            // Barra
            let barra = document.createElement('div');
            barra.classList.add('skill-bar');
            skill.append(barra);

            let nivel = document.createElement('div');
            nivel.classList.add('level');
            nivel.style.width = (infoHabilidad.nivel * 25) + "%";
            barra.append(nivel);
        }

        // Crear botón de eliminar
let botonEliminar = document.createElement('div');
botonEliminar.innerHTML = "&#x2716;";  // aspa
botonEliminar.classList.add('botonEliminar');
botonEliminar.addEventListener('click', eliminarTarjeta);

// Añadimos el botón a la tarjeta
tarjeta.append(botonEliminar);

        // Añadir tarjeta al contenedor
        let contenedor = document.querySelector('.cards-container');
        contenedor.append(tarjeta);
    });
}



function eliminarTarjeta(event) {
    event.target.parentElement.remove();
}

function cargarTarjetas() {
    let datos = localStorage.getItem('tarjetas');
    if (!datos) return;

    let filosofosCargados = JSON.parse(datos);
    crearTarjetas(filosofosCargados);
}


function ordenarNombreAZ() {
    let tarjetas = Array.from(document.querySelectorAll('.card'));
    let tarjetasOrdenadas = tarjetas.sort((tarjetaA, tarjetaB) => {
        let nombre1 = tarjetaA.querySelector('h3').innerHTML;
        let nombre2 = tarjetaB.querySelector('h3').innerHTML;
        return nombre1.localeCompare(nombre2);
    });

    // Eliminar totes les targetes de l'array 'tarjeta'
    tarjetas.forEach(tarjeta => tarjeta.remove());

    // Afegir 'tarjetasOrdenadas' al contenidor de cards
    let contenedor = document.querySelector('.cards-container');
    tarjetasOrdenadas.forEach(tarjeta => contenedor.appendChild(tarjeta));
}

function ordenarNombreZA() {
    let tarjetas = Array.from(document.querySelectorAll('.card'));
    let tarjetasOrdenadas = tarjetas.sort((tarjetaA, tarjetaB) => {
        let nombre1 = tarjetaA.querySelector('h3').innerHTML;
        let nombre2 = tarjetaB.querySelector('h3').innerHTML;
        return nombre2.localeCompare(nombre1); 
    });

    tarjetas.forEach(tarjeta => tarjeta.remove());

    let contenedor = document.querySelector('.cards-container');
    tarjetasOrdenadas.forEach(tarjeta => contenedor.appendChild(tarjeta));
}


function crearNuevaTarjeta(event) {
    event.preventDefault();

    let nuevoFilosofo = {};
    nuevoFilosofo.nombre = document.querySelector('.create-card-form .nombre').value;
    nuevoFilosofo.imagen = document.querySelector('.create-card-form .foto').value;
    nuevoFilosofo.pais = {};
    nuevoFilosofo.pais.nombre = document.querySelector('.create-card-form .pais').value;
    // Completar la función
    nuevoFilosofo.pais.bandera = document.querySelector('.create-card-form .bandera').value;
nuevoFilosofo.corriente = document.querySelector('.create-card-form .corriente').value;
nuevoFilosofo.arma = document.querySelector('.create-card-form .arma').value;

// Les habilitats són 4 camps de tipus number
nuevoFilosofo.habilidades = [];
document.querySelectorAll('.create-card-form .skills').forEach((input) => {
    nuevoFilosofo.habilidades.push({
        habilidad: input.previousElementSibling.innerText || "Habilidad",
        nivel: parseInt(input.value) || 1
    });
});

    crearTarjetas([nuevoFilosofo])
}

function parsearTarjetas(tarjetas){
    let filosofosParseados = [];
    for (let tarjeta of tarjetas){
        let filosofo = {};
        filosofo.nombre = tarjeta.querySelector('.nombre').innerHTML;
        filosofo.imagen = tarjeta.querySelector('.photo').src;
        filosofo.pais = {};
        filosofo.pais.nombre = tarjeta.querySelector('.pais').innerHTML;
        filosofo.pais.bandera = tarjeta.querySelector('.info-pais img').src;
        filosofo.corriente = tarjeta.querySelector('.corriente').innerHTML;
        filosofo.arma = tarjeta.querySelector('.arma').innerHTML;

        let habilidades = tarjeta.querySelectorAll('.skill');
        filosofo.habilidades = [];
        for (let habilidad of habilidades){
            let habilidadParaGuardar = {};
            habilidadParaGuardar.habilidad = habilidad.querySelector('.skill-name').innerHTML;
            let nivelBar = habilidad.querySelector('.level').style.width;
            habilidadParaGuardar.nivel = parseInt(nivelBar) / 25; 
            filosofo.habilidades.push(habilidadParaGuardar);
        }
        filosofosParseados.push(filosofo);
    }
    return filosofosParseados;
}


function guardarTarjetas(){
    let tarjetas = Array.from(document.querySelectorAll('.card'));
    localStorage.setItem('tarjetas',JSON.stringify(parsearTarjetas(tarjetas)));
}


function cargarTarjetas() {
}

const filosofos = [
    {
        nombre: "Platón",
        imagen: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/da/Plato_Pio-Clemetino_Inv305.jpg/1200px-Plato_Pio-Clemetino_Inv305.jpg",
        pais: {
            nombre: "Grecia",
            bandera: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5c/Flag_of_Greece.svg/640px-Flag_of_Greece.svg.png"
        },
        corriente: "Idealismo",
        arma: "Dialéctica",
        habilidades: [{
            habilidad: "Sabiduría",
            nivel: 4
        },
        {
            habilidad: "Oratoria",
            nivel: 4
        },
        {
            habilidad: "Lógica",
            nivel: 3
        },
        {
            habilidad: "Innovación",
            nivel: 4
        }
        ]
    },
    {
        nombre: "Aristóteles",
        imagen: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQdXUwy_fFGOJ2vwOMpwtJPyXc9HVb06HSRsbembn7IPKq6D1YitIra2WFM4Gu2rm6yHRs&usqp=CAU",
        pais: {
            nombre: "Grecia",
            bandera: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5c/Flag_of_Greece.svg/640px-Flag_of_Greece.svg.png"
        },
        corriente: "Naturalismo",
        arma: "Lógica",
        habilidades: [{
            habilidad: "Sabiduría",
            nivel: 4
        },
        {
            habilidad: "Oratoria",
            nivel: 3
        },
        {
            habilidad: "Lógica",
            nivel: 4
        },
        {
            habilidad: "Innovación",
            nivel: 3
        }
        ]
    },
    {
        nombre: "Descartes",
        imagen: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/73/Frans_Hals_-_Portret_van_Ren%C3%A9_Descartes.jpg/800px-Frans_Hals_-_Portret_van_Ren%C3%A9_Descartes.jpg",
        pais: {
            nombre: "Francia",
            bandera: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c3/Flag_of_France.svg/1280px-Flag_of_France.svg.png"
        },
        corriente: "Racionalismo",
        arma: "Meditación",
        habilidades: [{
            habilidad: "Sabiduría",
            nivel: 3
        },
        {
            habilidad: "Oratoria",
            nivel: 3
        },
        {
            habilidad: "Lógica",
            nivel: 2
        },
        {
            habilidad: "Innovación",
            nivel: 3
        }
        ]
    },
    {
        nombre: "Kant",
        imagen: "https://i.pinimg.com/736x/20/89/7f/20897f915acb5124893a278c395382ed.jpg",
        pais: {
            nombre: "Alemania",
            bandera: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/ba/Flag_of_Germany.svg/255px-Flag_of_Germany.svg.png"
        },
        corriente: "Trascendentalismo",
        arma: "Crítica",
        habilidades: [{
            habilidad: "Sabiduría",
            nivel: 3
        },
        {
            habilidad: "Oratoria",
            nivel: 2
        },
        {
            habilidad: "Lógica",
            nivel: 3
        },
        {
            habilidad: "Innovación",
            nivel: 3
        }
        ]
    },
    {
        nombre: "Hume",
        imagen: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSiFZYg2MiOQSXbkBvFP-T3vW9pnhLW5qDioA&s",
        pais: {
            nombre: "Escocia",
            bandera: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/10/Flag_of_Scotland.svg/640px-Flag_of_Scotland.svg.png"
        },
        corriente: "Empirismo",
        arma: "Escepticismo",
        habilidades: [{
            habilidad: "Sabiduría",
            nivel: 3
        },
        {
            habilidad: "Oratoria",
            nivel: 3
        },
        {
            habilidad: "Lógica",
            nivel: 3
        },
        {
            habilidad: "Innovación",
            nivel: 3
        }
        ]
    },
    {
        nombre: "Arendt",
        imagen: "https://efeminista.com/wp-content/uploads/2021/09/Arendt-Hannah-1-e1576158475623.jpg",
        pais: {
            nombre: "Alemania",
            bandera: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/ba/Flag_of_Germany.svg/255px-Flag_of_Germany.svg.png"
        },
        corriente: "Fenomenología",
        arma: "Parresía",
        habilidades: [{
            habilidad: "Sabiduría",
            nivel: 3
        },
        {
            habilidad: "Oratoria",
            nivel: 2
        },
        {
            habilidad: "Lógica",
            nivel: 2
        },
        {
            habilidad: "Innovación",
            nivel: 3
        }
        ]
    }
]