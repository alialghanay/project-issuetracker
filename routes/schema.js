const mongoose = require('mongoose');
const c1Schema = new mongoose.Schema({
    issue_title: {
        type: String,
        required: true
    },
    issue_text: {
        type: String,
        required: true
    },
    created_on: {
        type: Date,
        default: Date,
        immutable: true
    },
    updated_on: Date,
    created_by: {
        type: String,
        required: true
    },
    assigned_to: String,
    open: {
        type: Boolean,
        default: true
    },
    status_text: {
        type: String,
        default: ""
    },
    project: {
        type: String,
        default: ""
    }
  });

  module.exports = mongoose.model('c1', c1Schema);