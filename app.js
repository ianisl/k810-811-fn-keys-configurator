const HID = require('node-hid');
const argv = require('yargs').argv;

// Message to display in case of incorrect options
let errorUsageMsg = 'Error: Incorrect options.\nUsage: node app.js [--list] [--device <K810|K811>] --on|off';

// K810 & K811 Vendor ID and Product ID (defaults to K811)
let vendorId = 1133; // 0x046d
let productId = 45847;
if (argv.device) {
    if (argv.device === "K810") {
        productId = 45849; // 0xb319
    } else if (argv.device === "K811") {
        productId = 45847; // 0xb317
    } else {
        process.stderr.write(errorUsageMsg);
        process.exit();
    }
}

let devices = HID.devices();
let isValidAction = (argv.on || argv.off) && (argv.on !== argv.off);

if (isValidAction) {
    let deviceInfo = devices.find(d => {
        return d.vendorId === vendorId && d.productId === productId;
    });
    if (deviceInfo) {
        try {
            let device = new HID.HID(deviceInfo.path);
            process.stdout.write('Successfully opened device.\n');
            if (argv.on) {
                device.write([0x10, 0xff, 0x06, 0x15, 0x00, 0x00, 0x00])
                process.stdout.write('Function key behavior is now on.')
            } else {
                device.write([0x10, 0xff, 0x06, 0x15, 0x01, 0x00, 0x00])
                process.stdout.write('Function key behavior is now off.')
            }
        } catch (e) {
            process.stderr.write('Error: could not open device. Try running the script again with sudo.')
        }
    } else {
        process.stderr.write('Error: Device not found.')
    }
} else if (argv.list) {
    process.stdout.write(JSON.stringify(devices, null, 2));
} else {
    process.stderr.write(errorUsageMsg);
}
