class photographersApi {
    constructor(url){
        this._url = url;
    }

    async getPhotographers(){
        const res = await fetch(this._url);
        const data = await res.json()
        
        return data;
    }

}