document.addEventListener("DOMContentLoaded", function (event) {


	document.getElementById("mostrarInsert").addEventListener("click", mostrarInsert)
	document.getElementById("btnInsert").addEventListener("click", execInsert);
	document.getElementById("btnExecUpdate").addEventListener('click', execUpdate);

	document.getElementById('dni').addEventListener('keypress', comprobar_dni);
	
	document.getElementById('nombre').addEventListener('keypress', admitir_solo_letra);
	document.getElementById('apellido').addEventListener('keypress', admitir_solo_letra);
	document.getElementById('nombre2').addEventListener('keypress', admitir_solo_letra);
	document.getElementById('apellido2').addEventListener('keypress', admitir_solo_letra);

	loadPersona();
	loggedVerify();
	//	loadUsuario();

});

var dni = document.getElementById('dni')
function comprobar_dni(tecla){
	console.log(tecla.key)
	var length = dni.value.trim().length
	
	if(length < 8){
		if (tecla.key < "0" || tecla.key > "9"){
			tecla.preventDefault();
		}
	}else if (length == 8){
		if (tecla.key < "A" || tecla.key > "a"){
			tecla.preventDefault();
		}
	}else{
		tecla.preventDefault();
	}
	
}

function admitir_solo_letra(tecla){
    if (tecla.key < "A" || tecla.key > "z"){
        tecla.preventDefault();
    }
}





