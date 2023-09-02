const chaiHttp = require('chai-http');
const chai = require('chai');
const assert = chai.assert;
const server = require('../server');

chai.use(chaiHttp);
let id1 = '64f07a79e4292e67209751cb';
let id2 = '64f07a7f44441d337cdc7951';
suite('Functional Tests', function() {
    test('Every field filled in', function(done) {
        chai.request(server)
         .post('/api/issues/test')
         .send({
           issue_title: 'Title',
           issue_text: 'text',
           created_by: 'Functional Test - Every field filled in',
           assigned_to: 'Chai and Mocha',
           status_text: 'In QA'
         })
         .end(function(err, res){
           assert.equal(res.status, 200);
           assert.equal(res.body.issue_title, 'Title')
           assert.equal(res.body.issue_text, 'text')
           assert.equal(res.body.created_by, 'Functional Test - Every field filled in')
           assert.equal(res.body.assigned_to, 'Chai and Mocha')
           assert.equal(res.body.status_text, 'In QA')
           assert.equal(res.body.project, 'test')
           id1 = res.body._id
           console.log('id 1 has been set as ' + id1)
           done();
         });
       });
       
       test('Required fields filled in', function(done) {
        chai.request(server)
        .post('/api/issues/test')
        .send({
          issue_title: 'Title',
          issue_text: 'text',
          created_by: 'Functional Test - Every field filled in',
        })
        .end(function(err, res){
          assert.equal(res.status, 200);
          assert.equal(res.body.issue_title, 'Title')
          assert.equal(res.body.issue_text, 'text')
          assert.equal(res.body.created_by, 'Functional Test - Every field filled in')
          assert.equal(res.body.assigned_to, '')
          assert.equal(res.body.status_text, '')
          assert.equal(res.body.project, 'test')
          done();
        });
    });

    test('Missing required fields', function(done) {
        chai.request(server)
        .post('/api/issues/test')
        .send({
          issue_title: 'Title'
        })
        .end(function(err, res){
          assert.deepEqual(res.body, { error: 'required field(s) missing' })
            done()
        });
      });

      test('No body', function(done) {
        chai.request(server)
        .put('/api/issues/test')
        .send({
        })
        .end(function(err, res){
          assert.equal(res.body, 'no updated field sent')
          done()
        });
      });

      test('Multiple fields to update', function(done) {
        chai.request(server)
        .put('/api/issues/test')
        .send({
          _id: id2,
          issue_title: 'new title test',
          issue_text: 'new text'
        })
        .end(function(err, res){
          assert.equal(res.body, 'successfully updated')
          done()
        });
      });

      test('No _id', function(done) {
        chai.request(server)
        .delete('/api/issues/test')
        .send({
        })
        .end(function(err, res){
          assert.equal(res.body, 'id error')
          done()
        });
      });

      test('Valid _id', function(done) {
        chai.request(server)
        .delete('/api/issues/test')
        .send({
          _id: id1
        })
        .end(function(err, res){
          assert.equal(res.body, 'deleted '+ id1)
        });
        chai.request(server)
        .delete('/api/issues/test')
        .send({
          _id: id2
        })
        .end(function(err, res){
          assert.equal(res.body, 'deleted '+ id2)
          done()
        });
      });
});
