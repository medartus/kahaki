/**
 * @author Marc-Etienne Dartus
 * @since 15/04/20
 */

const constant = require('./constant.js');
const template = require('./template.json');
let jsdom = require("jsdom");
const {JSDOM} = jsdom;
const virtualConsole = new jsdom.VirtualConsole();


virtualConsole.sendTo(console, {omitJSDOMErrors: true});

/**
 * Stadardize differents properties to only get one value if in the document
 *
 * @param doc the html document
 * @param param the parameter that we whant to extract
 *
 * @returns {string}
 */
const standardizeProperty = (doc, standardizeName) => {
  for (const jsonObj of template[standardizeName]) {
    const attribute = extractAttribute(doc,jsonObj);
    if(attribute) return attribute;
  }
  return null;
}

/**
 * Extract an attribute from and HTML onjbect
 *
 * @param doc the html document
 * @param jsonObj the json object with the different value to extract the attribute
 *
 * @returns {string}
 */
const extractAttribute = (doc,jsonObj) => {
  if(jsonObj.propertyName == undefined){
    const tag = doc.getElementsByTagName(jsonObj.htmlTag);
    return tag.length > 0 ? tag[0].textContent : null;
  } else {
    const tag = doc.querySelector(`${jsonObj.htmlTag}[${jsonObj.propertyName}='${jsonObj.propertyValue}']`);
    return tag? tag[jsonObj.valueName] : null;
  }
}


/**
 * Gets attribute from HTML object
 *
 * @param htmlObj the html object
 * @param attributeArray the array of possible attribute
 *
 * @returns {attributeName:string, attributeValue: string}
 */
const getAttribute = (htmlObj, attributeArray) => {
  let index = 0
  while(index<attributeArray.length){
    const attributeName = attributeArray[index];
    const attributeValue = htmlObj.getAttribute(attributeName);
    if(attributeValue != null){
      return{
        "attributeName": attributeName,
        "attributeValue" : attributeValue
      }
    }
    index++;
  }
  return {};
}

/**
 * Gets attribute from HTML object
 *
 * @param htmlObj the html object
 *
 * @returns {popertyValue:string, contentValue: string}
 */
const getMeta = (htmlObj) => {
  let { attributeName: propertyName, attributeValue: propertyValue } = getAttribute(htmlObj,constant.META_POPRERTY_NAME);
  let { attributeValue: contentValue } = getAttribute(htmlObj,constant.META_VALUE_NAME);

  if(propertyName == "charset"){
    contentValue = propertyValue;
    propertyValue = propertyName;
  }

  return { propertyValue, contentValue };
}


/**
 * convert property value sub object
 *
 * @param res the result list of property with value
 * @param property 
 * @param value 
 *
 * @returns {popertyValue:string, contentValue: string}
 */
const createSubObject = (res, property, value) => {
  const objectList = property.split(/:|\./);
  if( objectList.length == 1){
    res[property] = value;
  }else{
    if(res[objectList[0]] == undefined) res[objectList[0]] = {};
    let tempObject = res[objectList[0]];

    for (let index = 1; index < objectList.length-1; index++) {
      const subObj = objectList[index];
      
      if(tempObject[subObj] == undefined) tempObject[subObj] = {}
      tempObject = tempObject[subObj];
    }

    const lastIndex = objectList.length-1;
    tempObject[objectList[lastIndex]] = value;
  }
}


/**
 * Gets preview url properties from an url
 *
 * @param url the url
 *
 * @returns {Promise}
 */
exports.getPreview = async (url,standardizeArray) => {
  let res = {};

  let dom = await JSDOM.fromURL(url, {virtualConsole});
  let doc = dom.window.document;

  for(const standardizeName of standardizeArray){
    res[standardizeName] = standardizeProperty(doc,standardizeName);
  }

  return res;
};


/**
 * Gets all metadata properties from an url
 *
 * @param url the url
 *
 * @returns {Promise}
 */
exports.getAllMetadata = async (url, subObject) => {
  let res = {};

  let dom = await JSDOM.fromURL(url, {virtualConsole});
  let doc = dom.window.document;
  let metaEls = doc.getElementsByTagName("meta");

  for(let meta of metaEls){
    const { propertyValue, contentValue } = getMeta(meta);
    if(propertyValue != undefined){
      if(subObject){
        createSubObject(res,propertyValue,contentValue)
      }else{
        res[propertyValue] = contentValue;
      }
    }
  }
  return res;
};

/**
 * Gets all JSON-LD data properties from an url
 *
 * @param url the url
 *
 * @returns {Promise}
 */
exports.getJsonld = async (url) => {
  let res = [];

  const dom = await JSDOM.fromURL(url, {virtualConsole});
  const doc = dom.window.document;
  const jsonldArray = doc.querySelectorAll("script[type='application/ld+json']");

  for(const jsonld of jsonldArray){
    const jsonData = JSON.parse(jsonld.innerHTML);
    res.push(jsonData);
  }
  return res;
};