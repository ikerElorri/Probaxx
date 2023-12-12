<?php

include_once '../model/usuario_model.php';

$usuario= new usuario_model();

$response=array();
$response['list']=$usuario->setList();
$response['error']="not error"; 

echo json_encode($response);


