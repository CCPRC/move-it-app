'use strict'
module.exports = {
  title: 'User',
  description: 'The people who interact with the application',
  type: 'object',
  required: ['_id', 'type', 'firstName', 'auth_id'],
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
    firstName: {
      id: 'firstName',
      type: 'string'
    },
    lastName: {
      id: 'lastName',
      type: 'string'
    },
    auth_id: {
      id: 'auth_id',
      type: 'string'
    },
    classification: {
      id: 'classification',
      type: 'string',
      description: 'The type of user'
    },
    organization: {
      id: 'organization',
      type: 'string'
    },
    phone: {
      id: 'phone',
      type: 'string'
    },
    email: {
      id: 'email',
      type: 'string'
    },
    subscriptions: {
      id: 'subscriptions',
      type: 'array',
      description: 'a list of member ids that the user is subscribing too'
    }
  }
}