function loadPersona() {

	var url = "/controller/cUsuarios.php";

	fetch(url)

		.then(res => res.json()).then(result => {

			var usuario = result.list;

			console.log(result.list);

			var newRow = "<br/><h2>Usuarios</h2>"
			newRow += "<div class='usearios'>"
			newRow += "<div id='contenedorBuscador'>"
			newRow += "<button id='mostrarInsert' data-bs-toggle='modal' data-bs-target='#Modalupdate'>Insertar Usuario nuevo</button>"
			newRow += "<form>"
				+ "<input type='text' id='buscador' placeholder='Busca un DNI' onkeyup='search()'>"
				+ "</form>"
			newRow += "</div>"
			newRow += "<div class='cartasUsuarios'>"
			var tipo = "";
			// for (let i = 0; i < usuario.length; i++) {
			// 	if (usuario[i].admin == 1) {
			// 		tipo = "Admin";
			// 	} else {
			// 		tipo = "Usuario";
			// 	}
			// 	newRow += "<div class='card'>"
			// 		+ "<div class='head'>"
			// 		+ "<div class='circle'></div>"
			// 		+ "</div >"

			// 		+ "<div class='description'>"
			// 		+ "<h3>" + usuario[i].nombre + "</h3>"
			// 		+ "<h4>" + usuario[i].apellido + "</h4>"
			// 		+ "<p>" + usuario[i].dni + "</p>"
			// 		+ "<p> Tipo de usuario: " + tipo + "</p>"
			// 		+ "</div>"

			// 		+ "<div class='contact'>"
			// 		+ "<button type='button' class='btn btnCuentaBan' data-bs-toggle='modal' data-bs-target='#info' value='" + usuario[i].dni + "'>"
			// 		+ "<svg xmlns='http://www.w3.org/2000/svg' width='30' height='30' fill='currentColor' class='bi bi-info-lg' viewBox='0 0 16 16'>"
			// 		+ "<path d='m9.708 6.075-3.024.379-.108.502.595.108c.387.093.464.232.38.619l-.975 4.577c-.255 1.183.14 1.74 1.067 1.74.72 0 1.554-.332 1.933-.789l.116-.549c-.263.232-.65.325-.905.325-.363 0-.494-.255-.402-.704l1.323-6.208Zm.091-2.755a1.32 1.32 0 1 1-2.64 0 1.32 1.32 0 0 1 2.64 0Z' />"
			// 		+ "</svg ></button > "
			// 		+ "<button type='button' class='btn btnUpdate'  data-bs-toggle='modal' data-bs-target='#exampleModal' value='" + usuario[i].dni + "'>"
			// 		+ "<svg xmlns='http://www.w3.org/2000/svg' width='30' height='30' fill='currentColor' class='bi bi-person-gear' viewBox='0 0 16 16'>"
			// 		+ "<path d='M11 5a3 3 0 1 1-6 0 3 3 0 0 1 6 0ZM8 7a2 2 0 1 0 0-4 2 2 0 0 0 0 4Zm.256 7a4.474 4.474 0 0 1-.229-1.004H3c.001-.246.154-.986.832-1.664C4.484 10.68 5.711 10 8 10c.26 0 .507.009.74.025.226-.341.496-.65.804-.918C9.077 9.038 8.564 9 8 9c-5 0-6 3-6 4s1 1 1 1h5.256Zm3.63-4.54c.18-.613 1.048-.613 1.229 0l.043.148a.64.64 0 0 0 .921.382l.136-.074c.561-.306 1.175.308.87.869l-.075.136a.64.64 0 0 0 .382.92l.149.045c.612.18.612 1.048 0 1.229l-.15.043a.64.64 0 0 0-.38.921l.074.136c.305.561-.309 1.175-.87.87l-.136-.075a.64.64 0 0 0-.92.382l-.045.149c-.18.612-1.048.612-1.229 0l-.043-.15a.64.64 0 0 0-.921-.38l-.136.074c-.561.305-1.175-.309-.87-.87l.075-.136a.64.64 0 0 0-.382-.92l-.148-.045c-.613-.18-.613-1.048 0-1.229l.148-.043a.64.64 0 0 0 .382-.921l-.074-.136c-.306-.561.308-1.175.869-.87l.136.075a.64.64 0 0 0 .92-.382l.045-.148ZM14 12.5a1.5 1.5 0 1 0-3 0 1.5 1.5 0 0 0 3 0Z' />"
			// 		+ "</svg>"
			// 		+ "</button>"
			// 		+ "<button type='button' class='btn btnDelete' value='" + usuario[i].dni + "'>"
			// 		+ "<svg xmlns='http://www.w3.org/2000/svg' width='30' height='30' fill='currentColor' class='bi bi-person-x' viewBox='0 0 16 16'>"
			// 		+ "<path d='M11 5a3 3 0 1 1-6 0 3 3 0 0 1 6 0ZM8 7a2 2 0 1 0 0-4 2 2 0 0 0 0 4Zm.256 7a4.474 4.474 0 0 1-.229-1.004H3c.001-.246.154-.986.832-1.664C4.484 10.68 5.711 10 8 10c.26 0 .507.009.74.025.226-.341.496-.65.804-.918C9.077 9.038 8.564 9 8 9c-5 0-6 3-6 4s1 1 1 1h5.256Z'/>"
			// 		+ "<path d='M12.5 16a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7Zm-.646-4.854.646.647.646-.647a.5.5 0 0 1 .708.708l-.647.646.647.646a.5.5 0 0 1-.708.708l-.646-.647-.646.647a.5.5 0 0 1-.708-.708l.647-.646-.647-.646a.5.5 0 0 1 .708-.708Z'/>"
			// 		+ "</svg>"
			// 		+ "</button>"
			// 		+ "</div>"
			// 		+ "</div>"

			// }

			// newRow += "</div>";

			for (let i = 0; i < usuario.length; i++) {
				if (usuario[i].admin == 1) {
					tipo = "Admin";
				} else {
					tipo = "Usuario";
				}
				newRow += "<table id='" + usuario[i].dni + "' class='tg'>"
					+ "<colgroup>"
					+ "<col style='width: 216px'>"
					+ "<col style='width: 189px'>"
					+ "</colgroup>"
					+ "<tbody id='the_table_body'>"
					+ "<tr>"
					+ "<td class='tg-baqh'>Nombre</td>"
					+ "<td class='tg-baqh'>" + usuario[i].nombre + "</td>"
					+ "</tr>"
					+ "<tr>"
					+ "<td class='tg-baqh'>Apellido</td>"
					+ "<td class='tg-baqh'>" + usuario[i].apellido + "</td>"
					+ "</tr>"
					+ "<tr>"
					+ "<td class='tg-baqh'>DNI</td>"
					+ "<td class='tg-baqh dni'>" + usuario[i].dni + "</td>"
					+ "</tr>"
					+ "<tr>"
					+ "<td class='tg-baqh'>Tipo de usuario</td>"
					+ "<td class='tg-baqh'>" + tipo + "</td>"
					+ "</tr>"
					+ "<tr>"
					+ "<td class='tg-baqh' colspan='2'>"
					+ "<button type='button' class='btn btnCuentaBan' data-bs-toggle='modal' data-bs-target='#info' value='" + usuario[i].dni + "'>"
					+ "<svg xmlns='http://www.w3.org/2000/svg' width='30' height='30' fill='currentColor' class='bi bi-info-lg' viewBox='0 0 16 16'>"
					+ "<path d='m9.708 6.075-3.024.379-.108.502.595.108c.387.093.464.232.38.619l-.975 4.577c-.255 1.183.14 1.74 1.067 1.74.72 0 1.554-.332 1.933-.789l.116-.549c-.263.232-.65.325-.905.325-.363 0-.494-.255-.402-.704l1.323-6.208Zm.091-2.755a1.32 1.32 0 1 1-2.64 0 1.32 1.32 0 0 1 2.64 0Z' />"
					+ "</svg ></button > "
					+ "<button type='button' class='btn btnUpdate'  data-bs-toggle='modal' data-bs-target='#exampleModal' value='" + usuario[i].dni + "'>"
					+ "<svg xmlns='http://www.w3.org/2000/svg' width='30' height='30' fill='currentColor' class='bi bi-person-gear' viewBox='0 0 16 16'>"
					+ "<path d='M11 5a3 3 0 1 1-6 0 3 3 0 0 1 6 0ZM8 7a2 2 0 1 0 0-4 2 2 0 0 0 0 4Zm.256 7a4.474 4.474 0 0 1-.229-1.004H3c.001-.246.154-.986.832-1.664C4.484 10.68 5.711 10 8 10c.26 0 .507.009.74.025.226-.341.496-.65.804-.918C9.077 9.038 8.564 9 8 9c-5 0-6 3-6 4s1 1 1 1h5.256Zm3.63-4.54c.18-.613 1.048-.613 1.229 0l.043.148a.64.64 0 0 0 .921.382l.136-.074c.561-.306 1.175.308.87.869l-.075.136a.64.64 0 0 0 .382.92l.149.045c.612.18.612 1.048 0 1.229l-.15.043a.64.64 0 0 0-.38.921l.074.136c.305.561-.309 1.175-.87.87l-.136-.075a.64.64 0 0 0-.92.382l-.045.149c-.18.612-1.048.612-1.229 0l-.043-.15a.64.64 0 0 0-.921-.38l-.136.074c-.561.305-1.175-.309-.87-.87l.075-.136a.64.64 0 0 0-.382-.92l-.148-.045c-.613-.18-.613-1.048 0-1.229l.148-.043a.64.64 0 0 0 .382-.921l-.074-.136c-.306-.561.308-1.175.869-.87l.136.075a.64.64 0 0 0 .92-.382l.045-.148ZM14 12.5a1.5 1.5 0 1 0-3 0 1.5 1.5 0 0 0 3 0Z' />"
					+ "</svg>"
					+ "</button>"
					+ "<button type='button' class='btn btnDelete' value='" + usuario[i].dni + "'>"
					+ "<svg xmlns='http://www.w3.org/2000/svg' width='30' height='30' fill='currentColor' class='bi bi-person-x' viewBox='0 0 16 16'>"
					+ "<path d='M11 5a3 3 0 1 1-6 0 3 3 0 0 1 6 0ZM8 7a2 2 0 1 0 0-4 2 2 0 0 0 0 4Zm.256 7a4.474 4.474 0 0 1-.229-1.004H3c.001-.246.154-.986.832-1.664C4.484 10.68 5.711 10 8 10c.26 0 .507.009.74.025.226-.341.496-.65.804-.918C9.077 9.038 8.564 9 8 9c-5 0-6 3-6 4s1 1 1 1h5.256Z'/>"
					+ "<path d='M12.5 16a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7Zm-.646-4.854.646.647.646-.647a.5.5 0 0 1 .708.708l-.647.646.647.646a.5.5 0 0 1-.708.708l-.646-.647-.646.647a.5.5 0 0 1-.708-.708l.647-.646-.647-.646a.5.5 0 0 1 .708-.708Z'/>"
					+ "</svg>"
					+ "</button>"
					+ "<button type='button' class='btn btnSumarCB' value='" + usuario[i].dni + "'>"
					+ "<img src='/view/img/libreta-de-depositos.png' width='30' height='30'>"
					+ "</button>"
					+ "</td>"
					+ "</tr>"
					+ "</tbody>"
					+ "</table>"
			}
			newRow += "</div>";
			newRow += "</div>";
			newRow += "<style>"
					+"#contenedorBuscador{"
						+"margin-top: 20px;"
						+"display: flex;"
						+"width: 100%;"
						+"align-items: center;"
						+"justify-content: space-around;"
						+"flex-direction: row;"
					+"}"

					+"#buscador{"
					+"margin-left: 10px;"
					+"border-radius: 25px;"
					+"border-color: black;"
					+"}"
					
					+".usearios{"
						+"display: flex;"
						+"flex-direction: column;"
						+"}"
					
					+".cartasUsuarios{"
						+"border-radius: 10px;"
						+"margin-top: 10px;"
					+"}"

					+".cartasUsuarios::-webkit-scrollbar{"
						+"display: none;"
					+"}"
					
					

			document.getElementById("container").innerHTML = newRow;
			var buttonsCuenta = document.querySelectorAll('.btnCuentaBan');
			var buttonsDelete = document.querySelectorAll('.btnDelete');
			var buttonsUpdate = document.querySelectorAll('.btnUpdate');
			var buttonsSumarCB = document.querySelectorAll('.btnSumarCB');

			for (let i = 0; i < buttonsDelete.length; i++) {

				buttonsCuenta[i].addEventListener('click', showCuentaBan);
				buttonsDelete[i].addEventListener('click', execDelete);
				buttonsUpdate[i].addEventListener('click', showUpdate);
				buttonsSumarCB[i].addEventListener('click', sumarCB);

			}
		})
		.catch(error => console.error('Error status:', error));

};

