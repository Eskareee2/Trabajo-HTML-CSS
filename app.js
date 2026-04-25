let todasLasNoticias = [];
let modoActual = 'todas';

async function cargarNoticias() {
    try {
        const respuesta = await fetch('noticias.json');
        if (!respuesta.ok) {
            throw new Error('Error al cargar noticias');
        }
        todasLasNoticias = await respuesta.json();
        mostrarNoticias(todasLasNoticias);
    } catch (error) {
        console.error("Error:", error);
    }
}

function mostrarNoticias(listaAMostrar) {
    const contenedor = document.getElementById('contenedor-noticias');
    if (!contenedor) {
        return;
    }

    contenedor.innerHTML = '';

    for (let i = 0; i < listaAMostrar.length; i++) {
        const noticia = listaAMostrar[i];

        const articulo = document.createElement('article');
        if (noticia.importante) {
            articulo.classList.add('noticia-destacada');
        }

        const h3 = document.createElement('h3');
        h3.textContent = noticia.titulo;

        const p = document.createElement('p');
        p.textContent = noticia.contenido;

        const footer = document.createElement('footer');
        footer.textContent = 'Publicado el ' + noticia.fecha;

        const botonDestacar = document.createElement('button');
        botonDestacar.classList.add('btn-destacar');
        if (noticia.importante) {
            botonDestacar.textContent = "☆";
        } else {
            botonDestacar.textContent = "★";
        }

        botonDestacar.addEventListener('click', function() {
            noticia.importante = !noticia.importante;

            if (modoActual === 'importantes') {
                const filtradas = todasLasNoticias.filter(n => n.importante === true);
                mostrarNoticias(filtradas);
            } else {
                mostrarNoticias(todasLasNoticias);
            }
        });

        articulo.appendChild(h3);
        articulo.appendChild(p);
        articulo.appendChild(botonDestacar);
        articulo.appendChild(footer);
        contenedor.appendChild(articulo);
    }
}

const btnTodas = document.getElementById('btn-todas');
if (btnTodas) {
    btnTodas.addEventListener('click', function() {
        modoActual = 'todas';
        mostrarNoticias(todasLasNoticias);
    });
}

const btnImportantes = document.getElementById('btn-importantes');
if (btnImportantes) {
    btnImportantes.addEventListener('click', function() {
        modoActual = 'importantes';
        const filtradas = todasLasNoticias.filter(n => n.importante === true);
        mostrarNoticias(filtradas);
    });
}

cargarNoticias();