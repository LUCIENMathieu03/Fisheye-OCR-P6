const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);

const photographerId = urlParams.get('id')

async function getPhotographerData() {
    const photographerApi = new photographersApi("./data/photographers.json");
    const data = await photographerApi.getPhotographers();
    
    let photographerData =  null;
    let photographerMedias = [];

    for(const photographer of data.photographers) {
        if(photographer.id == photographerId){
            photographerData = photographer
            break;
        }
    }

    for(const photographerMedia of data.media) {
        if(photographerMedia.photographerId == photographerId){
            photographerMedias.push(photographerMedia)
        }
    }

    return ({
        photographerData : photographerData,
        photographerMedias : photographerMedias,
    })
}


async function main (){
    const { photographerData,  photographerMedias } = await getPhotographerData();
    console.log(photographerData);
    console.log(photographerMedias);

    // displaydata comme dans index.js (on peu l'appeler diplayPhotographerData)

    //piste pour les template un constructeur peu returne qlqch (return le resultat d'une fonction?) // oublie on utilise des class mtn donc on en aura pas besoin
}
main()
