/* eslint  semi: 0 */
var isEmailUnique = function (doc) {
  if (doc.type === 'user') {
    emit(email);
  }
}
var getUserByAuthId = function (doc) {
  if (doc.type === 'user') {
    emit(doc.auth_id);
  }
}
module.exports = {
  isEmailUnique: {
    map: isEmailUnique.toString()
  },
  getUserByAuthId: {
    map: getUserByAuthId.toString()
  }
}