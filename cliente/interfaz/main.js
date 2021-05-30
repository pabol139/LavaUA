var lavadora;
var tiempo;
var textoDinamico;
var tempLavado;
var centLavado;
var tempSecado;
var minuts = 0;
var minutsLavado = 0;
var minutsCentrifugado = 0;
var minutsSecado = 0;




/* TRANSICION */ 


function actividad(activo) {

    if (document.getElementById('inicio')) {

            document.getElementById('lavarScreen').style.transition = 'opacity 1.5s';
            document.getElementById('lavarOpciones').style.transition = 'opacity 1.5s';
            document.getElementById('opciones').style.transition = 'opacity 1.5s';
            document.getElementById('bottom-botones').style.transition = 'opacity 1.5s';


            if(activo == 1){

                    /* CAMBIAR COLOR DE LA BOLA */
                var animation = document.styleSheets[0].cssRules[3];
                document.getElementsByClassName('blob')[0].style.border = "5px solid #00FF00";
                animation.deleteRule('0%');
                animation.deleteRule('70%');
                animation.deleteRule('100%');
                animation.appendRule('	0% {transform: scale(0.95);box-shadow: 0 0 0 0 rgba(0, 255, 0, 0.7); }');
                animation.appendRule('	70% {transform: scale(1);box-shadow: 0 0 0 35px rgba(0, 255, 0, 0); }');
                animation.appendRule('	100% {transform: scale(0.95);box-shadow: 0 0 0 0 rgba(0, 255, 0, 0); }');

                /* ENSEÑAR LA INTERFAZ */
                document.getElementById('lavarScreen').style.opacity = 1;
                document.getElementById('lavarOpciones').style.height = 'auto';
                document.getElementById('lavarOpciones').style.opacity = 1;
                document.getElementById('opciones').style.opacity = 1;
                document.getElementById('bottom-botones').style.opacity = 1;

                console.log();

                if(textoDinamico == "Elige un tipo")
                    document.getElementById('texto').innerHTML = "Elige un tipo";
                else
                    document.getElementById('texto').innerHTML = textoDinamico;

                slide(0, 0);
                slide(0, 1);
                slide(0, 2);
            }
            else {

                /* CAMBIAR COLOR DE LA BOLA */
                var animation = document.styleSheets[0].cssRules[3];
                document.getElementsByClassName('blob')[0].style.border = "5px solid aqua";
                animation.deleteRule('0%');
                animation.deleteRule('70%');
                animation.deleteRule('100%');
                animation.appendRule('	0% {transform: scale(0.95);box-shadow: 0 0 0 0 rgba(0, 255, 255, 0.7); }');
                animation.appendRule('	70% {transform: scale(1);box-shadow: 0 0 0 35px rgba(0, 255, 255, 0); }');
                animation.appendRule('	100% {transform: scale(0.95);box-shadow: 0 0 0 0 rgba(0, 255, 255, 0); }');

                document.getElementById('lavarScreen').style.opacity = 0;
                document.getElementById('lavarOpciones').style.opacity = 0;
                document.getElementById('opciones').style.opacity = 0;

                document.getElementById('texto').innerHTML = "¡Bienvenido!";

            }
     
    }

}

