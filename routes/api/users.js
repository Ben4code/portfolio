const express = require('express');
const router = express.Router();
const User = require('../../models/Users')
const { register, login, mail } = require('../../validation/index');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const passport = require('passport');
const keys = require('../../config/keys');
const nodemailer = require('nodemailer')



//POST api/users/register Public
router.post('/register', (req, res) => {
    const checkUser = {
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        confirmPassword: req.body.confirmPassword,
        avatar: req.files.avatar
    }

    //Validation
    const { valid, errors } = register(checkUser);
    if (!valid) return res.status(400).json(errors);

    //Check if email already exists
    User.findOne({ email: req.body.email })
        .then(user => {
            if (user) {
                res.status(400).json({ email: "Email field already exists" });
            } else {
                
                
                const newUser = new User({
                    name: req.body.name,
                    email: req.body.email,
                    password: req.body.password,
                    isAdmin: req.body.isAdmin,
                    avatar:  `img/uploads/${req.files.avatar[0].filename}` 
                });
                console.log(newUser.avatar);
                
                //---- New Bcrypt code -------
                bcrypt.genSalt(10, (err, salt) => {
                    bcrypt.hash(newUser.password, salt, (err, hash) => {
                        // Store hash in your password DB.
                        newUser.password = hash;
                        newUser.save()
                            .then(savedUser => res.json(savedUser))
                            .catch(err => console.log(err))
                    });
                });
            }
        })
})


//POST api/users/login Public
router.post('/login', (req, res) => {
    const checkUser = {
        email: req.body.email,
        password: req.body.password,
    }

    //Validation
    const { valid, errors } = login(checkUser);
    if (!valid) return res.status(400).json(errors);

    //Check if email already exists in db
    User.findOne({ email: checkUser.email })
        .then(user => {
            if (!user) {
                return res.status(404).json({ error: "Inorrect login credentials" })
            } else {
                //Check Password
                bcrypt.compare(checkUser.password, user.password)
                    .then(isMatch => {
                        if (isMatch) {
                            //User Matched
                            const payload = {
                                id: user.id,
                                name: user.name,
                                avatar: user.avatar
                            }
                            //Match User
                            jwt.sign(payload, keys.secretOrKey, { expiresIn: 86400 }, (err, token) => {
                                res.status(200).json({
                                    success: true,
                                    token: `Bearer ${token}`
                                })
                            });
                        } else {
                            return res.status(400).json({ errors: "Password is incorrect" });
                        }
                    })
            }
        })

});

//GET api/users/login Private
router.get('/authuser', passport.authenticate('jwt', { session: false }), (req, res) => {
    res.json({
        id: req.user.id,
        name: req.user.name,
        email: req.user.email,
        avatar: req.user.avatar
    });
});


//Send Mail
router.post('/mail', (req, res) => {

    const checkUser = {
        name: req.body.name,
        email: req.body.email,
        message: req.body.message,
    }

    //Validation
    const { valid, errors } = mail(checkUser);
    if (!valid) return res.status(400).json(errors);


    let output = `
        <h3>You have a new contact request from hello@benobioha.me</h3>
        <p>Contact details</p>
        <ul>
            <li>Name: ${req.body.name}</li>
            <li>Email: ${req.body.email}</li>
            <h4>Message: </h4>
            <p>${req.body.message}</p>
        </ul>
    `;


    let transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'nbjezzy@gmail.com',
            pass: 'Degivenchy02@',
        },
        
        // host: 'smtp.zoho.com',
        // port: 465,
        // secure: true, // true for 465, false for other ports
        // auth: {
        //     user: 'hello@benobioha.me',
        //     pass: 'Degivenchy01@',
        // },
        tls: {
            rejectUnauthorized: false
        }
    });

    // setup email data with unicode symbols
    let mailOptions = {
        //from: '"'+ req.body.name +'" <'+ req.body.email +'>', // sender address
        from: 'nbjezzy@gmail.com',
        to: 'nbjezzy@gmail.com', // list of receivers
        subject: "Mail from Benobioha.com", // Subject line
        html: output // html body
    };

    // send mail with defined transport object
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return console.log(error);
        }
        console.log('Message sent: %s', info.messageId);
        console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));

        res.redirect('/');
    });

})



module.exports = router;