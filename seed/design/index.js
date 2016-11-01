module.exports = {
  _id: '_design/move_it',
  views: require('./views'),
  language: 'javascript',
  validate_doc_update: require('./validate').toString()
}