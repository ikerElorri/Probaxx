<?php

include_once '../model/cuentaBancaria_model.php';
$data = json_decode(file_get_contents("php://input"), true);

$usuario= new cuentaBancaria_model();

$iban = $data['iban'];

$response=array();

$usuario->setIban($iban);

$response['list']=$usuario->opcinesTransferir();
$response['error']="not error";

echo json_encode($response);
