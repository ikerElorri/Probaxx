<?php

require_once 'connect_data.php';
require_once 'cuentaMov_class.php';
require_once 'movimiento_model.php';

class cuentaMov_model extends cuentaMov_class
{
    private $link;
    private $ojbMovimiento;
    private $objCuentaBan;
    

    public function OpenConnect()
    {
        $konDat = new connect_data();
        try {
            $this->link = new mysqli($konDat->host, $konDat->userbbdd, $konDat->passbbdd, $konDat->ddbbname);
        } catch (Exception $e) {
            echo $e->getMessage();
        }
        $this->link->set_charset("utf8"); // honek behartu egiten du aplikazio eta
        //                  //databasearen artean UTF -8 erabiltzera datuak trukatzeko
    }

    public function CloseConnect()
    {
        mysqli_close($this->link);
    }

    public function getlist()
    {
        $this->OpenConnect();

        $iban = $this->iban;

        $sql = "SELECT cuenta_mov.id_movimiento, cuenta_mov.iban, cuenta_mov.fecha, cuenta_mov.cantidad, movimientos.tipo, movimientos.concepto FROM cuenta_mov INNER JOIN movimientos ON cuenta_mov.id_movimiento = movimientos.id_movimiento WHERE cuenta_mov.iban='$iban'";
        
        $result = $this->link->query($sql);

        $list = array();

        while ($row = mysqli_fetch_array($result, MYSQLI_ASSOC)) {

            $this->setId_movimiento($row['id_movimiento']);
            $this->setIban($row['iban']);
            $this->setFecha($row['fecha']);
            $this->setCantidad($row['cantidad']);

            $movi = new movimiento_model();
            $movi->setId_movimiento($row['id_movimiento']);
            $movi->getMov();

            $this->ojbMovimiento=$movi->objVars();

            array_push($list, get_object_vars($this));
        }
        return $list;
        mysqli_free_result($result);
        $this->CloseConnect();
    
    }

    public function ingertarMov(){
        $this->OpenConnect();

        $iban = $this->iban;
        $cantidad = $this->cantidad;

        $this->ojbMovimiento = new movimiento_model();
        $this->ojbMovimiento->maxId();

        $sql = "INSERT INTO `cuenta_mov`(`id_movimiento`, `iban`, `fecha`, `cantidad`) VALUES (" . $this->ojbMovimiento->getId_movimiento() . ",'$iban',now(),$cantidad)";
        $this->link->query($sql);

        

        if ($this->link->affected_rows == 1) {
            return "se ha insertado correctamente el movimiento: " . $this->link->affected_rows;
        } else {
            return "Falla al insertar el movimiento: (" . $this->link->errno . ") " . $this->link->error;
        }

        $this->CloseConnect();
    }

    public function retirarMov(){
        $this->OpenConnect();

        $iban = $this->iban;
        $cantidad = $this->cantidad;

        $this->ojbMovimiento = new movimiento_model();
        $this->ojbMovimiento->maxId();

        $sql = "INSERT INTO `cuenta_mov`(`id_movimiento`, `iban`, `fecha`, `cantidad`) VALUES (" . $this->ojbMovimiento->getId_movimiento() . ",'$iban',now(),$cantidad)";
        $this->link->query($sql);

        

        if ($this->link->affected_rows == 1) {
            return "se ha insertado correctamente el movimiento: " . $this->link->affected_rows;
        } else {
            return "Falla al insertar el movimiento: (" . $this->link->errno . ") " . $this->link->error;
        }

        $this->CloseConnect();
    }

    public function insertCuentaMov() {
        $this->OpenConnect();

        $sql = "INSERT INTO cuenta_mov (id_movimiento,iban,fecha,cantidad) VALUES (". $this->ojbMovimiento->getId_movimiento() . ",'" . $this->objCuentaBan->getIban() . "', now(), $this->cantidad  )";
       
        $this->link->query($sql);

        if ($this->link->affected_rows == 1) {
            return "funca";
        } else {
            return "no funca";
        }

        $this->CloseConnect();
    }

    public function deleteCBM(){
        $this->OpenConnect();

        $iban = $this->iban;

        $sql = "DELETE FROM cuenta_mov WHERE cuenta_mov.iban = '$iban'";

        $this->link->query($sql);

        if ($this->link->affected_rows == 1) {
            return "La persona se ha borrado con exito.Num borrados: " . $this->link->affected_rows;
        } else {
            return "Falla el borrado de la persona: (" . $this->link->errno . ") " . $this->link->error;
        }
        $this->CloseConnect();
    }

    public function getId_mov(){
        $this->OpenConnect();

        $iban = $this->objCuentaBan->getIban();

        $sql = "SELECT id_movimiento FROM cuenta_mov WHERE cuenta_mov.iban = '$iban';";

        $result= $this->link->query($sql);

        $list=array();
        
        while ($row = mysqli_fetch_array($result, MYSQLI_ASSOC))
        {
            $cuentaM = new cuentaMov_model();
            
            $cuentaM->id_movimiento=$row['id_movimiento'];
              
            array_push($list, get_object_vars($cuentaM));
        }

        mysqli_free_result($result);
        return $list;

        $this->CloseConnect();
    }


    public function objVars()
    {
        return get_object_vars($this);
    }

    /**
     * Get the value of objCuentaBan
     */ 
    public function getObjCuentaBan()
    {
        return $this->objCuentaBan;
    }

    /**
     * Set the value of objCuentaBan
     *
     * @return  self
     */ 
    public function setObjCuentaBan($objCuentaBan)
    {
        $this->objCuentaBan = $objCuentaBan;

        return $this;
    }

    /**
     * Get the value of ojbMovimiento
     */ 
    public function getOjbMovimiento()
    {
        return $this->ojbMovimiento;
    }

    /**
     * Set the value of ojbMovimiento
     *
     * @return  self
     */ 
    public function setOjbMovimiento($ojbMovimiento)
    {
        $this->ojbMovimiento = $ojbMovimiento;

        return $this;
    }
}
