document.addEventListener("DOMContentLoaded", function (event) {
    loggedVerify();
})
function loggedVerify() {
    var url = "/controller/cLoggedVerify.php";
    fetch(url, {
        method: 'GET',
    })
        .then(res => res.json()).then(result => {
            console.log(result);
            if (result.error !== "logged") {
                window.location.href="/view/index.html"
            } else {
                alert("Your login is " + result.dni);
                console.log(result)
                var admin = parseInt(result.admin);
                console.log(admin)
                if (admin == 1) {

                    var Aamind = document.getElementById('Admin');
                    Aamind.style.display = "block";
                    var usuario = document.getElementById('useer');
                    usuario.style.display = "block";
                    var cerrar = document.getElementById('logout');
                    cerrar.style.display = "block";
                } else {

                    var Aamind = document.getElementById('Admin');
                    Aamind.style.display = "none";
                    var usuario = document.getElementById('useer');
                    usuario.style.display = "block";
                    var cerrar = document.getElementById('logout');
                    cerrar.style.display = "block";
                }
                mostarusuario(result);
            }
        })
        .catch(error => console.error('Error status:', error));
}

function mostarusuario(result) {
    localStorage.setItem("Dni", result.dni);
    console.log(result.dni);
    var dni = result.dni;
    var url = "/controller/cMostrarUsuario.php";
    var data = { 'dni': dni };
    fetch(url, {
        method: 'POST', // or 'POST'
        body: JSON.stringify(data), // data can be `string` or {object}!
        headers: { 'Content-Type': 'application/json' }  //input data
    })
        .then(res => res.json()).then(result => {
            console.log(result.result.dni);
            var newRow = "<br/><h2>Usuario</h2>"
            newRow += "<div class='usearios'>"
            newRow += "<div class='cartasUsuarios'>"
            newRow += "<table class='tg'>"
                + "<colgroup>"
                + "<col style='width: 216px'>"
                + "<col style='width: 189px'>"
                + "</colgroup>"
                + "<tbody>"
                + "<tr>"
                + "<td class='tg-baqh'>Nombre</td>"
                + "<td class='tg-baqh'>" + result.result.nombre + "</td>"
                + "</tr>"
                + "<tr>"
                + "<td class='tg-baqh'>Apellido</td>"
                + "<td class='tg-baqh'>" + result.result.apellido + "</td>"
                + "</tr>"
                + "<tr>"
                + "<td class='tg-baqh'>DNI</td>"
                + "<td class='tg-baqh'>" + result.result.dni + "</td>"
                + "</tr>"
                + "<tr>"
                + "<td class='tg-baqh'>Pasahitza</td>"
                + "<td class='tg-baqh'>" + result.result.pasahitza + "</td>"
                + "</tr>"
                + "<tr>"
                + "<td class='tg-baqh' colspan='2'>"
                + "<button type='button' class='btn btnCuentaBan' id='cuenta' data-bs-toggle='modal' data-bs-target='#info' value='" + result.result.dni + "'>"
                + "<svg xmlns='http://www.w3.org/2000/svg' width='30' height='30' fill='currentColor' class='bi bi-info-lg' viewBox='0 0 16 16'>"
                + "<path d='m9.708 6.075-3.024.379-.108.502.595.108c.387.093.464.232.38.619l-.975 4.577c-.255 1.183.14 1.74 1.067 1.74.72 0 1.554-.332 1.933-.789l.116-.549c-.263.232-.65.325-.905.325-.363 0-.494-.255-.402-.704l1.323-6.208Zm.091-2.755a1.32 1.32 0 1 1-2.64 0 1.32 1.32 0 0 1 2.64 0Z' />"
                + "</svg ></button > "
                + "<button type='button' class='btn btnUpdate' id='upda' data-bs-toggle='modal' data-bs-target='#exampleModal' value='" + result.result.dni + "'>"
                + "<svg xmlns='http://www.w3.org/2000/svg' width='30' height='30' fill='currentColor' class='bi bi-person-gear' viewBox='0 0 16 16'>"
                + "<path d='M11 5a3 3 0 1 1-6 0 3 3 0 0 1 6 0ZM8 7a2 2 0 1 0 0-4 2 2 0 0 0 0 4Zm.256 7a4.474 4.474 0 0 1-.229-1.004H3c.001-.246.154-.986.832-1.664C4.484 10.68 5.711 10 8 10c.26 0 .507.009.74.025.226-.341.496-.65.804-.918C9.077 9.038 8.564 9 8 9c-5 0-6 3-6 4s1 1 1 1h5.256Zm3.63-4.54c.18-.613 1.048-.613 1.229 0l.043.148a.64.64 0 0 0 .921.382l.136-.074c.561-.306 1.175.308.87.869l-.075.136a.64.64 0 0 0 .382.92l.149.045c.612.18.612 1.048 0 1.229l-.15.043a.64.64 0 0 0-.38.921l.074.136c.305.561-.309 1.175-.87.87l-.136-.075a.64.64 0 0 0-.92.382l-.045.149c-.18.612-1.048.612-1.229 0l-.043-.15a.64.64 0 0 0-.921-.38l-.136.074c-.561.305-1.175-.309-.87-.87l.075-.136a.64.64 0 0 0-.382-.92l-.148-.045c-.613-.18-.613-1.048 0-1.229l.148-.043a.64.64 0 0 0 .382-.921l-.074-.136c-.306-.561.308-1.175.869-.87l.136.075a.64.64 0 0 0 .92-.382l.045-.148ZM14 12.5a1.5 1.5 0 1 0-3 0 1.5 1.5 0 0 0 3 0Z' />"
                + "</svg>"
                + "</button>"
                + "</td>"
                + "</tr>"
                + "</tbody>"
                + "</table>"
            newRow += "</div>";
            newRow += "</div>";
            document.getElementById("infousu").innerHTML = newRow;
            document.getElementById('cuenta').addEventListener('click', showCuentaBan);
            document.getElementById('upda').addEventListener('click', showUpdate);
        })
        .catch(error => console.error('Error status:', error));
}

