var palmetto = require('palmettoflow-nodejs')

var assessments = require('./assessments')({
  url: 'https://rhinogram:lincs2015@couchdb.lincs.io/move_it'
})
var attendance = require('./attendance')({
  url: 'https://rhinogram:lincs2015@couchdb.lincs.io/move_it'
})
var courses = require('./courses')({
  url: 'https://rhinogram:lincs2015@couchdb.lincs.io/move_it'
})
var emailSvc = require('./emailSvc')({
  url: 'https://rhinogram:lincs2015@couchdb.lincs.io/move_it'
})
var fitbit = require('./fitbit')({
  url: 'https://rhinogram:lincs2015@couchdb.lincs.io/move_it'
})
var groups = require('./groups')({
  url: 'https://rhinogram:lincs2015@couchdb.lincs.io/move_it'
})
var keen = require('./keenSvc')({
  url: 'https://rhinogram:lincs2015@couchdb.lincs.io/move_it'
})
var members = require('./members')({
  url: 'https://rhinogram:lincs2015@couchdb.lincs.io/move_it'
})
var notes = require('./notes')({
  url: 'https://rhinogram:lincs2015@couchdb.lincs.io/move_it'
})
var physicians = require('./physicians')({
  url: 'https://rhinogram:lincs2015@couchdb.lincs.io/move_it'
})
var reports = require('./reports')({
  url: 'https://rhinogram:lincs2015@couchdb.lincs.io/move_it'
})
var stats = require('./stats')({
  url: 'https://rhinogram:lincs2015@couchdb.lincs.io/move_it'
})
var trainers = require('./trainers')({
  url: 'https://rhinogram:lincs2015@couchdb.lincs.io/move_it'
})
var underarmor = require('./underarmor')({
  url: 'https://rhinogram:lincs2015@couchdb.lincs.io/move_it'
})
var users = require('./users')({
  url: 'https://rhinogram:lincs2015@couchdb.lincs.io/move_it'
})
module.exports = function () {
  var ee = palmetto()
  assessments(ee)
  attendance(ee)
  courses(ee)
  emailSvc(ee)
  fitbit(ee)
  groups(ee)
  keen(ee)
  members(ee)
  notes(ee)
  physicians(ee)
  reports(ee)
  stats(ee)
  trainers(ee)
  underarmor(ee)
  users(ee)
  return ee
}
