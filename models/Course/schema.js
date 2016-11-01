'use strict'

module.exports = {
  title: 'Course',
  description: 'A class which can be attended by members.',
  type: 'object',
  required: ['_id', 'type', 'courseName', 'courseCode'],
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
        pattern: 'course'
      },
      courseName: {
        id: 'courseName',
        type: 'string'
      },
      courseCode: {
        id: 'courseCode',
        type: 'string'
      }
  }
}