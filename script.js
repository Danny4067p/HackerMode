const bienvenida = document.getElementById("bienvenida");
const password = document.getElementById("password");
const consejos = document.getElementById("consejos");
const quiz = document.getElementById("quiz");

const btnComenzar = document.getElementById("btnComenzar");
const btnValidar = document.getElementById("btnValidar");
const btnResultado = document.getElementById("btnResultado");
const btnVolverConsejos = document.getElementById("btnVolverConsejos");
const btnReiniciarQuiz = document.getElementById("btnReiniciarQuiz");

// Nuevos botones de dificultad y bloques
const btnFacil = document.getElementById("btnFacil");
const btnDificil = document.getElementById("btnDificil");
const bloqueFacil = document.getElementById("bloqueFacil");
const bloqueDificil = document.getElementById("bloqueDificil");
const tituloQuiz = document.getElementById("tituloQuiz");
const mensajePenalizacion = document.getElementById("mensajePenalizacion");

let dificultadSeleccionada = "facil";

function ocultarTodo(){
    bienvenida.classList.remove("show");
    password.classList.remove("show");
    consejos.classList.remove("show");
    quiz.classList.remove("show");
}

function mostrar(pantalla){
    ocultarTodo();
    pantalla.classList.add("show");
}

// inicio
window.onload = function(){
    mostrar(bienvenida);
};

// navegación
btnComenzar.addEventListener("click", () => mostrar(password));

// Validación de robustez de contraseña
btnValidar.addEventListener("click", () => {
    const inputPass = document.getElementById("inputPassword").value;
    const mensajeError = document.getElementById("mensajeError");
    const regexSegura = /(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*(),.?":{}|<>_+\-*/\[\]~\`\\=])/;

    if (regexSegura.test(inputPass)) {
        mensajeError.style.display = "none";
        mostrar(consejos);
    } else {
        mensajeError.innerText = "⚠️ Contraseña vulnerable. Debe incluir: una mayúscula, un número y un carácter especial.";
        mensajeError.style.display = "block";
    }
});

// Manejo de Selección de Dificultad
btnFacil.addEventListener("click", () => {
    dificultadSeleccionada = "facil";
    // QUITAMOS el modo rojo si existía
    document.body.classList.remove("modo-hardcore");
    
    tituloQuiz.innerText = "🧠 Quiz: Nivel Básico";
    bloqueFacil.style.display = "block";
    bloqueDificil.style.display = "none";
    limpiarQuiz();
    mostrar(quiz);
});

btnDificil.addEventListener("click", () => {
    dificultadSeleccionada = "dificil";
    // ¡ACTIVAMOS EL MODO DIABÓLICO ROJO!
    document.body.classList.add("modo-hardcore");
    
    tituloQuiz.innerText = "💀 Quiz: Nivel Hardcore";
    bloqueFacil.style.display = "none";
    bloqueDificil.style.display = "block";
    limpiarQuiz();
    mostrar(quiz);
});

// Cuando regrese a los consejos, le quitamos el modo rojo para que vuelva a la normalidad verde
btnVolverConsejos.addEventListener("click", () => {
    document.body.classList.remove("modo-hardcore");
    mostrar(consejos);
});

// Lógica de las opciones con PENALIZACIÓN POR ERROR
document.querySelectorAll(".opcion").forEach(btn => {
    btn.addEventListener("click", function(){
        const correct = this.dataset.correct === "true";

        if (correct) {
            this.style.background = "green";
            this.style.color = "white";
        } else {
            // El usuario falló: Activamos protocolo de reinicio
            this.style.background = "red";
            this.style.color = "white";
            mensajePenalizacion.style.display = "block";
            
            // Deshabilitamos temporalmente los botones para que vea el error
            document.querySelectorAll(".opcion").forEach(b => b.style.pointerEvents = "none");

            // Espera 2 segundos, limpia todo y lo obliga a reiniciar
            setTimeout(() => {
                limpiarQuiz();
                mensajePenalizacion.style.display = "none";
                // Desbloquea los botones de nuevo
                document.querySelectorAll(".opcion").forEach(b => b.style.pointerEvents = "auto");
            }, 2000);
        }
    });
});

// Calcular resultado basado en la dificultad activa
btnResultado.addEventListener("click", function(){
    let correctas = 0;
    // Seleccionamos solo las opciones del bloque que está visible
    const bloqueActivo = dificultadSeleccionada === "facil" ? "#bloqueFacil" : "#bloqueDificil";
    
    document.querySelectorAll(`${bloqueActivo} .opcion`).forEach(btn => {
        if(btn.dataset.correct === "true" && btn.style.background === "green"){
            correctas++;
        }
    });

    const resultado = document.getElementById("resultado");

    if(correctas === 3){
        resultado.innerText = dificialt_text = dificultadSeleccionada === "facil" ? "🏆 Excelente - Conceptos básicos dominados" : "☣️ IMPRESIONANTE - Nivel SysAdmin/Hacker verificado";
    } else {
        resultado.innerText = "⚠️ Incompleto - Responde las 3 preguntas correctamente.";
    }
});

function limpiarQuiz(){
    document.querySelectorAll(".opcion").forEach(btn => {
        btn.style.background = "#0a0f0d"; // Vuelve al color oscuro gótico original
        btn.style.color = "#8a9a86";
    });
    document.getElementById("resultado").innerText = "";
}

btnReiniciarQuiz.addEventListener("click", limpiarQuiz);