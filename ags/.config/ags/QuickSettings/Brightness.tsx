import Gtk from "gi://Gtk"
import { createBinding, createComputed, createState } from "ags"
import GLib from "gi://GLib"
import Gdk from "gi://Gdk?version=4.0"
import Brightness from "./../services/brightness"

const brightness = Brightness.get_default();
const brightnessValue = createBinding(brightness, "value");
const kbdValue = createBinding(brightness, "kbdValue");
const brightnessIcon = createComputed(() => {
	const value = brightnessValue();
	if (value < 33) return "brightness-low-symbolic";
	if (value < 66) return "brightness-medium-symbolic";
	return "brightness-high-symbolic";
});


export default function BrightnessSlider() {
	return (
		<box>
			<Gtk.Image iconName={brightnessIcon} />
			<slider
				name={"brightness-slider"}
				min={1}
				max={100}
				hexpand
				value={brightnessValue}
				onChangeValue={(self: Gtk.Scale) => {
					brightness.value = self.get_value()
					return false
				}}
				$={(self) => { // slider must have text content or label
					self.update_property([Gtk.AccessibleProperty.LABEL], ["Brightness"])
				}}

			/>
		</box>
	)
}
