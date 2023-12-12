$("#tipoamortizacion").change(tipoAmortizacion)

function tipoAmortizacion(){
    console.log($(this).val())
    var tipoA = $(this).val()

    $("#gabezialdia").css("display" , "block")
    $("#periodoC").css("display" , "block")
    $("#tipoPeriodo").css("display" , "block")
    $("#tipo_periodo").css("display" , "block")

    $("#plazosdepago").val("")
    $("#tasainteres").val("")

    if (tipoA == "Americano" || tipoA == "Simple"){
        $("#gabezialdia").css("display" , "none")
        $("#periodoC").css("display" , "none")
        $("#tipoPeriodo").css("display" , "none")
        $("#tipo_periodo").css("display" , "none")

        $("#plazosdepago").val("1")
        $("#tasainteres").val("1")
        
    }
}

$("#numAñosMeses").keypress(cantidadAños)
var cantidadAM = $("#numAñosMeses")

function cantidadAños(tecla){
    console.log(tecla.key)
    var length = cantidadAM.val().trim().length

    if(length < 3){
        if (tecla.key < "0" || tecla.key > "9"){
            tecla.preventDefault();
        }
    }else{
        tecla.preventDefault();
    }
    
}

$("#cantidad").keypress(capital)

function capital(tecla){
    console.log(tecla.key)

    if (tecla.key < "0" || tecla.key > "9"){
        tecla.preventDefault();
    }
}

$("#interes").keypress(interes)

function interes(tecla){
    console.log(tecla.key)

    if (tecla.key < "0" || tecla.key > "9"){
        tecla.preventDefault();
    }
}

$("#gabezialdia").keypress(gabezialdia)

function gabezialdia(tecla){
    console.log(tecla.key)

    if (tecla.key < "0" || tecla.key > "9"){
        tecla.preventDefault();
    }
}
