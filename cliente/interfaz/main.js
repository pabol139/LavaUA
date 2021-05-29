var lavadora;



/* TRANSICION */ 


function cambiarLavar() {
    if (document.getElementById('inicio')) {

           // document.getElementById('inicio').style.display = 'block';
            document.getElementById('lavarScreen').style.transition = 'opacity 1.5s';
            document.getElementById('lavarScreen').style.height = 'auto';
            document.getElementById('lavarScreen').style.opacity = 1;
            document.getElementById('texto').innerHTML = "Elige un tipo";


        slide(0, 0);
        slide(0, 1);
    }

}

//Esconde todas las ventanas excepto la de inicio
/*
function esconderVentanas(){
	document.getElementById('lavarScreen').style.display = 'none';
}
*/


//document.addEventListener('DOMContentLoaded', esconderVentanas, false);


document.addEventListener('DOMContentLoaded', conectaLavadora, false);


function conectaLavadora() {
    lavadora = new Electro();

    lavadora.on("connect", function () {
        console.log("Ya estoy conectado con la lavadora!!!")
        console.log("Con este hay " + lavadora.clientes + " clientes conectados");
        
        inicio();

        var bloqueo = document.getElementById("lock");
            lock.addEventListener("click", function () {
                lavadora.puertaBloqueada = !lavadora.puertaBloqueada;
            });
            lavadora.on("puertaBloqueada", function (bloqueado) {
                bloqueo.innerHTML = bloqueado ? "<i class=\"fas fa-lock\"></i>" : "<i class=\"fas fa-lock-open\"></i>";
            });
    });
}



function inicio() {
        
        lavadora.on('reloj', function() {

        reloj();
            
        if(lavadora.puertaAbierta == true)
            document.getElementById("puerta").style.filter = "invert(18%) sepia(99%) saturate(6525%) hue-rotate(120deg) brightness(102%) contrast(104%)";

        else
            document.getElementById("puerta").style.filter = "invert(15%) sepia(89%) saturate(7107%) hue-rotate(3deg) brightness(95%) contrast(116%)";


        });
  
}

function bloqueo() {
        
    lavadora.on(sensor, function comprobarNivel(nivelActual) { // monitorizar el sensor
        if (nivelActual >= nivel) { // se ha alzanzado el nivel
            lavadora.off(sensor, comprobarNivel); // dejar de monitorizar
            console.log("    - Cerrar válvula:", valvula);
            lavadora[valvula] = false; // cerrar la válvula
            callback();
        }
    });

}



// Llena un deposito hasta un nivel usando un sensor de nivel y una valvula que abre el flujo
function llenar(sensor, valvula, nivel, callback) {
    console.log("  - Llenar depósito.", sensor, "->", nivel);
    lavadora.on(sensor, function comprobarNivel(nivelActual) { // monitorizar el sensor
        if (nivelActual >= nivel) { // se ha alzanzado el nivel
            lavadora.off(sensor, comprobarNivel); // dejar de monitorizar
            console.log("    - Cerrar válvula:", valvula);
            lavadora[valvula] = false; // cerrar la válvula
            callback();
        }
    });
    console.log("    - Abrir válvula:", valvula);
    lavadora[valvula] = true; // abro la topa
}


// Vaciar un deposito hasta un nivel usando un sensor de nivel y una válvula que abre el flujo
function vaciar(sensor, valvula, nivel, callback) {
    console.log("  - Vaciar depósito.", sensor, "->", nivel);
    lavadora.on(sensor, function comprobarNivel(nivelActual) { // monitorizar el sensor
        if (nivelActual <= nivel) { // se ha alzanzado el nivel
            lavadora.off(sensor, comprobarNivel); // dejar de monitorizar
            console.log("    - Cerrar válvula:", valvula);
            lavadora[valvula] = false; // cerrar la válvula
            callback();
        }
    });
    console.log("    - Abrir válvula:", valvula);
    lavadora[valvula] = true; // abro la topa
}

// Establece una temperatura a un valor, encendiendo y apagando una resistencia durante un tiempo (ms)
function termostato(sensor, resistencia, temp, duracion, callback) {
    function comprobarTemp(tempAct) {
        if (tempAct < temp) resistencia = true;
        if (tempAct > temp) resistencia = false;
    }
    lavadora.on(sensor, comprobarTemp);
    setTimeout(function () {
        lavadora[resistencia] = false;
        lavadora.off(sensor, comprobarTemp);
        callback();
    }, duracion);
}

