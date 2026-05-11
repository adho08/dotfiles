import { Gtk } from "ags/gtk4";
import { createComputed, createState } from "gnim";


export const [activeList, setActiveList] = createState("network")

const iconSize = 20

export function ToNetworkListButton() {
	return (
		<button
			onClicked={() => setActiveList("network")}
			cssClasses={createComputed(() => [
				activeList() === "network"
					? "button-on"
					: "button-off"
			])}
		>
			<Gtk.Image iconName={"radiowaves-1-symbolic"} pixelSize={iconSize} />
		</button>
	)
}

export function ToVpnListButton() {
	return (
		<button
			onClicked={() => setActiveList("vpn")}
			cssClasses={createComputed(() => [
				activeList() === "vpn"
					? "button-on"
					: "button-off"
			])}
		>
			<Gtk.Image iconName={"network-vpn-symbolic"} pixelSize={iconSize} />
		</button>
	)
}
