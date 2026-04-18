// components/WifiPasswordPrompt.tsx
import { createState } from "ags";
import { execAsync } from "ags/process";
import { timeout } from "ags/time";
import app from "ags/gtk4/app";
import Gtk from "gi://Gtk?version=4.0";
import Astal from "gi://Astal?version=4.0"

const [ssid, setSsid] = createState("");
const [visible, setVisible] = createState(false);

export function showWifiPrompt(networkSsid: string) {
	setSsid(networkSsid);
	setVisible(true);
}

let passwordEntry: Gtk.Entry;

export function WifiPasswordPrompt() {

	return (
		<window
			name="wifi-prompt"
			application={app}
			visible={visible}
			decorated={false}
			keymode={Astal.Keymode.ON_DEMAND}
		>
			<box orientation={Gtk.Orientation.VERTICAL} spacing={8}>
				<label label={ssid(s => `Connect to ${s}`)} />
				<Gtk.Entry
					placeholderText="Password"
					visibility={false}
					inputPurpose={Gtk.InputPurpose.PASSWORD}
					$={(self) => {
						passwordEntry = self;
					}}
				/>
				<box>
					<button
						label="Cancel"
						onClicked={() => setVisible(false)}
					/>
					<button
						label="Connect"
						onClicked={() => {
							const password = passwordEntry?.get_text();
							execAsync(`nmcli device wifi connect "${ssid()}" password "${password}"`).catch(console.error);
							setVisible(false);
						}}
					/>
				</box>
			</box>
		</window>
	);
}
