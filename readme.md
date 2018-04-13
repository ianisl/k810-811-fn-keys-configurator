# K810–811 FN Keys Configurator

CLI tool to switch the behavior of the F1–F13 keys on the Logitech K810 and K811 keyboards.

## Usage

Set the keys to work as regular function keys:

```
node app.js --on
```

On macOS, running with sudo might be required to properly connect with the Bluetooth device:

```
sudo node app.js --on
```

Set the keys to work as special keys:

```
node app.js --off
```

Set the keyboard model (K811 is set by default):

```
node app.js --device K810 --on
```

List all connected devices:

```
node app.js --list
```
