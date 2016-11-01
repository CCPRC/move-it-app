'use strict'

module.exports = {
   title: 'Member',
   description: 'A class which can be attended by members.',
   type: 'object',
   required: ['_id', 'type', 'firstName', 'lastName', 'dob', 'hospital', 'physician', 'avatar', 'address', 'state', 'city', 'email', 'enrolled'],
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
         pattern: 'member'
      },
      firstName: {
         id: 'firstName',
         type: 'string'
      },
      lastName: {
         id: 'lastName',
         type: 'string'
      },
      dob: {
         id: 'dob',
         type: 'string'
      },
      hospital: {
         id: 'hospital',
         type: 'string'
      },
      physician: {
         id: 'physician',
         type: 'string'
      },
      avatar: {
         id: 'avatar',
         type: 'string'
      },
      address: {
         id: 'address',
         type: 'string'
      },
      state: {
         id: 'state',
         type: 'string'
      },
      city: {
         id: 'city',
         type: 'string'
      },
      email: {
         id: 'email',
         type: 'string'
      },
      enrolled: {
         id: 'enrolled',
         type: 'string'
      },
      groupList: {
         id: 'groupList',
         type: 'array'
      }
   }
}
