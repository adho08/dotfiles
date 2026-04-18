import app from "ags/gtk4/app";

export function AudioCenter() {
	return (
		<window
			application={app}
			$type={"named"}
			name="audio-center"
			namespace={"audio-center"}
			defaultWidth={400}
		>
			<box>
				<label label="Audio" />
			</box>
		</window>
	)
}
