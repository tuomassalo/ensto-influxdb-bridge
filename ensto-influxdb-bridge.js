const { InfluxDB, Point } = require("@influxdata/influxdb-client");
const { readFileSync } = require("fs");
const readline = require("readline");

const env = JSON.parse(readFileSync("env.json"));

const client = new InfluxDB({ url: env.url, token: env.token });

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  terminal: false,
});

rl.on("line", function (line) {
  console.log("incoming", line);
  // line contains a JSON object, having stuff like:
  // {
  //   "address":"90:fd:9f:11:22:33",
  //   "deviceName":"room1",
  //   "relayIsOn":false,
  //   "roomTemperature":21,
  //   "targetTemperature":20.5,
  //   "timestamp":"2021-11-30T12:36:44.628Z"
  // }
  const data = JSON.parse(line);

  const writeApi = client.getWriteApi(env.org, env.bucket);
  writeApi.useDefaultTags({ host: "host1" });

  writeApi.writePoint(
    new Point(data.deviceName).floatField(
      "roomTemperature",
      data.roomTemperature
    )
  );
  writeApi.writePoint(
    new Point(data.deviceName).floatField(
      "targetTemperature",
      data.targetTemperature
    )
  );
  writeApi.writePoint(
    new Point(data.deviceName).booleanField("relayIsOn", data.relayIsOn)
  );

  writeApi
    .close()
    .then(() => {
      console.log("writeApi succeeded");
    })
    .catch((e) => {
      console.error(e);
      console.log("writeApi failed ERROR");
    });
});
