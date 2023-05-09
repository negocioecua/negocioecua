const articulosContenedor = document.getElementById("fuerza-contenedor");
const controlContenedor = document.getElementById("control-contenedor");
const iluminacionContenedor = document.getElementById("iluminacion-contenedor");

// Obtener los datos de los artículos
fetch("data.json")
    .then(response => response.json())
    .then(data => {
        // Almacenar los datos en una variable global
        window.articulos = data.articulos;
        // Mostrar los artículos en la página
        mostrarArticulos();
    })
    .catch(error => console.error(error));

// Función para mostrar los artículos en la página
function mostrarArticulos() {
    articulosContenedor.innerHTML = "";
    controlContenedor.innerHTML = "";
    iluminacionContenedor.innerHTML = "";

    // Obtener los valores seleccionados en los filtros
    const filtroCategoria = document.getElementById("filtro-categoria").value;
    const filtroPrecio = parseFloat(document.getElementById("filtro-precio").value);

    console.log(filtroPrecio);

    // Recorrer cada artículo
    window.articulos.forEach(function (articulo) {
        // Comprobar si el artículo cumple con los criterios de los filtros
        if ((filtroCategoria === "" || articulo.categoria === filtroCategoria) && (filtroPrecio === 0 || articulo.precio <= filtroPrecio)) {
            // Crear un elemento div para el artículo
            const articuloDiv = document.createElement("div");
            articuloDiv.classList.add("articulo");
            // Crear una imagen para el artículo
            const articuloImg = document.createElement("img");
            articuloImg.src = articulo.img;
            articuloImg.alt = articulo.nombre;
            articuloDiv.appendChild(articuloImg);

            // Crear un h3 para el nombre del artículo
            const articuloNombre = document.createElement("h3");
            articuloNombre.innerHTML = articulo.nombre;
            articuloDiv.appendChild(articuloNombre);

            // Crear un p para la descripción del artículo
            const articuloDescripcion = document.createElement("p");
            articuloDescripcion.innerHTML = articulo.descripcion;
            articuloDiv.appendChild(articuloDescripcion);

            // Crear un p para el precio del artículo
            const articuloPrecio = document.createElement("p");
            articuloPrecio.innerHTML = "$" + articulo.precio;
            articuloDiv.appendChild(articuloPrecio);

            // Agregar el elemento div al contenedor correspondiente según la categoría
            if (articulo.categoria === "fuerza") {
                articulosContenedor.appendChild(articuloDiv);
            } else if (articulo.categoria === "control") {
                controlContenedor.appendChild(articuloDiv);
            } else if (articulo.categoria === "iluminacion") {
                iluminacionContenedor.appendChild(articuloDiv);
            }
        }
    });
}

// Agregar eventos a los filtros para que al cambiar su valor, se vuelva a mostrar los artículos
document.getElementById("filtro-categoria").addEventListener("change", mostrarArticulos);
document.getElementById("filtro-precio").addEventListener("change", mostrarArticulos);
