import Network from "gi://AstalNetwork"
import Gtk from "gi://Gtk?version=4.0"
import { createComputed } from "gnim"
import { activeList } from "./ChangeListButton"

const network = Network.get_default()

function groupBySSID(accessPoints: any[]) {
	const map = new Map<string, any[]>()

	for (const ap of accessPoints) {
		const ssid = ap.ssid || "Hidden"

		if (!map.has(ssid)) {
			map.set(ssid, [])
		}

		map.get(ssid)!.push(ap)
	}

	return map
}

function bestAP(aps: any[]) {
	return aps.reduce((best, ap) =>
		ap.strength > best.strength ? ap : best
	)
}

export function NetworkList() {
	const wifi = network.wifi

	const grouped = groupBySSID(wifi?.access_points ?? [])

	const networks = Array.from(grouped.entries())
		.map(([ssid, aps]) => ({
			ssid,
			ap: bestAP(aps),
			aps,
		}))
		.sort((a, b) => b.ap.strength - a.ap.strength)

	return (
		<box
			orientation={Gtk.Orientation.VERTICAL}
			spacing={6}
			visible={createComputed(() =>
				activeList() === "network"
			)}
		>
			{networks.map((net) => (
				<NetworkButton net={net} />
			))}
		</box>
	)
}

function NetworkButton({ net }: { net: any }) {
	return (
		<button
			onClicked={() => net.ap.activate()}
			cssClasses={[
				"network-row",
				net.ap.active ? "active" : "",
			]}
		>
			<box spacing={10}>
				<image
					iconName="network-wireless-symbolic"
					pixelSize={18}
				/>

				<box orientation={Gtk.Orientation.VERTICAL}>
					<label
						label={net.ssid}
						xalign={0}
					/>

					<label
						label={`${net.ap.strength}%`}
						cssClasses={["network-sub"]}
						xalign={0}
					/>
				</box>
			</box>
		</button>
	)
}
