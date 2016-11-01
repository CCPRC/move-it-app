'use strict'

module.exports = {
  title: 'Group',
  description: 'A group of users',
  type: 'object',
  required: ['_id', 'type', 'groupName'],
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
      pattern: 'group'
    },
    groupName: {
      id: 'groupName',
      type: 'string'
    }
  }
}