var lavadora;
var tiempo;
var textoDinamico;
var tempLavado;
var tempSecado;
var centLavado;
var tempSecado;
var centSecado;
var minuts = 0;
var minutsLavado = 0;
var minutsCentrifugado = 0;
var minutsSecado = 0;
var textoAvisos = "";
var interfazActual =  "lavadoSecado";
var index = 0, total = 8;
var index2 = 0, total2 = 2;
var index3 = 0, total3 = 5;
var consumo;
var tempActual;
var humedad;
var accion;




/* TRANSICION */ 
function reinicio(){

    interfazActual =  "lavadoSecado";
    index = 0;
    index2 = 0;
    index3 = 0;
    mover(1);
    optBar(2); // Reinicio barra
    document.getElementById('timeretardo').innerHTML = "";
    document.getElementById('conteneor').style.display = "none";
    document.getElementById('vistas-lavado').style.display = "none";
    document.getElementById('volverInicioButton').style.display = "none";
    document.getElementById("blob").style.width = "350px";
    document.getElementById("blob").style.height = "350px";
    document.getElementById('texto').style.fontSize = "35px";

}


function actividad(activo) {

    if (document.getElementById('inicio')) {

            document.getElementById('lavarScreen').style.transition = 'visibility .5s, opacity 1.5s';
            document.getElementById('lavarOpciones').style.transition = 'visibility .5s, opacity 1.5s';
            document.getElementById('opciones').style.transition = 'visibility .5s, opacity 1.5s';
            document.getElementById('bottom-botones').style.transition = 'visibility .5s, opacity 1.5s';
            document.getElementById('conteneor').style.transition = 'visibility .5s, opacity 1.5s';


            if(activo == 1){

                    /* CAMBIAR COLOR DE LA BOLA */
                    console.log(interfazActual);
                if(interfazActual == "lavadoSecado"){
                    volverInterfaz(1);
                    console.log("Lavar y secar");

                }
                else
                    volverInterfaz(2);
          
            }
            else {

                /* CAMBIAR COLOR DE LA BOLA */

                if(interfazActual == "lavado")
                     mover(4);

                var animation = document.styleSheets[0].cssRules[3];
                document.getElementsByClassName('blob')[0].style.border = "5px solid aqua";
                animation.deleteRule('0%');
                animation.deleteRule('70%');
                animation.deleteRule('100%');
                animation.appendRule('	0% {transform: scale(0.95);box-shadow: 0 0 0 0 rgba(0, 255, 255, 0.7); }');
                animation.appendRule('	70% {transform: scale(1);box-shadow: 0 0 0 35px rgba(0, 255, 255, 0); }');
               
       
               
                animation.appendRule('	100% {transform: scale(0.95);box-shadow: 0 0 0 0 rgba(0, 255, 255, 0); }');
                document.getElementById('conteneor').style.display = "none";
                document.getElementById('vistas-lavado').style.display = "none";
                document.getElementById('lavarScreen').style.opacity = 0;
                document.getElementById('lavarOpciones').style.opacity = 0;
                document.getElementById('opciones').style.opacity = 0;
                        
                document.getElementById('lavarScreen').style.visibility = "hidden";
                document.getElementById('lavarOpciones').style.visibility = "hidden";
                document.getElementById('opciones').style.visibility = "hidden";
                document.getElementById('bottom-botones').style.visibility = "hidden";
                

                document.getElementById('texto').innerHTML = "¡Bienvenido!";

            }
     
    }

}


