<?php
include_once '../model/cuentaBancaria_model.php';

$data=json_decode(file_get_contents("php://input"),true);

$dni = $data['dni'];

$cuenta = new cuentaBancaria_model();
$cuenta->selectIban();
$cuenta->setDni($dni);
$cuenta->insert();

$response=array();

$response['error']="La cuenta se ha creado";


echo json_encode($response);