function sumarCB() {
	var dni = event.currentTarget.value;
	console.log(dni)


	var url = "/controller/cInsertarCB.php";

	var data = { 'dni': dni };

	fetch(url, {
		method: 'POST',
		body: JSON.stringify(data), // data can be `string` or {object}!
		headers: { 'Content-Type': 'application/json' }  //input data
	})

		.then(res => res.json()).then(result => {

			console.log(result.error);
			alert(result.error);

		})
		.catch(error => console.error('Error status:', error));

}

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
				document.getElementById("cuentasBan").innerHTML += "<p> <b>" + 'Cuenta Num ' + (i + 1) + " </b>" + cuenta[i].iban + "</p>"
					+ "<button type='button' class='btn btnDeleteCB' value='" + cuenta[i].iban + "'>Eliminar</button>"
			}

			var buttonsDeleteCB = document.querySelectorAll('.btnDeleteCB');

			for (let i = 0; i < buttonsDeleteCB.length; i++) {

				buttonsDeleteCB[i].addEventListener('click', deleteCB);
			}




		})
		.catch(error => console.error('Error status:', error));

}

function deleteCB() {
	var iban = event.currentTarget.value;
	console.log(iban)

	var url = "/controller/cDeleteCB.php";

	var data = { 'iban': iban };

	fetch(url, {
		method: 'POST',
		body: JSON.stringify(data), // data can be `string` or {object}!
		headers: { 'Content-Type': 'application/json' }  //input data
	})

		.then(res => res.json()).then(result => {

			console.log(result.error);
			alert(result.error);
			loadPersona();
			window.location.href = "/view/paginas/bancaAdmin.html"

		})
		.catch(error => console.error('Error status:', error));



}


