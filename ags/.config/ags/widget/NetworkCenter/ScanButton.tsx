import { createState } from "ags";
import { Gtk } from 'ags/gtk4';
import Network from "gi://AstalNetwork"
import NM from "gi://NM";

const network = Network.get_default()
const iconSize = 20

export function ScanButton() {

	return (
		<button
			cssName={"icon-button"}
			// cssClasses={airplaneMode((on) => [on ? "button-on" : "button-off"])}
			onClicked={() => { network.wifi?.scan() }}>
			<Gtk.Image iconName="xsi-view-refresh-symbolic" pixelSize={iconSize} />
		</button>
	);
}
