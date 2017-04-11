

var canvas = document.getElementById("canvasJuego");

var context = canvas.getContext("2d");

var proximaPieza = Math.round(Math.random()*6); 

var cayendo;
var otraPieza = 1;
var nivel = 1;
var jugando = 1;
var velocidad = 200;
var numLineas = 0;
var contNivel = 0; // Cada x líneas sube de nivel -> aumenta velocidad de caída.

var p;

//creamos el tablero, un array de 16 x 30
var tablero = new Array(14);
for(var i = 0; i < 14; i++){
	tablero[i] = new Array(24);
}

//inicializar los valores del tablero a 0
for(var i = 0; i < 14; i++){
    for(var j = 0; j < 24; j++){
        tablero[i][j] = 0;
    }
}


function Pieza(){
    this.tipo = proximaPieza;
    this.inc = 1; // inclinación inicial de la pieza
    this.ancho = 0; // lo que ocupa la pieza de ancho en un momento dado. Lo usaremos para blanquear por encima de la pieza
    this.alto = 0; 
    this.posX = 120;
    this.posY = 20;
    
    this.contacto = 0;
    this.imagen = new Image();
}

Pieza.prototype.cargarDimensiones = function(){
    switch(this.tipo){
        case 0:
            this.alto = 20;
            this.ancho = 80;
            break;
        case 1:
            this.alto = 40;
            this.ancho = 40;
            break;
        case 2:
            this.alto = 60;
            this.ancho = 40;            
            break;
        case 3:
            this.alto = 60;
            this.ancho = 40;               
            break;
        case 4:
            this.alto = 60;
            this.ancho = 40;               
            break;
        case 5:
            this.alto = 60;
            this.ancho = 40;               
            break;
        case 6:
            this.alto = 40;
            this.ancho = 60;               
            break;
           
    }    
};

Pieza.prototype.cargarImg = function(){
    var url;
    switch(this.tipo){
        case 0:
            url = "img/barra" + this.inc + ".png";
            break;
        case 1:
            url = "img/cubo.png";
            break;
        case 2:
            url = "img/ld" + this.inc + ".png";
            break;
        case 3:
            url = "img/li" + this.inc + ".png";
            break;
        case 4:
            url = "img/sd" + this.inc + ".png";
            break;
        case 5:
            url = "img/si" + this.inc + ".png";
            break;
        case 6:
            url = "img/t" + this.inc + ".png";
            break;
           
    }

    this.imagen.src = url;
};

Pieza.prototype.girarDerecha = function(){
    if(this.contacto == 0 && this.posX + this.ancho < 279){
        var url;
        switch(this.tipo){
            case 0:
                if(this.inc == 1){
                    this.inc = 2;
                    this.ancho = 20;
                    this.alto = 80;
                }
                else{
                    this.inc = 1;
                    this.ancho = 80;
                    this.alto = 20;
                }
            //    url = "img/barra" + this.inc + ".png";
                break;
            case 1:
                url = "img/cubo.png";
                this.ancho = 40;
                this.alto = 40;
                break;
            case 2:
                if(this.inc == 4){
                    this.inc = 1;
                    this.ancho = 40;
                    this.alto = 60;
                }
                else{
                    this.inc += 1;
                    if(this.inc % 2 == 0){
                        this.ancho = 60;
                        this.alto = 40;
                    }else{
                        this.ancho = 40;
                        this.alto = 60;
                    }
                }
                url = "img/ld" + this.inc + ".png";
                break;
            case 3:
                if(this.inc == 4){
                    this.inc = 1;
                    this.ancho = 40;
                    this.alto = 60;
                }
                else{
                    this.inc += 1;
                    if(this.inc % 2 == 0){
                        this.ancho = 60;
                        this.alto = 40;
                    }else{
                        this.ancho = 40;
                        this.alto = 60;
                    }
                }            
                url = "img/li" + this.inc + ".png";
                break;
            case 4:
                if(this.inc == 1){
                    this.inc = 2;
                    this.ancho = 60;
                    this.alto = 40;
                }
                else{
                    this.inc = 1;
                    this.ancho = 40;
                    this.alto = 60;
                }            
                url = "img/sd" + this.inc + ".png";
                break;
            case 5:
                if(this.inc == 1){
                    this.inc = 2;
                    this.ancho = 60;
                    this.alto = 40;
                }
                else{
                    this.inc = 1;
                    this.ancho = 40;
                    this.alto = 60;
                }            
                url = "img/si" + this.inc + ".png";
                break;
            case 6:
                if(this.inc == 4){
                    this.inc = 1;
                    this.ancho = 60;
                    this.alto = 40;
                }
                else{
                    this.inc += 1;
                    if(this.inc % 2 == 0){
                        this.ancho = 40;
                        this.alto = 60;
                    }else{
                        this.ancho = 60;
                        this.alto = 40;
                    }
                }                 
                url = "img/t" + this.inc + ".png";
                break;

        }            
    }

};

