var newEvent = require('palmettoflow-event').newEvent
var _ = require('underscore')
var fitbitId = '227MDT'
var fitbitSecret = '131ebcfd5e7f4738423e27c344c40886'
var fitbitAuthorizeUrl = 'https://www.fitbit.com/oauth2/authorize'
var fitbitTokenUrl = 'https://api.fitbit.com/oauth2/token'

module.exports = function ($http) {
  var authPostData = {
    'Authorization':
'Bearer eyJhbGciOiJIUzI1NiJ9.eyJleHAiOjE0NjM0MzkwNTUsInNjb3BlcyI6Indwcm8gd2xvYyB3bnV0IHdzZXQgd3NsZSB3d2VpIHdociB3YWN0IHdzb2MiLCJzdWIiOiI0R0IzWkoiLCJhdWQiOiIyMjhWN0QiLCJpc3MiOiJGaXRiaXQiLCJ0eXAiOiJhY2Nlc3NfdG9rZW4iLCJpYXQiOjE0NjM0MzU0NTV9.',
    'client_id': fitbitId,
    'expires_in': '31536000',
    'scope': 'activity',
    'response_type': 'token',
    'prompt': 'login consent'
  }

  var authOptions = {
    hostname: 'https://www.fitbit.com',
    path: '/oauth2/authorize',
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  }
  return {
    authorize: function (fitbitId) {
      // var ne = newEvent('fitbit', 'authorize', fitbitId, {})
      return $http.get('https://api.fitbit.com/1/user/-/activities/steps/date/2016-04-02/7d.json', authPostData).then(function (result) {
        return result.data.object
      })
    },
    get: function (fitbitId) {
      var ne = newEvent('fitbitId', 'get', fitbitId, {})
      return $http.post('/api', ne).then(function (result) {
        return result.data.object
      })
    }
  }
}
