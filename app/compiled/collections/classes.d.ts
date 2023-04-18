/// <reference types="mongoose/types/aggregate" />
/// <reference types="mongoose/types/callback" />
/// <reference types="mongoose/types/collection" />
/// <reference types="mongoose/types/connection" />
/// <reference types="mongoose/types/cursor" />
/// <reference types="mongoose/types/document" />
/// <reference types="mongoose/types/error" />
/// <reference types="mongoose/types/expressions" />
/// <reference types="mongoose/types/helpers" />
/// <reference types="mongoose/types/middlewares" />
/// <reference types="mongoose/types/indexes" />
/// <reference types="mongoose/types/models" />
/// <reference types="mongoose/types/mongooseoptions" />
/// <reference types="mongoose/types/pipelinestage" />
/// <reference types="mongoose/types/populate" />
/// <reference types="mongoose/types/query" />
/// <reference types="mongoose/types/schemaoptions" />
/// <reference types="mongoose/types/schematypes" />
/// <reference types="mongoose/types/session" />
/// <reference types="mongoose/types/types" />
/// <reference types="mongoose/types/utility" />
/// <reference types="mongoose/types/validation" />
/// <reference types="mongoose/types/virtuals" />
/// <reference types="mongoose/types/inferschematype" />
import { Schema } from 'mongoose';
declare const _default: import("mongoose").Model<{
    location: string;
    date: Date;
    classname: string;
    no_of_places: number;
    created_by: string;
    created_by_name: string;
    create_date: Date;
    description?: string;
}, {}, {}, {}, import("mongoose").Document<unknown, {}, {
    location: string;
    date: Date;
    classname: string;
    no_of_places: number;
    created_by: string;
    created_by_name: string;
    create_date: Date;
    description?: string;
}> & Omit<{
    location: string;
    date: Date;
    classname: string;
    no_of_places: number;
    created_by: string;
    created_by_name: string;
    create_date: Date;
    description?: string;
} & {
    _id: import("mongoose").Types.ObjectId;
}, never>, Schema<any, import("mongoose").Model<any, any, any, any, any, any>, {}, {}, {}, {}, import("mongoose").ResolveSchemaOptions<{
    collection: string;
    versionKey: false;
}>, {
    location: string;
    date: Date;
    classname: string;
    no_of_places: number;
    created_by: string;
    created_by_name: string;
    create_date: Date;
    description?: string;
}, import("mongoose").Document<unknown, {}, import("mongoose").FlatRecord<{
    location: string;
    date: Date;
    classname: string;
    no_of_places: number;
    created_by: string;
    created_by_name: string;
    create_date: Date;
    description?: string;
}>> & Omit<import("mongoose").FlatRecord<{
    location: string;
    date: Date;
    classname: string;
    no_of_places: number;
    created_by: string;
    created_by_name: string;
    create_date: Date;
    description?: string;
}> & {
    _id: import("mongoose").Types.ObjectId;
}, never>>>;
export default _default;
