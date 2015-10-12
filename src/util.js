
export function parseUrlParam() {
  const search = location.search.substring(1);
  if (search == '') {
    return {};
  }
  // http://stackoverflow.com/questions/8648892/convert-url-parameters-to-a-javascript-object
  return JSON.parse('{"' + decodeURI(search).replace(/"/g, '\\"').replace(/&/g, '","').replace(/=/g,'":"') + '"}');
}