function volverInterfaz(tipo){



if(tipo == 1){



    var animation = document.styleSheets[0].cssRules[3];
    document.getElementsByClassName('blob')[0].style.border = "5px solid #00FF00";
    animation.deleteRule('0%');
    animation.deleteRule('70%');
    animation.deleteRule('100%');
    animation.appendRule('	0% {transform: scale(0.95);box-shadow: 0 0 0 0 rgba(0, 255, 0, 0.7); }');
    animation.appendRule('	70% {transform: scale(1);box-shadow: 0 0 0 35px rgba(0, 255, 0, 0); }');
    animation.appendRule('	100% {transform: scale(0.95);box-shadow: 0 0 0 0 rgba(0, 255, 0, 0); }');

    /* ENSEÑAR LA INTERFAZ */
    document.getElementById('lavarScreen').style.visibility = "visible";
    document.getElementById('lavarOpciones').style.visibility = "visible";
    document.getElementById('opciones').style.visibility = "visible";
    document.getElementById('bottom-botones').style.visibility = "visible";
    document.getElementById('lavarOpciones').style.height = 'auto';

    document.getElementById('lavarScreen').style.opacity =1 ;
    document.getElementById('lavarOpciones').style.opacity = 1;
    document.getElementById('opciones').style.opacity = 1;
    document.getElementById('bottom-botones').style.opacity = 1;

    //document.getElementById('conteneor').style.opacity = 0;
    document.getElementById('conteneor').style.display = "none";
    document.getElementById('vistas-lavado').style.display = "none";



    console.log();

    if(textoDinamico == "Elige un tipo")
        document.getElementById('texto').innerHTML = "Elige un tipo";
    else
        document.getElementById('texto').innerHTML = textoDinamico;

    slide(0, 0);
    slide(0, 1);
    slide(0, 2);

}
else if(tipo == 2){


    mover(3);

    var animation = document.styleSheets[0].cssRules[3];
    document.getElementsByClassName('blob')[0].style.border = "5px solid #ffa500";
    animation.deleteRule('0%');
    animation.deleteRule('70%');
    animation.deleteRule('100%');
    animation.appendRule('	0% {transform: scale(0.95);box-shadow: 0 0 0 0 rgba(255, 165, 0, 0.7); }');
    animation.appendRule('	70% {transform: scale(1);box-shadow: 0 0 0 35px rgba(255, 165, 0, 0); }');
    animation.appendRule('	100% {transform: scale(0.95);box-shadow: 0 0 0 0 rgba(255, 165, 0, 0); }');

    document.getElementById('texto').innerHTML = "En proceso...";
    //document.getElementById('conteneor').style.opacity = 1;

    document.getElementById('lavarScreen').style.visibility = "hidden";
    document.getElementById('lavarOpciones').style.visibility = "hidden";
    document.getElementById('opciones').style.visibility = "hidden";
    document.getElementById('bottom-botones').style.visibility = "hidden";


    /* ENSEÑAR LA INTERFAZ */
    document.getElementById('lavarScreen').style.opacity = 0;
    document.getElementById('lavarOpciones').style.height = 'auto';
    document.getElementById('lavarOpciones').style.opacity = 0;
    document.getElementById('opciones').style.opacity = 0;
    document.getElementById('bottom-botones').style.opacity = 0;
    //document.getElementById('conteneor').style.opacity = 1;
    document.getElementById('conteneor').style.display = "block";
    document.getElementById('vistas-lavado').style.display = "block";

}
    
}


