function objCreateError(obj) {
  if(!obj.issue_title || !obj.issue_text || !obj.created_by) throw new Error("required field(s) missing", {cause: "myError"}); 
    return obj;
}

function objDeleteError(obj) {
    if(!obj["_id"] || obj["_id"] === null || obj["_id"] === undefined) throw new Error("missing _id", {cause: "myError"});
    for (var propName in obj) {
      if (obj[propName] === null || obj[propName] === undefined || !obj[propName]) {
        delete obj[propName];
      }
    }
    return obj;
}

function objCleaner(obj) {
  if(!obj["_id"] || obj["_id"] === null || obj["_id"] === undefined) throw new Error("missing _id", {cause: "myError"});
  else delete obj["_id"];
  for (var propName in obj) {
    if (obj[propName] === null || obj[propName] === undefined || !obj[propName]) {
      delete obj[propName];
    }
  }
  let fildes = Object.keys(obj);
  fildes.splice(fildes.indexOf("project"), 1);
  if(fildes.length === 0) throw new Error("no update field(s) sent", {cause: "myError"});
  return obj;
}
module.exports = {
  objCleaner,
  objDeleteError,
  objCreateError
}