const $cuadros = document.querySelectorAll(".cuadro");
const colores = ["violeta", "blanco", "rojo", "azul", "amarillo", "verde"];
const coloresDuplicados = colores.concat(colores);
let coloresMezclados = mezclarColores(coloresDuplicados);
let secuencia = [];
let pares = [];
let bloqueado = false;
let paresEncontrados = 0;
let numeroIntentos = 0;

iniciarJuego();

function mezclarColores(colores) {
	let coloresMezclados = [...colores].sort(() => Math.random() - 0.5);
	return coloresMezclados;
}

function ordenarTableroAleatoriamente(elementos, colores) {
	for (let i = 0; i < elementos.length; i++) {
		elementos[i].dataset.color = colores[i];
	}
}

function iniciarJuego() {
	ordenarTableroAleatoriamente($cuadros, coloresMezclados);
	manejarClickElemento();
}

function reiniciarJuego() {
	coloresMezclados = mezclarColores(coloresDuplicados);
	reiniciarElementos($cuadros);
	reiniciarPares();
	reiniciarNumeroPares();
	reiniciarNumeroIntentos();
	ocultarError();
	ordenarTableroAleatoriamente($cuadros, coloresMezclados);
	ocultarMensajeFinal();
}

function manejarClickElemento() {
	for (let i = 0; i < $cuadros.length; i++) {
		const cuadro = $cuadros[i];

		cuadro.addEventListener("click", function () {
			if (bloqueado) return;

			if (secuencia.includes(this)) {
				mostrarError();
				return;
			} else if (pares.includes(this)) {
				return;
			} else {
				bloqueado = true;
				ocultarError();
				agregarElementoASecuencia(cuadro);
				mostrarElemento(this);
				const cuadroUno = secuencia[0];
				const cuadroDos = secuencia[1];

				setTimeout(() => {
					if (secuencia.length === 2) {
						verificarPar(cuadroUno, cuadroDos);
					}
					terminarJuego();
					bloqueado = false;
				}, 600);
			}
		});
	}
}

function agregarElementoASecuencia(elemento) {
	if (secuencia.length < 2) {
		secuencia.push(elemento);
	}
}

function verificarPar(elementoUno, elementoDos) {
	if (secuencia.length !== 2) {
		return;
	}
	actualizarNumeroTurno(++numeroIntentos);

	const colorUno = elementoUno.dataset.color;
	const colorDos = elementoDos.dataset.color;

	if (colorUno !== colorDos) {
		ocultarElemento(secuencia[0]);
		ocultarElemento(secuencia[1]);
		reiniciarSecuencia();
		return;
	}
	deshabilitarPar(elementoUno, elementoDos);
	guardarPar(elementoUno, elementoDos);
	reiniciarSecuencia();
	actualizarNumeroPares(++paresEncontrados);
}

function reiniciarSecuencia() {
	return (secuencia = []);
}

function guardarPar(elementoUno, elementoDos) {
	pares.push(elementoUno);
	pares.push(elementoDos);
}

function deshabilitarPar(elementoUno, elementoDos) {
	elementoUno.style["background-color"] = "gray";
	elementoDos.style["background-color"] = "gray";
	elementoUno.style.opacity = 0.3;
	elementoDos.style.opacity = 0.3;
}

function reiniciarPares() {
	pares = [];
}

const $reiniciar = document.querySelector("#reiniciar");

$reiniciar.addEventListener("click", function () {
	reiniciarJuego();
});

function terminarJuego() {
	const finDeJuego = document.querySelector("#final");

	if (pares.length === 12) {
		finDeJuego.style.display = "block";
	}
}

function ocultarMensajeFinal() {
	const finDeJuego = document.querySelector("#final");
	finDeJuego.style.display = "none";
}

function mostrarElemento(elemento) {
	elemento.style.opacity = 1;
}

function ocultarElemento(elemento) {
	elemento.style.opacity = 0;
}

function reiniciarElementos(elementos) {
	for (let i = 0; i < elementos.length; i++) {
		const elemento = elementos[i];
		elemento.style.opacity = 0;
		setTimeout(() => {
			elemento.style["background-color"] = "";
		}, 1000);
	}
}

function mostrarError() {
	const $error = document.querySelector("#error");
	$error.style.display = "block";
	$error.textContent = "Ya tocaste este cuadro en esta jugada.";
}

function ocultarError() {
	const $error = document.querySelector("#error");
	$error.style.display = "none";
}

function reiniciarNumeroIntentos() {
	numeroIntentos = 0;
	const $numeroIntentos = document.querySelector("#numero-intentos");
	$numeroIntentos.textContent = `Intentos`;
	$numeroIntentos.style.display = "none";
}

function actualizarNumeroTurno(numeroTurno) {
	const $numeroTurno = document.querySelector("#numero-intentos");
	$numeroTurno.textContent = `Intentos ${numeroTurno}`;
	$numeroTurno.style.display = "block";
}

function actualizarNumeroPares(numeroPares) {
	const $numeroPares = document.querySelector("#numero-pares");
	$numeroPares.textContent = `Pares ${numeroPares}`;
	$numeroPares.style.display = "block";
}

function reiniciarNumeroPares() {
	paresEncontrados = 0;
	const $numeroPares = document.querySelector("#numero-pares");
	$numeroPares.textContent = `pares`;
	$numeroPares.style.display = "none";
}
