const express = require('express');
const loginRouter = express.Router();
const mongoose = require('mongoose');
const msal = require('@azure/msal-node');
const passport = require('passport');
const CustomStrategy = require('passport-custom').Strategy;
const UserModel = require("../models/userModel");
// const GoogleStrategy = require('passport-google-oauth20').Strategy;


const session = require('express-session');

let user;

loginRouter.use(session({
    secret: 'tanmay_sushant_kriti@2024', // Replace 'your-secret-key' with your actual secret key
    resave: false,
    saveUninitialized: false
}));

// mongoose.connect("mongodb://localhost/msAuthDB")
//   .then(() => {
//     console.log("Connected to the database");
//   })
//   .catch((error) => {
//     console.error("Connection error:", error);
//   });

// const userSchema = new mongoose.Schema({
//     userId: String, 
//     email: String,
//     displayName: String,
// });

// const Data = mongoose.model('Data', userSchema);

// const GOOGLE_CLIENT_ID = '118639548077-0oplr1sl94flrhoa994mhjo42ha88vks.apps.googleusercontent.com';
// const GOOGLE_CLIENT_SECRET = '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';

const msalConfig = {
    auth: {
        clientId: 'f33b06ab-53bf-49cf-b257-dc1188511391',
        authority: 'https://login.microsoftonline.com/850aa78d-94e1-4bc6-9cf3-8c11b530701c',
        clientSecret: 'F6J8Q~tSsV4.LyzpsYOUnf2-WDwenXqkDFq6NcPY'
    }
};

const msalClient = new msal.ConfidentialClientApplication(msalConfig);

const SCOPES = ['user.read', 'contacts.read', 'mail.read', 'openid', 'profile', 'offline_access'];
// const SCOPES_google=['profile','email'];


// passport.use(new GoogleStrategy({
//     clientID: GOOGLE_CLIENT_ID,
//     clientSecret: GOOGLE_CLIENT_SECRET,
//     callbackURL: 'http://localhost:3000/after_google'
//   },
//   async function(accessToken, refreshToken, profile, done) {
//     let user=await saveDataToDatabase_google(profile);
//     return done(null, user);
//   }
// ));

passport.use('azure-ad', new CustomStrategy(
    async (req, done) => {
        const tokenRequest = {
            code: req.query.code,
            scopes: SCOPES,
            redirectUri: 'http://localhost:8080/explore',
        };
        try {
            const response = await msalClient.acquireTokenByCode(tokenRequest);
            console.log(response);
            // user = await saveDataToDatabase(response);
            done(null, user);
        } catch (error) {
            done(error);
        }
    }
));


passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
    done(null, user.id);
});

loginRouter.use(passport.initialize());

// loginRouter.get('/auth_google', (req, res) => {
//     passport.authenticate('google', { scope: SCOPES_google })(req, res);
// });

loginRouter.get('/auth_outlook',
    (req, res, next) => {
        
        const authUrlParameters = {
            scopes: SCOPES,
            redirectUri: 'http://localhost:8080/explore',
        };
        msalClient.getAuthCodeUrl(authUrlParameters)
            .then((authUrl) => {
                res.redirect(authUrl);
            })
            .catch((error) => {
                res.status(500).send(error);
            });
    }
);

loginRouter.get('/explore',
    passport.authenticate('azure-ad', { failureRedirect: 'http://localhost:3000/chat' }),
    
    (req, res) => {
        
        if(user.username==null){
            console.log(1);
            const encodedEmail = encodeURIComponent(user.email);
            const encodedFullName = encodeURIComponent(user.fullName);
            res.redirect(`http://localhost:3000/createProfile/${encodedEmail}/${encodedFullName}`);
        }
        else{
            console.log(2);
            const encodedUsername = encodeURIComponent(user.username);
            res.redirect(`http://localhost:3000/sucesslogin/${encodedUsername}`);
        }
        
    }
);

// loginRouter.get('/after_google',
//   passport.authenticate('google', { failureRedirect: 'http://localhost:3000/login' }),
//    async(req, res) => {
//     res.redirect('http://localhost:3000/homepage');
//   }
// );






loginRouter.get('/logout', async (req, res) => {
    console.log(req.session);

    if (req.session) {
        if(req.session.passport==null){
            res.redirect("http://localhost:3000/login");
        }
        else{
            // let user=await Data.findOne({_id:req.session.passport.user});
            // let method=user.from;
            req.session.destroy((err) => {
                if (err) {
                    console.error("Error destroying session:", err);
                    return res.status(500).send("Failed to logout");
                }
                res.clearCookie('connect.sid', { path: '/' });
                // if(method=="Google"){
                //     res.redirect('https://www.google.com/accounts/Logout?continue=https://appengine.google.com/_ah/logout?continue=http://localhost:3000/login');
                // }
                // else{
                    res.redirect(`https://login.microsoftonline.com/common/oauth2/v2.0/logout?post_logout_redirect_uri=${encodeURIComponent('http://localhost:3000/login')}`);
                    
                // }
            });
        }
    } else {
        res.redirect(`https://login.microsoftonline.com/common/oauth2/v2.0/logout?post_logout_redirect_uri=${encodeURIComponent('http://localhost:3000/login')}`);
       
    }
});


async function saveDataToDatabase(tokenResponse) {
    // console.log(tokenResponse);

    let existingUser = await UserModel.findOne({ email: tokenResponse.account.username});
    if (!existingUser) {
        user = {
            username: null,
            email: tokenResponse.account.username,
            fullname: tokenResponse.account.name
           
        };
    }
    else{
        user = {
            username: existingUser.username,
            email: existingUser.email,
            fullname: existingUser.fullname
        }
    }
    return existingUser;
}


// async function saveDataToDatabase_google(tokenResponse) {
//     // console.log(tokenResponse);
//         let existingUser = await Data.findOne({ userId: tokenResponse.id });
//         if (!existingUser) {
//             existingUser = new Data({
//                 userId: tokenResponse.id,
//                 email:tokenResponse.emails[0].value,
//                 displayName:tokenResponse.displayName,
//                 from:"Google",
//             });
           
//         }
//         await existingUser.save();
    
//     return existingUser;
// }

// loginRouter.get('http://localhost:3000/home', async (req, res) => {
//     console.log(req.session);
//     if(req.session.passport==null)
//     res.redirect("http://localhost:3000/login");
// else{
//     let user=await Data.findOne({_id:req.session.passport.user});
//     let method=user.from;
//     if(method=="Google"){
//         res.redirect("/auth_google");
//     }
//     else{
//         res.redirect("/auth_outlook");
//     }
// }
// });


module.exports = loginRouter;