const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const photographerId = urlParams.get('id');
const photographHeader =  document.querySelector('.photograph-header');
const photographMedia =  document.querySelector('.media-section');
const contactButton = document.querySelector('.contact_button');



async function getPhotographerData() {
    const photographerApi = new photographersApi("./data/photographers.json");
    const data = await photographerApi.getPhotographers();
    
    let photographerData =  null;
    let photographerMedias = [];

    for(const photographer of data.photographers) {
        if(photographer.id == photographerId){
            photographerData = photographer;
            break;
        }
    }

    for(const photographerMedia of data.media) {
        if(photographerMedia.photographerId == photographerId){
            photographerMedias.push(photographerMedia)
        }
    }

    return ({
        photographData : photographerData,
        photographMedias : photographerMedias,
    })
}

async function diplayPhotographerHeader(photographer){

    const photograph = new Photographer(photographer);
    const photographerToDisplay = new PhotographerTemplateFactory(photograph, "photographerPage");
    const photographHeaderDom = photographerToDisplay.getPhotographHeader();
    photographHeader.appendChild(photographHeaderDom);

    //add photograph name in modal
    document.querySelector('.photographName').textContent=photographer.name;

}

async function diplayPhotographerMedia(photographData, photographMedias){
    ///  appel de la factory pour afficher le bon template; ???
    let id=0;
    photographMedias
        .forEach((photo) => {
            const photographerToDisplay = new photographPageTemplate(photographData,photo,id);
            const thephoto = photographerToDisplay.getPhotographMedia();
            photographMedia.appendChild(thephoto);
            id= id +1;
        });
}

async function displayLikeTjm(photographData, photographMedias){
    let allLike = 0;

    photographMedias.forEach((photo)=>{
        allLike += parseInt(photo.likes);
    })

    const likeContainer = document.createElement('div');
    const likeNumber = document.createElement( 'span' );
    const tjm = document.createElement( 'span' );

    likeContainer.classList.add('allLikes');

    likeNumber.innerHTML =`<p>${allLike} <i class="fa-solid fa-heart heart"></i></p>`;
    tjm.innerHTML=`${photographData.price}€ / jour`;

    likeContainer.appendChild(likeNumber);
    likeContainer.appendChild(tjm);

    photographMedia.appendChild(likeContainer);

}

async function lightBox(photographMedias){
    let photosData = [...photographMedias];
    const photos = document.querySelectorAll('.media-section article');
    photos.forEach((photo)=>{
        photo.addEventListener("click",(e)=>{
            console.log('coucou');
        })
    })

}

async function main (){
    const { photographData,  photographMedias } = await getPhotographerData();
    console.log(photographData);
    console.log(photographMedias);

    diplayPhotographerHeader(photographData);
    diplayPhotographerMedia(photographData, photographMedias);
    displayLikeTjm(photographData, photographMedias);
    

    document.querySelector('.send_button').addEventListener('click',(e)=>{
        e.preventDefault();
    });

    lightBox(photographMedias)
}

main();