import application from  './application';
import upload from './upload';
import express from 'express';

let router = express.Router();

const FILES_PATH = '/assets/files/';

router.use('/application', application);

//upload file
router.use('/upload', upload);

export default router;
