<?php
require_once 'connect_data.php';
require_once 'usuario_class.php';


class usuario_model extends usuario_class
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


    public function setUserData()
    {

        $this->OpenConnect();
        $dni = $this->dni;
        $pasahitza = $this->pasahitza;

        $sql = "SELECT * FROM usuarios WHERE dni = '$dni'";

        $result = $this->link->query($sql);
        $valor = 0;
        $admin = 0;


        if ($row = mysqli_fetch_array($result, MYSQLI_ASSOC)) {
            if ($this->link->affected_rows == 1) {

                $this->dni = $row['dni'];

                $p1 = $row['pasahitza'];

                if ($p1 == $pasahitza) {
                    $valor = 1;
                    $admin = $this->admin = $row['admin'];
                } else {
                    $valor = -1;
                }
            }
        }

        return array("valor" => $valor, "admin" => $admin);;
        $this->CloseConnect();
    }

    public function setList()
    {

        $this->OpenConnect();

        $sql = "SELECT * FROM usuarios";
        $result = $this->link->query($sql);

        $list = array();

        while ($row = mysqli_fetch_array($result, MYSQLI_ASSOC)) {

            $new = new usuario_class();

            $new->setDni($row['dni']);
            $new->setNombre($row['nombre']);
            $new->setApellido($row['apellido']);
            $new->setPasahitza($row['pasahitza']);
            $new->setAdmin($row['admin']);

            array_push($list, get_object_vars($new));
        }
        mysqli_free_result($result);
        $this->CloseConnect();
        return $list;
    }

    public function findUserByDni()
    {
        $this->OpenConnect();

        $dni = $this->dni;

        $sql = "SELECT * FROM usuarios WHERE usuarios.dni = '$dni'";

        $result = $this->link->query($sql);
        $row = mysqli_fetch_array($result, MYSQLI_ASSOC);

        $this->setDni($row['dni']);
        $this->setNombre($row['nombre']);
        $this->setApellido($row['apellido']);
        $this->setPasahitza($row['pasahitza']);
        $this->setAdmin($row['admin']);


        mysqli_free_result($result);

        $this->CloseConnect();
    }

    public function delete()
    {

        $this->OpenConnect();

        $dni = $this->dni;

        $sql = "DELETE FROM usuarios WHERE usuarios.dni = '$dni'";

        $this->link->query($sql);

        if ($this->link->affected_rows == 1) {
            return "La persona se ha borrado con exito.Num borrados: " . $this->link->affected_rows;
        } else {
            return "Falla el borrado de la persona: (" . $this->link->errno . ") " . $this->link->error;
        }
        $this->CloseConnect();
    }

    public function insert()
    {

        $this->OpenConnect();

        $dni = $this->dni;
        $nombre = $this->nombre;
        $apellido = $this->apellido;
        $pasahitza = $this->pasahitza;
        $admin = $this->admin;

        $sql = "INSERT INTO usuarios(dni, nombre, apellido, pasahitza, `admin`) VALUES ('$dni', '$nombre', '$apellido', '$pasahitza', $admin)";

        $this->link->query($sql);

        if ($this->link->affected_rows == 1) {
            $msg = $sql . " La persona se ha insertado con exito. Num de inserts: " . $this->link->affected_rows;
        } else {
            $msg = $sql . " Fallo al insertar una persona nuevo: (" . $this->link->errno . ") " . $this->link->error;
        }
        
        $this->CloseConnect();
        return $msg;
    }


    public function showupdate()
    {
        $this->OpenConnect();

        $dni = $this->dni;
        $sql = "SELECT * FROM usuarios where dni = '$dni'";

        $result = $this->link->query($sql);

        // $list= array();
        
        if ($row = mysqli_fetch_array($result, MYSQLI_ASSOC)) {

            // $new= new usuario_class();

            $this->setDni($row['dni']);
            $this->setNombre($row['nombre']);
            $this->setApellido($row['apellido']);
            $this->setPasahitza($row['pasahitza']);
            $this->setAdmin($row['admin']);

            // array_push($list, $new);
            // array_push($list, get_object_vars($new));

            // $list = $new;

        }
        mysqli_free_result($result);
        $this->CloseConnect();
        // return $list;
        return $dni;
    }

    public function update()
    {

        $this->OpenConnect();  // konexio zabaldu  - abrir conexión

        $dni = $this->dni;
        $nombre = $this->nombre;
        $apellido = $this->apellido;
        $admin = $this->admin;
        $pasahitza = $this->pasahitza;

        $sql = "UPDATE usuarios SET nombre='$nombre',apellido='$apellido', pasahitza='$pasahitza', admin=$admin where dni='$dni'";

        $this->link->query($sql);

        if ($this->link->affected_rows == 1) {
            $msg = $sql . " La persona se ha cambiado con exito." . $this->link->affected_rows;
        } else {
            $msg = $sql . " Fallo al cambiar la persona: (" . $this->link->errno . ") " . $this->link->error;
        }
        $this->CloseConnect();
        return $msg;
    }

    // public function findUserByDni(){

    //     $this->OpenConnect();
    //     $dni=$this->dni;

    //     $sql = "SELECT * FROM usuarios WHERE usuarios.dni = '$dni';";
    //     $result = $this->link->query($sql);

    //     if ($row = mysqli_fetch_array($result, MYSQLI_ASSOC))
    //     {
    //         $this->setDni($row['dni']);
    //         $this->setNombre($row['nombre']);
    //         $this->setApellido($row['apellido']);
    //         $this->setPasahitza($row['pasahitza']);
    //         $this->setAdmin($row['admin']);

    //     }
    //     mysqli_free_result($result);

    //     $this->CloseConnect();

    //     }




    public function objVars()
    {
        return get_object_vars($this);
    }
}
