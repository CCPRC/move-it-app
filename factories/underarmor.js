var newEvent = require('palmettoflow-event').newEvent
var _ = require('underscore')
module.exports = function ($http) {
	return {
    authorize: function (underarmorId) {
      // var ne = newEvent('underarmor', 'authorize', underarmorId, {})
      return $http.get('apiPlaceHolder', authPostData).then(function (result) {
        return result.data.object
      })
    }
  }
}