Pieza.prototype.girarIzquierda = function(){
    if(this.contacto == 0 && this.posX > 0){
        var url;
        switch(this.tipo){
            case 0:
                if(this.inc == 1){
                    this.inc = 2;
                    this.ancho = 20;
                    this.alto = 80;
                }
                else{
                    this.inc = 1;
                    this.ancho = 80;
                    this.alto = 20;
                }
                url = "img/barra" + this.inc + ".png";
                break;
            case 1:
                this.ancho = 40;
                this.alto = 40;
                url = "img/cubo.png";
                break;
            case 2:
                if(this.inc == 1){
                    this.inc = 4;
                    this.ancho = 60;
                    this.alto = 40;
                }
                else{
                    this.inc -= 1;
                    if(this.inc % 2 == 0){
                        this.ancho = 60;
                        this.alto = 40;
                    }else{
                        this.ancho = 40;
                        this.alto = 60;
                    }
                }
                url = "img/ld" + this.inc + ".png";
                break;
            case 3:
                if(this.inc == 1){
                    this.inc = 4;
                    this.ancho = 60;
                    this.alto = 40;
                }
                else{
                    this.inc -= 1;
                    if(this.inc % 2 == 0){
                        this.ancho = 60;
                        this.alto = 40;
                    }else{
                        this.ancho = 40;
                        this.alto = 60;
                    }
                }            
                url = "img/li" + this.inc + ".png";
                break;
            case 4:
                if(this.inc == 1){
                    this.inc = 2;
                    this.ancho = 60;
                    this.alto = 40;
                }
                else{
                    this.inc = 1;
                    this.ancho = 40;
                    this.alto = 60;
                }            
                url = "img/sd" + this.inc + ".png";
                break;
            case 5:
                if(this.inc == 1){
                    this.inc = 2;
                    this.ancho = 60;
                    this.alto = 40;
                }
                else{
                    this.inc = 1;
                    this.ancho = 40;
                    this.alto = 60;
                }            
                url = "img/si" + this.inc + ".png";
                break;
            case 6:
                if(this.inc == 1){
                    this.inc = 4;
                    this.ancho = 40;
                    this.alto = 60;
                }
                else{
                    this.inc -= 1;
                    if(this.inc % 2 == 0){
                        this.ancho = 40;
                        this.alto = 60;
                    }else{
                        this.ancho = 60;
                        this.alto = 40;
                    }
                }                 
                url = "img/t" + this.inc + ".png";
                break;

        }    
    }    
};

Pieza.prototype.caer = function(){
    blanquear2(this.posX, this.posY, this.ancho, this.alto, this.tipo, this.inc);
    this.posY += 20;
    context.drawImage(this.imagen, this.posX, this.posY);
    if(comprobarCasillasInferiores(p) || this.posY + this.alto >= 480){
        this.contacto = 1;
        console.log("Ha tocado fondo");
        console.log(this.posX, this.posY);
        
        clearInterval(cayendo);
        
    }

    if(this.contacto == 1){

        marcarCasillasOcupadas(p);
        
        comprobarLineas(p);
  
        if(comprobarGameOver()){
            jugando = 0;
            alert("Game Over");
        }
        else{
            aumentarVelocidad();
            lanzarPieza();
        }

    }
    
};



document.addEventListener('keydown', function(event) {
    if(event.keyCode == 65) {
        rotarIzquierda();
    }
    else if(event.keyCode == 68) {
        rotarDerecha();
    }
});

document.addEventListener('keydown', function(event){
    switch(event.keyCode){
        case 37:
            moverPiezaI();
            break;
        case 39:
            moverPiezaD();
            break;
        case 32:
            jugando = 0;
            break;
        case 80:
            mostrarMarcas();
            break;
        case 40:
            acelerar();
    }
    

});