function cambiarInterfaz(tipo) {

            if(tipo == 1){

                
             //   document.getElementById('lavarScreen').innerHTML = "";
            interfazActual = "lavadoSecado";

             document.getElementById('secarOpciones').style.display = "none";
             document.getElementById('lavarOpciones').style.display = "flex";
             document.getElementById('retardo').style.display = "inline-block";
             document.getElementById('detergentes').style.display = "block";
             //document.getElementById('conteneor').style.opacity = 0;
             document.getElementById('conteneor').style.display = "none";
             document.getElementById('vistas-lavado').style.display = "none";



            }
            else if (tipo == 2){

                interfazActual = "lavadoSecado";
                document.getElementById('lavarOpciones').style.display = "none";
                document.getElementById('secarOpciones').style.display = "flex";
                document.getElementById('retardo').style.display = "none";
                document.getElementById('detergentes').style.display = "none";
                //document.getElementById('conteneor').style.opacity = 0;
                document.getElementById('conteneor').style.display = "none";
                document.getElementById('vistas-lavado').style.display = "none";


            }
            else if(tipo == 3){

                interfazActual = "lavado";

                document.getElementById('lavarScreen').style.opacity = 0;
                document.getElementById('lavarScreen').style.visibility = "hidden";


                mover(3);

                var animation = document.styleSheets[0].cssRules[3];
                document.getElementsByClassName('blob')[0].style.border = "5px solid #ffa500";
                animation.deleteRule('0%');
                animation.deleteRule('70%');
                animation.deleteRule('100%');
                animation.appendRule('	0% {transform: scale(0.95);box-shadow: 0 0 0 0 rgba(255, 165, 0, 0.7); }');
                animation.appendRule('	70% {transform: scale(1);box-shadow: 0 0 0 35px rgba(255, 165, 0, 0); }');
                animation.appendRule('	100% {transform: scale(0.95);box-shadow: 0 0 0 0 rgba(255, 165, 0, 0); }');

                document.getElementById('texto').innerHTML = "En proceso...";
                //document.getElementById('conteneor').style.opacity = 1;
                document.getElementById('conteneor').style.display = "block";
                document.getElementById('vistas-lavado').style.display = "block";



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

        document.getElementById('pesopor').innerHTML = lavadora.peso/1000 + "kg";
        document.getElementById('detpor').innerHTML = lavadora.nivelDetergente + "%";
        document.getElementById('suapor').innerHTML = lavadora.nivelSuavizante + "%";

        humedad = lavadora.humedad;
        consumo = lavadora.consumo;
        tempActual = lavadora.temperaturaAgua;

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
            lavadora.on("peso", function () {

                document.getElementById('pesopor').innerHTML = lavadora.peso/1000 + "kg";

            });

            lavadora.on("presencia", function () {

                if(lavadora.presencia == true)
                    mover(1);
                else
                    mover(2);

            });

            lavadora.on("consumo", function () {

                document.getElementById('consumo').innerHTML = (lavadora.consumo/1000).toString().substring(0, 5) + "kW";

            });
            lavadora.on("humedad", function () {

                document.getElementById('humedad').innerHTML = lavadora.humedad + "%";

            });

            if(accion == "Lavar"){

                lavadora.on("temperaturaAgua", function () {

                    document.getElementById('tempActual').innerHTML = lavadora.temperaturaAgua;
    
                });

            }
            else{
                lavadora.on("temperaturaAire", function () {

                    document.getElementById('tempActual').innerHTML = lavadora.temperaturaAire;
    
                });


            }



         
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
        if (tempAct < temp) lavadora[resistencia] = true;
        if (tempAct > temp) lavadora[resistencia] = false;
    }
    lavadora.on(sensor, comprobarTemp);
    comprobarTemp(lavadora[sensor]); // llamar la primera vez por si tiene que encender
    setTimeout(function () {
    lavadora[resistencia] = false;
    lavadora.off(sensor, comprobarTemp);
    callback();
    }, duracion);
}

var cuentaAtras=0;
var firstCuenta=true;

function decrementarTiempo(t){

    ent = (minuts/5)*5;
    ent = ent + t;

    if(firstCuenta){
        cuentaAtras = minuts;
        firstCuenta = false;
    }
    
    cuentaAtras = cuentaAtras-(minuts/ent);
    //console.log("hhh");
    if(cuentaAtras<=0){
        minuts=0;
        cuentaAtras=0;
        firstCuenta = true;
        document.getElementById('timeretardo').innerHTML = "00:00 (100%)";
        console.log("terminao");
    }else{
        console.log("minuto: "+(cuentaAtras));
        stringCuenta= cuentaAtras.toString().split(".");
        seg = ((parseInt(stringCuenta[1])*60)/100);
        document.getElementById('timeretardo').innerHTML = stringCuenta[0]+":"+seg.toString().substring(0, 2)+" ("+Math.trunc(100-((cuentaAtras*100)/minuts))+"%)"; 
    }
    

}


function lavarsecar(xd){


    if(accion == "Lavar"){

        console.log("LAVANDO");
        lavar(1);

    }
    else{
        console.log("SECANDO");

        secar(1);

    }

}



