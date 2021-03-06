var
  User = require('../models/User.js'),
  passport = require('passport')

module.exports = {
  profile: function(req,res){
    User.findOne({_id: req.params.id}, function(err,user){
      if(err) console.log(err)
      console.log(user)
      res.render('profile', {user:user})
      console.log(req.user)

    })
  },

facebookEmail: passport.authenticate('facebook',{ scope: ['email']}),

faceBookLogin:
   passport.authenticate('facebook',{
     successRedirect: '/',
     failureRedirect: '/'
   }),

faceBookLogout: function(req,res){
  req.logout()
  res.redirect('/')

  },

  twitterEmail: passport.authenticate('twitter',{ scope: ['email']}),

  twitterLogin:
    passport.authenticate('twitter', {
    successRedirect: '/',
    failureRedirect: '/'
  }),

  twitterLogout: function(req,res){
    req.logout()
    res.redirect('/')
  },


checkLogin: function loggedIn(req,res,next){
    if (req.isAuthenticated())
    return next()

    res.redirect('/')
  }
}
