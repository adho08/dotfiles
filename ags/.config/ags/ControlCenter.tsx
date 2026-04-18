import Gtk from "gi://Gtk"
import { createState } from "ags"
import { BluetoothBox } from "./ControlCenter/Bluetooth"
import { AudioBox } from "./ControlCenter/Audio"
import { NetworkBox } from "./ControlCenter/Network"
import { BrightnessBox } from "./ControlCenter/Brightness"
import { PowermenuBox } from "./ControlCenter/Powermenu"
import { BatteryBox } from "./ControlCenter/Battery"
import { Button } from "./ControlCenter/components/Button"
import GLib from "gi://GLib"
import Gdk from "gi://Gdk?version=4.0"

const username = GLib.get_user_name()
const facePath = `${GLib.get_home_dir()}/.face`

// Page on starting
const [activePage, setActivePage] = createState("bluetooth")

function ModeButton(name: string, icon: string) {
	return (
		<Button
			cssClasses={activePage(p => p === name ? ["mode-button", "active"] : ["mode-button"])}
			onClicked={() => setActivePage(name)}
		>
			<Gtk.Image iconName={icon} />
		</Button>
	)
}

function ModulesGrid(ModeList: Array<Gtk.Button>) {

	const grid = new Gtk.Grid({ column_homogeneous: true, row_homogeneous: true })

	ModeList.forEach((button, index) => {
		grid.attach(button, index % 3, Math.floor(index / 3), 1, 1)
	})
	return grid
}

function ScrollablePage({ name, child }: { name: string, child: JSX.Element }) {
	return (
		<Gtk.ScrolledWindow $type="named" name={name} heightRequest={200}>
			{child}
		</Gtk.ScrolledWindow>
	);
}

function TitlesStack() {
	return (
		<stack
			transitionType={Gtk.StackTransitionType.SLIDE_LEFT_RIGHT}
			$={(self) => {
				const update = () => self.set_visible_child_name(activePage());
				update();
				activePage.subscribe(update);
			}}
		>
			<label $type="named" name="bluetooth" cssClasses={["titles"]} halign={Gtk.Align.START} label="Bluetooth" />
			<label $type="named" name="audio" cssClasses={["titles"]} halign={Gtk.Align.START} label="Audio" />
			<label $type="named" name="network" cssClasses={["titles"]} halign={Gtk.Align.START} label="Network" />
			<label $type="named" name="brightness" cssClasses={["titles"]} halign={Gtk.Align.START} label="Brightness" />
			<label $type="named" name="battery" cssClasses={["titles"]} halign={Gtk.Align.START} label="Battery" />
			<label $type="named" name="powermenu" cssClasses={["titles"]} halign={Gtk.Align.START} label="Powermenu" />
		</stack>
	)
}
function SettingsStack() {

	// Documentation: https://aylur.github.io/astal/guide/introduction

	return (
		<stack
			transitionType={Gtk.StackTransitionType.SLIDE_LEFT_RIGHT}
			hexpand
			vexpand
			vhomogeneous={false}
			name={"stack"}
			$={(self) => {
				const update = () =>
					self.set_visible_child_name(activePage())

				update()                 // initial set
				activePage.subscribe(update)

				self.set_opacity(0.9);
			}}
		>
			<BluetoothBox name="bluetooth" />
			<AudioBox name="audio" />
			<NetworkBox name="network" />
			<BrightnessBox name="brightness" />
			<BatteryBox name="battery" />
			<PowermenuBox name="powermenu" />

		</stack >
	)
}


export default function ControlCenter() {

	const grid = ModulesGrid([
		ModeButton("bluetooth", "xsi-bluetooth-active-symbolic"),
		ModeButton("audio", "audio-speakers-symbolic"),
		ModeButton("network", "xsi-network-wireless-signal-excellent-symbolic"),
		ModeButton("brightness", "xsi-display-brightness-symbolic"),
		ModeButton("battery", "battery-full-symbolic"),
		ModeButton("powermenu", "xsi-shutdown-symbolic"),
	])
	grid.set_name("modules-grid");

	return (
		<box
			orientation={Gtk.Orientation.VERTICAL}
			// spacing={20}
			name="control-center"
			heightRequest={300}
		>
			<box>
				<image file={facePath} />
				<label label={username} halign={Gtk.Align.START} />
			</box>
			<box
				orientation={Gtk.Orientation.VERTICAL}
			>

				{/* Top Grid */}
				{grid}

				<box heightRequest={8} /> {/* Space in between */}

				{/* Dynamic content */}
				<box
					hexpand
					vexpand={false}
					name="module-box"
					orientation={Gtk.Orientation.VERTICAL}
				>
					<TitlesStack />
					<Gtk.ScrolledWindow
						heightRequest={200}
						name={"settings-window"}
					>
						<SettingsStack />
					</Gtk.ScrolledWindow>
				</box>
			</box>
		</box>
	)
}
