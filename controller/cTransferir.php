<?php

include_once '../model/cuentaBancaria_model.php';
include_once '../model/movimiento_model.php';
include_once '../model/cuentaMov_model.php';

$data = json_decode(file_get_contents("php://input"), true);

$iban1 = $data['iban'];
$iban2 = $data['iban2'];
$concepto = $data['concepto'];
$saldo = $data['cantidad'];

$cuentaBan1 = new cuentaBancaria_model();
$cuentaBan1->setSaldo($saldo);
$cuentaBan1->setIban($iban1);

$mov = new movimiento_model();
$mov->setConcepto($concepto);

$cuentaBan2 = new cuentaBancaria_model();
$cuentaBan2->setSaldo($saldo);
$cuentaBan2->setIban($iban2);



$response=array();

$response['list'] = $cuentaBan1->Transferir();
$response['list2'] = $mov->tranConceptoRealizar();

$cuentamov1 = new cuentaMov_model();
$cuentamov1->setCantidad($saldo);
$cuentamov1->setObjCuentaBan($cuentaBan1);
$mov->maxId();
$cuentamov1->setOjbMovimiento($mov);
$cuentamov1->insertCuentaMov();

$response['list3'] = $cuentaBan2->Transferir2();
$response['list4'] = $mov->tranRecidir();

$cuentamov2 = new cuentaMov_model();
$cuentamov2->setCantidad($saldo);
$cuentamov2->setObjCuentaBan($cuentaBan2);
$mov->maxId();
$cuentamov2->setOjbMovimiento($mov);
$cuentamov2->insertCuentaMov();

$response['error']='no error';

echo json_encode($response);