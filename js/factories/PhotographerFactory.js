class PhotographerFactory{
    constructor( data , type){
        if(type === "photographerPresentation"){
            return new photographerTemplate(data);
        }else if(type === "photographerPage"){
            return new photographerPageTemplate(data);
        }else {
            throw 'Unknow format type';
        }   
    }
}