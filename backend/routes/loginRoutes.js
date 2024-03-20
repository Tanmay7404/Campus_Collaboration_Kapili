const express = require('express');
const loginRouter = express.Router();
const mongoose = require('mongoose');
const msal = require('@azure/msal-node');

const UserModel = require("../models/userModel");
// const GoogleStrategy = require('passport-google-oauth20').Strategy;

let user;

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



const msalConfig = {
    auth: {
        clientId: 'f33b06ab-53bf-49cf-b257-dc1188511391',
        authority: 'https://login.microsoftonline.com/850aa78d-94e1-4bc6-9cf3-8c11b530701c',
        clientSecret: 'F6J8Q~tSsV4.LyzpsYOUnf2-WDwenXqkDFq6NcPY'
    }
};

const msalClient = new msal.ConfidentialClientApplication(msalConfig);

const SCOPES = ['user.read', 'contacts.read', 'mail.read', 'openid', 'profile', 'offline_access'];


// passport.use('azure-ad', new CustomStrategy(
//     async (req, done) => {
//         const tokenRequest = {
//             code: req.query.code,
//             scopes: SCOPES,
//             redirectUri: 'http://localhost:8080/explore',
//         };
//         try {
//             const response = await msalClient.acquireTokenByCode(tokenRequest);
//             console.log(response);
//             // user = await saveDataToDatabase(response);
//             done(null, user);
//         } catch (error) {
//             done(error);
//         }
//     }
// ));




loginRouter.get('/auth_outlook',
    (req, res,next) => {
        
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



loginRouter.get('/explore',async (req, res) => {
    const tokenRequest = {
        code: req.query.code,
        scopes: SCOPES,
        redirectUri: 'http://localhost:8080/explore',
    };
    try {
    const response = await msalClient.acquireTokenByCode(tokenRequest);
    try {

        user=await saveDataToDatabase(response);
        if(user.username==null){
            console.log(1);
            const encodedEmail = encodeURIComponent(user.email);
            const encodedFullName = encodeURIComponent(user.fullname);
            res.redirect(`http://localhost:3000/createProfile/${encodedEmail}/${encodedFullName}`);
            
        }
        else{
            console.log(2);
            const encodedUsername = encodeURIComponent(user.username);
            res.redirect(`http://localhost:3000/sucesslogin/${encodedUsername}`);
        }
    } catch (error) {
        console.log(error);
        res.status(500).send('Failed : ' + error);
        // res.redirect('/redirect'); // Redirect to login on token refresh failure
    }

} catch (error) {
    res.status(500).send(`Authentication failed: ${error}`);
}
});




















// loginRouter.get('/explore',
//     passport.authenticate('azure-ad', { failureRedirect: 'http://localhost:3000/chat' }),
    
//     (req, res) => {
        
//         if(user.username==null){
//             console.log(1);
//             const encodedEmail = encodeURIComponent(user.email);
//             const encodedFullName = encodeURIComponent(user.fullName);
//             res.redirect(`http://localhost:3000/createProfile/${encodedEmail}/${encodedFullName}`);
//         }
//         else{
//             console.log(2);
//             const encodedUsername = encodeURIComponent(user.username);
//             res.redirect(`http://localhost:3000/sucesslogin/${encodedUsername}`);
//         }
        
//     }
// );








loginRouter.get('/logout', (req, res) => {
    if (req.session) {
        req.session.destroy((err) => {
            if (err) {
                console.error("Error destroying session:", err);
                return res.status(500).send("Failed to logout");
            }
            res.clearCookie('connect.sid', { path: '/' });
            const logoutUrl = `https://login.microsoftonline.com/common/oauth2/v2.0/logout?post_logout_redirect_uri=${encodeURIComponent('http://localhost:3000/login')}`;
            res.redirect(logoutUrl);
        });
    } else {
        const logoutUrl = `https://login.microsoftonline.com/common/oauth2/v2.0/logout?post_logout_redirect_uri=${encodeURIComponent('http://localhost:3000/login')}`;
        res.redirect(logoutUrl);
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
    console.log(user.fullname);
    return user;
}

// async function saveDataToDatabase(tokenResponse) {
//     // console.log(tokenResponse);

//     let existingUser = await UserModel.findOne({ email: tokenResponse.account.username});
//     if (!existingUser) {
//         existingUser =new UserModel ({
//             username: null,
//             email: tokenResponse.account.username,
//             fullname: tokenResponse.account.name
//         });
//     }
//     await existingUser.save();
//     return existingUser;
// }







module.exports = loginRouter;