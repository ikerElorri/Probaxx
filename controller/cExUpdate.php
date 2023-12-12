<?php
include_once("../model/usuario_model.php");
$data = json_decode(file_get_contents("php://input"), true);

$dni = $data['dni'];
$nombre = $data['nombre'];
$apellido = $data['apellido'];
$pasahitza = $data['pasahitza'];
$admin = $data['admin'];

$usuario = new usuario_model();

$usuario->setDni($dni);
$usuario->setNombre($nombre);
$usuario->setApellido($apellido);
$usuario->setPasahitza($pasahitza);
$usuario->setAdmin($admin);

// $usuario->update();

$response = array();

$response['error'] = $usuario->update();

echo json_encode($response);
