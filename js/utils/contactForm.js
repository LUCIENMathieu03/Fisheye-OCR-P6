const modalBg = document.querySelector('.contact_modal');
const modal = document.querySelector('.modal');
const body = document.querySelector('body');
//input
const firstName = document.querySelector('#first');
const lastName = document.querySelector('#last');
const email = document.querySelector('#email');
const message = document.querySelector('#message');
const crossCloseBtn = document.querySelector('.xcross-closeBtn');
const sendButton = document.querySelector(
    '.contact_modal form .modalSendButton',
);
const closeButton = document.querySelector(
    '.contact_modal .modal .thanks .btn-close',
);
const thanksModal = document.querySelector('.contact_modal .modal .thanks');

function displayModal() {
    modalBg.classList.remove('contact_modal--close');
    modalBg.classList.add('contact_modal--open');

    modal.classList.remove('modal--close');
    modal.classList.add('modal--open');

    body.classList.remove('bodyModal__close');
    body.classList.add('bodyModal__open');

    crossCloseBtn.focus();

    //Mask the rest of the page for accessibility
    for (childNode of body.children) {
        if (
            (childNode.nodeName == 'HEADER' ||
                childNode.nodeName == 'MAIN' ||
                childNode.nodeName == 'DIV') &&
            !childNode.classList.contains('contact_modal')
        ) {
            childNode.setAttribute('aria-hidden', true);
        }
        if (childNode.classList.contains('contact_modal')) {
            childNode.setAttribute('aria-hidden', false);
        }
    }
}

function closeModal() {
    modal.classList.replace('modal--open', 'modal--close');
    modalBg.classList.replace('contact_modal--open', 'contact_modal--close');
    body.classList.replace('bodyModal__open', 'bodyModal__close');

    //remove: Mask the rest of the page for accessibility
    for (childNode of body.children) {
        if (childNode.classList.contains('contact_modal')) {
            childNode.setAttribute('aria-hidden', true);
        }
        if (
            (childNode.nodeName == 'HEADER' ||
                childNode.nodeName == 'MAIN' ||
                childNode.nodeName == 'DIV') &&
            !childNode.classList.contains('contact_modal')
        ) {
            childNode.setAttribute('aria-hidden', false);
        }
    }
}

sendButton.addEventListener('click', (e) => {
    e.preventDefault();
});

// input event listener
firstName.addEventListener('input', () => verifyInput(firstName));
lastName.addEventListener('input', () => verifyInput(lastName));
email.addEventListener('input', () => verifyInput(email));
message.addEventListener('input', () => verifyInput(message));

// verify input validity
function verifyInput(input) {
    const emailRegex = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/;
    let dataErrorValue = '';

    switch (input.name) {
        case 'first':
            input.value = input.value.trim();
            dataErrorValue =
                'Veuillez entrer 2 caractères ou plus pour le champ du prénom';
            break;

        case 'last':
            input.value = input.value.trim();
            dataErrorValue =
                'Veuillez entrer 2 caractères ou plus pour le champ du nom';
            break;

        case 'email':
            input.value = input.value.trim();
            dataErrorValue = 'Veuillez rentrer une adresse email valide';
            break;

        case 'message':
            input.value = input.value.trim();
            dataErrorValue = 'Veuillez entrer veuillez rentrer un message';
            break;

        default:
            dataErrorValue = 'Il y a une erreur';
    }

    if (
        (input.value.length < 2 &&
            (input.id == 'first' || input.id == 'last')) ||
        (input.id == 'email' && !emailRegex.test(input.value)) ||
        (input.value.length < 2 && input.id == 'message')
    ) {
        input.parentNode.setAttribute('data-error-visible', 'true');
        input.parentNode.setAttribute('data-error', dataErrorValue);
        return false;
    } else {
        input.parentNode.setAttribute('data-error-visible', 'false');
        return true;
    }
}

// verify all input validity before send message
sendButton.addEventListener('click', () => {
    let formIsGood = true;
    const inputTab = [firstName, lastName, email, message];
    let result = {};

    for (input of inputTab) {
        verifyInput(input);
        formIsGood = formIsGood && verifyInput(input);
    }

    if (formIsGood) {
        result['first-name'] = firstName.value;
        result['last-name'] = lastName.value;
        result['email'] = email.value;
        result['message'] = message.value;

        for (input of inputTab) {
            input.value = '';
        }
        thanksModal.classList.remove('thanks--unvisible');
        console.log(result);
    }
});

closeButton.addEventListener('click', () => {
    closeModal();
    thanksModal.classList.add('thanks--unvisible');
});

crossCloseBtn.addEventListener('click', () => {
    closeModal();
});

crossCloseBtn.addEventListener('keydown', (evt) => {
    if (evt.key == 'Enter') {
        closeModal();
    }
});

document.addEventListener('keydown', (evt) => {
    if (evt.key == 'Escape') {
        closeModal();
    }
});
