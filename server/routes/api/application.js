let express = require('express');
let path = require('path');
let router = express.Router();

let db = require('../connection');

const Application = require('../../models/Application');

router.get('/sync', function(req, res) {
  //TODO sync with layer7 db

  res.end();
});

router.get('/', function(req, res) {
  Application.find(function(err, applications){
      if(err) {
          console.log(err);
          res.status(500).send({message: "Some error occurred while retrieving applications."});
      } else {
        //TODO filter
          res.send(applications);
      }
  });
});

router.get('/:sid', function(req, res) {
    Application.findById(req.params.sid, function(err, application) {
      if(err) {
          console.log(err);
          res.status(500).send({message: "Some error occurred while retrieving applications."});
      } else {
        //TODO filter
          res.send(application);
      }
    });
});

router.get('/start/:sid', function(req, res) {
  Application.findById(req.params.sid, function(err, application) {
      if(err) {
          console.log(err);
          if(err.kind === 'ObjectId') {
              return res.status(404).send({message: "Application not found with id " + req.params.sid});
          }
          return res.status(500).send({message: "Error finding application with id " + req.params.sid});
      }

      if(!application) {
          return res.status(404).send({message: "Application not found with id " + req.params.sid});
      }

      application.startTime = new Date();

      application.save(function(err, data){
          if(err) {
              res.status(500).send({message: "Could not update application with id " + req.params.sid});
          } else {
              res.send({message: "Application started successfully!"});
          }
      });
  });
});

router.get('/end/:sid', function(req, res) {
  Application.findById(req.params.sid, function(err, application) {
      if(err) {
          console.log(err);
          if(err.kind === 'ObjectId') {
              return res.status(404).send({message: "Application not found with id " + req.params.sid});
          }
          return res.status(500).send({message: "Error finding application with id " + req.params.sid});
      }

      if(!application) {
          return res.status(404).send({message: "Application not found with id " + req.params.sid});
      }

      application.endTime = new Date();

      application.save(function(err, data){
          if(err) {
              res.status(500).send({message: "Could not update application with id " + req.params.sid});
          } else {
              res.send({message: "Application ended successfully!"});
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

    var application = new Application(data);

    application.save(function(err, data) {
        if(err) {
            console.log(err);
            res.status(500).send({message: "Some error occurred while creating the Application."});
        } else {
            res.send(data);
        }
    });
});

router.delete('/:sid', function(req, res) {
  Application.findByIdAndRemove(req.params.sid, function(err, application) {
        if(err) {
            console.log(err);
            if(err.kind === 'ObjectId') {
                return res.status(404).send({message: "Application not found with id " + req.params.sid});
            }
            return res.status(500).send({message: "Could not delete application with id " + req.params.sid});
        }

        if(!application) {
            return res.status(404).send({message: "Application not found with id " + req.params.sid});
        }

        res.send({message: "Application deleted successfully!"});
    });
});

module.exports = router;
