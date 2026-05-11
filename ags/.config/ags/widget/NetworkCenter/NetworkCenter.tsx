import app from "ags/gtk4/app";
import { AirplaneButton } from "./AirplaneButton";
import { ScanButton } from "./ScanButton";
import Astal from "gi://Astal";
import Gtk from "gi://Gtk";
import { SettingsButton } from "../shared/SettingsButton";
import { NetworkList } from "./NetworkList";
import { With } from "gnim";
import { activeList, ToNetworkListButton, ToVpnListButton } from "./ChangeListButton";
import { VpnList } from "./VpnList";

const { TOP, RIGHT } = Astal.WindowAnchor
const iconSize = 20

export function NetworkCenter() {
	return (
		<window
			application={app}
			$type={"named"}
			name="network-center"
			namespace={"network-center"}
			defaultWidth={400}
			anchor={TOP | RIGHT}
		>
			<box orientation={Gtk.Orientation.VERTICAL}>
				<box hexpand>
					<AirplaneButton iconSize={iconSize} />
					<ScanButton />
					<box halign={Gtk.Align.END}>
						<ToNetworkListButton />
						<ToVpnListButton />
					</box>
				</box>
				<With value={activeList}>
					{(current) =>
						current === "network"
							? <NetworkList />
							: <VpnList />
					}
				</With>
				<box hexpand>
					<SettingsButton
						iconName={"settings-symbolic"} iconSize={iconSize}
						halign={Gtk.Align.END}
					/>
				</box>
			</box>
		</window>
	)
}
