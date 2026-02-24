#!/usr/bin/env -S ags run
import { Astal } from "ags/gtk4"
import app from "ags/gtk4/app"
import ControlCenter from "./ControlCenter"

function Window() {
	const { TOP, LEFT } = Astal.WindowAnchor

	return (
		<window
			application={app}
			name="main-widget"
			visible={false}
			defaultHeight={600}
			anchor={TOP | LEFT} >
			<ControlCenter />
		</window>
	)
}

app.start({
	requestHandler(request: string, res: (response: string) => void) {
		if (request === "main-widget") {
			const win = app.get_window("main-widget");
			win?.set_visible(!win.get_visible())
			res("ok")
		}
	},
	main() {
		Window()
	}
})
