module.exports = function () {
  return {
    restrict: 'EA',
    scope: {
      email: '@',
      apiToken: '@',
      calendar: '@',
      avatar: '@',
      name: '@'
    },
    link: (scope, element) => {
      var widget = new TimekitBooking()
      scope.targetEl = element
      scope.timekitFindTime = {
        filters: {
          and: [
            {
              business_hours: {'timezone': 'America/New_york'}
            },
            {
              exclude_weekend: {'timezone': 'America/New_york'}
            }
          ]
        }
      }
      widget.init(scope)
    }
  }
}