function execDelete() {

	var dni = event.currentTarget.value;
	console.log(dni)

	var url = "/controller/cDelete.php";

	var data = { 'dni': dni };

	fetch(url, {
		method: 'POST',
		body: JSON.stringify(data), // data can be `string` or {object}!
		headers: { 'Content-Type': 'application/json' }  //input data
	})

		.then(res => res.json()).then(result => {

			console.log(result.error);
			alert(result.error);
			loadPersona();

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

			console.log(result.list);
			document.getElementById("dni2").value = result.list.dni;
			document.getElementById("nombre2").value = result.list.nombre;
			document.getElementById("apellido2").value = result.list.apellido;
			document.getElementById("pasahitza2").value = result.list.pasahitza;
			document.getElementById("tipo2").value = result.list.admin;
			loadPersona();

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
			loadPersona();
		})
		.catch(error => console.error('Error status:', error));



};

function execInsert() {

	var dni = document.getElementById("dni").value;
	var nombre = document.getElementById("nombre").value;
	var apellido = document.getElementById("apellido").value;
	var pasahitza = document.getElementById("pasahitza").value;


	var admin = document.getElementById("admin").value;
	console.log(admin)

	var url = "/controller/cInsert.php";
	var data = { 'dni': dni, 'nombre': nombre, 'apellido': apellido, 'pasahitza': pasahitza, 'admin': admin };
	console.log(data)
	console.log(dni.trim().length + " length")

	if (dni == "" || nombre == "" || pasahitza == "" || pasahitza == "") {
		alert("Ingrese todos los datos");
	}else if(dni.trim().length < 9){
		alert("El dni esta mal, escribalo de nuevo")
	} else {
		fetch(url, {
			method: 'POST', // or 'POST'
			body: JSON.stringify(data), // data can be `string` or {object}!
			headers: { 'Content-Type': 'application/json' }  //input data
		})
			.then(res => res.json()).then(result => {

				console.log(result.error);
				alert(result.error);
				loadPersona();

				document.getElementById("dni").value = "";
				document.getElementById("nombre").value = "";
				document.getElementById("apellido").value = "";
				document.getElementById("pasahitza").value = "";

				window.location.href = "/view/paginas/bancaAdmin.html"
				//	document.getElementById("insert").style.display = "none";

			})
			.catch(error => console.error('Error status:', error));
	}
};

