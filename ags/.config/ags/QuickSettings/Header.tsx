import GLib from 'gi://GLib'
import Wp from "gi://AstalWp";
import Notifd from "gi://AstalNotifd";
import { createBinding, createComputed, createState, onCleanup } from "ags";
import { Gtk } from 'ags/gtk4';
import NM from "gi://NM";
import { createPoll } from 'ags/time';
import { AirplaneButton } from '../NetworkCenter/AirplaneButton';

const iconSize = 20

function DoNotDisturbButton() {
	const notifd = Notifd.get_default()
	return (
		<button
			cssClasses={createBinding(notifd, "dont_disturb")(
				(dnd) => dnd ? ["button-on"] : ["button-off"]
			)}
			onClicked={() => notifd.set_dont_disturb(!notifd.dont_disturb)}>
			<Gtk.Image iconName="xsi-notifications-disabled-symbolic" pixelSize={iconSize} />
		</button>
	)
}

function AudioMuteButton() {
	const wp = Wp.get_default()
	const speaker = wp.audio.defaultSpeaker
	return (
		<button
			cssClasses={createBinding(speaker, "mute")(
				(mute) => mute ? ["button-on"] : ["button-off"]
			)}
			onClicked={() => speaker.set_mute(!speaker.mute)}>
			<Gtk.Image iconName="xsi-audio-volume-muted-symbolic" pixelSize={iconSize} />
		</button>
	)
}

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
				<AudioMuteButton />
				{/* airplane mode button */}
				<AirplaneButton />
				{/* do not disturb button */}
				<DoNotDisturbButton />
			</box>
		</box >
	)
}
