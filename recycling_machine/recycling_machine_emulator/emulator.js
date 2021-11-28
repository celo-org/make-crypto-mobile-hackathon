// An address of the backend service to whom we send button events.
let backendAddress = "127:0:0:1:80";

// Used to send requests to the backend service.
const axios = require('axios')

// RaspberryPi IO.
let rpio = require('rpio');

// Used to map pressed buttons with corresponding LEDs.
const button_to_led_map = new Map();
button_to_led_map.set('16', 13);
button_to_led_map.set('20', 19);
button_to_led_map.set('21', 26);
button_to_led_map.set('12', 6);

// Maps LEDs with packaging types.
const led_to_packaging_map = new Map();
led_to_packaging_map.set(13, "pet");
led_to_packaging_map.set(19, "tetra_pak");
led_to_packaging_map.set(26, "glass");
led_to_packaging_map.set(6, "aluminium");

// Send inserted packaging type to the backend service.
async function sendPackagingToBackend(blinking_led) {
	console.log("Inserted type: ", led_to_packaging_map.get(blinking_led));
	axios.post("http://" + backendAddress + "/insertBottle", {
		packagingType: led_to_packaging_map.get(blinking_led)
	}).then(res => {
		console.log(`statusCode: ${res.status}`)
		console.log(res)
	}).catch(error => {
		//console.error(error)
	})
}

// Callback function used to process button events.
function pollcb(cbpin)
{
	//let state = rpio.read(cbpin) ? 'released' : 'pressed';
	//console.log("MAP ", button_to_led_map.get(cbpin.toString()));
	const led = button_to_led_map.get(cbpin.toString());
  rpio.write(led, rpio.read(cbpin) ? rpio.LOW : rpio.HIGH);
	//console.log('Button event on P%d (button currently %s)', cbpin, state);
	if (rpio.read(cbpin)) {
		sendPackagingToBackend(led);
	}
}

process.on('exit', function() {
	rpio.exit();
});

function initializeRpio() {
	rpio.init({mapping: 'gpio'});

	console.log("Opening pins...");
	rpio.open(16, rpio.INPUT, rpio.PULL_UP);
	rpio.open(13, rpio.OUTPUT, rpio.LOW);
	rpio.open(20, rpio.INPUT, rpio.PULL_UP);
	rpio.open(19, rpio.OUTPUT, rpio.LOW);
	rpio.open(21, rpio.INPUT, rpio.PULL_UP);
	rpio.open(26, rpio.OUTPUT, rpio.LOW);
	rpio.open(12, rpio.INPUT, rpio.PULL_UP);
	rpio.open(6, rpio.OUTPUT, rpio.LOW);
	console.log("Pins opened");

	rpio.poll(16, pollcb);
	rpio.poll(20, pollcb);
	rpio.poll(21, pollcb);
	rpio.poll(12, pollcb);
	console.log("Rpio initialized");
}

function main() {
	if (process.argv.length != 3) {
		console.error("Please provide proper input arguments");
		return;
	}

	backendAddress = process.argv[2];
	console.log("BackendAddress set to: ", backendAddress);

	initializeRpio();
}

main();
