/**
 * @author Marc-Etienne Dartus
 * @since 15/04/20
 */

let utils = require("./getData");
const constant = require('./constant.js');

/**
 * Gets all metadata properties from an url
 *
 * @param url the url
 *
 * @returns {Promise.}
 */
exports.getAllMetadata = async (url,{ subObject = false } = {}) => {
  if(!url) throw new Error("Missing url!");

  try{
    return await utils.getAllMetadata(url,subObject);
  }
  catch(err){
    throw err;
  }
};


/**
 * Gets all SON-LD properties from an url
 *
 * @param url the url
 *
 * @returns {Promise}
 */
exports.getJsonld = async (url) => {
  if(!url) throw new Error("Missing url!");

  try{
    return await utils.getJsonld(url);
  }
  catch(err){
    throw err;
  }
};

/**
 * Gets preview url properties from an url
 *
 * @param url the url
 *
 * @returns {Promise}
 */
exports.getPreview = async (url, { standardizeArray = constant.STANDARDIZE_ARRAY } = {}) => {
  if(!url) throw new Error("Missing url!");

  try{
    const domainIndex = standardizeArray.indexOf('domain');
    if(domainIndex > -1) standardizeArray.splice(domainIndex,1);
    let result = await utils.getPreview(url,standardizeArray);
    if(domainIndex > -1){
      result['domain'] =  url.replace('http://','').replace('https://','').split(/[/?#]/)[0];
    }
    return result;
  }
  catch(err){
    throw err;
  }
};