// Realiza un lavado
function lavar(callback) {
    // Obtener parámetros del lavado
    var
        detergente = lavadora.peso/100,
        suavizante = Math.round(detergente/2),
        nivelAgua = ((lavadora.peso*100)/5000)+5,
        temperaturaLavado = tempLavado,
        revolucionesLavado = centLavado,
        tiempoLavado = minutsLavado * 1000,
        revolucionesCentrifugado = centLavado,
        tiempoCentrifugado = minutsCentrifugado * 1000;


    if(textoAvisos == ""){


    cambiarInterfaz(3);
    console.log("Iniciar lavado");

    document.getElementById('tipoo').innerHTML = document.querySelector( '.counter2' ).innerHTML;
    document.getElementById('tempElegida').innerHTML = tempLavado;
    document.getElementById('centriElegido').innerHTML = centLavado;
    lavadora.puertaBloqueada = true; // Bloquear puerta durante el lavado
    console.log("Puerta bloqueada");
    tiempoSinLavarCentrifugar = detergente + suavizante + 2*(lavadora.peso/100) - 3*(lavadora.peso/1000);
    var inter = setInterval(function(){ decrementarTiempo(tiempoSinLavarCentrifugar); },1000);
    // Llenar de agua el tambor (para lavado)
    console.log("Llenar de agua (para lavado)...")
    optBar(1);
    llenar("nivelAgua", "tomaAgua", nivelAgua, function () {
        // Detergente
        console.log("Poner detergente...");
        optBar(0);
        vaciar("nivelDetergente", "tomaDetergente", lavadora.nivelDetergente - detergente, function () {
            // Lavado
            console.log("Lavar...")
            optBar(0);
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
                        optBar(0);
                        vaciar("nivelSuavizante", "tomaSuavizante", lavadora.nivelSuavizante - suavizante, function () {
                            // Vaciar agua
                            console.log("Vaciar tambor de agua...");
                            vaciar("nivelAgua", "desague", 0, function () {
                                // Centrifugar
                                console.log("Centrifugar...")
                                optBar(0);
                                lavadora.tamborRevoluciones = revolucionesCentrifugado;
                                setTimeout(function () {
                                    console.log("Fin del lavado!!!");
                                    optBar(0);
                                    clearInterval(inter);
                                    minuts=0;
                                    cuentaAtras=0;
                                    firstCuenta = true;
                                    document.getElementById('timeretardo').innerHTML = "00:00 (100%)";
                                    var animation = document.styleSheets[0].cssRules[3];
                                    document.getElementsByClassName('blob')[0].style.border = "5px solid #00FF00";
                                    animation.deleteRule('0%');
                                    animation.deleteRule('70%');
                                    animation.deleteRule('100%');
                                    animation.appendRule('  0% {transform: scale(0.95);box-shadow: 0 0 0 0 rgba(0, 255, 0, 0.7); }');
                                    animation.appendRule('  70% {transform: scale(1);box-shadow: 0 0 0 35px rgba(0, 255, 0, 0); }');
                                    animation.appendRule('  100% {transform: scale(0.95);box-shadow: 0 0 0 0 rgba(0, 255, 0, 0); }');
                                    document.getElementById('texto').innerHTML = "¡Finalizado!"; 
                                    document.getElementById('volverInicioButton').style.display = "block";
                                    lavadora.tamborRevoluciones = 0; // parar motor
                                    lavadora.puertaBloqueada = false; // desbloquear puerta
                                    //callback();
                                }, tiempoCentrifugado);
                            });
                        });
                    });
                });
            });
        });
    });
    }
    else
        crearModal(2, textoAvisos);
}



