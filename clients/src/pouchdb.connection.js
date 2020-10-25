import PouchDB from 'pouchdb';

export default class PouchConnection{

    constructor(name){
        this.connection = new PouchDB(name);
    }

    async put(key, value){
        const resp = await this.connection.put({'_id': key, 'value': value});
        return resp;
    }

    async get(key){
        const value = await this.connection.get(key);
        return value;
    }

    async getAllDocs(){
        return await this.connection.allDocs({include_docs: true});
    }

    async delete(key){
        const doc = await this.connection.get(key);
        const response = await this.connection.remove(doc);
        return response;
    }
}