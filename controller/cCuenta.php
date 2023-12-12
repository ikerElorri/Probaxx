<?php

include_once '../model/cuentaBancaria_model.php';

$cuenta = new cuentaBancaria_model();

$response=array();
// $response['list']=$cuenta->setList();
$response['error']="not error"; 

echo json_encode($response);

// NO SIRVE PARA NADA 

