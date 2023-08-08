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

function diplayPhotographerHeader(photographer){

    const photograph = new Photographer(photographer);
    const photographerToDisplay = new PhotographerTemplateFactory(photograph, "photographerPage");
    const photographHeaderDom = photographerToDisplay.getPhotographHeader();
    photographHeader.appendChild(photographHeaderDom);

    //add photograph name in modal
    document.querySelector('.photographName').textContent=photographer.name;

}

function diplayPhotographerMedia(photographData, photographMedias){
    ///  appel de la factory pour afficher le bon template; ???
    photographMedias
        .forEach((photo) => {
            const photoToDisplay = new photographPageTemplate(photographData,photo);
            const thephoto = photoToDisplay.getPhotographMedia();
            photographMedia.appendChild(thephoto);
        });
}

function displayLikeTjm(photographData, photographMedias){
    let allLike = 0;

    photographMedias.forEach((photo)=>{
        allLike += parseInt(photo.likes);
    })

    const likeToDisplay = new photographPageTemplate(photographData, undefined, allLike);
    const likeDom = likeToDisplay.getPhotographLikeTjm();

    photographMedia.appendChild(likeDom);

}

async function lightBox(photographData, photographMedias){
    const domImages = [...document.querySelectorAll('.media-section article')] // done this way to manipulate the elements in a array
    const controls = document.querySelectorAll('.lightBox__contentCarrousel i');
    let imgToDisplay = null;
    let currentImgIndex = null; // the id in the domImages table of the image displayed

    domImages.forEach((image)=>{
        image.addEventListener("click",(e)=>{

            findImgToDisplay(image);
            findCurrentImgIndex();
            // arrowVisibility(currentImgIndex);
            displayLightBox();
            displayImgLightbox(photographData, imgToDisplay); 
        })
    })

    controls.forEach(arrow => {
        arrow.addEventListener("click", ()=>{
            findCurrentImgIndex();
            // arrowVisibility(currentImgIndex);
            if(arrow.classList.contains('fa-angle-left')){
                if (currentImgIndex > 0 ) {
                    findImgToDisplay(domImages[currentImgIndex - 1]);
                    displayImgLightbox(photographData, imgToDisplay);
                }
                
            }else if (arrow.classList.contains('fa-angle-right')){
                if (currentImgIndex < domImages.length-1 ) {

                    findImgToDisplay(domImages[currentImgIndex + 1]);
                    displayImgLightbox(photographData, imgToDisplay);
                } 

            }
        })
    })

    const findImgToDisplay = (domImg) =>{
        for( p of photographMedias) {
            if(p.id == domImg.id){
                imgToDisplay = p;
            }
        };
    }
    
    const findCurrentImgIndex = ()=>{
        for(image of domImages){
            if(parseInt(image.id) === imgToDisplay.id){
                currentImgIndex = domImages.indexOf(image);
            }
        }
    }

    const arrowVisibility = (index) => {
        // console.log(currentImgIndex);
        if (index === 0){
            controls[0].classList.add('arrow--last');

        }else if (index === domImages.length-1){
            controls[1].classList.add('arrow--last');

        }else{
            for(arrow of controls){
                arrow.classList.remove('arrow--last');
            }
        }
    }

    const displayImgLightbox = (photographData, imgToDisplay) => {
        const lightBox = new photographPageTemplate(photographData, imgToDisplay);
        const title = document.querySelector('.lightBox__contentTitle');
        const lightBoxImg = document.querySelector('.lightBox__contentCarrouselImg');
        
        const theImage = lightBox.getLightBoxImg();
        lightBoxImg.innerHTML="";
        lightBoxImg.appendChild(theImage);
    
        title.innerHTML="";
        title.textContent= imgToDisplay.title
    }

}

async function main (){
    const { photographData,  photographMedias } = await getPhotographerData();

    diplayPhotographerHeader(photographData);
    diplayPhotographerMedia(photographData, photographMedias);
    displayLikeTjm(photographData, photographMedias);
    lightBox(photographData, photographMedias);
}

main();