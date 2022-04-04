<?php 

if (!empty($_POST['tituloFichero']) && !empty($_POST['textoFichero']) && !empty($_POST['directorioActual'])) {

    $ruta = $_POST['directorioActual'] . '/' . $_POST['tituloFichero'] . '.txt';
    $nuevoArchivo = fopen( $ruta , 'w');
    

    if (!strrpos($_POST['tituloFichero'] , '.')) {
    
    fwrite($nuevoArchivo, $_POST['textoFichero']);
    fclose($nuevoArchivo); 
    echo json_encode(1);

    } 

    

} else {echo json_encode(0);}



?>
