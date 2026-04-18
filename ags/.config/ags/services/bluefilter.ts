// services/bluefilter.ts
import GObject from "gi://GObject"
import { execAsync, subprocess } from "ags/process"

let currentTemp = 6500 // neutral, no filter

class BlueFilter extends GObject.Object {
  static instance: BlueFilter

  static get_default() {
    if (!this.instance) {
      this.instance = new BlueFilter()
      // read current value from wl-gammarelay on startup
      execAsync(
        "busctl --user -- get-property rs.wl-gammarelay / rs.wl.gammarelay Temperature",
      )
        .then((out) => {
          // output is like "q 4500"
          const temp = parseInt(out.split(" ")[1])
          if (!isNaN(temp)) {
            currentTemp = temp
            this.instance.notify("value")
          }
        })
        .catch(console.error)
    }

    return this.instance
  }

  get value(): number {
    return currentTemp
  }

  set value(temp: number) {
    currentTemp = Math.round(temp)
    execAsync(
      `busctl --user -- set-property rs.wl-gammarelay / rs.wl.gammarelay Temperature q ${currentTemp}`,
    ).catch(console.error)
    this.notify("value")
  }
}

export default GObject.registerClass(
  {
    GTypeName: "BlueFilterService",
    Properties: {
      value: GObject.ParamSpec.double(
        "value",
        "Value",
        "Color temperature",
        GObject.ParamFlags.READWRITE,
        2500,
        6500,
        6500,
      ),
    },
  },
  BlueFilter,
)
