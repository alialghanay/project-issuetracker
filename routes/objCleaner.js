module.exports = function objCleaner(obj) {
    if(!obj["_id"] || obj["_id"] === null || obj["_id"] === undefined) throw new Error("no updated field sent");
    for (var propName in obj) {
      if (obj[propName] === null || obj[propName] === undefined || !obj[propName]) {
        delete obj[propName];
      }
    }
    return obj
}