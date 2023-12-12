document.addEventListener("DOMContentLoaded", function (event) {

	loggedVerify();
	document.getElementById('submit').addEventListener('click', login);
	document.getElementById('dni').addEventListener('keypress', comprobar_dni)
})


// Comprueba por medio de expresiones regulares si el valor puesto en el input es un dni
var dni = document.getElementById('dni')
function comprobar_dni(tecla){
	console.log(tecla.key)
	console.log(dni.value)
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


function loggedVerify() {
	var url = "/controller/cLoggedVerify.php";

	fetch(url, {
		method: 'GET',
	})
		.then(res => res.json()).then(result => {

			console.log(result);

			if (result.error !== "logged") {
				// alert(result.error);

				// document.getElementById('submit').addEventListener('click', login);
			//	document.getElementById('btnLog').addEventListener('click', login);
				

			} else {
				// alert("Your login is " + result.dni);
				console.log(result)
				var admin = parseInt(result.admin);
				console.log(admin)

				if (admin == 1) {
					// window.location.href = "/view/paginas/bancaAdmin.html"
					// location.href = "/view/index.html";
					var usuario = document.getElementById('useer');
                    usuario.style.display = "block";
					var Aamind = document.getElementById('Admin');
					Aamind.style.display="block";
					var cerrar = document.getElementById('logout');
					cerrar.style.display="block";
				} else {
					// window.location.href = "/view/paginas/banca.html"
					// location.href = "/view/index.html";
					var usuario = document.getElementById('useer');
                    usuario.style.display = "block";
					var Aamind = document.getElementById('Admin');
					Aamind.style.display="none";
					var cerrar = document.getElementById('logout');
					cerrar.style.display="block";
					
				}
			}
		})
		.catch(error => console.error('Error status:', error));
}
var contador = 1;
function login() {	// new login

	var dni = document.getElementById("dni").value;
	var pasahitza = document.getElementById("pasahitza").value;
		
	var url = "/controller/cLogin.php";
	var data = { 'dni': dni, 'pasahitza': pasahitza };

	fetch(url, {
		method: 'POST', // or 'POST'
		body: JSON.stringify(data), // data can be `string` or {object}!
		headers: { 'Content-Type': 'application/json' }  //input data

	})
		.then(res => res.json()).then(result => {

			console.log(result.error);
			console.log(result);
			alert(result.error);

			if (result.error == "no error") {
				if (result.admin == 1) {
					// location.href = "/view/paginas/bancaAdmin.html"
					location.href = "/view/index.html";
					var Aamind = document.getElementById('Admin');
					Aamind.style.display="block";
					var usuario = document.getElementById('useer');
					usuario.style.display="block";
					var cerrar = document.getElementById('logout');
					cerrar.style.display="block";

					document.getElementsByClassName("dni").value = "";
					document.getElementById("pasahitza").value = "";

				} else {
					location.href = "/view/index.html";
					var Aamind = document.getElementById('Admin');
					Aamind.style.display="none";
					var usuario = document.getElementById('useer');
					usuario.style.display="block";
					var cerrar = document.getElementById('logout');
					cerrar.style.display="block";
					document.getElementsByClassName("dni").value = "";
					document.getElementById("pasahitza").value = "";
				}

				location.href = "/view/index.html";

			}else{
				if (contador == 3) {
					//TODO DESHABILITAR INPUTS
					document.getElementById('dni').disabled = true;
					document.getElementById('pasahitza').disabled = true;
					document.getElementById('submit').disabled = true;

					var countDownDate = new Date().getTime() + 15500;
					console.log(countDownDate);

					var x = setInterval(function () {

						// Get today's date and time
						var now = new Date().getTime();

						// Find the distance between now and the count down date
						var distance = countDownDate - now;

						// Time calculations for days, hours, minutes and seconds
						var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
						var seconds = Math.floor((distance % (1000 * 60)) / 1000);

						// Display the result in the element with id="demo"
						document.getElementById('temporizador').style.display ="block"
						document.getElementById('texto-fallido').innerHTML = "INTENTOS FALLIDOS,INTENTELO EN:"
						document.getElementById("cuenta-atras").innerHTML = minutes + "m " + seconds + "s ";


						// If the count down is finished, write some text
						if (distance < 0) {
							clearInterval(x);
							document.getElementById("cuenta-atras").innerHTML = "";
							document.getElementById('dni').disabled = false;
							document.getElementById('pasahitza').disabled = false;

							document.getElementById('temporizador').style.display ="none"
							document.getElementById('submit').disabled = false;
							


						}

					}, 1000);

				} else { 	
					console.log(contador);
					contador++
				}

			}
		})
		.catch(error => console.error('Error status:', error));
}

// function abrirModal() {
// 	var modal = document.getElementById("Modal");

// 	var btn = document.getElementById("user");

// 	var span = document.getElementsByClassName("close")[0];

// 	btn.onclick = function () {
// 		modal.style.display = "block";
// 	}

// 	span.onclick = function () {
// 		modal.style.display = "none";
// 	}

// 	window.onclick = function (event) {
// 		if (event.target == modal) {
// 			modal.style.display = "none";
// 		}
// 	}
// }

