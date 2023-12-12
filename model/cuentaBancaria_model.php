<?php

require_once 'connect_data.php';
require_once 'cuentaBancaria_class.php';
require_once 'usuario_model.php';
require_once 'movimiento_model.php';


class cuentaBancaria_model extends cuentaBancaria_class
{
    private $link;
    private $objUsuario;
    private $objMov;

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

    public function getList()
    {
        $this->OpenConnect();

        $dni = $this->dni;
        $sql = "SELECT * FROM cuenta_bancaria where dni = '$dni'";
        $result = $this->link->query($sql);

        $list = array();

        while ($row = mysqli_fetch_array($result, MYSQLI_ASSOC)) {

            $new = new cuentaBancaria_class();

            $new->setIban($row['iban']);
            $new->setSaldo($row['saldo']);
            $new->setDni($row['dni']);

            array_push($list, get_object_vars($new));
        }
        mysqli_free_result($result);
        $this->CloseConnect();
        return $list;


        $this->CloseConnect();
    }

    public function opcinesTransferir()
    {
        $this->OpenConnect();

        $iban = $this->iban;

        $sql = "SELECT * FROM cuenta_bancaria WHERE iban != '$iban'";
        $result = $this->link->query($sql);

        $list = array();

        while ($row = mysqli_fetch_array($result, MYSQLI_ASSOC)) {

            $new = new cuentaBancaria_class();

            $new->setIban($row['iban']);
            $new->setSaldo($row['saldo']);
            $new->setDni($row['dni']);

            array_push($list, get_object_vars($new));
        }
        mysqli_free_result($result);
        return $list;


        $this->CloseConnect();
    }


    public function selectIban()
    {
        $this->OpenConnect();

        $sql = "SELECT * FROM cuenta_bancaria ORDER BY iban DESC";
        $result = $this->link->query($sql);


        if ($row = mysqli_fetch_array($result, MYSQLI_ASSOC)) {

            $this->setIban($row['iban']);

            $sub = intval(substr($this->getIban(), -10));

            $sub = $sub + 1;

            $sub = strval($sub);

            $bus = substr($this->getIban(), 0, -10);

            $bus = $bus . $sub;

            $this->setIban($bus);

            $this->setSaldo(0);
            $this->setDni(0);
        } else {
            $this->setIban("ES12 2090 0000 29 1000000001");
        }

        mysqli_free_result($result);
        $this->CloseConnect();
    }

    public function insert()
    {

        $this->OpenConnect();

        $iban = $this->iban;
        $dni = $this->dni;


        $sql = "INSERT INTO cuenta_bancaria(iban, saldo, dni) VALUES ('$iban',0,'$dni')";

        $this->link->query($sql);

        if ($this->link->affected_rows == 1) {
            $msg = $sql . " La cuenta se ha insertado con exito. Num de inserts: " . $this->link->affected_rows;
        } else {
            $msg = $sql . " Fallo al insertar una cuenta nuevo: (" . $this->link->errno . ") " . $this->link->error;
        }
        $this->CloseConnect();
        return $msg;
    }

    public function delete()
    {
        $this->OpenConnect();

        $dni = $this->dni;

        $sql = "DELETE FROM cuenta_bancaria WHERE cuenta_bancaria.dni = '$dni'";

        $this->link->query($sql);

        if ($this->link->affected_rows == 1) {
            return "La persona se ha borrado con exito.Num borrados: " . $this->link->affected_rows;
        } else {
            return "Falla el borrado de la persona: (" . $this->link->errno . ") " . $this->link->error;
        }
        $this->CloseConnect();
    }

    public function deleteCB()
    {
        $this->OpenConnect();

        $iban = $this->iban;

        $sql = "DELETE FROM cuenta_bancaria WHERE cuenta_bancaria.iban = '$iban'";

        $this->link->query($sql);

        if ($this->link->affected_rows == 1) {
            return "La cuenta bancaria se ha borrado con exito.Num borrados: " . $this->link->affected_rows;
        } else {
            return "Falla el borrado de la cuenta bancaria: (" . $this->link->errno . ") " . $this->link->error;
        }
        $this->CloseConnect();
    }

    public function IngresarDinero()
    {
        $this->OpenConnect();

        $iban = $this->iban;
        $saldo = $this->saldo;

        $sql = "UPDATE cuenta_bancaria SET saldo = saldo + $saldo WHERE iban='$iban'";
        $this->link->query($sql);

        if ($this->link->affected_rows == 1) {

            $sql = "INSERT INTO movimientos (tipo, concepto) VALUES ('ingreso','Ha ingresado dinero')";
            $this->link->query($sql);

            return "Se ha ingresado el dinero " . $saldo;
        } else {
            return "Error al ingresado el dinero (" . $this->link->errno . ") " . $this->link->error;
        }
        $this->CloseConnect();
    }

    public function RetirarDinero()
    {
        $this->OpenConnect();

        $iban = $this->iban;
        $saldo = $this->saldo;

        $sql = "UPDATE cuenta_bancaria SET saldo = saldo - $saldo WHERE iban='$iban' AND saldo >= $saldo AND saldo > 0";
        $this->link->query($sql);

        if ($this->link->affected_rows == 1) {

            $sql = "INSERT INTO movimientos (tipo, concepto) VALUES ('ingreso','Ha retirado dinero')";
            $this->link->query($sql);

            return "Se ha retirado el dinero " . $saldo;
        } else {
            return "Error al retirar el dinero (" . $this->link->errno . ") " . $this->link->error;
        }

        $this->CloseConnect();
    }

    public function Transferir()
    {
        $this->OpenConnect();
        
        $iban = $this->iban;
        $saldo = $this->saldo;

        $sql = "UPDATE cuenta_bancaria SET saldo = saldo - $saldo WHERE iban='$iban'";
        
        $this->link->query($sql);

        if ($this->link->affected_rows == 1) {

            return "Se ha hecho la tranferencia el dinero " . $saldo;
        } else {
            return "Error al tranferir el dinero (" . $this->link->errno . ") " . $this->link->error;
        }
        
        $this->CloseConnect();
    }

    public function Transferir2()
    {
        $this->OpenConnect();

        $iban = $this->iban;
        $saldo = $this->saldo;

        $sql = "UPDATE cuenta_bancaria SET saldo = saldo + $saldo WHERE iban='$iban'";
        $this->link->query($sql);

        if ($this->link->affected_rows == 1) {

            return "Se ha recibido la tranferencia " . $saldo;
        } else {
            return "Error al recibir la tranferencia (" . $this->link->errno . ") " . $this->link->error;
        }
        $this->CloseConnect();
    }

    public function objVars()
    {
        return get_object_vars($this);
    }
}
