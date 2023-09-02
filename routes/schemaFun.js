const Schema     = require('./schema.js');
const objCleaner = require('./objCleaner.js');
const { status } = require('express/lib/response.js');
const objErrorHandler = require('./objErrorHandler.js');

async function schemafind(project) {
    try {
        const data = await Schema.find(project).exec();
        return data;
    } catch(err) {
        return err;
    }
}

async function schemaCreate(create) {
    try {
        const data = await Schema.create({
            issue_title: create.issue_title,
            issue_text: create.issue_text,
            created_by: create.created_by,
            assigned_to: create.assigned_to || "",
            status_text: create.status_text || "",
            project: create.project
        });
        return data;
    } catch(err) {
        if(!create.issue_title || !create.issue_text || !create.created_by){
            return 'Required fields missing from request';
          }
        return err;
    }
}

async function schemaUpdate(item) {
    let id = {"_id": item['_id']};
    try {
        let cleanItem = objCleaner(item);
        let newItem = {
            ...cleanItem,
            updated_on: Date.now()
        }
        const data = await Schema.findOneAndUpdate(id, newItem, {new: true});
        return {"result":"successfully updated", id};
    } catch(err) {
        return {"result":err.message, ...id};
    }
}

async function schemaDelete(item) {
    try {
        let newItem = objErrorHandler(item);
        const data = await Schema.deleteOne(newItem).exec();
        let result = "deleted " + newItem["_id"];
        return {"result": result, ...newItem};
    } catch(err) {
        return {"result":err.message, ...item};
    }
}

module.exports = {
    schemafind,
    schemaCreate,
    schemaUpdate,
    schemaDelete
}