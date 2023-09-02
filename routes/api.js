'use strict';
const { schemafind, schemaCreate, schemaUpdate, schemaDelete } = require('./schemaFun');

module.exports = function (app) {

  app.route('/api/issues/:project')  
    .get(function (req, res){
      let project = {...req.query, ...req.params};
      schemafind(project).then((d) => {
        res.json(d);
      });
    })
    
    .post(function (req, res){
      let create = {...req.body, ...req.params}
      schemaCreate(create).then((d) => {
        res.status(200).json(d);
      })
    })
    
    .put(function (req, res){
      let newItem = {...req.body, ...req.params}
      schemaUpdate(newItem).then((d) => {
        res.status(200).json(d);
      });
    })
    
    .delete(function (req, res){
      let body = req.body;
      schemaDelete(body).then((d) => {
        res.status(200).json(d);
      });
    });
    
};
