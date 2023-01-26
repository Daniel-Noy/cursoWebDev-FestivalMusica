
document,addEventListener('DOMContentLoaded', () => {
    iniciarApp();
});

function iniciarApp() {
    navegacionFija();
    crearGaleria();
}

function navegacionFija() {
    const nav = document.querySelector('.header');
    const sobreFestival = document.querySelector('.sobre-festival');

    window.addEventListener('scroll', ()=> {
        sobreFestivalPosition = sobreFestival.getBoundingClientRect();

        if(sobreFestivalPosition.top <= nav.clientHeight ) {
            nav.classList.add('sticky')
        } else nav.classList.remove('sticky');
    })
}

function crearGaleria() {
    const galeria = document.querySelector('.galeria-imagenes');
    galeria.classList.add('contenedor');

    for(let i = 1; i <= 12; i++) {
        const imagen = document.createElement('PICTURE');
        imagen.innerHTML = `
            <source srcset="../build/img/thumb/${i}.webp" type="image/webp">
            <img width="50px" height="50px" src="./build/img/thumb/${i}.jpg" alt="imagen ${i}">
        `;

        imagen.addEventListener('click', ()=> {
            mostrarImagen(i);
        });

        galeria.appendChild(imagen);
    }
}

function mostrarImagen(id){
    const body = document.querySelector('body');
    const overlay = document.createElement('DIV');
    const imagen = document.createElement('PICTURE');
    const botonModal = document.createElement('P');

    body.classList.add('fijar-body');
    overlay.classList.add('overlay-imagen');
    overlay.addEventListener('click', ()=> {
        body.classList.remove('fijar-body')
        overlay.remove();
    });

    imagen.innerHTML = `
        <source srcset="../build/img/grande/${id}.webp" type="image/webp">
        <img width="50px" height="50px" src="./build/img/grande/${id}.jpg" alt="imagen ${id}">
    `
    
    botonModal.textContent = 'X';
    botonModal.classList.add('boton-modal');
    botonModal.addEventListener('click', ()=> {
        body.classList.remove('fijar-body')
        overlay.remove();
    });
    
    
    overlay.appendChild(imagen);
    overlay.appendChild(botonModal);

    body.appendChild(overlay);
}