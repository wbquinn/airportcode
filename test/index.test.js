const assert = require('assert');
const {request} = require('gaxios');
const {exec} = require('child_process');
const waitPort = require('wait-port');

const startFF = async (target, signature, port) => {
  const ff = exec(
    `npx functions-framework --target=${target} --signature-type=${signature} --port=${port}`
  );
  await waitPort({host: 'localhost', port});
  return ff;
};

const httpInvocation = (fnUrl, port) => {
  const baseUrl = `http://localhost:${port}`;

  // GET request
  return request({
    url: `${baseUrl}/${fnUrl}`,
  });
};

describe('index.test.js', () => {
  describe('functions_airports_get airportsGET', () => {
    const PORT = 8081;
    let ffProc;

    before(async () => {
      ffProc = await startFF('airportsGET', 'http', PORT);
    });

    after(() => ffProc.kill());

    it('helloGET: should print airports of the world', async () => {
      const response = await httpInvocation('airportsGET', PORT);
      assert.strictEqual(response.status, 200);
      assert.strictEqual(response.data, 'Airports of the World!');
    });
  });
});