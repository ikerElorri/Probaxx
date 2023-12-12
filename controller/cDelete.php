<?php

include_once '../model/usuario_model.php';
include_once '../model/cuentaBancaria_model.php';

$data=json_decode(file_get_contents("php://input"),true);

$dni = $data['dni'];

$usuario=new usuario_model();
$usuario->setDni($dni);

$cuenta=new cuentaBancaria_model();
$cuenta->setDni($dni);

$response=array();

if ($usuario->getDni()!=null)
{
    $usuario->setDni($usuario->getDni());

    $response['error']=$cuenta->delete();
    $response['error']=$usuario->delete();
    
    
} else{
    $response['error']="Ez da id pasatu/No se ha pasado id";
}

echo json_encode($response);
