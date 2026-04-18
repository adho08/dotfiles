// services/brightness.ts
import GObject from "gi://GObject"
import Gio from "gi://Gio"
import { exec, execAsync } from "ags/process"
import { readFile, writeFile } from "ags/file"
import { timeout } from "ags/time"

let debounceTimer: any = null

const backlightPath = "/sys/class/backlight/intel_backlight"
const kbdBacklightPath = "/sys/class/leds/platform::kbd_backlight"
let kbdDebounce: any = null

const getMax = () => Number(readFile(`${backlightPath}/max_brightness`))

class Brightness extends GObject.Object {
  static instance: Brightness

  // use "#value" as cache
  #value = 50
  read() {
    const current = Number(readFile(`${backlightPath}/brightness`))
    return (current / getMax()) * 100
  }

  static get_default() {
    if (!this.instance) this.instance = new Brightness()
    return this.instance
  }

  constructor() {
    super()

    const file = Gio.File.new_for_path(`${backlightPath}/brightness`)
    const monitor = file.monitor_file(Gio.FileMonitorFlags.NONE, null)
    this.#value = this.read()

    monitor.connect("changed", () => {
      this.#value = this.read()
      this.notify("value")
    })
  }

  get value(): number {
    return this.#value
  }

  set value(percent: number) {
    const clamped = Math.max(1, Math.min(100, percent))
    const raw = Math.round((clamped / 100) * getMax())
    this.#value = clamped
    this.notify("value")
    execAsync(`bash -c 'echo ${raw} > ${backlightPath}/brightness'`).catch(
      console.error,
    )
  }

  get kbdValue(): number {
    const max = Number(readFile(`${kbdBacklightPath}/max_brightness`))
    const current = Number(readFile(`${kbdBacklightPath}/brightness`))
    return (current / max) * 100
  }

  set kbdValue(percent: number) {
    const raw = Math.round((Math.max(0, Math.min(100, percent)) / 100) * 2)
    const file = Gio.File.new_for_path(`${kbdBacklightPath}/brightness`)
    const stream = file.open_readwrite(null)
    stream
      .get_output_stream()
      .write(new TextEncoder().encode(String(raw)), null)
    stream.close(null)
    this.notify("kbd-value")
  }
}

export default GObject.registerClass(
  {
    GTypeName: "BrightnessService",
    Properties: {
      value: GObject.ParamSpec.double(
        "value",
        "Value",
        "Brightness value",
        GObject.ParamFlags.READWRITE,
        1,
        100,
        50,
      ),
      "kbd-value": GObject.ParamSpec.double(
        "kbd-value",
        "KbdValue",
        "Keyboard brightness value",
        GObject.ParamFlags.READWRITE,
        0,
        100,
        0,
      ),
    },
  },
  Brightness,
)
