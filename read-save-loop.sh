#!/bin/bash

# NB: Add your devices to `env.json`. (See `env.json.example`)

Devices=$(node -e 'console.log(JSON.parse(require("fs").readFileSync("env.json")).devices.join("\n"))')

(
    while true; do
        for Device in $Devices; do
            # NB: `--repeat 2 ... | tail -n 1` is a workaround
            # for the thermostats occasionally giving stale data.
            # See KNOWN BUGS in ensto-bt-thermostat-reader.js.

            timeout 30 node ../ensto-bt-thermostat-reader/ensto-bt-thermostat-reader.js \
                --repeat 2 --repeat-delay 0 --read "$Device" | tail -n 1
            sleep 15
        done
    done
) | node ensto-influxdb-bridge.js
