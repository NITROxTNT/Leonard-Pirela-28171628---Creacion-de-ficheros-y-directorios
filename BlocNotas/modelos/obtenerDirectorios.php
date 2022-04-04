<?php 

//mostrarDirectorios('../ficheros');

if (isset($_POST['ficheroSolicitado'])) {

mostrarDirectorios($_POST['ficheroSolicitado']);

}

function mostrarDirectorios($ficheroSolicitado){
    
    
    
    $archivos = array();
    $directorios = array ();

    $dir = opendir($ficheroSolicitado);
    

    while ($directorioActual = readdir($dir)){
        if( $directorioActual != "." && $directorioActual != "..") {
            if(is_dir($ficheroSolicitado.'/'.$directorioActual)) {
                //mostrarDirectorios($ficheroSolicitado.$directorioActual.'/');
                $directorios[] = $directorioActual;
            }
            else {
                $archivos[] = $directorioActual;
            }
        }
    }

    $respuestaJson = array ();
    $respuestaJson['Archivos'] = $archivos;
    $respuestaJson['Directorios'] = $directorios;
    
    echo json_encode($respuestaJson);
    
    /*echo '<h2>'.$ficheroSolicitado.'</h2>';
    echo '<ul>';
    for($i=0; $i<count( $archivos ); $i++){
        echo '<li>'.$archivos[$i]."</li>";
    }
    echo '</ul>';*/
}


?>