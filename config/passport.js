var

  passport = require('passport'),
  FacebookStrategy = require('passport-facebook').Strategy,
  User = require('../models/User.js'),
  configAuth = require('./auth.js')


passport.serializeUser(function(user, done){
  done(null, user.id)
})

passport.deserializeUser(function(id,done){
  User.findById(id, function (err,user){
    done(err, user)
  })
})
//////////Strategy for creating users:


passport.use(new FacebookStrategy({

  clientID: configAuth.facebook.clientID,
  clientSecret: configAuth.facebook.clientSecret,
  callbackURL: configAuth.facebook.callbackURL,
  profileFields: configAuth.facebook.profileFields
}, function(token,refreshToken,profile,done){
User.findOne({'facebook.id': profile.id},function(err,user){
if (err) return done(err)
if(user) return done(null,user)
var newUser = new User()
newUser.facebook.id = profile.id
newUser.facebook.token = token
newUser.facebook.name = profile.displayName
newUser.facebook.email = profile.emails[0].value
newUser.save(function(err){
  if(err) return console.log(err)
  return done(null,newUser)

    })
  })
}))




module.exports = passport
