import application from  './api/application';
import { io } from '../server';
import express from 'express';
import fs from 'fs';
import formidable from 'formidable';
import path from 'path';

let router = express.Router();

const Application = require('../models/Application');
const FILES_PATH = '/assets/files/';

router.use('/application', application);


//upload file
router.post('/upload', function(req, res){

  // create an incoming form object
  let form = new formidable.IncomingForm();
  form.maxFileSize = 128 * 1024 * 1024; // 128MB

  // specify that we want to allow the user to upload multiple files in a single request
  form.multiples = true;

  // store all uploads in the /uploads directory
  form.uploadDir = path.join(__dirname, '../../public' + FILES_PATH);

  // every time a file has been uploaded successfully,
  // rename it to it's orignal name
  form.on('file', function(field, file) {
    const savePath = field + path.extname(file.name);
    fs.rename(file.path, path.join(form.uploadDir, savePath));

    Application.findById(field, function(err, application) {
        if(err) {
            console.log(err);
            if(err.kind === 'ObjectId') {
                return;
            }
            return;
        }

        if(!application) {
            return;
        }

        application.photo = FILES_PATH + field + path.extname(file.name);

        application.save(function(err, data){
            if(!err) {
                io.emit('photoUploaded', {photo: data.photo, _id: data._id});
            }
        });
    });


  });

  // log any errors that occur
  form.on('error', function(err) {
    console.log('An error has occured: \n' + err);
  });

  // once all the files have been uploaded, send a response to the client
  form.on('end', function() {
    res.end('success');
  });

  // parse the incoming request containing the form data
  form.parse(req);

});

module.exports = router;
