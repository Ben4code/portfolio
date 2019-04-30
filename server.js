const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const server = require('./config/keys');
const bodyParser = require('body-parser')
const multer = require('multer');
const passport = require('passport');

//Import Routes
const users = require('./routes/api/users');
const posts = require('./routes/api/posts');
const profile = require('./routes/api/profile');
const app = express();

// --------- Mongoose Config -----------
mongoose.connect(server.Db, {useNewUrlParser: true})
.then(()=> console.log('MongoDB connected'))
.catch((err)=> console.log(err))


// ---------------- Middleware --------------------//
//Multer Config
const fileStorage = multer.diskStorage({
    destination: (req, file, cb) =>{
        //cb(null, `images`)
        cb(null, `client/public/img/uploads`)
    },
    filename: (req, file, cb) => {
        cb(null, new Date().toISOString().replace(/:/g, '-') + '-' + file.originalname);
    }
});
const fileFilter = (req, file, cb) =>{
    if(file.mimetype === 'image/jpg' || file.mimetype === 'image/png' || file.mimetype === 'image/jpeg'){
        return cb(null, true);
    }
    return cb(null, false);
}
//app.use(multer({storage: fileStorage, fileFilter}).single('avatar'));
app.use(multer({storage: fileStorage, fileFilter}).fields([{ name: 'avatar', maxCount: 1 }, { name: 'postImg', maxCount: 8 }]));

//Body Parser
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

// -----Passport Middleware ------
app.use(passport.initialize());
//Passport config strategy
require('./config/passport')(passport);

// ----- Router middleware --------
app.use('/api/users', users);
app.use('/api/posts', posts);
app.use('/api/profile', profile);

//Serve static assests if in production
if(process.env.NODE_ENV === "production"){
    //Set static folder
    app.use(express.static('client/build'));   
    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
    })
}

//Port setup
const port = process.env.PORT || 4500;
app.listen(port, ()=> {console.log(`App listeneing on port ${port}`)});