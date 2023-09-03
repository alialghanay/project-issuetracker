const Schema     = require('./schema.js');
const { status } = require('express/lib/response.js');
const {objCreateError, objCleaner, objDeleteError, } = require('./objErrorHandler.js');

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
        let createCheck = objCreateError(create);
        const data = await Schema.create({
            issue_title: createCheck.issue_title,
            issue_text: createCheck.issue_text,
            created_by: createCheck.created_by,
            assigned_to: createCheck.assigned_to || "",
            status_text: createCheck.status_text || "",
            project: createCheck.project,
            updated_on: new Date(0)
        });
        return data;
    } catch(err) {
        return { error: err.message };
    }
}

async function schemaUpdate(item) {
    let id;
    if(item['_id']) id = {"_id": item['_id']};
    try {
        let cleanItem = objCleaner(item);
        let newItem = {
            ...cleanItem,
            updated_on: Date.now()
        }
        const data = await Schema.findOneAndUpdate(id, newItem, {new: true});
        return {"result":"successfully updated", ...id};
    } catch(err) {
        console.log(err.cause);
        if(err.cause === undefined) return {error: 'could not update', ...id};
        else return {"error":err.message, ...id};
    }
}

async function schemaDelete(item) {
    try {
        let newItem = objDeleteError(item);
        const data = await Schema.deleteOne(newItem).exec();
        return {"result": "successfully deleted", ...newItem};
    } catch(err) {
        console.log(err.cause);
        if(err.cause === undefined) return {error: 'could not delete', ...item}
        else return {"error":err.message, ...item};
    }
}

module.exports = {
    schemafind,
    schemaCreate,
    schemaUpdate,
    schemaDelete
}