declare const _default: (model: any) => {
    post: (data: any) => Promise<any>;
    postMany: (data: any) => Promise<any>;
    getOne: (id: string) => Promise<any>;
    getByCondition: (condition: any) => Promise<any>;
    get: () => Promise<any>;
    put: (id: string, data: any) => Promise<any>;
    delete: (id: string) => Promise<any>;
    deleteAll: () => Promise<any>;
    deleteByCondition: (condition: any) => Promise<any>;
};
export default _default;
