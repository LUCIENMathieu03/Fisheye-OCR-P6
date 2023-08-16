const lightBoxlb = document.querySelector('.lightBox');

function displayLightBox() {
    body.classList.remove('bodyModal__close');
    body.classList.add('bodyModal__open');

    lightBoxlb.classList.remove('lightBox__close');
    lightBoxlb.classList.add('lightBox__open');
}

function closeLightbox() {
    lightBoxlb.classList.replace('lightBox__open', 'lightBox__close');
    body.classList.replace('bodyModal__open', 'bodyModal__close');
}