// Realiza un lavado
function lavar(callback) {
    // Obtener parámetros del lavado
    var
        detergente = document.getElementById("detergente").value,
        suavizante = document.getElementById("suavizante").value,
        nivelAgua = document.getElementById("nivelAgua").value,
        temperaturaLavado = document.getElementById("temperaturaLavado").value,
        revolucionesLavado = document.getElementById("revolucionesLavado").value,
        tiempoLavado = document.getElementById("tiempoLavado").value * 1000,
        revolucionesCentrifugado = document.getElementById("revolucionesCentrifugado").value,
        tiempoCentrifugado = document.getElementById("tiempoCentrifugado").value * 1000;

    // Puerta abierta
    if (lavadora.puertaAbierta) {
        alert("Puerta abierta!!!!");
        callback();
        return;
    }

    // Hay ropa?
    if (!lavadora.peso) {
        alert("Parece que no hay ropa en la lavadora.");
        callback();
        return;
    }

    console.log("Iniciar lavado");
    lavadora.puertaBloqueada = true; // Bloquear puerta durante el lavado
    console.log("Puerta bloqueada");
    // Llenar de agua el tambor (para lavado)
    console.log("Llenar de agua (para lavado)...")
    llenar("nivelAgua", "tomaAgua", nivelAgua, function () {
        // Detergente
        console.log("Poner detergente...");
        vaciar("nivelDetergente", "tomaDetergente", lavadora.nivelDetergente - detergente, function () {
            // Lavado
            console.log("Lavar...")
            lavadora.tamborRevoluciones = revolucionesLavado;
            termostato("temperaturaAgua", "resistenciaAgua", temperaturaLavado, tiempoLavado, function () {
                // Vaciar agua
                console.log("Vaciar tambor de agua...");
                vaciar("nivelAgua", "desague", 0, function () {
                    // Llenar de agua para suavizante
                    console.log("Llenar de agua (para suavizante)...")
                    llenar("nivelAgua", "tomaAgua", nivelAgua, function () {
                        // Suavizante
                        console.log("Poner suavizante");
                        vaciar("nivelSuavizante", "tomaSuavizante", lavadora.nivelSuavizante - suavizante, function () {
                            // Vaciar agua
                            console.log("Vaciar tambor de agua...");
                            vaciar("nivelAgua", "desague", 0, function () {
                                // Centrifugar
                                console.log("Centrifugar...")
                                lavadora.tamborRevoluciones = revolucionesCentrifugado;
                                setTimeout(function () {
                                    console.log("Fin del lavado!!!");
                                    lavadora.tamborRevoluciones = 0; // parar motor
                                    lavadora.puertaBloqueada = false; // desbloquear puerta
                                    callback();
                                }, tiempoCentrifugado);
                            });
                        });
                    });
                });
            });
        });
    });
}


function reloj(){

    time = lavadora.reloj;
    horas = time.getHours();
    minutos = time.getMinutes();
    segundos = time.getSeconds();

    document.getElementById("hora").innerHTML = String(horas).padStart(2, '0')+':'+String(minutos).padStart(2, '0');
}
/*
lavadora.on("connect", function () { // Esparar a que la librería se conecte con la lavadora
    console.log("Ya estoy conectado con la lavadora!!")
    console.log("Con este hay " + lavadora.clientes + " clientes conectados");

    // Bloqueo de puerta
    var bloqueo = document.getElementById("bloqueo");
    bloqueo.addEventListener("click", function () {
        lavadora.puertaBloqueada = !lavadora.puertaBloqueada;
    });
    lavadora.on("puertaBloqueada", function (bloqueado) {
        bloqueo.innerHTML = bloqueado ? "Desbloquear Puerta" : "Boquear Puerta";
    });

    // Lavar
    var botonLavar = document.getElementById("lavar");
    botonLavar.addEventListener("click", function () {
        botonLavar.disabled = true;
        lavar(function () {
            botonLavar.disabled = false;
        });
    });
});
*/


// Lista flechas
var pr = document.querySelector( '.fa.fa-arrow-up');
var pl = document.querySelector( '.fa.fa-arrow-down');

function prClick(tipo){
    slide(-1, tipo);
}

function plClick(tipo){
    slide(1, tipo);
}



var index = 0, total = 7;
var index2 = 0, total2 = 2;

function slide(offset, tipo) {
        console.log("entraaaaa");

  index = Math.min( Math.max( index + offset, 0 ), total - 1 );
  index2 = Math.min( Math.max( index2 + offset, 0 ), total2 - 1 );



  if(tipo == 0){

    if(index2+1==1){
        document.querySelector( '.counter' ).innerHTML = "<img src=\"img/washing-machine2.svg\" class=\"filter-blue\" width=\"50px\" height=\"50px\" id=\"lavar\"/>Lavar";
      }else if(index2+1==2){
        document.querySelector( '.counter' ).innerHTML = "<img src=\"img/dry.svg\" class=\"filter-blue\" width=\"50px\" height=\"50px\" id=\"lavar\"/>Secar";
      
      }

  }else{

    if(index+1==1){
        document.querySelector( '.counter2' ).innerHTML = "Tipo Lavado";
      }else if(index+1==2){
        document.querySelector( '.counter2' ).innerHTML = "Lana/Seda";
      }else if(index+1==3){
        document.querySelector( '.counter2' ).innerHTML = "Sport";
      }else if(index+1==4){
        document.querySelector( '.counter2' ).innerHTML = "Algodon";
      }else if(index+1==5){
        document.querySelector( '.counter2' ).innerHTML = "Sinteticos";
      }else if(index+1==6){
        document.querySelector( '.counter2' ).innerHTML = "Delicados";
      }else if(index+1==7){
        document.querySelector( '.counter2' ).innerHTML = "Rapido 30 min";
      }else if(index+1==8){
        document.querySelector( '.counter2' ).innerHTML = "Rapido 15 min";
      } 


  }

/*
  pr.setAttribute( 'data-state', index === 0 ? 'disabled' : '' );
  pl.setAttribute( 'data-state', index === total - 1 ? 'disabled' : '' );*/
}

slide(0);


function mover(){

    document.getElementById('inicio').style.left =  -400 + 'px';
    cambiarLavar();
}