// Realiza un lavado
function secar(callback) {
    // Obtener parámetros del lavado
    var
        temperaturaSecado = tempSecado,
        revolucionesSecado = centSecado,
        tiempoSecado = minutsSecado * 1000;


    if(textoAvisos == ""){


    cambiarInterfaz(3);
    console.log("Iniciar Secado");

    document.getElementById('tipoo').innerHTML = document.querySelector( '.counter3' ).innerHTML;
    document.getElementById('tempElegida').innerHTML = tempLavado;
    document.getElementById('centriElegido').innerHTML = centLavado;



    lavadora.puertaBloqueada = true; // Bloquear puerta durante el secado
    console.log("Puerta bloqueada");
    //tiempoSinLavarCentrifugar = detergente + suavizante + 2*(lavadora.peso/100) - 3*(lavadora.peso/1000);
    //var inter = setInterval(function(){ decrementarTiempo(tiempoSinLavarCentrifugar); },1000);
    // Llenar de agua el tambor (para lavado)
    console.log("Llenar de agua (para lavado)...")
    optBar(1);
    optBar(0); //Empieza el secado
            // Secado
            console.log("Secar...")
            optBar(0); //Empieza a girar
            lavadora.tamborRevoluciones = revolucionesSecado;
            termostato("temperaturaAire", "resistenciaAire", temperaturaSecado, tiempoSecado, function () {
                optBar(0); //Temperatura a conseguir
                // Quitar humedad
                console.log("Quitar humedad de la ropa...");
                vaciar("humedad", "flujoAire", 0, function () {
                    optBar(0); //Humedad a 0
                                // Humedad quitada
                                console.log("Humedad fuera...")
                                lavadora.tamborRevoluciones = revolucionesSecado;
                                optBar(0); //Empieza a girar
                                setTimeout(function () {
                                    console.log("Fin del secado!!!");
                                    optBar(0);
                                    clearInterval(inter);
                                    var animation = document.styleSheets[0].cssRules[3];
                                    document.getElementsByClassName('blob')[0].style.border = "5px solid #00FF00";
                                    animation.deleteRule('0%');
                                    animation.deleteRule('70%');
                                    animation.deleteRule('100%');
                                    animation.appendRule('  0% {transform: scale(0.95);box-shadow: 0 0 0 0 rgba(0, 255, 0, 0.7); }');
                                    animation.appendRule('  70% {transform: scale(1);box-shadow: 0 0 0 35px rgba(0, 255, 0, 0); }');
                                    animation.appendRule('  100% {transform: scale(0.95);box-shadow: 0 0 0 0 rgba(0, 255, 0, 0); }');
                                    document.getElementById('texto').innerHTML = "¡Finalizado!"; 
                                    document.getElementById('volverInicioButton').style.display = "block";
                                    lavadora.tamborRevoluciones = 0; // parar motor
                                    lavadora.puertaBloqueada = false; // desbloquear puerta
                                    //callback();
                                }, tiempoSecado);
                });
        });
    }
    else
        crearModal(2, textoAvisos);
}





