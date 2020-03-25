const express = require('express');

const routes = express.Router();

const SessionController = require('./controllers/SessionController');
const OngController = require('./controllers/OngController');
const IncidentController = require('./controllers/IncidentController');
const ProfileController = require('./controllers/ProfileController');

/**
 * Start Login
 *
 * @name Create sessions
 * @route {POST} /sessions
 * @bodyparam {String} id of Ong
 */
routes.post('/sessions', SessionController.create);

/**
 * List all Ongs
 *
 * @name Get ongs
 * @route {GET} /ongs
 */
routes.get('/ongs', OngController.index);

/**
 * Create Ong
 *
 * @name Post ongs
 * @route {POST} /ongs
 * @bodyparam {String} name of ong
 * @bodyparam {String} email of ong
 * @bodyparam {String} whatsapp of ong
 * @bodyparam {String} city of ong
 * @bodyparam {String} uf of ong
 */
routes.post('/ongs', OngController.create);

/**
 * List Incidents of Ong
 *
 * @name Get profile
 * @route {GET} /profile
 * @headerparam authorization is the identification information for the request
 */
routes.get('/profile', ProfileController.index);

/**
 * List all Incidents with data of Ong
 *
 * @name Get incident
 * @route {GET} /incidents
 */
routes.get('/incidents', IncidentController.index);

/**
 * Create Incident
 *
 * @name Create incident
 * @route {POST} /incidents
 * @headerparam authorization is the identification information for the request
 * @bodyparam {String} title of incident
 * @bodyparam {String} description of incident
 * @bodyparam {Float} value of incident
 */
routes.post('/incidents', IncidentController.create);

/**
 * Delete Incident
 *
 * @name Delete incident
 * @route {DELETE} /incidents/:id
 * @headerparam authorization is the identification information for the request
 */
routes.delete('/incidents/:id', IncidentController.delete);

module.exports = routes;