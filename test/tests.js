/**
 * @author Marc-Etienne Dartus
 * @since 15/04/20
 */

const chai = require("chai"), expect = chai.expect;
const { describe, it } = require("mocha");

const kahaki = require("../lib");
const testResults = require("../test_setup/testResults.json");
const {PORT} = require("../test_setup/config");

const URL_TEST = `http://localhost:${PORT}/test`;
const URL_PREVIEW = `http://localhost:${PORT}/preview`;
const URL_EMPTY = `http://localhost:${PORT}/empty`;

describe("kahaki", () => {
  describe("#getPreview", () => {
    const test = testResults['getPreview'];
    it("should return title, description, image and domain", async () => {
      let results = await kahaki.getPreview(URL_TEST);

      expect(results.title).to.equal(test["title"]);
      expect(results.description).to.equal(test["description"]);
      expect(results.image).to.equal(test["image"]);
      expect(results.domain).to.equal(`localhost:${PORT}`);
    });
    
    it("should return title and description", async () => {
      let results = await kahaki.getPreview(URL_PREVIEW,{standardizeArray:['title', 'description']});

      expect(results.title).to.equal(test["title"]);
      expect(results.description).to.equal(test["description"]);
    });

    it("should return null title and null description", async () => {
      let results = await kahaki.getPreview(URL_EMPTY,{standardizeArray:['title', 'description']});

      expect(results.title).to.equal(null);
      expect(results.description).to.equal(null);
    });

    it("should return Missing URL error", async () => {
      try {
        await kahaki.getPreview("")
      } catch (error) {
        expect(error.message).to.eql('Missing url!');
      }
    })

    it("should return Invalid URL error", async () => {
      try {
        await kahaki.getPreview("url")
      } catch (error) {
        expect(error.message).to.eql('Invalid URL: url');
      }
    })
  });

  describe("#getAllMetadata", () => {
    const testWithoutSub = testResults['metadataWithoutSubDirectory'];
    it("should return all metadata", async () => {
      let results = await kahaki.getAllMetadata(URL_TEST);

      expect(results).to.deep.equal(testWithoutSub)
    });

    const testWithSub = testResults['metadataWithSubDirectory'];
    it("should return all metadata with subdirectory", async () => {
      let results = await kahaki.getAllMetadata(URL_TEST,{subObject:true});

      
      expect(results).to.deep.equal(testWithSub)
    });

    it("should return Missing URL error", async () => {
      try {
        await kahaki.getAllMetadata("")
      } catch (error) {
        expect(error.message).to.eql('Missing url!');
      }
    })

    it("should return Invalid URL error", async () => {
      try {
        await kahaki.getAllMetadata("url")
      } catch (error) {
        expect(error.message).to.eql('Invalid URL: url');
      }
    })
  });

  describe("#getJsonld", () => {
    const test = testResults['getJsonld'];
    it("should return json ld data", async () => {
      let results = await kahaki.getJsonld(URL_TEST);

      expect(results).to.deep.equal(test)
    });

    it("should return Missing URL error", async () => {
      try {
        await kahaki.getJsonld("")
      } catch (error) {
        expect(error.message).to.eql('Missing url!');
      }
    })

    it("should return Invalid URL error", async () => {
      try {
        await kahaki.getJsonld("url")
      } catch (error) {
        expect(error.message).to.eql('Invalid URL: url');
      }
    })
  });
});
