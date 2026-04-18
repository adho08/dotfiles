import Gtk from "gi://Gtk"
import { createBinding, createComputed } from "ags"
import Wp from "gi://AstalWp";

const wp = Wp.get_default()
const speaker = wp.audio.defaultSpeaker
const speakerVolume = createBinding(speaker, "volume")
const speakerMute = createBinding(speaker, "mute");
const speakerIcon = createComputed(() => {
	const muted = speakerMute();
	const volume = speakerVolume();
	if (muted || volume === 0) return "xsi-audio-volume-muted";
	if (volume < 0.33) return "xsi-audio-volume-low-symbolic";
	if (volume < 0.66) return "xsi-audio-volume-medium-symbolic";
	return "xsi-audio-volume-high-symbolic";
});

export default function AudioSlider() {
	return (
		<box>
			<Gtk.Image iconName={speakerIcon} />
			<slider
				name={"audio-slider"}
				hexpand
				value={speakerVolume}
				onChangeValue={({ value }) => speaker.set_volume(value)}
			/>
		</box>
	)
}
