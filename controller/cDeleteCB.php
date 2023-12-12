<?php
include_once '../model/cuentaBancaria_model.php';
include_once '../model/cuentaMov_model.php';
include_once '../model/movimiento_model.php';

$data=json_decode(file_get_contents("php://input"),true);

$iban = $data['iban'];

$cuentaB=new cuentaBancaria_model();
$cuentaB->setIban($iban);

$cuentaCM=new cuentaMov_model();
$cuentaCM->setObjCuentaBan($cuentaB);

$cIdM = $cuentaCM->getId_mov();

$cuentaCM->deleteCBM();

foreach ($cIdM as $idM) {
    $cuentaM=new movimiento_model();
    $cuentaM->setId_movimiento($idM['id_movimiento']);
    $cuentaM->delete();
}

$response=array();

if ($cuentaB->getIban()!=null)
{
    $response['error']=$cuentaB->deleteCB();
    
} else{
    $response['error']="Ez da iban pasatu/No se ha pasado el iban";
}

echo json_encode($response);