function reloj(){

    tiempo = lavadora.reloj;
    horas = tiempo.getHours();
    minutos = tiempo.getMinutes();
    segundos = tiempo.getSeconds();

   
    generaErrores();
    console.log(interfazActual);

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





function slide(offset, tipo) {


  if(tipo == 0){

    index2 = Math.min( Math.max( index2 + offset, 0 ), total2 - 1 );


    if(index2+1==1){
        //document.querySelector( '.counter' ).innerHTML = "Lavar";
        document.querySelector( '.counter' ).innerHTML = "<img src=\"img/washing-machine2.svg\" class=\"filter-blue\" width=\"50px\" height=\"50px\" id=\"lavar\"/>Lavar";
        accion = "Lavar";
        if(offset != 0)
        cambiarInterfaz(1);
      }else if(index2+1==2){
        //document.querySelector( '.counter' ).innerHTML = "Secar";
        document.querySelector( '.counter' ).innerHTML = "<img src=\"img/dry.svg\" class=\"filter-blue\" width=\"50px\" height=\"50px\" id=\"lavar\"/>Secar";
        accion = "Secar";

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

        document.getElementById("inicio").style.transform = "translate(-450px,0px)";
        actividad(activo);
    }
    else if(activo == 2){
        document.getElementById("inicio").style.transform = "translate(0px,0px)";
        actividad(activo);

    }
    else if(activo == 3){

        document.getElementById("inicio").style.transform = "translate(0px,-150px)";
        document.getElementById("blob").style.transition = "1.5s ease-in";
        document.getElementById("blob").style.width = "250px";
        document.getElementById("blob").style.height = "250px";
        document.getElementById('texto').style.transition = "1.5s ease-in";
        document.getElementById('texto').style.fontSize = "25px";
 
    }
    else if(activo == 4){

        document.getElementById("inicio").style.transform = "translate(0px, 0px)";
        document.getElementById("blob").style.width = "350px";
        document.getElementById("blob").style.height = "350px";
        document.getElementById('texto').style.fontSize = "35px";

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
                centSecado=100;
            }else if(document.getElementById("veintee").checked == true){
                minutsSecado+=50;
                tempSecado=20;
                centSecado=400;
            }else if(document.getElementById("treintaa").checked == true){
                minutsSecado+=40;
                tempSecado=30;
                centSecado=800;
            }else if(document.getElementById("cuarentaa").checked == true){
                minutsSecado+=30;
                tempSecado=40;
                centSecado=1000;
            }else if(document.getElementById("sesentaa").checked == true){
                minutsSecado+=20;
                tempSecado=60;
                centSecado=1200;
            }else if(document.getElementById("noventaa").checked == true){
                minutsSecado+=10;
                tempSecado=90;
                centSecado=1500;
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

function crearModal(tipo, texto){

    var modal = document.getElementById('open-modal');
    var content = document.getElementById('content');

    if(content)
        content.parentNode.removeChild(content);

    var newDiv = document.createElement("div");
    newDiv.id = "content";
    modal.appendChild(newDiv);
    document.getElementById('content').innerHTML +=  "<a href=\"#\" title=\"X\" onclick=\"cerrarModal()\" class=\"modal-close\">X</a>" ;

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
    else if(tipo == 2){


        if(textoAvisos != ""){

            console.log("error");

            document.getElementById('content').innerHTML +=  "<h1>Errores</h1>" ;
            document.getElementById('content').innerHTML +=  "<div>Por favor, solucione esto errores para poder continuar.</div>" ;
            document.getElementById('content').innerHTML +=  textoAvisos;

        }
        else{
            document.getElementById('content').innerHTML +=  "<h1>Errores</h1>" ;
            document.getElementById('content').innerHTML +=  "<div>¡No hay errores en estos momentos!</div>" ;
            
        }
   
    }
    
    
    document.getElementById('open-modal').style.visibility = "visible";
    document.getElementById('open-modal').style.opacity = 1;
    document.getElementById('open-modal').style.pointerEvents = "auto";

}

function cerrarModal(){

    document.getElementById('open-modal').style.visibility = "hidden";
    document.getElementById('open-modal').style.opacity = 0;
    document.getElementById('open-modal').style.pointerEvents = "none";

}

function generaErrores(){

    var
        detergente = lavadora.peso/100,
        suavizante = Math.round(detergente/2);

    
    textoAvisos = "";


    if(document.getElementById('texto').innerHTML == "Elige un tipo")
        textoAvisos += "<p style=\"color: red;\">Escoja un plan.</p>"

    // Puerta abierta
    if (lavadora.puertaAbierta) {

        textoAvisos += "<p style=\"color: red;\">Cierre la puerta.</p>"
        //MODAL DE CIERRA LA PUERTA CALVO
        //callback();
    }

    // Hay ropa?
    if (!lavadora.peso) {
        textoAvisos += "<p style=\"color: red;\">Añada ropa.</p>"
        //MODAL DE PON ROPA FETIDO
        //callback();
    }

    // Lavadora hasta arriba?
    if (lavadora.peso>4000) {
        textoAvisos += "<p style=\"color: red;\">Peso mayor a 4kg.</p>"
        //MODAL DE QUITA ROPA FETIDO
        //callback();
    }

    // Filtro obstruido
    if (lavadora.filtroObstruido) {
        textoAvisos += "<p style=\"color: red;\">El filtro está obstruido.</p>"
        //MODAL DE FILTRO POCHO CERDO
        //callback();
    }

    // Insuficiente detergente
    if (lavadora.nivelDetergente<detergente) {
        textoAvisos += "<p style=\"color: red;\">El nivel de detergente debe ser mayor a "+detergente+"%"+".</p>";
        //MODAL DE PONLE DETERGENTE GUARRO
        //callback();
    }

    // Insuficiente suavizante
    if (lavadora.nivelSuavizante<suavizante) {
        textoAvisos += "<p style=\"color: red;\">El nivel de suavizante debe ser mayor a "+suavizante+"%"+".</p>"

        //MODAL DE PONLE SUAVIZANTE GUARRO
        //callback();
    }

    if(textoAvisos != "")
       document.getElementById("avisos").style.color = "yellow";
    else
        document.getElementById("avisos").style.color = "white";

    return textoAvisos;


}


function optBar(tipo){
    var lis = document.getElementById("progress-bar").getElementsByTagName("li");

    console.log(lis);

    if(tipo==0){
        //progressBar.Next();
        for(var i=0;i<lis.length;i++){
                    console.log("entraaaaaaa");

            if(lis[i].className === 'active' && lis[i+1].className != 'active'){
                console.log("entra");
                //lis[i].className = 'inactive';
                lis[i+1].className = 'active';
                i=lis.size;
            }
        }
    }
    else if(tipo==1){
        //progressBar.First();
        lis[0].className = 'active';
    }
    else{
        //progressBar.Reset();
        for(var i=0;i<lis.length;i++){
                    console.log("entraaaaaaa");

            lis[i].className = 'inactive';
        }
    }
}
