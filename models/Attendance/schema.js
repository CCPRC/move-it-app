'use strict'

module.exports = {
  title: 'Course',
  description: 'A class which can be attended by members.',
  type: 'object',
  required: ['_id', 'type', 'parent_id', 'date'],
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
	    pattern: 'attendance'
    },
    parent_id: {
      id: 'parent_id',
      type: 'string',
      description: 'The _id of the coresponding parent class/course'
    },
    date: {
      id: 'date',
      type: 'string'
    },
    attendees: {
    	id: 'attendees',
    	type: 'array',
    	description: 'An array of participant objects including _id, name, and avatar if necessary'
    }
  }
}