import Gtk from "gi://Gtk?version=4.0"
import { execAsync } from "ags/process"
import { Button } from "./components/Button"

function PowermenuButton({ icon, tooltip, exec, script }: { icon: string, tooltip: string, exec?: string, script?: string }): JSX.Element {

	const handleClick = () => {
		if (script) {
			execAsync(`${SRC}/scripts/${script}`).catch(console.error);
		} else if (exec) {
			execAsync(exec).catch(console.error);
		}
	};

	return (
		<Gtk.AspectFrame
			ratio={1}
			obeyChild={false}
			name="powermenu-aspect-frame"
			hexpand
		>
			<Button
				onClicked={handleClick}
				tooltipText={tooltip}
			>
				<Gtk.Image iconName={icon} cssClasses={["powermenu-labels"]} pixelSize={32} />
			</Button>

		</Gtk.AspectFrame>
	)
}

export function PowermenuBox({ name }: { name: string }) {
	return (
		<box
			$type="named"
			name={`${name}`}
			cssClasses={["module-content"]}
			hexpand
			valign={Gtk.Align.FILL}
			vexpand
		>
			<PowermenuButton icon="system-lock-screen-symbolic" tooltip="Lock" script="lock.sh" />
			<PowermenuButton icon="weather-clear-night-symbolic" tooltip="Suspend" script="suspend.sh" />
			<PowermenuButton icon="system-log-out-symbolic" tooltip="Logout" script="logout.sh" />
			<PowermenuButton icon="system-restart-symbolic" tooltip="Reboot" exec="systemctl reboot" />
			<PowermenuButton icon="system-shutdown-symbolic" tooltip="Shutdown" exec="systemctl poweroff" />
		</box>
	)
}
