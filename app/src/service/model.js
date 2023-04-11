export default (model) => ({
    post: async (data) => {
        const document = new model(data);
        const save = await document.save();
        return save;
    },
    postMany: async (data) => {
        const save = await model.insertMany(data);
        return save;
    },
    getOne: async(id) => {
        const document = await model.findById(id);
        return document;
    },
    get: async() => {
        const documents = await model.find();
        return documents;
    },
    put: async(id, data) => {
        const document = await model.findByIdAndUpdate(id, data);
        return document;
    },
    delete: async(id) => {
        const delCount = await model.findByIdAndRemove(id);
        return delCount.deletedCount;
    },
    deleteAll: async() => {
        const delCount = await model.deleteMany({});
        return delCount.deletedCount;
    }
});