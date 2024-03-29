const chaiHttp = require('chai-http');
const chai = require('chai');
const assert = chai.assert;
const server = require('../server');

chai.use(chaiHttp);
let id1;
let id2;
let wrongId = "637cf1861bbb2ccb953d2525";
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
           id1 = res.body._id;
           done();
         });
       });
       
       test('Required fields filled in', function(done) {
        chai.request(server)
        .post('/api/issues/test')
        .send({
          issue_title: 'Title2',
          issue_text: 'text2',
          created_by: 'Functional Test -Required fields filled in',
        })
        .end(function(err, res){
          assert.equal(res.status, 200);
          assert.equal(res.body.issue_title, 'Title2')
          assert.equal(res.body.issue_text, 'text2')
          assert.equal(res.body.created_by, 'Functional Test -Required fields filled in')
          assert.equal(res.body.assigned_to, '')
          assert.equal(res.body.status_text, '')
          assert.equal(res.body.project, 'test')
          id2 = res.body._id;
          done();
        });
    });

    test('GET request', function(done) {
      chai.request(server)
      .get('/api/issues/test')
      .end(function(err, res) {
        assert.typeOf(res.body, 'array');
        done();
      })
    });
    
    test('One filters', function(done) {
      chai.request(server)
      .get('/api/issues/test?issue_title=Title')
      .end(function(err, res) {
        assert.typeOf(res.body, 'array');
        done();
      })
    });

    test('multiple filters', function(done) {
      chai.request(server)
      .get('/api/issues/test?issue_title=Title&issue_text=text')
      .end(function(err, res) {
        assert.typeOf(res.body, 'array');
        done();
      })
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

      test('missing _id', function(done) {
        chai.request(server)
        .put('/api/issues/test')
        .send({
        })
        .end(function(err, res){
          assert.deepEqual(res.body, {error: 'missing _id'})
          done()
        });
      });

      test('No body', function(done) {
        chai.request(server)
        .put('/api/issues/test')
        .send({
          _id: id2
        })
        .end(function(err, res){
          assert.equal(res.body.error, 'no update field(s) sent')
          done()
        });
      });

      test('One field to update', function(done) {
        chai.request(server)
        .put('/api/issues/test')
        .send({
          _id: id2,
          issue_title: 'new title test'
        })
        .end(function(err, res){
          assert.deepEqual(res.body, {result: 'successfully updated', '_id': id2})
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
          assert.deepEqual(res.body, {result: 'successfully updated', '_id': id2})
          done()
        });
      });

      test('invalid _id: PUT', function(done) {
        chai.request(server)
        .put('/api/issues/test')
        .send({
          _id: wrongId,
          issue_title: 'new title test',
          issue_text: 'new text'
        })
        .end(function(err, res){
          assert.deepEqual(res.body, {error: 'could not update', '_id': wrongId})
          done()
        });
      });

      test('No _id', function(done) {
        chai.request(server)
        .delete('/api/issues/test')
        .send({
        })
        .end(function(err, res){
          assert.deepEqual(res.body, {"error": 'missing _id'})
          done()
        });
      });

      test('invalid _id: DELETE', function(done) {
        chai.request(server)
        .delete('/api/issues/test')
        .send({
          _id: wrongId
        })
        .end(function(err, res){
          assert.deepEqual(res.body, { error: 'could not delete', '_id': wrongId })
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
          assert.deepEqual(res.body, {result:'successfully deleted', _id: id1})
        });
        chai.request(server)
        .delete('/api/issues/test')
        .send({
          _id: id2
        })
        .end(function(err, res){
          assert.deepEqual(res.body, {result:'successfully deleted', _id: id2})
          done()
        });
      });
});
