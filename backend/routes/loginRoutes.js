const express = require("express");
const loginRouter = express.Router();
const msal = require('@azure/msal-node');



const msalConfig = {
    auth: {
        clientId: 'f33b06ab-53bf-49cf-b257-dc1188511391',
        authority: 'https://login.microsoftonline.com/850aa78d-94e1-4bc6-9cf3-8c11b530701c',
        clientSecret: 'F6J8Q~tSsV4.LyzpsYOUnf2-WDwenXqkDFq6NcPY'
    }
};
const msalClient = new msal.ConfidentialClientApplication(msalConfig);

const SCOPES = ['user.read', 'contacts.read', 'mail.read','openid','profile','offline_access'];

loginRouter.post("/auth",  (req, res) => {
    const authUrlParameters = {
        scopes: SCOPES,
        redirectUri: 'http://localhost:3000/after',
    };
    msalClient.getAuthCodeUrl(authUrlParameters)
        .then((authUrl) => {
            res.redirect(authUrl);
        })
        .catch((error) => {
            res.status(500).send(error);
        });

});



app.get('/after',async (req, res) => {
    const tokenRequest = {
        code: req.query.code,
        scopes: SCOPES,
        redirectUri: 'http://localhost:3000/after',
    };
    try {
    const response = await msalClient.acquireTokenByCode(tokenRequest);
    try {
        await saveDataToDatabase(response);
        let email_exist=await Email.findOne({email:response.account.username});
        if(!email_exist) {
            let email=new Email({email:response.account.username});
            await email.save();
            res.redirect('try');}
        else res.redirect('try');

    } catch (error) {
        console.log(error);
        res.status(500).send('Failed : ' + error);
        // res.redirect('/redirect'); // Redirect to login on token refresh failure
    }

} catch (error) {
    res.status(500).send(`Authentication failed: ${error}`);
}

});


const Data = mongoose.model('Data', userSchema);
const userSchema = new mongoose.Schema({
    userId: String, 
    email: String, //username
    displayName: String,//name
});

async function saveDataToDatabase(tokenResponse) {
    try {
        let existingUser = await Data.findOne({ userId: tokenResponse.account.homeAccountId });
        if (!existingUser) {
            existingUser = new Data({
                userId: tokenResponse.account.homeAccountId,
                email:tokenResponse.account.username,
                displayName:tokenResponse.account.name,
            });
           
        }
        await existingUser.save();
    } catch (err) {
        console.error(err);
        throw err;
    }
}

app.get('/logout', (req, res) => {
    if (req.session) {
        req.session.destroy((err) => {
            if (err) {
                console.error("Error destroying session:", err);
                return res.status(500).send("Failed to logout");
            }
            res.clearCookie('connect.sid', { path: '/' });
            const logoutUrl = `https://login.microsoftonline.com/common/oauth2/v2.0/logout?post_logout_redirect_uri=${encodeURIComponent('http://localhost:3000/try')}`;
            res.redirect(logoutUrl);
        });
    } else {
        const logoutUrl = `https://login.microsoftonline.com/common/oauth2/v2.0/logout?post_logout_redirect_uri=${encodeURIComponent('http://localhost:3000/try')}`;
        res.redirect(logoutUrl);
    }
});

app.listen(3000,()=>{
    console.log('BYE')
})