function moverPiezaI(){
    if(!comprobarIzquierda(p) && p.contacto == 0 && p.posX > 0 ){ // si la pieza no ha caído, y no toca los bordes
        blanquear2(p.posX, p.posY, p.ancho, p.alto, p.tipo, p.inc); 
        p.posX -= 20;
        
        p.cargarImg();
        p.imagen.onload = function(){
           
            context.drawImage(p.imagen, p.posX, p.posY);
        };        
    }

}

function moverPiezaD(){
    if(!comprobarDerecha(p) && p.contacto == 0 && p.posX + p.ancho < 279){ // si la pieza no ha caído, y no toca los bordes
        blanquear2(p.posX, p.posY, p.ancho, p.alto, p.tipo, p.inc); 
        p.posX += 20;
        p.cargarImg();
        p.imagen.onload = function(){
            context.drawImage(p.imagen, p.posX, p.posY);
        };             
    }
}

function rotarDerecha(){
    blanquear2(p.posX, p.posY, p.ancho, p.alto, p.tipo, p.inc);
    p.girarDerecha();
    
    p.cargarImg();
    p.imagen.onload = function(){
        context.drawImage(p.imagen, p.posX, p.posY);
    };
}

function rotarIzquierda(){
    blanquear2(p.posX, p.posY, p.ancho, p.alto, p.tipo, p.inc);
    p.girarIzquierda();
    
    p.cargarImg();
    p.imagen.onload = function(){
        context.drawImage(p.imagen, p.posX, p.posY);
    };    
}

function blanquear(){
    context.fillStyle = "black";
    context.fillRect(0, 0, 280, 480);
}

function blanquear2(x, y, anchoPieza, altoPieza, tipoPieza, inclinacion){
    context.fillStyle = "black";
    
    switch(tipoPieza){
        case 0:
            context.fillRect(x, y, anchoPieza, altoPieza);
            break;
        case 1:
            context.fillRect(x, y, anchoPieza, altoPieza);
            break;
        case 2:
            if(inclinacion == 1){
                context.fillRect(x, y, 20, 60);
                context.fillRect(x, y + 40, 40, 20);
                
            }
            else if(inclinacion == 2){
               context.fillRect(x, y, anchoPieza, 20);
               context.fillRect(x, y + 20, 20, 20);
            }
            else if(inclinacion == 3){
                context.fillRect(x, y, anchoPieza, 20);
                context.fillRect(x + 20, y + 20, 20, 40);
            }
            else{
               context.fillRect(x, y, anchoPieza, altoPieza);
            }
            break;
        case 3:
            if(inclinacion == 1){
                context.fillRect(x + 20, y, 20, 40);
                context.fillRect(x, y + 40, 40, 20);                
            }
            else if(inclinacion == 2){
                context.fillRect(x, y, 20, 20);
                context.fillRect(x, y + 20, 60, 20);
            }
            else if(inclinacion == 3){
                context.fillRect(x, y, anchoPieza, 20);
                context.fillRect(x, y + 20, 20, 40);
            }
            else{
                context.fillRect(x, y, anchoPieza, 20);
                context.fillRect(x + 40, y + 20, 20, 20);
            }
            break;
        case 4:
            if(inclinacion == 1){
                context.fillRect(x + 20, y, 20, 20);
                context.fillRect(x, y + 20, 40, 20);
                context.fillRect(x, y + 40, 20, 20);
            }
            else{
                context.fillRect(x, y, 40, 20);
                context.fillRect(x + 20, y + 20, 40, 20);
            }
            break;
        case 5:
            if(inclinacion == 1){
                context.fillRect(x, y, 20, 40);
                context.fillRect(x + 20, y + 20, 20, 40);
            }
            else{
                context.fillRect(x + 20, y, 40, 20);
                context.fillRect(x, y + 20, 40, 20);
            }
            break;
        case 6:
            if(inclinacion == 1){
                context.fillRect(x + 20, y, 20, 20);
                context.fillRect(x, y + 20, 60, 20);
            }
            else if(inclinacion == 2){
                context.fillRect(x, y, 20, altoPieza);
                context.fillRect(x + 20, y + 20, 20, 20);
            }
            else if(inclinacion == 3){
                context.fillRect(x, y, anchoPieza, 20);
                context.fillRect(x + 20, y + 20, 20, 20);
            }
            else{
                context.fillRect(x + 20, y, 20, altoPieza);
                context.fillRect(x, y + 20, 20, 20);
            }
            break;
    }
    
}

