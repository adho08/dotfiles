import Gtk from "gi://Gtk?version=4.0";
import Bluetooth from "gi://AstalBluetooth"
import { For, createState, createBinding } from "ags"
import { Button } from "./components/Button"

const bluetooth = Bluetooth.get_default()
const scanningBluetooth = createBinding(bluetooth.adapter, "discovering");
const [knownDevices, setKnownDevices] = createState(bluetooth.devices.filter(d => (d.paired || d.trusted) && d.name));
const [scannedDevices, setScannedDevices] = createState<typeof bluetooth.devices>([]);
bluetooth.connect("notify::devices", () => {
	const all = bluetooth.devices;
	const known = knownDevices();
	const knownAddresses = new Set(known.map(d => d.address));

	// add newly discovered paired/trusted devices to known
	all.filter(d => (d.paired || d.trusted) && !knownAddresses.has(d.address))
		.forEach(d => setKnownDevices([...knownDevices(), d]));

	// scanned = everything not in known
	const allKnownAddresses = new Set(knownDevices().map(d => d.address));
	setScannedDevices(all.filter(d => !allKnownAddresses.has(d.address) && d.name));
});

// Explansion buttons
const [knownExpanded, setKnownExpanded] = createState(false);
const [scannedExpanded, setScannedExpanded] = createState(false);


export function BluetoothBox({ name }: { name: string }) {

	if (!bluetooth.adapter) {
		return (
			<box $type={"named"} name={name}>
				<label label="No Bluetooth adapter found" />
			</box>
		)
	}

	return (
		<box
			$type="named"
			name={`${name}`}
			orientation={Gtk.Orientation.VERTICAL}
			cssClasses={["module-content"]}
			valign={Gtk.Align.FILL}
			vexpand
		>
			<box>
				<Button
					label={createBinding(bluetooth, "isPowered")(p => p ? "On" : "Off")}
					onClicked={() => bluetooth.adapter.set_powered(!bluetooth.adapter.powered)}
				/>
				<Button
					label={scanningBluetooth(s => s ? "Stop Scan" : "Scan")}
					onClicked={() => scanningBluetooth()
						? bluetooth.adapter.stop_discovery()
						: bluetooth.adapter.start_discovery()}
				/>
			</box>
			<box heightRequest={20} />
			<Button
				onClicked={() => setKnownExpanded(!knownExpanded())}
				cssClasses={["flat"]}
			>
				<label label={knownExpanded(e => e ? "<u>Known Devices</u> ▼" : "<u>Known Devices</u> ▲")}
					useMarkup
					halign={Gtk.Align.START} />
			</Button>
			<Gtk.Revealer
				revealChild={knownExpanded}
				transitionType={Gtk.RevealerTransitionType.SLIDE_DOWN}
				transitionDuration={200}
			>
				<box orientation={Gtk.Orientation.VERTICAL}>
					<For each={knownDevices}>
						{(device) => <box>
							<Gtk.Image iconName={device.icon} pixelSize={16} tooltipText={device.icon} />
							<label label={device.name}
								hexpand
								tooltipText={createBinding(device, "batteryPercentage")(b => {
									const parts = [];
									if (b > 0) parts.push(`Battery: ${b}%`); // b is -1 when not available
									parts.push(`${device.address}`);
									return parts.join("\n");
								})}
							/>
							<Button
								label={createBinding(device, "connected")(c => c ? "Discconect" : "Connect")}
								onClicked={() => device.connected
									? device.disconnect_device(() => { })
									: device.connect_device(() => { })
								}
							/>
						</box>}
					</For>
				</box>
			</Gtk.Revealer >
			<Button
				onClicked={() => setScannedExpanded(!scannedExpanded())}
				cssClasses={["flat"]}
			>
				<label label={scannedExpanded(e => e ? "<u>Scanned Devices</u> ▼" : "<u>Scanned Devices</u> ▲")}
					useMarkup
					halign={Gtk.Align.START} />
			</Button>
			<Gtk.Revealer
				revealChild={scannedExpanded}
				transitionType={Gtk.RevealerTransitionType.SLIDE_DOWN}
				transitionDuration={200}
			>
				<For each={scannedDevices}>
					{(device) => <box>
						<Gtk.Image iconName={device.icon} pixelSize={16} tooltipText={device.icon} />
						<label label={device.name}
							hexpand
							tooltipText={createBinding(device, "batteryPercentage")(b => {
								const parts = [];
								if (b > 0) parts.push(`Battery: ${b}%`); // b is -1 when not available
								parts.push(`${device.address}`);
								return parts.join("\n");
							})}
						/>
						<Button
							label={createBinding(device, "connected")(c => c ? "Discconect" : "Connect")}
							onClicked={() => device.connected
								? device.disconnect_device(() => { })
								: device.connect_device(() => { })
							}
						/>
					</box>}
				</For>
			</Gtk.Revealer>
		</box >
	)
}
