class Usuario {
    constructor(nombre, apellido, edad, direccion, contrasenia) {
        this.nombre = nombre;
        this.apellido = apellido;
        this.edad = edad;
        this.direccion = direccion;
        this.contrasenia = contrasenia;
    }
}

let carrito = [];

function registrarse() {
    // Obtener valores del formulario de registro
    let nombre = document.getElementById("nombre").value;
    let apellido = document.getElementById("apellido").value;
    let edad = parseInt(document.getElementById("edad").value);
    let direccion = document.getElementById("direccion").value;
    let contrasenia = document.getElementById("contrasenia").value;

    // Verificar que todos los campos estén completos
    if (nombre && apellido && !isNaN(edad) && direccion && contrasenia) {
        // Verificar que la edad sea mayor o igual a 18 años
        if (edad >= 18) {
            // Crear instancia de Usuario
            let nuevoUsuario = new Usuario(nombre, apellido, edad, direccion, contrasenia);
            // Mostrar mensaje de bienvenida y formulario de cursos
            mostrarBienvenida(nombre);
        } else {
            alert("Debes ser mayor de 18 años para registrarte.");
        }
    } else {
        alert("Debes completar todos los campos del formulario de registro.");
    }
}

function mostrarBienvenida(nombre) {
    // Ocultar el formulario de registro
    document.getElementById("registro").style.display = "none";

    // Mostrar el mensaje de bienvenida con el nombre registrado y formulario de cursos
    document.getElementById("cursos").style.display = "block";
    document.getElementById("nombreBienvenida").innerText = nombre;

    // Generar opciones de cursos
    generarOpciones();
}

function generarOpciones() {
    let selectCurso = document.getElementById("curso");
    selectCurso.innerHTML = ""; // Limpiar opciones existentes

    // Lista de cursos con nombres y precios
    let cursos = [
        { nombre: "Curso de Guitarra", precio: 5500 },
        { nombre: "Curso de Ukelele", precio: 8500 },
        { nombre: "Curso de Canto Inicial", precio: 8900 }
    ];

    // Obtener valores de búsqueda y filtrado
    let busqueda = document.getElementById("busqueda").value.toLowerCase();
    let filtrado = document.getElementById("filtrado").value;

    // Filtrar cursos según la búsqueda y el filtrado seleccionado
    let cursosFiltrados = filtrarCursos(cursos, busqueda, filtrado);

    // Iterar sobre la lista de cursos filtrados y generar las opciones
    cursosFiltrados.forEach(curso => {
        let option = document.createElement("option");
        option.value = curso.nombre.toLowerCase().replace(/\s/g, ''); // Convertir el nombre a minúsculas y eliminar espacios
        option.textContent = `${curso.nombre} - $${curso.precio}`;
        selectCurso.appendChild(option);
    });
}

function filtrarCursos(cursos, busqueda, filtrado) {
    return cursos.filter(curso => {
        // Filtrar por búsqueda
        if (busqueda && curso.nombre.toLowerCase().indexOf(busqueda) === -1) {
            return false;
        }

        // Filtrar según el criterio seleccionado
        switch (filtrado) {
            case 'menor6000':
                return curso.precio < 6000;
            case 'mayor6000':
                return curso.precio >= 6000;
            default:
                return true;
        }
    });
}

function agregarAlCarrito() {
    let selectCurso = document.getElementById("curso");
    let cursoSeleccionado = selectCurso.options[selectCurso.selectedIndex].text; // Obtener el texto del curso seleccionado
    let nombreCurso = obtenerNombreCurso(cursoSeleccionado); // Obtener solo el nombre del curso
    carrito.push(nombreCurso);
    mostrarCarrito();
}

function mostrarCarrito() {
    let listaCursosElement = document.getElementById("listaCursos");
    listaCursosElement.innerHTML = ""; // Limpiar contenido existente

    carrito.forEach(curso => {
        let li = document.createElement("li");
        li.textContent = curso; // Mostrar el nombre del curso en el carrito
        li.className = "list-group-item";
        li.style.color = "black"; // Establecer el color de texto en negro
        listaCursosElement.appendChild(li);
    });

    document.getElementById("carrito").style.display = "block";
}

function comprarCursos() {
    // Calcular costo total de todos los cursos en el carrito
    let costoTotal = 0;
    carrito.forEach(curso => {
        let precio = obtenerPrecioCurso(curso);
        costoTotal += precio;
    });

    // Agregar impuestos
    costoTotal = calcularCostoConIVA(costoTotal);

    // Mostrar el precio total antes de redirigir a la plataforma de pago
    alert("El costo total de los cursos en el carrito (IVA incluido) es: $" + costoTotal.toFixed(2) + "\nSerás redirigido a la plataforma de pago de Mercado Pago.");

    // Redirigir a la plataforma de pago de Mercado Pago
    window.location.href = "https://www.mercadopago.com.ar/checkout/v1/redirect?preference-id=SU_PREFERENCIA_ID";
}

function obtenerNombreCurso(curso) {
    return curso.substr(0, curso.lastIndexOf(' - ')); // Obtener el nombre del curso antes del último ' - '
}

function calcularCostoConIVA(precio) {
    // IVA del 21%
    let iva = 0.21;
    return precio * (1 + iva);
}

function obtenerPrecioCurso(curso) {
    // Precios base de los cursos
    let precios = {
        "Curso de Guitarra": 5500,
        "Curso de Ukelele": 8500,
        "Curso de Canto Inicial": 8900
    };

    // Obtener el precio del curso seleccionado
    return precios[curso];
}

function mostrarPrecio() {
    // Obtener el elemento select y su valor seleccionado
    let selectCurso = document.getElementById("curso");
    let cursoSeleccionado = selectCurso.value;

    // Obtener el precio del curso seleccionado
    let precioCurso = obtenerPrecioCurso(cursoSeleccionado);

    // Obtener la cantidad de cuotas seleccionadas
    let cuotas = parseInt(document.getElementById("cuotas").value);

    // Limitar la cantidad de cuotas a un máximo de 3
    cuotas = Math.min(cuotas, 3);

    // Actualizar el campo de cuotas con el valor corregido
    document.getElementById("cuotas").value = cuotas;

    // Calcular y mostrar el precio total con las cuotas
    let precioTotal = precioCurso / cuotas;
    document.getElementById("resultado").innerText = `El precio por cuota es: $${precioTotal.toFixed(2)}`;
}


