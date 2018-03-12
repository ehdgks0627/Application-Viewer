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
              res.send(data);
          }
      });
  });
  res.end();
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
              res.send(data);
          }
      });
  });
  res.end();
});

router.post('/', function(req, res) {
  //TODO
  if(!req.body.content) {
        return res.status(400).send({message: "Application can not be empty"});
    }

    let data = {
      sid: res.body.sid, //TODO check erro when sid is string?
      name: res.body.name,
      pnumber: res.body.pnumber,
      email: res.body.email,
      hobby: res.body.hobby,
      strong: res.body.strong,
      study: res.body.stduy,
      profile: res.body.profile,
      last: res.body.last
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
  res.end();
});

router.delete('/:sid', function(req, res) {
  //TODO
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
  res.end();
});

module.exports = router;
