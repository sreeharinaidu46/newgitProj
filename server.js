let express = require("express")
let mongoose = require('mongoose')
let cors = require('cors')
let path = require('path')
const { MONGO_URI } = require("./keys");

const port = process.env.PORT || 4000;


// const api = require('./backend/routes')

mongoose.connect(process.env.MONGODB_URI || MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true
});
mongoose.connection.on("connected", () => {
    console.log("mongodb is connected");
});

const app = express();
app.use(express.json())
app.use(cors());

app.use('/public', express.static('public'));

app.use('/api/users', require("./routes/student_route"))
app.use('/api/books', require("./routes/book_route"))
app.use('/api/issues', require("./routes/issue_route"))


if (process.env.NODE_ENV === 'production') {
    app.use('/', express.static('client/build'))

    app.get('*', (req, res) => {

        res.sendFile(path.resolve(__dirname, 'client/build/index.html'))

    })
}





app.use((req, res, next) => {
    // Error goes via `next()` method
    setImmediate(() => {
        next(new Error('Something went wrong'));
    });
});

app.use(function(err, req, res, next) {
    console.error(err.message);
    if (!err.statusCode) err.statusCode = 500;
    res.status(err.statusCode).send(err.message);
});

if (process.env.NODE_ENV === "production") {
    app.use(express.static('client/build'));
}


const server = app.listen(port, () => {
    console.log('Connected to port ' + port)
})

// "scripts": {
//     "client-install": "npm install --prefix client",

//     "install-client":"cd client && npm install",
//     "server": "nodemon server.js",
//     "client": "npm start --prefix client",
//     "dev": "concurrently \"npm run client\" \"npm run server\"",
//     "start": "node server.js",
//     "heroku-postbuild": "NPM_CONFIG_PRODUCTION=false npm install --prefix client && npm run build --prefix client"
// },