function showUpdate() {
    var dni = event.currentTarget.value;
    document.getElementById('update').style.display = "block";
    console.log(dni)
    var url = "/controller/cUpdate.php";
    var data = { 'dni': dni };
    console.log(data);
    fetch(url, {
        method: 'POST',
        body: JSON.stringify(data),
        headers: { 'Content-Type': 'application/json' }
    })
        .then(res => res.json()).then(result => {
            console.log(result);
            console.log(result.list);
            document.getElementById("dni2").value = result.list.dni;
            document.getElementById("nombre2").value = result.list.nombre;
            document.getElementById("apellido2").value = result.list.apellido;
            document.getElementById("pasahitza2").value = result.list.pasahitza;
            document.getElementById("tipo2").value = result.list.admin;
            document.getElementById("btnExecUpdate").addEventListener('click', execUpdate);
        })
        .catch(error => console.error('Error status:', error));
}

function execUpdate() {
    var dni = document.getElementById("dni2").value;
    var nombre = document.getElementById("nombre2").value;
    var apellido = document.getElementById("apellido2").value;
    var pasahitza = document.getElementById("pasahitza2").value;
    var admin = document.getElementById("tipo2").value;
    var url = "/controller/cExUpdate.php";
    var data = { 'dni': dni, 'nombre': nombre, 'apellido': apellido, 'pasahitza': pasahitza, 'admin': admin };
    fetch(url, {
        method: 'POST',
        body: JSON.stringify(data), // data can be `string` or {object}!
        headers: { 'Content-Type': 'application/json' }  //input data
    })
        .then(res => res.json())
        .then(result => {
            console.log(result.error);
            alert("Se ha cambiado");
            window.location.href = "/view/paginas/usuario.html"
        })
        .catch(error => console.error('Error status:', error));
};

function showCuentaBan() {
    var dni = event.currentTarget.value;
    console.log(dni)
    var url = "/controller/cCuentasBan.php";
    var data = { 'dni': dni };
    fetch(url, {
        method: 'POST',
        body: JSON.stringify(data), // data can be `string` or {object}!
        headers: { 'Content-Type': 'application/json' }  //input data
    })
        .then(res => res.json()).then(result => {
            console.log(result.list);
            var cuenta = result.list;
            document.getElementById("cuentasBan").innerHTML = ""
            for (var i = 0; i < result.list.length; i++) {
                //    document.getElementById("cuentasBan").innerHTML += "<p  data-bs-target='#inf' value='" + cuenta[i].iban + "' class='numcuenta' id='"+cuenta[i].iban+"'> <b>" + 'Cuenta ' + (i + 1) + " </b>" + cuenta[i].iban + "</p> <p><b> Saldo </b> " + cuenta[i].saldo + " €</p>";
                document.getElementById("cuentasBan").innerHTML += "<p><b>Cuenta " + (i + 1) + "</b> <button data-bs-toggle='modal' data-bs-target='#inf' type='button' class='numcuenta' value='" + cuenta[i].iban + "'> " + cuenta[i].iban + " </button></p> <p><b> Saldo </b> " + cuenta[i].saldo + " €</p>"
            }
            // data-bs-toggle='modal'

            var numCuentas = document.querySelectorAll(".numcuenta");

            for (let i = 0; i < numCuentas.length; i++) {
                numCuentas[i].addEventListener("click", movimientos);
            }



        })
        .catch(error => console.error('Error status:', error));
}

// MOVIMIENTOS

var tabla = document.getElementById("cuerpoTabla");
var movi = document.getElementById("movimientos");


