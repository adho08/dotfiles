import Gtk from "gi://Gtk"
import Bluetooth from "gi://AstalBluetooth"
import Wp from "gi://AstalWp"
import { For, createState, createBinding, createComputed } from "ags"
import Brightness from "./services/brightness"
import BlueFilter from "./services/bluefilter";
import { execAsync, subprocess } from "ags/process"

// Page on starting
const [activePage, setActivePage] = createState("bluetooth")

function ModeButton(name: string, icon: string) {
	return (
		<button
			name="circle-button"
			onClicked={() => setActivePage(name)}
		>
			<label label={icon} />
		</button> as Gtk.Button
	)
}

function ModulesGrid(ModeList: Array<Gtk.Button>) {

	const grid = new Gtk.Grid({ column_homogeneous: true, row_homogeneous: true })

	ModeList.forEach((button, index) => {
		grid.attach(button, index % 3, Math.floor(index / 3), 1, 1)
	})
	return grid
}

function SettingsStack() {

	// Bluetooth
	const bluetooth = Bluetooth.get_default()
	const scanning = createBinding(bluetooth.adapter, "discovering");
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

	// Audio
	const wp = Wp.get_default()
	const speaker = wp.audio.defaultSpeaker
	const mic = wp.audio.defaultMicrophone
	const speakerVolume = createBinding(speaker, "volume")
	const speakerMute = createBinding(speaker, "mute");
	const speakerIcon = createComputed(() => {
		const muted = speakerMute();
		const volume = speakerVolume();
		if (muted || volume === 0) return "󰸈";
		if (volume < 0.33) return "󰕿";
		if (volume < 0.66) return "󰖀";
		return "󰕾";
	});
	const micVolume = createBinding(mic, "volume")
	const micMute = createBinding(mic, "mute");
	const micIcon = createComputed(() => {
		const muted = micMute();
		const volume = micVolume();
		if (muted || volume === 0) return "󰍭";
		return "󰍬";
	});

	// Brightness 
	const brightness = Brightness.get_default();
	const value = createBinding(brightness, "value");
	const bluefilter = BlueFilter.get_default();
	const temp = createBinding(bluefilter, "value");
	subprocess("wl-gammarelay run");

	// Documentation: https://aylur.github.io/astal/guide/introduction

	return (
		<stack
			transitionType={Gtk.StackTransitionType.SLIDE_LEFT_RIGHT}
			hexpand
			vexpand
			$={(self) => {
				const update = () =>
					self.set_visible_child_name(activePage())

				update()                 // initial set
				activePage.subscribe(update)
			}}
		>
			<box $type="named" name="bluetooth">
				<box orientation={Gtk.Orientation.VERTICAL}>
					<box>
						<button
							label={createBinding(bluetooth, "isPowered")(p => p ? "On" : "Off")}
							onClicked={() => bluetooth.adapter.set_powered(!bluetooth.adapter.powered)}
						/>
						<button
							label={scanning(s => s ? "Stop Scan" : "Scan")}
							onClicked={() => scanning()
								? bluetooth.adapter.stop_discovery()
								: bluetooth.adapter.start_discovery()}
						/>
					</box>
					<label label="Known Devices" />
					<For each={knownDevices}>
						{(device) => <box>
							<label label={device.name} hexpand />
							<button
								label={createBinding(device, "connected")(c => c ? "Discconect" : "Connect")}
								onClicked={() => device.connected
									? device.disconnect_device(() => { })
									: device.connect_device(() => { })
								}
							/>
						</box>}
					</For>
					<label label="Scanned Devices" />
					<For each={scannedDevices}>
						{(device) => <box>
							<label label={device.name} hexpand />
							<button
								label={createBinding(device, "connected")(c => c ? "Discconect" : "Connect")}
								onClicked={() => device.connected
									? device.disconnect_device(() => { })
									: device.connect_device(() => { })
								}
							/>
						</box>}
					</For>
				</box>
			</box>
			<box $type="named" name="audio" orientation={Gtk.Orientation.VERTICAL}>
				<box>
					<button
						label={speakerIcon}
						onClicked={() => speaker.set_mute(!speaker.mute)}
					/>
					<slider
						widthRequest={260}
						value={speakerVolume}
						onChangeValue={({ value }) => speaker.set_volume(value)}
					/>
				</box>
				<box>
					<button
						label={micIcon}
						onClicked={() => mic.set_mute(!mic.mute)}
					/>
					<slider
						widthRequest={260}
						value={micVolume}
						onChangeValue={({ value }) => mic.set_volume(value)}
					/>
				</box>

			</box>
			<box $type="named" name="wifi"><label label="Wifi networks" /></box>
			<box $type="named" name="backlight" orientation={Gtk.Orientation.VERTICAL}>
				<label label="Brightness control" />
				<box>
					<label label={""} />
					<slider
						min={0}
						max={100}
						hexpand
						value={value}
						onChangeValue={(self: Gtk.Scale) => {
							brightness.value = self.get_value()
							return false
						}}
					/>
				</box>
				<box>
					<label label={temp(t => t < 4000 ? "󱩌" : t < 5500 ? "󰛨" : "󰖨")} />
					<slider
						min={2500}
						max={6500}
						hexpand
						value={temp}
						onChangeValue={(self: Gtk.Scale) => {
							bluefilter.value = self.get_value();
							return false;
						}}
					/>
				</box>
			</box>
			<box $type="named" name="battery"><label label="Battery info" /></box>
			<box $type="named" name="power"><label label="Power options" /></box>
		</stack >
	)
}


export default function ControlCenter() {


	const grid = ModulesGrid([
		ModeButton("bluetooth", "󰂯"),
		ModeButton("audio", ""),
		ModeButton("wifi", "󰖩"),
		ModeButton("backlight", ""),
		ModeButton("battery", ""),
		ModeButton("power", "⏻"),
	])
	return (
		<box
			orientation={Gtk.Orientation.VERTICAL}
			spacing={20}
			name="control-center"
		>
			{/* Top Grid */}
			{grid}

			{/* Dynamic content */}
			<box hexpand vexpand={false}>
				<SettingsStack />
			</box>
		</box>
	)
}
