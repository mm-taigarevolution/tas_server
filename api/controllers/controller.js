'use strict';

var mongoose = require('mongoose'),
User = mongoose.model('user');

exports.get_all_users = function(req, res) 
{
  User.find({}, function(err, resp) 
  {
    if (err)
      res.send(err);
    res.json(resp);
  });
};

exports.create_user = function(req, res) 
{
  var user = new User(req.body);
  user.save(function(err, resp) 
  {
    if (err)
      res.send(err);
    res.json(resp);
  });
};

exports.get_user_by_id = function(req, res) 
{
  User.findById(req.params.id, function(err, resp) 
  {
    if (err)
      res.send(err);
    res.json(resp);
  });
};

exports.update_user_by_id = function(req, res) 
{
  User.findOneAndUpdate({user_id: req.params.id}, req.body, {new: true}, function(err, resp) {
    if (err)
      res.send(err);
    res.json(resp);
  });
};

exports.delete_user_by_id = function(req, res) 
{
   User.remove({user_id: req.params.id}, function(err, resp) 
   {
    if (err)
      res.send(err);
    res.json(resp);
  });
};
