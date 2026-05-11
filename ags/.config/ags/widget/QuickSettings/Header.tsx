import GLib from 'gi://GLib'
import { createBinding, createState } from "ags";
import { Gtk } from 'ags/gtk4';
import { AirplaneButton } from '../NetworkCenter/AirplaneButton';
import { DoNotDisturbButton } from '../Notifications/notifications';
import { AudioMuteButton } from '../AudioCenter/AudioCenter';

const iconSize = 20

export default function Header() {
	const [time, setTime] = createState("")
	const [date, setDate] = createState("")

	GLib.timeout_add(GLib.PRIORITY_DEFAULT, 1000, () => {
		setDate(GLib.DateTime.new_now_local().format("%d.%m.%y") ?? "")
		setTime(GLib.DateTime.new_now_local().format("%H:%M") ?? "")
		return true
	})
	return (
		<box cssClasses={["header"]}>
			<box orientation={Gtk.Orientation.VERTICAL} halign={Gtk.Align.START}>
				<label cssClasses={["time"]} label={time} halign={Gtk.Align.START} />
				<label cssClasses={["date"]} label={date} halign={Gtk.Align.START} />
			</box>
			<box hexpand />
			<box spacing={12}>
				{/* audio muted button */}
				<AudioMuteButton iconSize={iconSize} />
				{/* airplane mode button */}
				<AirplaneButton iconSize={iconSize} />
				{/* do not disturb button */}
				<DoNotDisturbButton iconSize={iconSize} />
			</box>
		</box >
	)
}
