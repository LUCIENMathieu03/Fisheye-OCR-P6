const lightBoxlb = document.querySelector('.lightBox');
const lightBoxCross = document.querySelector('.lightBox__contentCross');

function displayLightBox() {
    body.classList.remove('bodyModal__close');
    body.classList.add('bodyModal__open');

    lightBoxlb.classList.remove('lightBox__close');
    lightBoxlb.classList.add('lightBox__open');
    setTimeout(() => {
        lightBoxCross.focus();
    }, 700);

    //Mask the rest of the page for accessibility
    for (childNode of body.children) {
        if (
            (childNode.nodeName == 'HEADER' ||
                childNode.nodeName == 'MAIN' ||
                childNode.nodeName == 'DIV') &&
            !childNode.classList.contains('lightBox')
        ) {
            childNode.setAttribute('aria-hidden', true);
        }
        if (childNode.classList.contains('lightBox')) {
            childNode.setAttribute('aria-hidden', false);
        }
    }
}

function closeLightbox() {
    lightBoxlb.classList.replace('lightBox__open', 'lightBox__close');
    body.classList.replace('bodyModal__open', 'bodyModal__close');

    //remove: Mask the rest of the page for accessibility
    for (childNode of body.children) {
        if (childNode.classList.contains('lightBox')) {
            childNode.setAttribute('aria-hidden', true);
        }
        if (
            (childNode.nodeName == 'HEADER' ||
                childNode.nodeName == 'MAIN' ||
                childNode.nodeName == 'DIV') &&
            !childNode.classList.contains('lightBox')
        ) {
            childNode.setAttribute('aria-hidden', false);
        }
    }
}

lightBoxCross.addEventListener('click', () => {
    closeLightbox();
});

lightBoxCross.addEventListener('keydown', (e) => {
    if (e.key == 'Enter') {
        closeLightbox();
    }
});
document.addEventListener('keydown', (evt) => {
    if (evt.key == 'Escape') {
        closeLightbox();
    }
});

//Keep focus in the lightbox while navigate with keyboard

lightBoxlb.addEventListener('keydown', function (e) {
    let isTabPressed = e.key === 'Tab' || e.keyCode === 9;
    let focusableElement = lightBoxlb.querySelectorAll('i');
    let firstFocusableElement = focusableElement[0];
    let lastFocusableElement = focusableElement[focusableElement.length - 1];

    if (!isTabPressed) {
        return;
    }

    if (e.shiftKey) {
        // if shift + tab
        if (document.activeElement === firstFocusableElement) {
            lastFocusableElement.focus(); // add focus for the last focusable element
            e.preventDefault();
        }
    } else {
        // if tab
        if (document.activeElement === lastFocusableElement) {
            firstFocusableElement.focus(); // add focus for the first focusable element
            e.preventDefault();
        }
    }
});
