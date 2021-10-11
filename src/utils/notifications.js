const mqtt = require('mqtt')

const options = {
  host: process.env.MQTT_HOST,
  port: process.env.MQTT_PORT,
  protocol: process.env.MQTT_PROTOCOL,
  username: process.env.MQTT_USERNAME,
  password: process.env.MQTT_PASSWORD
}

const mqttClient = mqtt.connect(options)

mqttClient.on('connect', function () {
  console.log('Connected to MQTT broker')
});

mqttClient.on('error', function (error) {
  console.log(error);
});

module.exports = mqttClient