function marcarCasillasOcupadas(pieza){
    var x = pieza.posX / 20;
    var y = pieza.posY / 20;
    switch(pieza.tipo){
        case 0:
            if(pieza.inc == 1){
                tablero[x][y] = 1;
                tablero[x + 1][y] = 1;
                tablero[x + 2][y] = 1;
                tablero[x + 3][y] = 1;
            }
            else{
                tablero[x][y] = 1;
                tablero[x][y + 1] = 1;
                tablero[x][y + 2] = 1;
                tablero[x][y + 3] = 1;
            }
            break;
        case 1:
            tablero[x][y] = 1;
            tablero[x + 1][y] = 1;
            tablero[x][y + 1] = 1;
            tablero[x + 1][y + 1] = 1;
            break;
        case 2:
            if(pieza.inc == 1){
                tablero[x][y] = 1;
                tablero[x][y + 1] = 1;
                tablero[x][y + 2] = 1;
                tablero[x + 1][y + 2] = 1;
            }
            else if(pieza.inc == 2){
                tablero[x][y] = 1;
                tablero[x + 1][y] = 1;
                tablero[x + 2][y] = 1;
                tablero[x][y + 1] = 1;
            }
            else if(pieza.inc == 3){
                tablero[x][y] = 1;
                tablero[x + 1][y] = 1;
                tablero[x + 1][y + 1] = 1;
                tablero[x + 1][y + 2] = 1;
            }
            else{
                tablero[x + 2][y] = 1;
                tablero[x][y + 1] = 1;
                tablero[x + 1][y + 1] = 1;
                tablero[x + 2][y + 1] = 1;
            }
            break;
        case 3:
            if(pieza.inc == 1){
                tablero[x + 1][y] = 1;
                tablero[x + 1][y + 1] = 1;
                tablero[x + 1][y + 2] = 1;
                tablero[x][y + 2] = 1;

            }
            else if(pieza.inc == 2){
                tablero[x][y] = 1;
                tablero[x][y + 1] = 1;
                tablero[x + 1][y + 1] = 1;
                tablero[x + 2][y + 1] = 1;
            }
            else if(pieza.inc == 3){
                tablero[x][y] = 1;
                tablero[x + 1][y] = 1;
                tablero[x][y + 1] = 1;
                tablero[x][y + 2] = 1;
            }
            else{
                tablero[x][y] = 1;
                tablero[x + 1][y] = 1;
                tablero[x + 2][y] = 1;
                tablero[x + 2][y + 1] = 1;
            }     
            break;
        case 4:
            if(pieza.inc == 1){
                tablero[x + 1][y] = 1;
                tablero[x][y + 1] = 1;
                tablero[x + 1][y + 1] = 1;
                tablero[x][y + 2] = 1;
            }
            else{
                tablero[x][y] = 1;
                tablero[x + 1][y] = 1;
                tablero[x + 1][y + 1] = 1;
                tablero[x + 2][y + 1] = 1;
            }
            break;
        case 5:
            if(pieza.inc == 1){
                tablero[x][y] = 1;
                tablero[x][y + 1] = 1;
                tablero[x + 1][y + 1] = 1;
                tablero[x + 1][y + 2] = 1;
            }
            else{
                tablero[x + 1][y] = 1;
                tablero[x + 2][y] = 1;
                tablero[x][y + 1] = 1;
                tablero[x + 1][y + 1] = 1;
            }
            break;
        case 6:
            if(pieza.inc == 1){
                tablero[x + 1][y] = 1;
                tablero[x][y + 1] = 1;
                tablero[x + 1][y + 1] = 1;
                tablero[x + 2][y + 1] = 1;
            }
            else if(pieza.inc == 2){
                tablero[x][y] = 1;
                tablero[x][y + 1] = 1;
                tablero[x + 1][y + 1] = 1;
                tablero[x][y + 2] = 1;
            }
            else if(pieza.inc == 3){
                tablero[x][y] = 1;
                tablero[x + 1][y] = 1;
                tablero[x + 2][y] = 1;
                tablero[x + 1][y + 1] = 1;
            }
            else{
                tablero[x + 1][y] = 1;
                tablero[x][y + 1] = 1;
                tablero[x + 1][y + 1] = 1;
                tablero[x + 1][y + 2] = 1;
            }
            break;
    }   
}

