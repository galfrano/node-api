export default (model: any) => ({
  post: async (data: any) => {
    const document = new model(data);
    const save = await document.save();
    return save;
  },
  postMany: async (data: any) => {
    const save = await model.insertMany(data);
    return save;
  },
  getOne: async (id: string) => {
    const document = await model.findById(id);
    return document;
  },
  getByCondition: async (condition: any) => {
    const documents = await model.find(condition);
    return documents;
  },
  get: async () => {
    const documents = await model.find();
    return documents;
  },
  put: async (id: string, data: any) => {
    const document = await model.findByIdAndUpdate(id, data);
    return document;
  },
  delete: async (id: string) => {
    const delCount = await model.findByIdAndRemove(id);
    return delCount.deletedCount;
  },
  deleteAll: async () => {
    const delCount = await model.deleteMany({});
    return delCount.deletedCount;
  },
  deleteByCondition: async (condition: any) => {
    const delCount = await model.deleteMany(condition);
    return delCount.deletedCount;
  },
});
