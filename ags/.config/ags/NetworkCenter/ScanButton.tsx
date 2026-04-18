import { createState } from "ags";
import { Gtk } from 'ags/gtk4';
import NM from "gi://NM";

const iconSize = 20

export function ScanButton() {

	return (
		<button
			// cssClasses={airplaneMode((on) => [on ? "button-on" : "button-off"])}
			onClicked={() => { }}>
			<Gtk.Image iconName="xsi-view-refresh-symbolic" pixelSize={iconSize} />
		</button>
	);
}