function comprobarDerecha(pieza){
    var x = pieza.posX / 20;
    var y = pieza.posY / 20;
    var toca = false;
    switch(pieza.tipo){
        case 0:
            if(pieza.inc == 1){
                if(tablero[x + 4][y] == 1){
                    toca = true;
                }
            }
            else{
                if(tablero[x + 1][y] == 1 || tablero[x + 1][y + 1] == 1 || 
                   tablero[x + 1][y + 2] == 1 || tablero[x + 1][y + 3] == 1){
                        toca = true;
                }
            }     
            break;
        case 1:
            if(tablero[x + 2][y] == 1 || tablero[x + 2][y + 1] == 1){
                toca = true;
            }
            break;
        case 2:
            if(pieza.inc == 1){
                if(tablero[x + 1][y] == 1 || tablero[x + 1][y + 1] == 1 || tablero[x + 2][y + 2] == 1){
                    toca = true;
                }
            }
            else if(pieza.inc == 2){
                if(tablero[x + 3][y] == 1 || tablero[x + 1][y + 1] == 1){
                    toca = true;
                }
            }
            else if(pieza.inc == 3){
                if(tablero[x + 2][y] == 1 || tablero[x + 2][y + 1] == 1 || tablero[x + 2][y + 2] == 1){
                    toca = true;
                }
            }
            else if(pieza.inc == 4){
                if(tablero[x + 3][y] == 1 || tablero[x + 3][y + 1] == 1){
                    toca = true;
                }
            }
            break;
        case 3:
            if(pieza.inc == 1){
                if(tablero[x + 2][y] == 1 || tablero[x + 2][y + 1] == 1 || tablero[x + 2][y + 2] == 1){
                    toca = true;
                }               
            }
            else if(pieza.inc == 2){
                if(tablero[x + 3][y + 1] == 1 || tablero[x + 1][y] == 1){
                    toca = true;
                }                
            }
            else if(pieza.inc == 3){
                if(tablero[x + 2][y] == 1 || tablero[x + 1][y + 1] == 1 || tablero[x + 1][y + 2] == 1){
                    toca = true;
                }                
            }
            else{
                if(tablero[x + 3][y] == 1 || tablero[x + 3][y + 1] == 1){
                    toca = true;
                }                
            }
            break;
        case 4:
            if(pieza.inc == 1){
                if(tablero[x + 2][y] == 1 || tablero[x + 2][y + 1] == 1 || tablero[x + 1][y + 2] == 1){
                    toca = true;
                }
            }
            else{
                if(tablero[x + 2][y] == 1 || tablero[x + 3][y + 1] == 1){
                    toca = true;
                }
            }
            break;
        case 5:
            if(pieza.inc == 1){
                if(tablero[x + 1][y] == 1 || tablero[x + 2][y + 1] == 1 || tablero[x + 2][y + 2] == 1){
                    toca = true;
                }
            }
            else{
                if(tablero[x + 3][y] == 1 || tablero[x + 2][y + 1] == 1){
                    toca = true;
                }
            }        
            break;
        case 6:
            if(pieza.inc == 1){
                if(tablero[x + 2][y] == 1 || tablero[x + 3][y + 1] == 1){
                    toca = true;
                }
            }
            else if(pieza.inc == 2){
                if(tablero[x + 1][y] == 1 || tablero[x + 2][y + 1] == 1 || tablero[x + 1][y + 2] == 1){
                    toca = true;
                }
            }
            else if(pieza.inc == 3){
                if(tablero[x + 3][y] == 1 || tablero[x + 2][y + 1] == 1){
                    toca = true;
                }
            }
            else{
                if(tablero[x + 2][y] == 1 || tablero[x + 2][y + 1] == 1 || tablero[x + 2][y + 2] == 1){
                    toca = true;
                }
            }
    }
   
    return toca;
}

