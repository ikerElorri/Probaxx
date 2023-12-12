<?php

class movimiento_class{

    protected $id_movimiento;
    protected $tipo;
    protected $concepto;
    

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
     * Get the value of tipo
     */ 
    public function getTipo()
    {
        return $this->tipo;
    }

    /**
     * Set the value of tipo
     *
     * @return  self
     */ 
    public function setTipo($tipo)
    {
        $this->tipo = $tipo;

        return $this;
    }

    /**
     * Get the value of concepto
     */ 
    public function getConcepto()
    {
        return $this->concepto;
    }

    /**
     * Set the value of concepto
     *
     * @return  self
     */ 
    public function setConcepto($concepto)
    {
        $this->concepto = $concepto;

        return $this;
    }
}