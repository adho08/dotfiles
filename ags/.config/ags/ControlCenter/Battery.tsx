import Gtk from "gi://Gtk?version=4.0"
import Battery from "gi://AstalBattery"
import PowerProfiles from "gi://AstalPowerProfiles"
import { createBinding, createMemo } from "ags"
import { Button } from "./components/Button"

const battery = Battery.get_default()
const charging = createBinding(battery, "charging")
const iconName = createBinding(battery, "iconName")
const batteryIcon = createMemo(() =>
	charging() ? "battery-level-100-charged-symbolic" : iconName()
)
function formatTime(seconds: number): string {
	if (seconds === 0) return "Unknown"
	const h = Math.floor(seconds / 3600)
	const m = Math.floor((seconds % 3600) / 60)
	return h > 0 ? `${h}h ${m}m` : `${m}m`
}
const timeToFull = createBinding(battery, "timeToFull")
const timeToEmpty = createBinding(battery, "timeToEmpty")
const timeToEnd = createMemo(() => {
	let full = timeToFull()
	let empty = timeToEmpty()
	return charging() ? `Time to full: ${formatTime(full)}` : `Time to empty: ${formatTime(empty)}`
})
const energyRate = createBinding(battery, "energyRate")
const chargingRate = createMemo(() => {
	const rate = energyRate()
	const isCharging = charging()
	return isCharging ? `Energy rate: +${rate.toFixed(1)}W` : `Energy rate: -${Math.abs(rate).toFixed(1)}W`
})

const powerprofiles = PowerProfiles.get_default()
const activeProfile = createBinding(powerprofiles, "activeProfile")

export function BatteryBox({ name }: { name: string }) {

	return (
		<box
			$type="named"
			name={`${name}`}
			orientation={Gtk.Orientation.VERTICAL}
			cssClasses={["module-content"]}
			valign={Gtk.Align.FILL}
			vexpand
		>
			<box halign={Gtk.Align.CENTER}>
				<Gtk.Image
					iconName={batteryIcon}
					tooltipText={battery.iconName}
				/>
				<label label={`${battery.deviceTypeName}: ${battery.percentage * 100}%`} />
			</box>
			<label label={timeToEnd} />
			<label label={chargingRate} />
			<box hexpand orientation={Gtk.Orientation.VERTICAL}>
				<slider
					tooltipText={"Power profile"}
					name={"powerprofiles-slider"}
					min={0}
					max={2}
					hexpand
					digits={0}
					drawValue={false}
					$={(self) => {
						self.set_increments(1, 1);
						self.add_mark(0, Gtk.PositionType.BOTTOM, null);
						self.add_mark(1, Gtk.PositionType.BOTTOM, null);
						self.add_mark(2, Gtk.PositionType.BOTTOM, null);
						self.connect("change-value", (_self, _scroll, value) => {
							const snapped = Math.round(value);
							_self.set_value(snapped);
							powerprofiles.activeProfile = snapped === 0 ? "power-saver" : snapped === 1 ? "balanced" : "performance"
							return true;
						});
					}}
					value={activeProfile(p => p === "power-saver" ? 0 : p === "balanced" ? 1 : 2)}
				/>
				<box hexpand>
					<label label="power-saver" halign={Gtk.Align.START} hexpand />
					<label label="balanced" halign={Gtk.Align.CENTER} hexpand />
					<label label="performance" halign={Gtk.Align.END} hexpand />
				</box>
			</box >
		</box >
	)
}