function comprobarIzquierda(pieza){
    var x = pieza.posX / 20;
    var y = pieza.posY / 20;
    var toca = false;
    switch(pieza.tipo){
        case 0:
            if(pieza.inc == 1){
                if(tablero[x - 1][y] == 1){
                    toca = true;
                }
            }
            else{
                if(tablero[x - 1][y] == 1 || tablero[x - 1][y + 1] == 1 || 
                   tablero[x - 1][y + 2] == 1 || tablero[x - 1][y + 3] == 1){
                        toca = true;
                }
            }     
            break;            
        case 1:
            if(tablero[x - 1][y] == 1 || tablero[x - 1][y + 1] == 1){
                toca = true;
            }
            break;            
        case 2:
            if(pieza.inc == 1){
                if(tablero[x - 1][y] == 1 || tablero[x - 1][y + 1] == 1 || tablero[x + 1][y + 2] == 1){
                    toca = true;
                }
            }
            else if(pieza.inc == 2){
                if(tablero[x - 1][y] == 1 || tablero[x - 1][y + 1] == 1){
                    toca = true;
                }
            }
            else if(pieza.inc == 3){
                if(tablero[x - 1][y] == 1 || tablero[x][y + 1] == 1 || tablero[x][y + 2] == 1){
                    toca = true;
                }
            }
            else if(pieza.inc == 4){
                if(tablero[x + 1][y] == 1 || tablero[x + 1][y + 1] == 1){
                    toca = true;
                }
            }
            break;            
        case 3:
            if(pieza.inc == 1){
                if(tablero[x][y] == 1 || tablero[x][y + 1] == 1 || tablero[x - 1][y + 2] == 1){
                    toca = true;
                }               
            }
            else if(pieza.inc == 2){
                if(tablero[x - 1][y + 1] == 1 || tablero[x - 1][y] == 1){
                    toca = true;
                }                
            }
            else if(pieza.inc == 3){
                if(tablero[x - 1][y] == 1 || tablero[x - 1][y + 1] == 1 || tablero[x - 1][y + 2] == 1){
                    toca = true;
                }                
            }
            else{
                if(tablero[x - 1][y] == 1 || tablero[x + 1][y + 1] == 1){
                    toca = true;
                }                
            }
            break;            
        case 4:
            if(pieza.inc == 1){
                if(tablero[x][y] == 1 || tablero[x - 1][y + 1] == 1 || tablero[x - 1][y + 2] == 1){
                    toca = true;
                }
            }
            else{
                if(tablero[x][y] == 1 || tablero[x][y + 1] == 1){
                    toca = true;
                }
            }
            break;            
        case 5:
            if(pieza.inc == 1){
                if(tablero[x - 1][y] == 1 || tablero[x - 1][y + 1] == 1 || tablero[x][y + 2] == 1){
                    toca = true;
                }
            }
            else{
                if(tablero[x][y] == 1 || tablero[x - 1][y + 1] == 1){
                    toca = true;
                }
            }        
            break;            
        case 6:
            if(pieza.inc == 1){
                if(tablero[x][y] == 1 || tablero[x - 1][y + 1] == 1){
                    toca = true;
                }
            }
            else if(pieza.inc == 2){
                if(tablero[x - 1][y] == 1 || tablero[x - 1][y + 1] == 1 || tablero[x - 1][y + 2] == 1){
                    toca = true;
                }
            }
            else if(pieza.inc == 3){
                if(tablero[x - 1][y] == 1 || tablero[x][y + 1] == 1){
                    toca = true;
                }
            }
            else{
                if(tablero[x][y] == 1 || tablero[x - 1][y + 1] == 1 || tablero[x][y + 2] == 1){
                    toca = true;
                }
            }            
    }   
    
    return toca;
}

