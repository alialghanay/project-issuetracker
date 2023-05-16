const Schema     = require('./schema.js');
const objCleaner = require('./objCleaner.js');

async function schemafind(project) {
    try {
        const data = await Schema.find(project).exec();
        return data;
    } catch(err) {
        console.log(err);
        return err;
    }
}

async function schemaCreate(create) {
    try {
        const data = await Schema.create({...create});
        return data;
    } catch(err) {
        console.log(err);
        return err;
    }
}

async function schemaUpdate(item) {
    let id = {"_id": item['_id']};
    let cleanItem = objCleaner(item);
    let newItem = {
        ...cleanItem,
        updated_on: Date.now()
    }
    try {
        const data = await Schema.findOneAndUpdate(id, newItem, {new: true});
        return {"result":"successfully updated", id};
    } catch(err) {
        console.log(err);
        return {"error":err, ...id};
    }
}

async function schemaDelete(item) {
    try {
        const data = await Schema.deleteOne(item).exec();
        return {"result":"successfully deleted", ...item};
    } catch(err) {
        console.log(err);
        return {"error":err, ...item};
    }
}

module.exports = {
    schemafind,
    schemaCreate,
    schemaUpdate,
    schemaDelete
}