<?php

require_once 'connect_data.php';
require_once 'movimiento_class.php';


class movimiento_model extends movimiento_class
{
    private $link;

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

    public function getMov(){
        $this->OpenConnect();

        $id_movimiento = $this->id_movimiento;

        $sql = "SELECT * FROM movimientos WHERE id_movimiento=$id_movimiento";
        $result = $this->link->query($sql);
        $list = array();

        while ($row = mysqli_fetch_array($result, MYSQLI_ASSOC)) {

            $this->id_movimiento=$row['id_movimiento'];
            $this->tipo=$row['tipo'];
            $this->concepto=$row['concepto'];

            array_push($list, get_object_vars($this));

        }
        return $list;
        mysqli_free_result($result);
        $this->CloseConnect();
    }

    public function maxId(){
        $this->OpenConnect();

        $sql = "SELECT MAX(id_movimiento) FROM movimientos;";
        $result = $this->link->query($sql);


        if ($row = mysqli_fetch_array($result, MYSQLI_ASSOC)) {

            $this->id_movimiento=$row['MAX(id_movimiento)'];

        }
        mysqli_free_result($result);
        $this->CloseConnect();
    }

    public function tranConceptoRealizar(){
        $this->OpenConnect();

        $concepto = $this->concepto; 

        $sql = "INSERT INTO movimientos (tipo, concepto) VALUES ('Realizar tranferencia', '$concepto')";
        $this->link->query($sql);
        
        $this->CloseConnect();
    }

    public function tranRecidir(){
        $this->OpenConnect();

        $concepto = $this->concepto; 

        $sql = "INSERT INTO movimientos (tipo, concepto) VALUES ('Recibir tranferencia', '$concepto')";
        $this->link->query($sql);
        
        $this->CloseConnect();
    }

    public function delete(){
        $this->OpenConnect();

        $id_movimiento = $this->id_movimiento;

        $sql = "DELETE FROM movimientos WHERE movimientos.id_movimiento = $id_movimiento";

        $this->link->query($sql);

        if ($this->link->affected_rows == 1) {
            return "La cuenta bancaria se ha borrado con exito.Num borrados: " . $this->link->affected_rows;
        } else {
            return "Falla el borrado de la cuenta bancaria: (" . $this->link->errno . ") " . $this->link->error;
        }
        $this->CloseConnect();
    }


    public function objVars()
    {
        return get_object_vars($this);
    }
}
