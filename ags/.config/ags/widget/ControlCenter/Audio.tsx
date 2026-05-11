import Wp from "gi://AstalWp";
import Gtk from "gi://Gtk?version=4.0";
import { createBinding, createComputed } from "ags";
import { Button } from "./components/Button"

const wp = Wp.get_default()
const speaker = wp.audio.defaultSpeaker
const speakerVolume = createBinding(speaker, "volume")
const speakerMute = createBinding(speaker, "mute");
const speakerIcon = createComputed(() => {
	const muted = speakerMute();
	const volume = speakerVolume();
	if (muted || volume === 0) return "󰸈";
	if (volume < 0.33) return "󰕿";
	if (volume < 0.66) return "󰖀";
	return "󰕾";
});
const mic = wp.audio.defaultMicrophone
const micVolume = createBinding(mic, "volume")
const micMute = createBinding(mic, "mute");
const micIcon = createComputed(() => {
	const muted = micMute();
	const volume = micVolume();
	if (muted || volume === 0) return "󰍭";
	return "󰍬";
});

export function AudioBox({ name }: { name: string }): JSX.Element {
	return (
		<box
			$type="named"
			name={`${name}`}
			orientation={Gtk.Orientation.VERTICAL}
			cssClasses={["module-content"]}
			valign={Gtk.Align.FILL}
			vexpand
		>
			<Button
				halign={Gtk.Align.START}
				onClicked={() => {
					speaker.set_mute(true)
					mic.set_mute(true)
				}}
			>
				<label label={"Mute All"} />
			</Button>
			<box orientation={Gtk.Orientation.VERTICAL} valign={Gtk.Align.CENTER}>
				<box orientation={Gtk.Orientation.VERTICAL} valign={Gtk.Align.CENTER}>
					<label label={"Speaker"} halign={Gtk.Align.START} />
					<box>
						<Button
							label={speakerIcon}
							cssClasses={["flat"]}
							onClicked={() => speaker.set_mute(!speaker.mute)}
						/>
						<slider
							widthRequest={260}
							hexpand
							value={speakerVolume}
							onChangeValue={({ value }) => speaker.set_volume(value)}
						/>
					</box>
				</box>
				<box orientation={Gtk.Orientation.VERTICAL} valign={Gtk.Align.CENTER}>
					<label label={"Microphone"} halign={Gtk.Align.START} />
					<box>
						<Button
							label={micIcon}
							cssClasses={["flat"]}
							onClicked={() => mic.set_mute(!mic.mute)}
						/>
						<slider
							widthRequest={260}
							hexpand
							value={micVolume}
							onChangeValue={({ value }) => mic.set_volume(value)}
						/>
					</box>
				</box>
			</box>
		</box >
	)
}
