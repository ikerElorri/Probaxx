<?php
include_once '../model/cuentaBancaria_model.php';
include_once '../model/cuentaMov_model.php';

$data=json_decode(file_get_contents("php://input"),true);

$iban = $data['iban'];
$saldo = $data['cantidad'];

$cuentaBan = new cuentaBancaria_model();

$cuentaBan->setSaldo($saldo);
$cuentaBan->setIban($iban);

$cuentaMov = new cuentaMov_model();

$cuentaMov->setCantidad($saldo);
$cuentaMov->setIban($iban);

$response=array();

$response['list'] = $cuentaBan->RetirarDinero();
$response['list2'] = $cuentaMov->retirarMov();

$response['error']='no error';


echo json_encode($response);