function movimientos() {
    var iban = event.currentTarget.value;
    console.log(iban);

    // console.log(iban);
    var url = "/controller/cVerMovimientos.php";
    var data = { 'iban': iban };

    fetch(url, {
        method: 'POST',
        body: JSON.stringify(data), // data can be `string` or {object}!
        headers: { 'Content-Type': 'application/json' }  //input data
    })
        .then(res => res.json()).then(result => {



            for (const iterator of result.list) {
                console.log(iterator);

                movi.innerHTML +=
                    `       
                    <p><b>FECHA:</b> '${iterator.fecha}'</p>
                    <p><b>CANTIDAD:</b> '${iterator.cantidad}'</p>
                    <p><b>TIPO:</b> '${iterator.ojbMovimiento.tipo}'</p>
                    <p><b>CONCEPTO:</b> '${iterator.ojbMovimiento.concepto}'</p>
                    <hr>
                    `;

            }


        })
        .catch(error => console.error('Error status:', error));
}

document.getElementById("botonusuario").addEventListener("click", funcionusuario);
document.getElementById("botoningreso").addEventListener("click", funcioningreso);
document.getElementById("botonretiro").addEventListener("click", funcionretiro);
document.getElementById("botontransferencia").addEventListener("click", funciontransferencia);


///////////////////////
////// variables //////
///////////////////////


var usuario = document.getElementById("infousu");
var ingreso = document.getElementById("ingresar");
var retiro = document.getElementById("sacar");
var transferencia = document.getElementById("tranferencia");

///////////////////////////////////////////////////////////////

document.addEventListener("DOMContentLoaded", function (event) {

    document.getElementById("opcionesingresar").addEventListener("change", ingresarDinero)
    document.getElementById("opcionessacar").addEventListener("change", retirarDinero)
    document.getElementById("opcionestransferir").addEventListener("change", tranDinero)

    document.getElementById("ingBtn").addEventListener("click", darBtnIngres)
    document.getElementById("retBtn").addEventListener("click", darBtnRetirar)
    document.getElementById("tranBtn").addEventListener("click", darBtnTranferencia)
})

function funcionusuario() {

    usuario.style.display = "block";
    ingreso.style.display = "none";
    retiro.style.display = "none";
    transferencia.style.display = "none";

}

// ///////////////////////////////////////////////////////
// //////////////INGRESAR
// //////////////////////////////////////////////////////

function funcioningreso() {
    var dni = localStorage.getItem("Dni");
    console.log("dni ingresar " + dni);

    usuario.style.display = "none";
    ingreso.style.display = "block";
    retiro.style.display = "none";
    transferencia.style.display = "none";

    document.getElementById("inputIngresar").style.display = "block"

    var url = "/controller/cCuentasBan.php";
    var data = { 'dni': dni };

    fetch(url, {
        method: 'POST',
        body: JSON.stringify(data), // data can be `string` or {object}!
        headers: { 'Content-Type': 'application/json' }  //input data
    })
        .then(res => res.json()).then(result => {

            console.log(result.list);
            var cb = result.list
            var newRow = "";
            newRow += "<option value='0'>Choose a iban....</option>";

            for (var i = 0; i < cb.length; i++) {
                console.log("entro")
                newRow += "<option value='" + cb[i].iban + "'>" + cb[i].iban + "</option>";
            }
            document.getElementById("opcionesingresar").innerHTML = newRow;



        })
        .catch(error => console.error('Error status:', error));

}

function ingresarDinero() {
    var iban = this.value;
    console.log(iban)

}

function darBtnIngres() {
    var iban = document.getElementById("opcionesingresar").value
    console.log(iban)

    var cantidad = document.getElementById("inputIngresar").value
    console.log(cantidad)

    if (cantidad == 0 || cantidad < 0) {
        alert("La cantidad no puede ser menor o igual a 0")
    }   else {
        var url = "/controller/cIngresar.php";
        var data = { 'iban': iban, 'cantidad': cantidad };

        fetch(url, {
            method: 'POST',
            body: JSON.stringify(data), // data can be `string` or {object}!
            headers: { 'Content-Type': 'application/json' }  //input data
        })
            .then(res => res.json()).then(result => {

                console.log(result.list);
                alert(result.list);
                window.location.href = "/view/paginas/usuario.html"

            })
            .catch(error => console.error('Error status:', error));
    }

}

// ///////////////////////////////////////////////////////
// //////////////RETIRAR
// //////////////////////////////////////////////////////

function retirarDinero() {
    var iban = this.value;
    console.log(iban)

}