function cambiarInterfaz(tipo) {

            if(tipo == 1){

                
             //   document.getElementById('lavarScreen').innerHTML = "";

             document.getElementById('secarOpciones').style.display = "none";
             document.getElementById('lavarOpciones').style.display = "flex";
             document.getElementById('retardo').style.display = "inline-block";
             document.getElementById('detergentes').style.display = "block";



            }
            else if (tipo == 2){


                document.getElementById('lavarOpciones').style.display = "none";
                document.getElementById('secarOpciones').style.display = "flex";
                document.getElementById('retardo').style.display = "none";
                document.getElementById('detergentes').style.display = "none";

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
    textoDinamico = "";

    lavadora.on("connect", function () {
        console.log("Ya estoy conectado con la lavadora!!!")
        console.log("Con este hay " + lavadora.clientes + " clientes conectados");
        
        inicio();

        if(lavadora.presencia == true)
        mover(1);

        document.getElementById('detpor').innerHTML = lavadora.nivelDetergente + "%";
        document.getElementById('suapor').innerHTML = lavadora.nivelSuavizante + "%";



        var bloqueo = document.getElementById("lock");
            lock.addEventListener("click", function () {
                lavadora.puertaBloqueada = !lavadora.puertaBloqueada;
            });
            lavadora.on("puertaBloqueada", function (bloqueado) {
                bloqueo.innerHTML = bloqueado ? "<i class=\"fas fa-lock\"></i>" : "<i class=\"fas fa-lock-open\"></i>";
            });

            lavadora.on("nivelDetergente", function () {

                document.getElementById('detpor').innerHTML = lavadora.nivelDetergente + "%";
            });
            lavadora.on("nivelSuavizante", function () {

                document.getElementById('suapor').innerHTML = lavadora.nivelSuavizante + "%";

            });

            lavadora.on("presencia", function () {

                if(lavadora.presencia == true)
                    mover(1);
                else
                    mover(0);

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


        if(lavadora.puertaBloqueada == true)
            document.getElementById("lock").innerHTML = "<i class=\"fas fa-lock\"></i>"

        else
            document.getElementById("lock").innerHTML = "<i class=\"fas fa-lock-open\"></i>"

    
            


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
        detergente = lavadora.peso/100,
        suavizante = detergente/2,
        nivelAgua = ((lavadora.peso*100)/500)+5,
        temperaturaLavado = tempLavado,
        revolucionesLavado = centLavado,
        tiempoLavado = minutsLavado * 1000,
        revolucionesCentrifugado = centLavado,
        tiempoCentrifugado = minutsCentrifugado * 1000;

    // Puerta abierta
    if (lavadora.puertaAbierta) {
        alert("Puerta abierta!!!!");
        //MODAL DE CIERRA LA PUERTA CALVO
        callback();
        return;
    }

    // Hay ropa?
    if (!lavadora.peso) {
        alert("Parece que no hay ropa en la lavadora.");
        //MODAL DE PON ROPA FETIDO
        callback();
        return;
    }

    // Lavadora hasta arriba?
    if (lavadora.peso>4000) {
        alert("Parece que hay demsiada ropa en la lavadora.");
        //MODAL DE QUITA ROPA FETIDO
        callback();
        return;
    }

    // Filtro obstruido
    if (lavadora.filtroObstruido) {
        alert("Parece que el filtro esta pocho.");
        //MODAL DE FILTRO POCHO CERDO
        callback();
        return;
    }

    // Insuficiente detergente
    if (lavadora.nivelDetergente<detergente) {
        alert("Parece que necesitas más detergente.");
        //MODAL DE PONLE DETERGENTE GUARRO
        callback();
        return;
    }

    // Insuficiente suavizante
    if (lavadora.nivelSuavizante<suavizante) {
        alert("Parece que necesitas más suavizante.");
        //MODAL DE PONLE SUAVIZANTE GUARRO
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

    tiempo = lavadora.reloj;
    horas = tiempo.getHours();
    minutos = tiempo.getMinutes();
    segundos = tiempo.getSeconds();



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



var index = 0, total = 8;
var index2 = 0, total2 = 2;
var index3 = 0, total3 = 5;

function slide(offset, tipo) {


  if(tipo == 0){

    index2 = Math.min( Math.max( index2 + offset, 0 ), total2 - 1 );


    if(index2+1==1){
        //document.querySelector( '.counter' ).innerHTML = "Lavar";
        document.querySelector( '.counter' ).innerHTML = "<img src=\"img/washing-machine2.svg\" class=\"filter-blue\" width=\"50px\" height=\"50px\" id=\"lavar\"/>Lavar";
        
        if(offset != 0)
        cambiarInterfaz(1);
      }else if(index2+1==2){
        //document.querySelector( '.counter' ).innerHTML = "Secar";
        document.querySelector( '.counter' ).innerHTML = "<img src=\"img/dry.svg\" class=\"filter-blue\" width=\"50px\" height=\"50px\" id=\"lavar\"/>Secar";
        if(offset != 0)
        cambiarInterfaz(2);
      }

      if(offset!=0){
        calculoMinutos(tipo);
        }

      if(index2==0){
        document.querySelector( '.paginate.left').style.display ='none';
        document.getElementById('texto').innerHTML = "Elige un tipo";
        calculoMinutos(1);
        }
      else
        document.querySelector( '.paginate.left').style.display ='block';

      if(index2==total2-1){
        document.querySelector( '.paginate.right').style.display ='none';
        document.getElementById('texto').innerHTML = "Elige un tipo";
        calculoMinutos(2);
      }
      else
        document.querySelector( '.paginate.right').style.display ='block';

  }else if(tipo==1){

    index = Math.min( Math.max( index + offset, 0 ), total - 1 );


    if(index+1==1){
        document.querySelector( '.counter2' ).innerHTML = "Tipo Lavado";
        document.getElementById("cero").checked = false;
        document.getElementById("veinte").checked = false;
        document.getElementById("treinta").checked = false;
        document.getElementById("cuarenta").checked = false;
        document.getElementById("sesenta").checked = false;
        document.getElementById("noventa").checked = false;

        document.getElementById("na").checked = false;
        document.getElementById("cua").checked = false;
        document.getElementById("och").checked = false;
        document.getElementById("mil").checked = false;
        document.getElementById("mildo").checked = false;
        document.getElementById("milci").checked = false;

        document.getElementById('texto').innerHTML = "Elige un tipo";
        offset=0;
        minuts=0;
      }else if(index+1==2){
        document.querySelector( '.counter2' ).innerHTML = "Lana/Seda";
        document.getElementById("veinte").checked = true;
        document.getElementById("cua").checked = true;
      }else if(index+1==3){
        document.querySelector( '.counter2' ).innerHTML = "Sport";
        document.getElementById("treinta").checked = true;
        document.getElementById("mil").checked = true;
      }else if(index+1==4){
        document.querySelector( '.counter2' ).innerHTML = "Algodon";
        document.getElementById("veinte").checked = true;
        document.getElementById("och").checked = true;
      }else if(index+1==5){
        document.querySelector( '.counter2' ).innerHTML = "Sinteticos";
        document.getElementById("cuarenta").checked = true;
        document.getElementById("mil").checked = true;
      }else if(index+1==6){
        document.querySelector( '.counter2' ).innerHTML = "Delicados";
        document.getElementById("veinte").checked = true;
        document.getElementById("cua").checked = true;
      }else if(index+1==7){
        document.querySelector( '.counter2' ).innerHTML = "Rapido 30 min";
        document.getElementById("sesenta").checked = true;
        document.getElementById("milci").checked = true;
      }else if(index+1==8){
        document.querySelector( '.counter2' ).innerHTML = "Rapido 15 min";
        document.getElementById("noventa").checked = true;
        document.getElementById("mildo").checked = true;
      }

      if(offset!=0){
        calculoMinutos(tipo);
        }

      if(index==0)
        document.querySelector( '.fa.fa-arrow-up').style.visibility ='hidden';
      else
        document.querySelector( '.fa.fa-arrow-up').style.visibility ='visible';

      if(index==total-1)
        document.querySelector( '.fa.fa-arrow-down').style.visibility ='hidden';
      else
        document.querySelector( '.fa.fa-arrow-down').style.visibility ='visible';

    }else{

    index3 = Math.min( Math.max( index3 + offset, 0 ), total3 - 1 );


    if(index3+1==1){
        document.querySelector( '.counter3' ).innerHTML = "Tipo Secado";
        document.getElementById("ceroo").checked = false;
        document.getElementById("veintee").checked = false;
        document.getElementById("treintaa").checked = false;
        document.getElementById("cuarentaa").checked = false;
        document.getElementById("sesentaa").checked = false;
        document.getElementById("noventaa").checked = false;

        document.getElementById('texto').innerHTML = "Elige un tipo";
        offset=0;
        minuts=0;
      }else if(index3+1==2){
        document.querySelector( '.counter3' ).innerHTML = "Normal";
        document.getElementById("sesentaa").checked = true;
      }else if(index3+1==3){
        document.querySelector( '.counter3' ).innerHTML = "Algodon";
        document.getElementById("cuarentaa").checked = true;
      }else if(index3+1==4){
        document.querySelector( '.counter3' ).innerHTML = "Delicado";
        document.getElementById("treintaa").checked = true;
      }else if(index3+1==5){
        document.querySelector( '.counter3' ).innerHTML = "Extra Delicado";
        document.getElementById("veintee").checked = true;
      }

      if(offset!=0){
        calculoMinutos(tipo);
        }


      if(index3==0)
        document.querySelector( '#riba').style.visibility ='hidden';
      else
        document.querySelector( '#riba').style.visibility ='visible';

      if(index3==total3-1)
        document.querySelector( '#bajo').style.visibility ='hidden';
      else
        document.querySelector( '#bajo').style.visibility ='visible';

    }

/*
  pr.setAttribute( 'data-state', index === 0 ? 'disabled' : '' );
  pl.setAttribute( 'data-state', index === total - 1 ? 'disabled' : '' );*/
}


function mover(activo){


    if(activo == 1){
        document.getElementById('inicio').style.left =  -450 + 'px';
        actividad(activo);
    }
    else{
        document.getElementById('inicio').style.left =  0 + 'px';
        actividad(activo);

    }
 
}


function calculoMinutos(tipo){
    if(document.getElementById("lavarScreen")){
        console.log("fff");
        minuts = 0;
        minutsLavado = 0;
        minutsCentrifugado = 0;
        minutsSecado = 0;

        if(tipo==1){
            console.log("tipo 1 o 0");
            if(document.getElementById("cero").checked == true){
                minutsLavado+=5;
                tempLavado=0;
            }else if(document.getElementById("veinte").checked == true){
                minutsLavado+=30;
                tempLavado=20;
            }else if(document.getElementById("treinta").checked == true){
                minutsLavado+=25;
                tempLavado=30;
            }else if(document.getElementById("cuarenta").checked == true){
                minutsLavado+=20;
                tempLavado=40;
            }else if(document.getElementById("sesenta").checked == true){
                minutsLavado+=15;
                tempLavado=60;
            }else if(document.getElementById("noventa").checked == true){
                minutsLavado+=10;
                tempLavado=90;
            }

            if(document.getElementById("na").checked == true){
                minutsCentrifugado+=0;
                centLavado=0;
            }else if(document.getElementById("cua").checked == true){
                minutsCentrifugado+=10;
                centLavado=400;
            }else if(document.getElementById("och").checked == true){
                minutsCentrifugado+=20;
                centLavado=800;
            }else if(document.getElementById("mil").checked == true){
                minutsCentrifugado+=10;
                centLavado=1000;
            }else if(document.getElementById("mildo").checked == true){
                minutsCentrifugado+=5;
                centLavado=1200;
            }else if(document.getElementById("milci").checked == true){
                minutsCentrifugado+=15;
                centLavado=1500;
            }
        }else{
            if(document.getElementById("ceroo").checked == true){
                minutsSecado+=5;
                tempSecado=0;
            }else if(document.getElementById("veintee").checked == true){
                minutsSecado+=50;
                tempSecado=20;
            }else if(document.getElementById("treintaa").checked == true){
                minutsSecado+=40;
                tempSecado=30;
            }else if(document.getElementById("cuarentaa").checked == true){
                minutsSecado+=30;
                tempSecado=40;
            }else if(document.getElementById("sesentaa").checked == true){
                minutsSecado+=20;
                tempSecado=60;
            }else if(document.getElementById("noventaa").checked == true){
                minutsSecado+=10;
                tempSecado=90;
            }
        }

        minuts = minutsLavado + minutsCentrifugado + minutsSecado;

        if(minuts!=0){
            console.log("changeee");
            textoDinamico = minuts + ":00";
            document.getElementById('texto').innerHTML = textoDinamico;
        }

    }
}

function addRetardo(retardo){

    horas = tiempo.getHours();
    minutos = tiempo.getMinutes();
    minutoss = 0;
    horass = 0;

    if(retardo == 0){
    
    console.log("entro");
    document.getElementById("timeretardo").innerHTML = " ";
    }
    else if(retardo >= 60){

        horass = retardo/60;
        horas += horass;
        document.getElementById("timeretardo").innerHTML ="Inicio: " + String(horas).padStart(2, '0')+':'+String(minutos).padStart(2, '0');

    }else{

        minutos += retardo;
        
        if(minutos >= 60){
            horas++;
            minutos -= 60;
        }
        document.getElementById("timeretardo").innerHTML = "Inicio: " +String(horas).padStart(2, '0')+':'+String(minutos).padStart(2, '0');

    }



}

function crearModal(tipo){

    var modal = document.getElementById('open-modal');
    var content = document.getElementById('content');

    console.log(content);
    if(content)
        content.parentNode.removeChild(content);

    var newDiv = document.createElement("div");
    newDiv.id = "content";
    modal.appendChild(newDiv);
    document.getElementById('content').innerHTML +=  "<a href=\"#\" title=\"Cerrar\" class=\"modal-close\">Cerrar</a>" ;

    /*RETARDO*/

    if(tipo == 1){
        document.getElementById('content').innerHTML +=  "<h1>Retardo</h1>" ;
        document.getElementById('content').innerHTML +=  "<div>Añade el tiempo de retardo que quieras</div>" ;
        var newDiv = document.createElement("div");
        newDiv.id = "botonesRetardo";
        document.getElementById('content').appendChild(newDiv);

        document.getElementById('botonesRetardo').innerHTML +=  "<button onclick=\"addRetardo(15);\" class=\"botones\"><i class=\"far fa-clock\" style=\"padding-right: 7px;\"></i> 15m</button>" ;
        document.getElementById('botonesRetardo').innerHTML +=  "<button onclick=\"addRetardo(30);\" class=\"botones\"><i class=\"far fa-clock\" style=\"padding-right: 7px;\"></i> 30m</button>" ;
        document.getElementById('botonesRetardo').innerHTML +=  "<button onclick=\"addRetardo(45);\" class=\"botones\"><i class=\"far fa-clock\" style=\"padding-right: 7px;\"></i> 45m</button>" ;
        document.getElementById('botonesRetardo').innerHTML +=  "<button onclick=\"addRetardo(60);\" class=\"botones\"><i class=\"far fa-clock\" style=\"padding-right: 7px;\"></i> 1h</button>" ;
        document.getElementById('botonesRetardo').innerHTML +=  "<button onclick=\"addRetardo(120);\" class=\"botones\"><i class=\"far fa-clock\" style=\"padding-right: 7px;\"></i> 2h</button>" ;
        document.getElementById('botonesRetardo').innerHTML +=  "<button onclick=\"addRetardo(0);\" class=\"botones\"><i class=\"far fa-clock\" style=\"padding-right: 7px;\"></i> Quitar</button>" ;

    }
    
}