function comprobarCasillasInferiores(pieza){ // 
    var x = pieza.posX / 20;
    var y = pieza.posY / 20;
    switch(pieza.tipo){
        case 0:
            if(pieza.inc == 1){
                if(tablero[x][y + 1] == 1 || tablero[x + 1][y + 1] == 1 || tablero[x + 2][y + 1] == 1 || tablero[x + 3][y + 1] == 1){
                    return true;
                }
                else{
                    return false;
                }                
            }
            else{
                if(tablero[x][y + 4]){
                    return true;
                }
                else{
                    return false;
                }
            }
            break;
        case 1:
            if(tablero[x][y + 2] == 1 || tablero[x + 1][y + 2] == 1){
                return true;
            }
            else{
                return false;
            }
            break;
        case 2:
            if(pieza.inc == 1){
                if(tablero[x][y + 3] == 1 || tablero[x + 1][y + 3] == 1){
                    return true;
                }
                else{
                    return false;
                }
            }
            else if(pieza.inc == 2){
                if(tablero[x][y + 2] == 1 || tablero[x + 1][y + 1] == 1 || tablero[x + 2][y + 1] == 1){
                    return true;
                }
                else{
                    return false;
                }
            }
            else if(pieza.inc == 3){
                if(tablero[x][y + 1] == 1 || tablero[x + 1][y + 3] == 1){
                    return true;
                }
                else{
                    return false;
                }
            }
            else{
                if(tablero[x][y + 2] == 1 || tablero[x + 1][y + 2] == 1 || tablero[x + 2][y + 2] == 1){
                    return true;
                }
                else{
                    return false;
                }
            }
            break;
        case 3:
            if(pieza.inc == 1){
                if(tablero[x][y + 3] == 1 || tablero[x + 1][y + 3] == 1){
                    return true;
                }
                else{
                    return false;
                }
            }
            else if(pieza.inc == 2){
                if(tablero[x][y + 2] == 1 || tablero[x + 1][y + 2] == 1 || tablero[x + 2][y + 2] == 1){
                    return true;
                }
                else{
                    return false;
                }
            }
            else if(pieza.inc == 3){
                if(tablero[x][y + 3] == 1 || tablero[x + 1][y + 1] == 1){
                    return true;
                }
                else{
                    return false;
                }
            }
            else{
                if(tablero[x][y + 1] == 1 || tablero[x + 1][y + 1] == 1 || tablero[x + 2][y + 2] == 1){
                    return true;
                }
                else{
                    return false;
                }
            }            
        case 4:
            if(pieza.inc == 1){
                if(tablero[x][y + 3] == 1 || tablero[x + 1][y + 2] == 1){
                    return true;
                }
                else{
                    return false;
                }
            }
            else{
                if(tablero[x][y + 1] == 1 || tablero[x + 1][y + 2] == 1 || tablero[x + 2][y + 2] == 1){
                    return true;
                }
                else{
                    return false;
                }
            }
        case 5:
            if(pieza.inc == 1){
                if(tablero[x][y + 2] == 1 || tablero[x + 1][y + 3] == 1){
                    return true;
                }
                else{
                    return false;
                }
            }
            else{
                if(tablero[x][y + 2] == 1 || tablero[x + 1][y + 2] == 1 || tablero[x + 2][y + 1] == 1){
                    return true;
                }
                else{
                    return false;
                }
            }
        case 6:
            if(pieza.inc == 1){
                if(tablero[x][y + 2] == 1 || tablero[x + 1][y + 2] == 1 || tablero[x + 2][y + 2] == 1){
                    return true;
                }
                else{
                    return false;
                }
            }
            else if(pieza.inc == 2){
                if(tablero[x][y + 3] == 1 || tablero[x + 1][y + 2] == 1){
                    return true;
                }
                else{
                    return false;
                }
            }
            else if(pieza.inc == 3){
                if(tablero[x][y + 1] == 1 || tablero[x + 1][y + 2] == 1 || tablero[x + 2][y + 1] == 1){
                    return true;
                }
                else{
                    return false;
                }
            }
            else{
                if(tablero[x][y + 2] == 1 || tablero[x + 1][y + 3] == 1){
                    return true;
                }
                else{
                    return false;
                }
            }
    }       
    
}

function lanzarPieza(){
    if(jugando == 1){
        p = new Pieza();
        
        otraPieza = 0;
        p.cargarDimensiones();
        p.cargarImg();
        p.imagen.onload = function(){
            context.drawImage(p.imagen, p.posX, p.posY);
        };

        proximaPieza = Math.round(Math.random()*6);
        dibujarProxima(proximaPieza);
        cayendo = setInterval("p.caer()", velocidad);    
          
    }
  
}

function acelerar(){
    clearInterval(cayendo);
    cayendo = setInterval("p.caer()", 30);    
}

function mostrarMarcas(){
    blanquear();
    context.font = "16px Arial";
    context.fillStyle = "#FFF";    

    for(var i = 0; i < 14; i++){
        for(var j = 0; j < 24; j++){

            context.fillText(tablero[i][j], i * 20, j * 20 + 20);

        }
    }
}

function comprobarGameOver(){
    var fin = false;
    for(var i = 0; i < 14; i++){
        if(tablero[i][4] == 1){
            fin = true;
        }
    }
    
    return fin;
}


