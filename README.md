# ensto-influxdb-bridge

Write readings from <a href="https://github.com/tuomassalo/ensto-bt-thermostat-reader">ensto-bt-thermostat-reader</a> to InfluxDB.

## Installation

Usage:

    node path/ensto-bt-thermostat-reader ... --keep-reading | node ensto-influx-bridge

Add this to env.json:

    {
        "url": "http://x.x.x.x:8086",
        "org": "...",
        "bucket": "...",
        "token": "..."
    }

## Using `read-save-loop.sh`

1. Clone this repository and `ensto-bt-thermostat-reader` inside the same parent directory.
2. Add your devices to env.json (see `env.json.sample`)
3. Run `read-save-loop.sh` (adjust timeouts if needed)
