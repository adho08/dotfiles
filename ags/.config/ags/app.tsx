#!/usr/bin/env -S ags run
import app from "ags/gtk4/app"
import QuickSettings from "./QuickSettings"
import { BluetoothCenter } from "./BluetoothCenter"
import { monitorFile } from "ags/file"
import Adw from "gi://Adw"
import { AudioCenter } from "./AudioCenter"
import { NetworkCenter } from "./NetworkCenter"
import "./widget/notifications"
import { NotificationPopups } from "./widget/notifications"

Adw.StyleManager.get_default().set_color_scheme(
	Adw.ColorScheme.PREFER_DARK
)

const STYLE = `${SRC}/build/style.css`

function DebugWindow() {
	return (
		<window name="debug" visible={true}>
			<label label="idle" />
		</window>
	)
}

const WINDOW_NAMES = [
	"quick-settings",
	"bluetooth-center",
	"audio-center",
	"network-center"
]

function setExclusive(name: string) {
	for (const n of WINDOW_NAMES) {
		const w = app.get_window(n)
		if (!w) continue
		w.visible = n === name
	}
}

app.start({
	requestHandler(argv, res) {
		const name = argv?.[0]
		if (!name) return res("no window")

		const win = app.get_window(name)
		if (!win) return res("not found")

		const willOpen = !win.visible

		if (willOpen) {
			setExclusive(name)
		} else {
			win.visible = false
		}

		return res("ok")
	},
	iconTheme: "Papirus-Dark",

	main() {
		app.apply_css(STYLE, true)

		monitorFile(STYLE, () => {
			app.apply_css(STYLE, true)
		})

		return [
			<QuickSettings />,
			<BluetoothCenter />,
			<AudioCenter />,
			<NetworkCenter />,
			<NotificationPopups />
		]
	},
})
