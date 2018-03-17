import express from 'express';
import path from 'path';
import formidable from 'formidable';
import fs from 'fs';
import Application from '../models/Application';
import { io } from '../server';

const FILES_PATH = '/assets/files/';

let router = express.Router();

router.post('/', function(req, res){

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
        const fileName = `${field}_${Date.now()}${path.extname(file.name)}`;
        fs.rename(file.path, path.join(form.uploadDir, fileName));

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

            application.photo = `${FILES_PATH}${fileName}`;

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

export default router;
