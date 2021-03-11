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
                return done(null, false, { success: 0, message: 'Incorrect email.' });
            }
            if (! user.verifyPassword(password)) {
                return done(null, false, { success: 0, message: 'Incorrect password.' });
            }
            return done(null, {id:user.id, name: user.name, email: user.email, uid: user.uid});
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

    if (req.user) {
        return next()
    } else {
        return res.redirect(process.env.SERVER_URL+'/login')
    } 
}
const hasRight = (req, res, next) => {
    //check id in req same as id in session 
    //(id is the uid generated by mongo)
    if (req.user && req.user.id === req.body.id) {
        return next()
    } else {
        return res.send({success:0, message: "You do not have the right to access"})
    }
}

module.exports = {passport, isAuth, hasRight}