import app from "ags/gtk4/app";
import { exec } from "ags/process";
import Network from "gi://AstalNetwork";
import { createBinding, createState } from "gnim";
import { AirplaneButton } from "./NetworkCenter/AirplaneButton";
import { ScanButton } from "./NetworkCenter/ScanButton";
import Astal from "gi://Astal";
import Gtk from "gi://Gtk";
import { NetworkSettingsButton } from "./NetworkCenter/NetworkSettingsButton";

const network = Network.get_default();
const wifi = network.wifi;
const enabled = createBinding(wifi, "enabled");
const scanningNetwork = createBinding(wifi, "scanning");
const activeAP = createBinding(wifi, "activeAccessPoint");

const { TOP, RIGHT } = Astal.WindowAnchor

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
			<box>
				<AirplaneButton />
				<ScanButton />
				<NetworkSettingsButton />
			</box>
		</window>
	)
}
