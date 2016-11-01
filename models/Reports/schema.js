'use strict'

module.exports = {
  title: 'Reports',
  description: 'A record of reports generated',
  type: 'object',
  required: ['_id', 'type', 'parent_id'],
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
      pattern: 'reports'
    },
    parent_id: {
      id: 'parent_id',
      type: 'string'
    },
    reportDocument: {
      id: 'reportDocument',
      type: 'string',
      description: 'A link to the document host if hosted'
    },
    createdBy: {
      id: 'createdBy',
      type: 'string',
      description: 'The id of the user who generated the report'
    }
  }
}