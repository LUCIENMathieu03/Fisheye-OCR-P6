const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const photographerId = urlParams.get('id');
const photographHeader =  document.querySelector('.photograph-header');
const photographMedia =  document.querySelector('.media-section');
const contactButton = document.querySelector('.contact_button');

let likedPhotos = 0; 
let domImages = [...document.querySelectorAll('.media-section article')]; // done this way to manipulate the elements in a array


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

function diplayPhotographerHeader(photographData){

    const photograph = new PhotographerPage(photographData);
    const photographerToDisplay = new PhotographerTemplateFactory(photograph, "photographerPage");
    const photographHeaderDom = photographerToDisplay.getPhotographHeader();
    photographHeader.appendChild(photographHeaderDom);

    //add photograph name in modal
    document.querySelector('.photographName').textContent = photographData.name;

}

function diplayPhotographerMedia(photographData, photographMedias){
    photographMedias
        .map(media => new PhotographerPage(photographData,media))
        .forEach((formatedMedia) => {
            const photoToDisplay = new PhotographerTemplateFactory(formatedMedia, "photographerPage");
            const thephoto = photoToDisplay.getPhotographMedia();
            photographMedia.appendChild(thephoto);
        });
     displayLikeTjm(photographData, photographMedias);
}

function displayLikeTjm(photographData, photographMedias){
    let allLikes = 0;

    photographMedias.forEach((photo)=>{
        allLikes += parseInt(photo.likes);
    })
    allLikes+=likedPhotos;

    const photograph = new PhotographerPage(photographData, undefined, allLikes);
    const likeToDisplay = new PhotographerTemplateFactory(photograph, "photographerPage");
    const likeDom = likeToDisplay.getPhotographLikeTjm();

    if (photographMedia.querySelector('.allLikes')){
        photographMedia.removeChild(photographMedia.querySelector('.allLikes'));
    }
    photographMedia.appendChild(likeDom);
}

function lightBox(photographData, photographMedias){
    refreshDomImgTab()
    const controls = document.querySelectorAll('.lightBox__contentCarrousel i');
    let imgToDisplay = null;
    let currentImgIndex = null; // the id in the domImages table of the image displayed

    domImages.forEach((image)=>{
        image.addEventListener("click",(e)=>{

            findImgToDisplay(image);
            refreshCurrentIndex();
            arrowVisibility(currentImgIndex);
            displayLightBox();
            displayImgLightbox(photographData, imgToDisplay); 
        })
    })

    controls.forEach(arrow => {
        arrow.addEventListener("click", ()=>{
            
            if(arrow.classList.contains('fa-angle-left')){
                if (currentImgIndex > 0 ) {

                    findImgToDisplay(domImages[currentImgIndex - 1]);
                    refreshCurrentIndex();
                    arrowVisibility(currentImgIndex);
                    displayImgLightbox(photographData, imgToDisplay);
                }
                
            }else if (arrow.classList.contains('fa-angle-right')){
                if (currentImgIndex < domImages.length-1 ) {

                    findImgToDisplay(domImages[currentImgIndex + 1]);
                    refreshCurrentIndex();
                    arrowVisibility(currentImgIndex);
                    displayImgLightbox(photographData, imgToDisplay);
                } 

            }
        })
    })

    const findImgToDisplay = (imageClicked) =>{
        for( p of photographMedias) {
            if(p.id == imageClicked.id){
                imgToDisplay = p;
            }
        };
    }
    
    const refreshCurrentIndex = ()=>{
        for(image of domImages){
            if(parseInt(image.id) === imgToDisplay.id){
                currentImgIndex = domImages.indexOf(image);
            }
        }
    }

    const arrowVisibility = (index) => {
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
        const title = document.querySelector('.lightBox__contentTitle');
        const lightBoxImg = document.querySelector('.lightBox__contentCarrouselImg');

        const photograph = new PhotographerPage(photographData, imgToDisplay)
        const lightBox = new PhotographerTemplateFactory(photograph,"photographerPage");
        
        const theImage = lightBox.getLightBoxImg();
        lightBoxImg.innerHTML="";
        lightBoxImg.appendChild(theImage);
    
        title.innerHTML="";
        title.textContent= imgToDisplay.title
    }

    function refreshDomImgTab(){
        domImages = [...document.querySelectorAll('.media-section article')]; // done this way to manipulate the elements in a array
    }

}

function filter(photographData,photographMedias){
    let medias = [...photographMedias];
    const inputDropdown = document.querySelector('.filter__dropdown .text-box');
    let dropdown = document.querySelector(".filter__dropdown");
    let dropdownInput = document.querySelector(".filter__dropdown .text-box");

    //At first all the media is filtered by popularity
    medias.sort(function(a, b){return b.likes - a.likes});
    inputDropdown.value = "Popularité";
    photographMedia.innerHTML="";

    diplayPhotographerMedia(photographData, medias);
    lightBox(photographData, photographMedias);
    handleLike(photographData, photographMedias);

    // Close de menu by clicking outside of the element
    document.querySelector("body").addEventListener("click",(e)=>{
        if(dropdown.classList.contains("active") && (e.target != dropdownInput ) ){
           dropdown.classList.remove("active");
        }
    })

    dropdown.addEventListener("click",() =>{
        dropdown.classList.toggle("active")
    }) 

    const options= [...document.querySelectorAll('.options div')];
    for(const o of options){
        o.addEventListener("click", (e)=>{
            if(e.target.id == "popularity"){
                medias.sort(function(a, b){return b.likes - a.likes});
                inputDropdown.value = "Popularité"

            }else if(e.target.id == "title"){
                medias.sort(function(a, b){
                    let x = a.title.toLowerCase();
                    let y = b.title.toLowerCase();
                    if (x < y) {return -1;}
                    if (x > y) {return 1;}
                    return 0;
                });
                inputDropdown.value = "Titre"

            }else if(e.target.id == "date"){
                medias.sort(function(a, b){
                    const d1 = Date.parse(a.date);
                    const d2 = Date.parse(b.date);
                    if (d1 < d2) {return -1;}
                    if (d1 > d2) {return 1;}
                    return 0;
                });
                inputDropdown.value = "Date"
            }

            o.classList.add('displayed');
            for(rest of options){
                if(rest != o){
                    rest.classList.remove('displayed');
                }
            }
            photographMedia.innerHTML=""
            diplayPhotographerMedia(photographData, medias);
            lightBox(photographData, photographMedias);
            handleLike(photographData, photographMedias)
        })
    }
}

function handleLike(photographData, photographMedias){
    for(image of domImages){
        const imageLike = image.querySelector('.description .likes')
        imageLike.addEventListener("click", (e)=>{
            e.stopPropagation();
            const heart = imageLike.querySelector("i");
            let likeNumber = imageLike.querySelector('p').innerHTML 

            if( !(heart.classList.contains('heart--clicked')) ){
                imageLike.querySelector('p').innerHTML = parseInt(likeNumber)+1;
                imageLike.classList.add("heart--clicked")
                heart.classList.add("heart--clicked");
                likedPhotos +=1;

            }else if( heart.classList.contains('heart--clicked') ){
                imageLike.classList.remove("heart--clicked");
                heart.classList.remove("heart--clicked");
                imageLike.querySelector('p').innerHTML = parseInt(imageLike.querySelector('p').innerHTML)-1;
                likedPhotos -=1;
            }
            displayLikeTjm(photographData, photographMedias);
        })
    }
}

async function main (){
    const { photographData,  photographMedias } = await getPhotographerData();

    diplayPhotographerHeader(photographData);
    filter(photographData,photographMedias)

}

main();