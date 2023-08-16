class PhotographerTemplateFactory {
    constructor(data, type) {
        if (type === 'photographerPresentation') {
            return new photographerTemplate(data);
        } else if (type === 'photographerPage') {
            return new photographPageTemplate(data);
        } else {
            throw 'Unknow format type';
        }
    }
}
