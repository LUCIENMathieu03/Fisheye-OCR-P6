const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);

const photographerId = urlParams.get('id')

async function getPhotographerData() {

    const {data} = await getPhotographers()
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
}
main()
