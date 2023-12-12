<?php

class cuentaMov_class{

    protected $id_movimiento;
    protected $iban;
    protected $fecha;
    protected $cantidad;
    

    /**
     * Get the value of id_movimiento
     */ 
    public function getId_movimiento()
    {
        return $this->id_movimiento;
    }

    /**
     * Set the value of id_movimiento
     *
     * @return  self
     */ 
    public function setId_movimiento($id_movimiento)
    {
        $this->id_movimiento = $id_movimiento;

        return $this;
    }

    /**
     * Get the value of iban
     */ 
    public function getIban()
    {
        return $this->iban;
    }

    /**
     * Set the value of iban
     *
     * @return  self
     */ 
    public function setIban($iban)
    {
        $this->iban = $iban;

        return $this;
    }

    /**
     * Get the value of fecha
     */ 
    public function getFecha()
    {
        return $this->fecha;
    }

    /**
     * Set the value of fecha
     *
     * @return  self
     */ 
    public function setFecha($fecha)
    {
        $this->fecha = $fecha;

        return $this;
    }

    /**
     * Get the value of cantidad
     */ 
    public function getCantidad()
    {
        return $this->cantidad;
    }

    /**
     * Set the value of cantidad
     *
     * @return  self
     */ 
    public function setCantidad($cantidad)
    {
        $this->cantidad = $cantidad;

        return $this;
    }
}