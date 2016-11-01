var newEvent = require('palmettoflow-event').newEvent
var _ = require('underscore')

module.exports = function ($http) {
  var fetchConfig = require('zero-config')
  var config = fetchConfig(__dirname, {dcValue: 'us-east-1'})
  var awsCreds = config.get('aws')
  var AWS = require('aws-sdk')
  AWS.config.update({"accessKeyId": "AKIAI7FBDG3UICCOPSNA",
      "secretAccessKey": "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"})
  var s3 = new AWS.S3({params: {Bucket: 'move-it-ccprc.herokuapp.com'}})
  return {
    upload: function (file, userId) {
      var bucketName = 'move-it-ccprc.herokuapp.com/files'
      var keyName = userId + '/' + file.name
      var params = {Bucket: bucketName, Key: keyName, Body: file, ContentType: file.type !== '' ? file.type : 'application/octet-stream'}
      s3.putObject(params, function (err, data) {
        if (err) {
          console.log(err)
        }
        else {
          var route = 'https://s3.amazonaws.com/move-it-ccprc.herokuapp.com/files/' + keyName
          console.log(bucketName + '/' + keyName)
          var ne = newEvent('members', 'saveFile', userId, route)
          return $http.post('/api', ne).then(function (result) {
            return result.data.object
          })
        }
      })
      return 'https://s3.amazonaws.com/move-it-ccprc.herokuapp.com/files' + keyName
    },
    uploadAvatar: function (file, userId) {
      var bucketName = 'move-it-ccprc.herokuapp.com/images/'
      var keyName = userId
      var params = {Bucket: bucketName, Key: keyName, Body: file, ContentType: file.type !== '' ? file.type : 'application/octet-stream'}
      s3.putObject(params, function (err, data) {
        if (err) {
          console.log(err)
        }
        else {
          var route = 'https://s3.amazonaws.com/move-it-ccprc.herokuapp.com/images/' + keyName
          console.log(route)
          var ne = newEvent('members', 'saveImage', userId, route)
          return $http.post('/api', ne).then(function (result) {
            return result.data.object
          })
        }
      })
      // return 'https://s3.amazonaws.com/move-it-ccprc.herokuapp.com/images/' + keyName
    }
  }
}

