const express = require('express');
const { celebrate, Segments, Joi } = require('celebrate');

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
routes.post('/sessions', celebrate({
  [Segments.BODY]: Joi.object().keys({
    id: Joi.string().required(),
  }),
}), SessionController.create);

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
routes.post('/ongs', celebrate({
  [Segments.BODY]: Joi.object().keys({
    name: Joi.string().required(),
    email: Joi.string().required().email(),
    whatsapp: Joi.string().required().min(10).max(11),
    city: Joi.string().required(),
    uf: Joi.string().required().length(2)
  })
}), OngController.create);

/**
 * List Incidents of Ong
 *
 * @name Get profile
 * @route {GET} /profile
 * @headerparam authorization is the identification information for the request
 */
routes.get('/profile', celebrate({
  [Segments.HEADERS]: Joi.object({
    authorization: Joi.string().required(),
  }).unknown(),
}), ProfileController.index);

/**
 * List all Incidents with data of Ong
 *
 * @name Get incident
 * @route {GET} /incidents
 * @queryparam {Integer} page of paginate
 */
routes.get('/incidents', celebrate({
  [Segments.QUERY]: Joi.object().keys({
    page: Joi.number(),
  })
}), IncidentController.index);

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
routes.post('/incidents', celebrate({
  [Segments.BODY]: Joi.object().keys({
    title: Joi.string().required(),
    description: Joi.string().required(),
    value: Joi.number().required(),
  }),
  [Segments.HEADERS]: Joi.object({
    authorization: Joi.string().required(),
  }).unknown(),
}), IncidentController.create);

/**
 * Delete Incident
 *
 * @name Delete incident
 * @route {DELETE} /incidents/:id
 * @headerparam authorization is the identification information for the request
 * @param :id the id valid on delete
 */
routes.delete('/incidents/:id', celebrate({
  [Segments.PARAMS]: Joi.object().keys({
    id: Joi.number().required(),
  }),
  [Segments.HEADERS]: Joi.object({
    authorization: Joi.string().required(),
  }).unknown(),
}), IncidentController.delete);

module.exports = routes;