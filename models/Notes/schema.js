'use strict'
module.exports = {
  title: 'User',
  description: 'The people who interact with the application',
  type: 'object',
  required: ['_id', 'type', 'patient_id', 'creator_id'],
  properties: {
    _id: {
      id: '_id',
      type: 'string'
    },
    rev: {
      id: '_rev',
      type: 'string'
    },
    type: {
      id: 'type',
      type: 'string',
      pattern: 'user'
    },
    body: {
      id: 'body',
      type: 'string'
    },
    patient_id: {
      id: 'patient_id',
      type: 'string'
    },
    creator_id: {
      id: 'creator_id',
      type: 'string'
    }
  }
}