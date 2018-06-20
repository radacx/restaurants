import * as express from "express";
import {json} from "body-parser";
import {Express, Request, Response} from "express";
import { config } from 'dotenv';
const { Querystring } = require('request/lib/querystring.js');
import { unescape } from 'querystring';

Querystring.prototype.unescape = (val: any) => unescape(val);

const PORT = process.env.PORT || 8080;
export let dbUrl: string;

if (process.env.VCAP_SERVICES) {
  dbUrl = JSON.parse(process.env.VCAP_SERVICES!).cloudantNoSQLDB[0].credentials.url;
} else {
  config();
  dbUrl = process.env.DB_URL!;
}

/**
 * Basic configurations of all middleware libraries are applied here.
 */
export class Server {

    public static start() {

        const app: Express = express();

        // Decode payload as json with body-parser
        app.use(json());

        // Set headers for CORS requests
        // TODO: Adjust these settings to your security concerns!
        app.use((req: Request, res: Response, next: any) => {
            res.setHeader("Access-Control-Allow-Origin", "*");
            res.setHeader("Access-Control-Allow-Methods", "*");
            res.setHeader("Access-Control-Allow-Headers", "*");
            next();
        });

        app.use(express.static(`${__dirname}/app`));

        app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
    }
}

Server.start();
