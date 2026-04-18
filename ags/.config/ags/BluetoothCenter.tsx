import app from "ags/gtk4/app";

export function BluetoothCenter() {
	return (
		<window
			application={app}
			$type={"named"}
			name="bluetooth-center"
			namespace={"bluetooth-center"}
			defaultWidth={400}
		>
			<box>
				<label label="Bluetooth" />
			</box>
		</window>
	)
}
