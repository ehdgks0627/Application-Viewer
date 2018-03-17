import PASSWORD from '../password.js';
import express from 'express';
import path from 'path';
import axios from 'axios';
import { db } from './connection';
import Application from '../models/Application';

let router = express.Router();

router.get('/sync', function(req, res) {
    axios.post('http://layer7.kr/2018/apply/api.php',
        'password=' + PASSWORD)
        .then((response) => {
            let data = response.data;
            data.forEach((currentValue) => {
                let column = {
                    sid: currentValue.sid,
                    name: currentValue.name,
                    pnumber: currentValue.pnumber,
                    email: currentValue.email,
                    hobby: currentValue.hobby,
                    strong: currentValue.strong,
                    study: currentValue.study,
                    profile: currentValue.profile,
                    last: currentValue.last
                };

                let application = new Application(column);

                application.save(function(err, data) {
                    if(err) {
                        console.log("Some error occurred while creating the Application. (sid : " + currentValue.sid + ")");
                    }
                });
            });
            res.send({message: "Success"});
        });
});

router.get('/', function(req, res) {
    Application.find({}, { name: 1, sid: 1, photo: 1 }, function(err, applications){
        if(err) {
            console.log(err);
            res.status(500).send({message: "Some error occurred while retrieving applications."});
        } else {
            res.send(applications);
        }
    });
});

router.get('/:_id', function(req, res) {
    Application.findById(req.params._id, function(err, application) {
        if(err) {
            console.log(err);
            res.status(500).send({message: "Some error occurred while retrieving applications."});
        } else {
            if(application)
            {
                res.send(application);
            }
            else
            {
                return res.status(404).send({message: "Application not found with id " + req.params._id});
            }
        }
    });
});

router.get('/start/:_id', function(req, res) {
    Application.findById(req.params._id, function(err, application) {
        if(err) {
            console.log(err);
            if(err.kind === 'ObjectId') {
                return res.status(404).send({message: "Application not found with id " + req.params._id});
            }
            return res.status(500).send({message: "Error finding application with id " + req.params._id});
        }

        if(!application) {
            return res.status(404).send({message: "Application not found with id " + req.params._id});
        }
        if(!application.startTime) {
            application.startTime = Date.now();
        }

        application.save(function(err, data){
            if(err) {
                res.status(500).send({message: "Could not update application with id " + req.params._id});
            } else {
                res.send({startTime: data.startTime, _id: data._id});
            }
        });
    });
});

router.get('/end/:_id', function(req, res) {
    Application.findById(req.params._id, function(err, application) {
        if(err) {
            console.log(err);
            if(err.kind === 'ObjectId') {
                return res.status(404).send({message: "Application not found with id " + req.params._id});
            }
            return res.status(500).send({message: "Error finding application with id " + req.params._id});
        }

        if(!application) {
            return res.status(404).send({message: "Application not found with id " + req.params._id});
        }

        if(!application.endTime) {
            application.endTime = Date.now();
        }

        application.save(function(err, data){
            if(err) {
                res.status(500).send({message: "Could not update application with id " + req.params._id});
            } else {
                res.send({endTime: data.endTime, _id: data._id});
            }
        });
    });
});

router.post('/', function(req, res) {
    if(!req.body.sid) {
        return res.status(400).send({message: "Application sid can not be empty"});
    }

    let data = {
        sid: req.body.sid,
        name: req.body.name,
        pnumber: req.body.pnumber,
        email: req.body.email,
        hobby: req.body.hobby,
        strong: req.body.strong,
        study: req.body.study,
        profile: req.body.profile,
        last: req.body.last
    };

    let application = new Application(data);

    application.save(function(err, data) {
        if(err) {
            console.log(err);
            res.status(500).send({message: "Some error occurred while creating the Application."});
        } else {
            res.send(data);
        }
    });
});

router.delete('/:_id', function(req, res) {
    Application.findByIdAndRemove(req.params._id, function(err, application) {
        if(err) {
            console.log(err);
            if(err.kind === 'ObjectId') {
                return res.status(404).send({message: "Application not found with id " + req.params._id});
            }
            return res.status(500).send({message: "Could not delete application with id " + req.params._id});
        }

        if(!application) {
            return res.status(404).send({message: "Application not found with id " + req.params._id});
        }

        res.send({message: "Application deleted successfully!"});
    });
});

export default router;
