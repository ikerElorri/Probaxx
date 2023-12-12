<?php
include_once("../model/usuario_model.php");
$data = json_decode(file_get_contents("php://input"), true);

$dni = $data['dni'];

$usuario = new usuario_model();

$usuario->setDni($dni);

$usuario->showupdate();

$response = array();

$response['list'] = $usuario->objVars();

$response['error'] = " ERROR ";


echo json_encode($response);
