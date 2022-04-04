<?php 

if (!empty($_POST['directorioNombre']) && !empty($_POST['directorioActual'])) {

    $ruta = $_POST['directorioActual'] . '/' . $_POST['directorioNombre'];

try {
   
if (!is_dir($ruta)) {
    mkdir($ruta, 0777, true); echo json_encode(1);
} else {echo json_encode(3);}

} catch (Exception $e) {echo json_encode(2);}
    

} else {echo json_encode(0);}


?>
