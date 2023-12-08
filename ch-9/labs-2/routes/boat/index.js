'use strict';
const { promisify } = require('util');
const { boat } = require('../../model');
const { uid } = boat;
const read = promisify(boat.read);
const create = promisify(boat.create);
const del = promisify(boat.del);

module.exports = async (fastify, opts) => {
  const { notFound, badRequest, internalServerError } = fastify.httpErrors;
  const schema = {
    $id: 'dataSchema',
    type: 'object',
    required: ['data'],
    properties: {
      data: {
        type: 'object',
        required: ['brand', 'color'],
        properties: {
          brand: { type: 'string' },
          color: { type: 'string' }
        }
      }
    }
  };

  fastify.addSchema(schema);

  fastify.post('/', {
    handler: async (request, reply) => {
      try {
        const { data } = request.body;
        const id = uid();
  
        await create(id, data);
        reply.code(201);
        return { id };
      } catch (err) {
        return err;
      }
    },
    schema: {
      body: {
        $ref: 'dataSchema'
      }
    }
  });

  fastify.delete('/:id', async (request, reply) => {
    const { id } = request.params;
    try {
      await del(id);
      reply.code(204);
    } catch (err) {
      if (err.message === 'not found') throw notFound();
      throw err;
    }
  });

  fastify.get('/:id', async (request, reply) => {
    console.log('here');
    const { id } = request.params;
    try {
      const data = await read(id);
      Object.keys(data).forEach((dataKey) => {
        const found = schema.properties.data.required.find((schemaKey) => schemaKey === dataKey);
        if (!found) delete data[dataKey];
      })
      reply.status(200);
      return data;
    } catch (err) {
      if (err.message === 'not found') throw notFound();
      throw err;
    }
  });
};
