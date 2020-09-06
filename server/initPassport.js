const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy;
const User = require('./model/User')


passport.use(new LocalStrategy({
        usernameField: 'email',
        passwordField: 'password'
    },
    function(email, password, done) {
        User.findOne({ email: email }, function(err, user) {
            if (err) { return done(err); }
            if (!user) {
                return done(null, false, { success: 0, message: 'Incorrect username.' });
            }
            if (! user.verifyPassword(password)) {
                return done(null, false, { success: 0, message: 'Incorrect password.' });
            }
            return done(null, user);
        });
    }
));

passport.serializeUser(function(user, done) {
    done(null, user.id); 
});

passport.deserializeUser(function(id, done) {
    User.findById(id, function(err, user) {
        done(err, user);
    });
});

const isAuth = (req, res, next) => {
    return next()
    /*
    if (req.user) {
        return next()
    } else {
        return res.redirect('/login')
    }
    */
}

module.exports = {passport, isAuth}