function copiarCanvas(y){
    context.fillStyle = "black";
    context.fillRect(0, 0, 280, 50); // borramos el marcador
    var imagen = context.getImageData(0, 0, 280, y); // Copiamos el canvas hasta la línea a borrar
    context.putImageData(imagen, 0, 20); // pegamos la copia 
}

function moverPiezasSuperiores(y){
    for(y; y >= 0; y--){
        for(x = 13; x >= 0; x-- ){
            tablero[x][y] = tablero[x][y - 1] || 0;
        }
    }
}

function comprobarLineas(pieza){
    var lineas = [];
    var y = pieza.posY  / 20;
    switch(pieza.alto){
        case 20:
            var a = 0;
            
            for(var i = 0; i < 14; i++){
   
                if(tablero[i][y] == 1){
                    a++;
                }
            }

            
            if(a == 14){
                lineas.push(y);
                moverPiezasSuperiores(y);
                copiarCanvas(pieza.posY);
                numLineas++;
                contNivel++;
                //document.getElementById("marcador").innerHTML = numLineas;
                actualizarMarcador();
            }
            break;
        case 40:
            for(var i = y; i < y + 2; i++){
                var a = 0;
                for(var j = 0; j < 14; j++){
                    if(tablero[j][i] == 1){
                        a++;
                    }
                }
                if(a == 14){
                    lineas.push(i);
                    moverPiezasSuperiores(i);
                    copiarCanvas(i * 20);
                    numLineas++;
                    contNivel++;
                    //document.getElementById("marcador").innerHTML = numLineas;
                    actualizarMarcador();
                }
            }
            break;
        case 60:
            for(var i = y; i < y + 3; i++){
                var a = 0;
                for(var j = 0; j < 14; j++){
                    if(tablero[j][i] == 1){
                        a++;
                    }
                }

                if(a == 14){
                    lineas.push(i);
                    moverPiezasSuperiores(i);
                    copiarCanvas(i * 20);
                    numLineas++;
                    contNivel++;
                    //document.getElementById("marcador").innerHTML = numLineas;
                    actualizarMarcador();
                }
            }
            break;        
        case 80:
            for(var i = y; i < y + 4; i++){
                var a = 0;
                for(var j = 0; j < 14; j++){
                    if(tablero[j][i] == 1){
                        a++;
                    }
                }

                if(a == 14){
                    lineas.push(i);
                    moverPiezasSuperiores(i);
                    copiarCanvas(i * 20);
                    numLineas++;
                    contNivel++;
                    //document.getElementById("marcador").innerHTML = numLineas;
                    actualizarMarcador();
                }
            }
            break;            
    }
    
    return lineas;
}

function dibujarProxima(proxima){
    var url;
    switch(proxima){
        case 0:
            url = "img/barra1.png";
            break;
        case 1:
            url = "img/cubo.png";
            break;
        case 2:
            url = "img/ld1.png";
            break;
        case 3:
            url = "img/li1.png";
            break;
        case 4:
            url = "img/sd1.png";
            break;
        case 5:
            url = "img/si1.png";
            break;
        case 6:
            url = "img/t1.png";
            break;
           
    }    
    
    //document.getElementById('proxima').innerHTML = "<img src='" + url + "' />";
    
    context.fillStyle = "black";
    context.fillRect(230, 5, 50, 30);
    
    var img = new Image();
    img.onload = function(){
        context.drawImage(img, 230, 5, img.width * 0.5, img.height * 0.5);
    };
    
    img.src = url;
    
}

function aumentarVelocidad(){
    if(contNivel >= 20){
        velocidad -= 50;
        contNivel = 0;
        nivel++;
        //document.getElementById('nivel').innerHTML = nivel;
        actualizarMarcador();
    }
    
   // document.getElementById('velocidad').innerHTML = velocidad;
}


function actualizarMarcador(){
    context.font = "13px Arial";
    context.fillStyle = "#FFF";
    context.fillText("NIVEL: ", 5, 18);
    context.fillText("LÍNEAS: ", 70, 18);
    context.fillText("PRÓXIMA: ", 150, 18);
    
    context.font = "16px Arial";
    context.fillStyle = "#58ACFA";
    context.fillText(nivel, 55, 18);
    context.fillText(numLineas, 127, 18);
}


//***********************************************************************

blanquear();

actualizarMarcador();
