import Gtk from "gi://Gtk"
import AudioSlider from "./QuickSettings/Audio"
import BrightnessSlider from "./QuickSettings/Brightness"
import Header from "./QuickSettings/Header"
import { NotificationList } from "./QuickSettings/NotificationList"
import { notifications } from "./widget/notifications-store"
import { With } from "gnim"
import { Astal } from "ags/gtk4"
import app from "ags/gtk4/app"

export default function QuickSettings() {
	const { TOP, LEFT } = Astal.WindowAnchor
	return (

		<window
			application={app}
			$type={"named"}
			name="quick-settings"
			namespace={"quick-settings"}
			defaultWidth={400}
			anchor={TOP | LEFT}
		>
			<box
				orientation={Gtk.Orientation.VERTICAL}
				spacing={5}
			>
				<Header />
				<box cssClasses={["sliders"]} orientation={Gtk.Orientation.VERTICAL}>
					<AudioSlider />
					<BrightnessSlider />
				</box>
				<Gtk.Separator orientation={Gtk.Orientation.HORIZONTAL} />
				<With value={notifications}>
					{(notifs) =>
						notifs.length > 0
							? <NotificationList />
							: (<box
								heightRequest={116}
								valign={Gtk.Align.CENTER}
								halign={Gtk.Align.CENTER}
								vexpand
								hexpand
							>
								<label label="No notifications" />
							</box>)
					}
				</With>
			</box >
		</window >
	)
}