function loggedVerify() {
	var url = "/controller/cLoggedVerify.php";

	fetch(url, {
		method: 'GET',
	})
		.then(res => res.json()).then(result => {

			console.log(result);

			if (result.error !== "logged") {
				//	alert("No eres admin vuelta pa atras")
				window.location.href = "/view/index.html";
				document.body.style.display = "none";


			} else {
				alert("Your login is " + result.dni);
				console.log(result)
				var admin = parseInt(result.admin);
				console.log(admin)

				if (admin == 1) {
					// window.location.href = "/view/paginas/bancaAdmin.html"
					// location.href = "/view/index.html";
					var Aamind = document.getElementById('Admin');
					Aamind.style.display = "block";
					var usuario = document.getElementById('useer');
					usuario.style.display = "block";
					var cerrar = document.getElementById('logout');
					cerrar.style.display = "block";
				} else {
					if (window.location.pathname = "/view/paginas/bancaAdmin.html") {
						document.body.style.display = "none";
						window.location.href = "/view/index.html"
					}


				}
			}
		})
		.catch(error => console.error('Error status:', error));
}


document.addEventListener("keyup", e => {

	if (e.target.matches("#buscador")) {

		console.log(e.target.value)

		document.querySelectorAll(".dni").forEach(usuario => {

			console.log(usuario);

			console.log("usuario.textContent: " + usuario.textContent)

			if (usuario.textContent.toLowerCase().includes(e.target.value.toLowerCase())) {
				console.log("coincide");

				console.log(usuario.textContent);
				document.getElementById(usuario.textContent).style.display = "block";

			} else {
				console.log("no coincide");

				document.getElementById(usuario.textContent).style.display = "none";

			}

		})

	}


})

