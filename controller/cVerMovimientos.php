<?php

include_once '../model/cuentaMov_model.php';
$data = json_decode(file_get_contents("php://input"), true);

$iban = $data['iban'];

$movimiento= new cuentaMov_model();

$movimiento->setIban($iban);

//$movimiento->getlist();

$response=array();

$response['list']= $movimiento->getlist();
$response['error'] = "ERROR";

echo json_encode($response);

unset($response);