let respuestaCorrecta,
    numeroCorrecto = 0,
    numeroIncorrecto = 0;

document.addEventListener("DOMContentLoaded", function () {
    agregarPregunta();

    eventos();

});

eventos = () => {

}

//*traigo data de la api de trivia (falta encontrar una en español, por ahora dejamos esta)

agregarPregunta = () => {
    const url = "https://opentdb.com/api.php?amount=5&category=20&difficulty=easy&type=multiple";
    fetch(url)
        .then(data => data.json())
        .then((resultado) => mostrarPregunta(resultado.results))
}

mostrarPregunta = preguntas => {
    const preguntaHTML = document.createElement("div");
    preguntaHTML.classList.add("col-12");

    preguntas.forEach(pregunta => {
        // **en esta api, se usa la propiedad correct_answer e incorrect_answers
        respuestaCorrecta = pregunta.correct_answer;


        let respuestasPosibles = pregunta.incorrect_answers;
        respuestasPosibles.splice(Math.floor(Math.random() * 3), 0, respuestaCorrecta);

        preguntaHTML.innerHTML = `<div class ="row justify-content-between heading">
        <p class= "categoria"> Categoria: ${pregunta.category} </p>
        <div class="puntaje text-center mb-2">
        <span class ="badge text-bg-success"> ${numeroCorrecto}</span>
        <span class ="badge text-bg-danger"> ${numeroIncorrecto}</span>
        </div>
        <div>
        <h2 class ="text-center"> ${pregunta.question};`




        const divRespuesta = document.createElement("div");
        divRespuesta.classList.add("preguntas", "row", "justify-content-around", "mt-5");

        respuestasPosibles.forEach(respuesta => {
            const respuestaHTMl = document.createElement("li");
            respuestaHTMl.classList.add("col-12", "col-md-5");
            respuestaHTMl.textContent = respuesta;

            respuestaHTMl.onclick = seleccionarRespuesta;



            divRespuesta.appendChild(respuestaHTMl)

        })

        preguntaHTML.appendChild(divRespuesta);

        document.querySelector("#aplicacion").appendChild(preguntaHTML);
    });
}

function seleccionarRespuesta (e) {
    if(document.querySelector(".active")){
        const respuestaActiva = document.querySelector(".active");
        respuestaActiva.classList.remove("active");
    }
    e.target.classList.add("active");
}

