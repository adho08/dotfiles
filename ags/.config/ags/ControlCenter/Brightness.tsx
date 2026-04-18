import Gtk from "gi://Gtk?version=4.0";
import { subprocess } from "ags/process";
import { createBinding } from "gnim";
import Brightness from "./../services/brightness"
import BlueFilter from "./../services/bluefilter";

const brightness = Brightness.get_default();
const value = createBinding(brightness, "value");
const bluefilter = BlueFilter.get_default();
const temp = createBinding(bluefilter, "value");
const kbdValue = createBinding(brightness, "kbdValue");

export function BrightnessBox({ name }: { name: string }) {

	return (
		<box
			$type="named"
			name={`${name}`}
			orientation={Gtk.Orientation.VERTICAL}
			cssClasses={["module-content"]}
			valign={Gtk.Align.FILL}
			vexpand
		>
			<box
			>
				<Gtk.Image
					iconName={value(v => {
						if (v < 33) return "brightness-low-symbolic";
						if (v < 66) return "brightness-medium-symbolic";
						return "brightness-high-symbolic";
					})}
					$={(self) => { // image must have text content or label
						self.update_property([Gtk.AccessibleProperty.LABEL], ["Brightness"])
					}}
				/>
				<slider
					name={"brightness-slider"}
					tooltipText="Brightness"
					min={0}
					max={100}
					hexpand
					value={value}
					onChangeValue={(self: Gtk.Scale) => {
						brightness.value = self.get_value()
						return false
					}}
					$={(self) => { // slider must have text content or label
						self.update_property([Gtk.AccessibleProperty.LABEL], ["Brightness"])
					}}
				/>
			</box>
			<box>
				<Gtk.Image iconName={"weather-clear-night-symbolic"}
					$={(self) => { // image must have text content or label
						self.update_property([Gtk.AccessibleProperty.LABEL], ["BlueFilter"])
					}}
				/>
				<slider
					name={"bluefilter-slider"}
					tooltipText={"Bluelight Filter"}
					min={2500}
					max={6500}
					hexpand
					value={temp}
					onChangeValue={(self: Gtk.Scale) => {
						bluefilter.value = self.get_value();
						return false;
					}}
					$={(self) => {
						self.update_property([Gtk.AccessibleProperty.LABEL], ["Brightness"])
					}}
				/>
			</box>
			<box

			>
				<Gtk.Image iconName={"fcitx-vk-active-symbolic"}
					$={(self) => { // image must have text content or label
						self.update_property([Gtk.AccessibleProperty.LABEL], ["Keyboard Brightness"])
					}}
				/>
				<slider
					name={"keyboard-brightness-slider"}
					tooltipText={"Keyboard Brightness"}
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
							brightness.kbdValue = (snapped / 2) * 100;
							return true;
						});
					}}
					value={kbdValue(v => Math.round(v / 100 * 2))}
				/>
			</box>
		</box>
	)
}
