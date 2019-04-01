exports.getDirName = (pathUrl = '') => {
  return pathUrl.split('/').slice(0, -1).join('/')
}
