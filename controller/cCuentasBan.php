<?php

include_once '../model/cuentaBancaria_model.php';

$data=json_decode(file_get_contents("php://input"),true);

$dni=$data['dni'];

$cuentaB = new cuentaBancaria_model();
$cuentaB->setDni($dni);

$response=array();
$response['list']=$cuentaB->getList();

echo json_encode($response);
