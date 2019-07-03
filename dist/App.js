"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const formData = require("express-form-data");
const bodyParser = require("body-parser");
const swaggerUi = require("swagger-ui-express");
const swaggerJSDoc = require("swagger-jsdoc");
const session = require("express-session");
const helmet = require("helmet");
const morgan = require("morgan");
const os = require("os");
const routers_1 = require("./routers");
const auth_controller_1 = require("./controllers/auth.controller");
class App {
    constructor() {
        this.express = express();
        this.config();
        this.initSwagger();
        this.setAccessControl();
        this.mountRoutes();
    }
    setAccessControl() {
        this.express.use((req, res, next) => {
            // Website you wish to allow to connect
            res.setHeader('Access-Control-Allow-Origin', '*');
            // Request methods you wish to allow
            res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
            // Request headers you wish to allow
            res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,Accept,Content-Type,Authorization');
            // Set to true if you need the website to include cookies in the requests sent
            // to the API (e.g. in case you use sessions)
            res.setHeader('Access-Control-Allow-Credentials', true);
            // Pass to next layer of middleware
            next();
        });
    }
    mountRoutes() {
        this.express.get('/', (req, res) => {
            res.setHeader('Content-Type', 'text/plain');
            res.status(200).send('OK');
        });
        this.express.use(`${process.env.API_BASE}/`, routers_1.SiteRouter);
        this.express.use(`${process.env.API_BASE}/users/`, routers_1.UserRouter);
        this.express.use(`${process.env.API_BASE}/tickets`, routers_1.TicketRouter);
        // handle 404
        this.express.use((req, res) => {
            res.status(404).send('404: Page not Found');
        });
        // handle 500
        this.express.use((err, req, res) => {
            console.log(`Error: ${err}`);
            res.status(500).send('500: Internal Server Error');
        });
    }
    config() {
        this.express.use(helmet());
        this.express.use(bodyParser.json());
        this.express.use(bodyParser.urlencoded({ extended: false }));
        // initialize formdata
        const options = {
            uploadDir: os.tmpdir(),
            autoClean: true
        };
        // parse data with connect-multiparty.
        this.express.use(formData.parse(options));
        // clear from the request and delete all empty files (size == 0)
        this.express.use(formData.format());
        // change file objects to stream.Readable
        this.express.use(formData.stream());
        // union body and files
        this.express.use(formData.union());
        // initialize passport
        this.express.use(auth_controller_1.default.initialize());
        // initialize session
        const sess = {
            secret: process.env.SESS_SECRET,
            saveUninitialized: true,
            resave: false,
            cookie: {
                secure: false
            }
        };
        if (this.express.get('env') === 'production') {
            this.express.set('trust proxy', 1); // trust first proxy
            sess.cookie.secure = true; // serve secure cookies
        }
        this.express.use(session(sess));
        this.express.use(morgan(':remote-addr :date[iso] ":method :url HTTP/:http-version" :status :res[content-length] :response-time ms'));
    }
    initSwagger() {
        // swagger definition
        const swaggerDefinition = {
            info: {
                title: 'Node Swagger API',
                version: '1.0.0',
                description: 'Hello i am swagger. I am one step ahead of postman. My job is to provide API description.',
            },
            host: `${process.env.SWAGGER_HOST}`,
            basePath: '/api/v1/',
            schemes: [
                'http',
                'https'
            ]
        };
        // options for swagger jsdoc
        const options = {
            swaggerDefinition,
            apis: ['dist/routers/*.routes.js'],
        };
        const swaggerSpec = swaggerJSDoc(options);
        this.express.use('/swagger.json', (req, res) => {
            res.setHeader('Content-Type', 'application/json');
            res.send(swaggerSpec);
        });
        this.express.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
    }
}
exports.default = new App().express;
//# sourceMappingURL=App.js.map