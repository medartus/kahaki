/**
 * @author Marc-Etienne Dartus
 * @since 15/04/20
 */

 let chai = require("chai")
  , expect = chai.expect;

const checkSameIfSameObject = (test,results) => {
    if(typeof test == 'string' || typeof test == 'int'){
        expect(results).to.equal(test);
    } else{
        const resultsArray = Object.keys(results);
        const testArray = Object.keys(test);
        for (const key of testArray) {
            checkSameIfSameObject(test[key],results[key])
        }
    }
}

module.exports = { checkSameIfSameObject }