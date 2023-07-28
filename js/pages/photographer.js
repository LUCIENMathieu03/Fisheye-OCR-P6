const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const photographerId = urlParams.get('id');
const photographHeader =  document.querySelector('.photograph-header');
const photographMedia =  document.querySelector('.media-section');

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

}

async function diplayPhotographerMedia(photographerMedia, name){
    ///  appel de la factory pour afficher le bon template;
    const PhotographName = name;
    photographerMedia
        .forEach((photo) => {
            const photographerToDisplay = new photographPageTemplate(photo, PhotographName);
            const thephoto = photographerToDisplay.getPhotographMedia();
            photographMedia.appendChild(thephoto);
        });
}

async function main (){
    const { photographData,  photographMedias } = await getPhotographerData();
    console.log(photographData);
    console.log(photographMedias);

    diplayPhotographerHeader(photographData);
    diplayPhotographerMedia(photographMedias, photographData.name)
}
main();
