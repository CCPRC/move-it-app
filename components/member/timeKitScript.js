module.exports = function () {
  var widget = new TimekitBooking()
  widget.init({
    email: 'marty.mcfly@timekit.io',
    apiToken: 'bNpbFHRmrfZbtS5nEtCVl8sY5vUkOFCL',
    calendar: '8687f058-5b52-4fa4-885c-9294e52ab7d4'
  })
  return widget
}
