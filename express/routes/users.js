var express = require('express');
var router = express.Router();

router.get('/userlist', function (req, res) {
  var db = req.db;

  var collection = db.get('userlist');
  collection.find({}, {}, function (e, docs) {
    // res.render('userlist', {
    //   "userlist": docs
    // });
    res.json(docs);
  });
});

/* POST add user */
router.post('/adduser', function (req, res) {

  var db = req.db;

  var userName = req.body.username;
  var userEmail = req.body.useremail;
  var userFullName = req.body.userfullname;
  var userAge = req.body.userage;
  var userLocation = req.body.userlocation;
  var userGender = req.body.usergender;
  var actionType = req.body.actiontype;
  var updateId = req.body.updateid;

  var collection = db.get('userlist');

  switch (actionType) {
    case 'edit':

      collection.update({ '_id' : updateId }, { $set : {
        "username": userName,
        "email": userEmail,
        "fullname": userFullName,
        "age": userAge,
        "location": userLocation,
        "gender": userGender
      }}, function (err) {
        if (err) {
          console.log(err);
          res.send("Il y a eu un problème pour mettre à jour cet utilisateur");
        }
        else {
          res.redirect("userlist");
        }
      });
      break;
    case 'add':
    default:
      collection.insert({
        "username": userName,
        "email": userEmail,
        "fullname": userFullName,
        "age": userAge,
        "location": userLocation,
        "gender": userGender
      }, function (err, doc) {
        if (err) {
          res.send("Il y a eu un problème pour ajouter cet utilisateur");
        }
        else {
          res.redirect("userlist");
        }
      });
      break;
    }
  });

// DELETE USER
router.get('/deleteuser/:id', function(req, res) {
  var db = req.db;
  var collection = db.get('userlist');
  var userToDelete = req.params.id;
  collection.remove({ '_id' : userToDelete }, function(err) {
    if (err) {
      res.send("Il y a eu un problème pour supprimer cet utilisateur");
    }
    else {
      res.redirect("/users/userlist");
    }
  })
})

router.get('/:id', function (req, res) {
  var db = req.db;
  var userToFind = req.params.id;
  var collection = db.get('userlist');
  collection.findOne({ "_id": userToFind }, {}, function (e, docs) {
    res.json(docs);
  });
});

module.exports = router;
