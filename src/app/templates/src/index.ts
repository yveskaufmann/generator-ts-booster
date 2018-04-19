import * as Alexa from 'ask-sdk-core';
import { Response } from 'ask-sdk-model';
import {RequestHandler} from 'ask-sdk-core';

import * as express from 'express';
import * as bodyParser from 'body-parser';
import * as winston from  'winston';

const LaunchRequestHandler: RequestHandler = {
    canHandle(input): boolean | Promise<boolean> {
        return true;
    },

    handle(input): Response | Promise<Response> {
        return null;
    }
}


const skill = Alexa.SkillBuilders
    .custom()
    .addRequestHandlers(LaunchRequestHandler)
    .create();

const httpPort = parseInt(process.env.HTTP_PORT || '8080', 10);
const skillServer = express();
skillServer.use(bodyParser.json());
skillServer.post('/', (req, res) => {
    skill.invoke(req.body).then((result) => {
        res.send(result);
    }).catch((err) => {
        winston.error(`Error during skill invocation`);
        res.status(500).send();
    });
});
skillServer.listen(httpPort, () => {
    winston.info(`Skill is listening on http://localhost:${httpPort}`); 
})
