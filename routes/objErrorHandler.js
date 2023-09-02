function objCreateError(obj) {
  if(!obj.issue_title || !obj.issue_text || !obj.created_by) throw new Error("required field(s) missing"); 
    return obj;
}

function objDeleteError(obj) {
    if(!obj["_id"] || obj["_id"] === null || obj["_id"] === undefined) throw new Error("id error");
    for (var propName in obj) {
      if (obj[propName] === null || obj[propName] === undefined || !obj[propName]) {
        delete obj[propName];
      }
    }
    return obj;
}

function objCleaner(obj) {
  if(!obj["_id"] || obj["_id"] === null || obj["_id"] === undefined) throw new Error("no updated field sent");
  for (var propName in obj) {
    if (obj[propName] === null || obj[propName] === undefined || !obj[propName]) {
      delete obj[propName];
    }
  }
  return obj
}
module.exports = {
  objCleaner,
  objDeleteError,
  objCreateError
}