import { createState } from "ags";
import { Gtk } from 'ags/gtk4';
import { execAsync } from "ags/process";
import NM from "gi://NM";

const iconSize = 20

export function NetworkSettingsButton() {
	return (
		<button
			onClicked={() => {
				execAsync("pavucontrol")
				execAsync("helo")
			}}>
			<Gtk.Image iconName="cogged-wheel-symbolic" pixelSize={iconSize} />
		</button>
	);
}
