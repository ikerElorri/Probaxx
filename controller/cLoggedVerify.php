<?php
session_start(); 

$response=array();

if (isset($_SESSION['dni']) && (isset($_SESSION['admin'])))
{
    $response["dni"]=$_SESSION['dni'];
    $response["admin"]=$_SESSION['admin'];
    
    $response["error"]="logged";
}else{
    $response["error"]="not logged";
}
echo json_encode($response);