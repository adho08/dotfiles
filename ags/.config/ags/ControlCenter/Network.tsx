import Gtk from "gi://Gtk?version=4.0";
import Network from "gi://AstalNetwork";
import { exec, execAsync } from "ags/process";
import { Accessor, createBinding, createState, For } from "gnim";
import { showWifiPrompt } from "./components/WifiPasswordPrompt";
import { Button } from "./components/Button"

const network = Network.get_default();
const wifi = network.wifi;
const enabled = createBinding(wifi, "enabled");
const scanningNetwork = createBinding(wifi, "scanning");
const activeAP = createBinding(wifi, "activeAccessPoint");
function deduplicateByStrength(aps: typeof wifi.accessPoints) {
	const map = new Map<string, typeof aps[0]>();
	for (const ap of aps) {
		if (!ap.ssid) continue;
		const existing = map.get(ap.ssid);
		if (!existing || ap.strength > existing.strength) {
			map.set(ap.ssid, ap);
		}
	}
	return Array.from(map.values());
}
const savedNetworks = exec("nmcli -t -f NAME connection show").split("\n");
const [knownNetworks, setKnownNetworks] = createState(
	deduplicateByStrength(
		wifi.accessPoints.filter(ap => ap.ssid && savedNetworks.includes(ap.ssid))
	)
);
const [knownExpanded, setKnownExpanded] = createState(false); // For expansion of folding or known networks
const [availableExpanded, setAvailableExpanded] = createState(false); // For expansion of folding or available networks
const [scannedNetworks, setScannedNetworks] = createState<typeof wifi.accessPoints>([]);
wifi.connect("access-point-added", () => {
	const saved = exec("nmcli -t -f NAME connection show").split("\n");
	const all = deduplicateByStrength(wifi.accessPoints);
	const knownSsids = new Set(knownNetworks().map((ap: { ssid: any }) => ap.ssid));
	all.filter(ap => saved.includes(ap.ssid!) && !knownSsids.has(ap.ssid))
		.forEach(ap => setKnownNetworks([...knownNetworks(), ap]));
	setScannedNetworks(all.filter(ap => !saved.includes(ap.ssid!) && ap.ssid));
});
wifi.connect("access-point-removed", () => {
	const all = wifi.accessPoints.map((ap: { ssid: any; }) => ap.ssid);
	setScannedNetworks(scannedNetworks().filter((ap: { ssid: any; }) => all.includes(ap.ssid)));
});

export function NetworkBox({ name }: { name: string }) {
	return (
		<box
			$type="named"
			name={`${name}`}
			orientation={Gtk.Orientation.VERTICAL}
			cssClasses={["module-content"]}
			valign={Gtk.Align.FILL}
			vexpand
			spacing={20}
		>
			<box>
				<Button
					label={enabled((e: any) => e ? "Wifi On" : "Wifi Off")}
					onClicked={() => wifi.set_enabled(!wifi.enabled)}
				/>
				<Button
					label={scanningNetwork((s: any) => s ? "Scanning..." : "Scan")}
					onClicked={() => wifi.scan()}
				/>
			</box>
			<box orientation={Gtk.Orientation.VERTICAL}>
				<Button
					onClicked={() => setKnownExpanded(!knownExpanded())}
					cssClasses={["flat"]}
				>
					<label
						label={knownExpanded(e => e ? "<u>Known Networks</u> ▼" : "<u>Known Networks</u> ▲")}
						useMarkup
						halign={Gtk.Align.START}
					/>
				</Button>
				<Gtk.Revealer
					revealChild={knownExpanded}
					transitionType={Gtk.RevealerTransitionType.SLIDE_DOWN}
					transitionDuration={200}
				>
					<box orientation={Gtk.Orientation.VERTICAL}>
						<For each={knownNetworks}>
							{(ap: { ssid: string | Accessor<string> | undefined; }) => (
								<box>
									<label
										label={ap.ssid}
										hexpand
										tooltipText={[
											// strength and frequency are props of ap
											`Strength: ${ap.strength}%`,
											`Frequency: ${ap.frequency > 4000 ? "5GHz" : "2.4GHz"}`,
										].join("\n")}
									/>
									<Button
										label={activeAP((a: { ssid: any; }) => a?.ssid === ap.ssid ? "Disconnect" : "Connect")}
										onClicked={() =>
											activeAP()?.ssid === ap.ssid
												? wifi.deactivate_connection()
												: execAsync(`nmcli device wifi connect "${ap.ssid}"`).catch(console.error)}
									/>
								</box>
							)}
						</For>
					</box>
				</Gtk.Revealer>
				<Button
					onClicked={() => setAvailableExpanded(!availableExpanded())}
					cssClasses={["flat"]}
				>
					<label
						label={availableExpanded(a => a ? "<u>Available Networks</u> ▼" : "<u>Available Networks</u> ▲")}
						useMarkup
						halign={Gtk.Align.START}
					/>
				</Button>
				<Gtk.Revealer
					revealChild={availableExpanded}
					transitionType={Gtk.RevealerTransitionType.SLIDE_DOWN}
					transitionDuration={200}
				>
					<box orientation={Gtk.Orientation.VERTICAL}>
						<For each={scannedNetworks}>
							{(ap: { ssid: string | Accessor<string> | undefined; }) => (
								<box>
									<label
										label={ap.ssid}
										hexpand
										tooltipText={[
											// strength and frequency are props of ap
											`Strength: ${ap.strength}%`,
											`Frequency: ${ap.frequency > 4000 ? "5GHz" : "2.4GHz"}`,
										].join("\n")}
									/>
									<Button
										label="Connect"
										onClicked={() => showWifiPrompt(ap.ssid!)}
									/>
								</box>
							)}
						</For>
					</box>
				</Gtk.Revealer>
			</box>
		</box>
	)
}