function funcionretiro() {
    var dni = localStorage.getItem("Dni");
    console.log("dni retirar " + dni);

    usuario.style.display = "none";
    ingreso.style.display = "none";
    retiro.style.display = "block";
    transferencia.style.display = "none";

    var url = "/controller/cCuentasBan.php";
    var data = { 'dni': dni };

    fetch(url, {
        method: 'POST',
        body: JSON.stringify(data), // data can be `string` or {object}!
        headers: { 'Content-Type': 'application/json' }  //input data
    })
        .then(res => res.json()).then(result => {

            console.log(result.list);
            var cb = result.list
            var newRow = "";
            newRow += "<option value='0'>Choose a iban....</option>";

            for (var i = 0; i < cb.length; i++) {
                console.log("entro 2")
                newRow += "<option value='" + cb[i].iban + "'>" + cb[i].iban + "</option>";
            }
            document.getElementById("opcionessacar").innerHTML = newRow;



        })
        .catch(error => console.error('Error status:', error));


}

function darBtnRetirar() {
    var iban = document.getElementById("opcionessacar").value
    console.log(iban)

    var cantidad = document.getElementById("inputRetirar").value
    console.log(cantidad)

    if (cantidad == 0 || cantidad < 0) {
        alert("La cantidad no puede ser menor o igual a 0")
    } else {

        var url = "/controller/cRetirar.php";
        var data = { 'iban': iban, 'cantidad': cantidad };

        fetch(url, {
            method: 'POST',
            body: JSON.stringify(data), // data can be `string` or {object}!
            headers: { 'Content-Type': 'application/json' }  //input data
        })
            .then(res => res.json()).then(result => {

                console.log(result.list);
                alert(result.list);
                window.location.href = "/view/paginas/usuario.html"

            })
            .catch(error => console.error('Error status:', error));
    }
}

// ///////////////////////////////////////////////////////
// //////////////TRANFERENCIA
// //////////////////////////////////////////////////////

function funciontransferencia() {
    var dni = localStorage.getItem("Dni");
    console.log("transferencia " + dni);

    usuario.style.display = "none";
    ingreso.style.display = "none";
    retiro.style.display = "none";
    transferencia.style.display = "block";

    var url = "/controller/cCuentasBan.php";
    var data = { 'dni': dni };

    fetch(url, {
        method: 'POST',
        body: JSON.stringify(data), // data can be `string` or {object}!
        headers: { 'Content-Type': 'application/json' }  //input data
    })
        .then(res => res.json()).then(result => {

            console.log(result.list);
            var cb = result.list
            var newRow = "";
            newRow += "<option value='0'>Choose a iban....</option>";

            for (var i = 0; i < cb.length; i++) {
                console.log("entro")
                newRow += "<option value='" + cb[i].iban + "'>" + cb[i].iban + "</option>";
            }
            document.getElementById("opcionestransferir").innerHTML = newRow;



        })
        .catch(error => console.error('Error status:', error));

}



function tranDinero() {
    var iban = this.value;
    console.log(iban)

    verCuentasTran(iban)

}

function verCuentasTran(iban) {
    var dni = localStorage.getItem("Dni");
    console.log("transferencia " + dni);

    console.log(iban + " Se paso")

    var url = "/controller/cTransferencia.php";
    var data = { 'iban': iban };

    fetch(url, {
        method: 'POST',
        body: JSON.stringify(data), // data can be `string` or {object}!
        headers: { 'Content-Type': 'application/json' }  //input data
    })
        .then(res => res.json()).then(result => {

            console.log(result.list);
            var cb = result.list
            var newRow = "";
            newRow += "<option value='0'>Choose a iban....</option>";

            for (var i = 0; i < cb.length; i++) {
                console.log("entro")
                newRow += "<option value='" + cb[i].iban + "'>" + cb[i].iban + "</option>";
            }
            document.getElementById("cuentastransferir").innerHTML = newRow;



        })
        .catch(error => console.error('Error status:', error));
}

function darBtnTranferencia() {
    var iban1 = document.getElementById("opcionestransferir").value
    console.log(iban1)

    var iban2 = document.getElementById("cuentastransferir").value
    console.log(iban2)

    var concepto = document.getElementById("concepto").value
    console.log(concepto)

    var cantidad = document.getElementById("inputTran").value
    console.log(cantidad)

    if (cantidad == 0 || cantidad < 0) {
        alert("La cantidad no puede ser menor o igual a 0")
    } else {

        var url = "/controller/cTransferir.php";
        var data = { 'iban': iban1, 'iban2': iban2, 'concepto': concepto, 'cantidad': cantidad };

        fetch(url, {
            method: 'POST',
            body: JSON.stringify(data), // data can be `string` or {object}!
            headers: { 'Content-Type': 'application/json' }  //input data
        })
            .then(res => res.json()).then(result => {

                console.log(result.list);
                alert(result.list);
                window.location.href = "/view/paginas/usuario.html"

            })
            .catch(error => console.error('Error status:', error));
    }

}



