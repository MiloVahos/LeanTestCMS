const mqtt = require('mqtt')

var options = {
  host: '3132ce987b3746e69dd08006f7615d0c.s1.eu.hivemq.cloud',
  port: 8883,
  protocol: 'mqtts',
  username: 'monostro2@gmail.com',
  password: 'Camilo1996'
}

const mqttClient = mqtt.connect(options)

mqttClient.on('connect', function () {
  console.log('Connected to MQTT broker')
});

mqttClient.on('error', function (error) {
  console.log(error);
});

module.exports = mqttClient


