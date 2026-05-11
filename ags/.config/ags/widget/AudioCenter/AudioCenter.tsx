import { Gtk } from "ags/gtk4"
import { createBinding } from "gnim"
import Wp from "gi://AstalWp";

export function AudioCenter() {
	return (
		<box>
			<label label="Audio" />
		</box>
	)
}

export function AudioMuteButton({ iconSize }: { iconSize: number }) {
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

