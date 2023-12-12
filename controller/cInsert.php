<?php
include_once '../model/usuario_model.php';
include_once '../model/cuentaBancaria_model.php';

$data=json_decode(file_get_contents("php://input"),true);

$dni = $data['dni'];
$nombre = $data['nombre'];
$apellido = $data['apellido'];
$pasahitza = $data['pasahitza'];
$admin = $data['admin'];

$usuario=new usuario_model();
$usuario->setDni($dni);
$usuario->setNombre($nombre);
$usuario->setApellido($apellido);
$usuario->setPasahitza($pasahitza);
$usuario->setAdmin($admin);

$usuario->insert();

$cuenta = new cuentaBancaria_model();
$cuenta->selectIban();
$cuenta->setDni($usuario->getDni());
$cuenta->insert();

$cuenta2 = new cuentaBancaria_model();
$cuenta2->selectIban();
$cuenta2->setDni($usuario->getDni());
$cuenta2->insert();


$response=array();

$response['error']='no error';


echo json_encode($response);