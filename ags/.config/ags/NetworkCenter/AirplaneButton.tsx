import { createState } from "ags";
import { Gtk } from 'ags/gtk4';
import NM from "gi://NM";

const iconSize = 20

export function AirplaneButton() {
	const [airplaneMode, setAirplaneMode] = createState(false);
	let nmClient: NM.Client | null = null;

	NM.Client.new_async(null, (_, result) => {
		nmClient = NM.Client.new_finish(result);
		setAirplaneMode(!nmClient.wireless_enabled);

		nmClient.connect("notify::wireless-enabled", () => {
			setAirplaneMode(!nmClient!.wireless_enabled);
		});
	});

	return (
		<button
			cssClasses={airplaneMode((on) => [on ? "button-on" : "button-off"])}
			onClicked={() => {
				if (nmClient) {
					nmClient.wireless_enabled = !nmClient.wireless_enabled;
				}
			}}>
			<Gtk.Image iconName="xsi-airplane-symbolic" pixelSize={iconSize} />
		</button>
	);
}
