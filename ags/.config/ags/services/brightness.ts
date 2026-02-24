// services/brightness.ts
import GObject from "gi://GObject"
import { exec, execAsync } from "ags/process"
import { readFile, writeFile } from "ags/file"
import { timeout } from "ags/time"

let debounceTimer: any = null

const backlightPath = "/sys/class/backlight/intel_backlight"

class Brightness extends GObject.Object {
  static instance: Brightness

  static get_default() {
    if (!this.instance) this.instance = new Brightness()
    return this.instance
  }

  get value(): number {
    const max = Number(readFile(`${backlightPath}/max_brightness`))
    const current = Number(readFile(`${backlightPath}/brightness`))
    return (current / max) * 100
  }

  set value(percent: number) {
    const max = Number(readFile(`${backlightPath}/max_brightness`))
    const clamped = Math.max(1, Math.min(100, percent))
    const raw = Math.round((clamped / 100) * max)
    execAsync(
      `bash -c 'echo ${raw} | tee /sys/class/backlight/intel_backlight/brightness'`,
    ).catch(console.error)
    this.notify("value")
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
    },
  },
  Brightness,
)
