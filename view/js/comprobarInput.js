$("#inputIngresar").keypress(solo_numero)
$("#inputRetirar").keypress(solo_numero)
$("#inputTran").keypress(solo_numero)

function solo_numero(tecla){
    console.log(tecla.key)

    if (tecla.key < "0" || tecla.key > "9"){
        tecla.preventDefault();
    }
}