var ficheroInicial = "../ficheros";
//var ficheroAnterior = "../ficheros";

 window.onload = function () {

    cargarDirectorios(ficheroInicial);

    }


var cargarDirectorios = function (ficheroCuestion, volverInicio) {
    
    
    
    var solicitudDirectorios  = new XMLHttpRequest ();
    solicitudDirectorios.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {

            var respuestaDirectorios;
            console.log(this.response);
            var respuestaDirectorios = JSON.parse(this.response);
            generarDirectorios(respuestaDirectorios);

        }
    }

    var ficheroSolicitado = new FormData ();
    ficheroSolicitado.append("ficheroSolicitado", ficheroCuestion);
    solicitudDirectorios.open("POST",".\\modelos\\obtenerDirectorios.php");
    solicitudDirectorios.send(ficheroSolicitado);

}

var generarDirectorios = function (jsonDirectorios) {

    var listaDirectorios = document.getElementById('listaDirectorios'); listaDirectorios.innerHTML = "";
    var listaArchivos = document.getElementById('listaArchivos'); listaArchivos.innerHTML = "";
    var directorioActual = document.getElementById('directorioActual');
    
    directorioActual.textContent = ficheroInicial;

    jsonDirectorios['Directorios'].forEach(elementoDirectorio => {
        var elementoLista = document.createElement("li");
        var textoElemento = document.createTextNode(elementoDirectorio);
        elementoLista.appendChild(textoElemento); 

        Object.defineProperty(elementoLista, 'nombreDirectorio', {
            value:  textoElemento.textContent,
            writable: true,
            enumerable: true,
            configurable: true
          });

        listaDirectorios.appendChild(elementoLista);

        elementoLista.onclick = function () {
            ficheroAnterior = ficheroInicial;
            ficheroInicial = ficheroInicial + "/" +  this.nombreDirectorio;
            cargarDirectorios(ficheroInicial);
            }
       
    });

    jsonDirectorios['Archivos'].forEach(elementoArchivo => {
        
        var elementoLista = document.createElement("li");
        
        var linkDescarga = document.createElement("a");
        linkDescarga.innerText = elementoArchivo;
        linkDescarga.setAttribute('href', (ficheroInicial.slice(3) + '/' + elementoArchivo));
        linkDescarga.setAttribute('download', elementoArchivo);
        elementoLista.appendChild(linkDescarga);
        
        listaArchivos.appendChild(elementoLista);

        
    });

}

var subirArchivo = function () {


    var solicitudHttp  = new XMLHttpRequest ();
    solicitudHttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {

            console.log(this.response);
            cargarDirectorios(ficheroInicial);
            

        }
    }

    var nuevoFichero = new FormData (document.getElementById('formNuevoFichero'));
    nuevoFichero.append('directorioActual', ficheroInicial);
    solicitudHttp.open("POST",".\\modelos\\crearFichero.php");
    solicitudHttp.send(nuevoFichero);


}

var crearDirectorio = function () {
    
    var solicitudHttp  = new XMLHttpRequest ();
    solicitudHttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {

            console.log(this.response);
            cargarDirectorios(ficheroInicial);
            

        }
    }

    var nuevoFichero = new FormData (document.getElementById('formNuevoDirectorio'));
    nuevoFichero.append('directorioActual', ficheroInicial);
    solicitudHttp.open("POST",".\\modelos\\crearDirectorio.php");
    solicitudHttp.send(nuevoFichero);

}


