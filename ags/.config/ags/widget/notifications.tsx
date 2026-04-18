import Notifd from "gi://AstalNotifd"
import { Astal, Gtk } from "ags/gtk4"
import app from "ags/gtk4/app"
import Pango from "gi://Pango"
import GLib from "gi://GLib?version=2.0"
import { createRoot } from "gnim"
import { notifications } from "./notifications-store"

const notifd = Notifd.get_default()
const { TOP, RIGHT } = Astal.WindowAnchor
const wins: any[] = []
const WIN_HEIGHT = 80
const WIN_WIDTH = 300
const SPACING = 20
const TIMEOUT = 4000

function updatePositions() {
	let offset = 10
	for (const win of wins) {
		// put all notifications lower and put the newest at the top
		win.set_margin_top(offset)
		win.set_margin_end(10)
		offset += WIN_HEIGHT + SPACING
	}
}

export function NotificationButton({ id }: { id: number }) {
	const n = notifd.get_notification(id)
	return (
		<button cssClasses={["notifd-button"]} onClicked={() => n?.invoke("default")}>
			<box cssClasses={["notifd-box"]} spacing={10}>
				<image iconName={n?.desktop_entry} pixelSize={64} />
				<box valign={Gtk.Align.CENTER} orientation={Gtk.Orientation.VERTICAL}>
					<label cssClasses={["notify-summary"]} label={n?.summary}
						wrap={false}
						lines={1}
						ellipsize={Pango.EllipsizeMode.END}
						xalign={0}
					/>
					<label cssClasses={["notify-body"]} label={n?.body || ""}
						wrap
						lines={2}
						ellipsize={Pango.EllipsizeMode.END}
						wrapMode={Pango.WrapMode.WORD_CHAR}
						xalign={0}
					/>
				</box>
			</box>
		</button>
	)
}

export function NotificationPopup({ id }: { id: number }) {
	return (
		<window
			visible
			application={app}
			anchor={RIGHT | TOP}
			heightRequest={WIN_HEIGHT}
			widthRequest={WIN_WIDTH}
			defaultWidth={WIN_WIDTH}
			hexpand={false}
			cssClasses={["notifd-window"]}
			namespace={"notifications"}
		>
			<NotificationButton id={id} />
		</window>
	)
}

notifd.connect("notified", (_, id) => {
	if (notifd.dont_disturb) return

	const root = createRoot(() => {
		const win = <NotificationPopup id={id} /> as any

		app.add_window(win)
		wins.unshift(win)
		updatePositions()

		GLib.timeout_add(GLib.PRIORITY_DEFAULT, TIMEOUT, () => {
			const idx = wins.indexOf(win)
			if (idx !== -1) wins.splice(idx, 1)

			app.remove_window(win)
			root.destroy()

			GLib.idle_add(GLib.PRIORITY_DEFAULT, () => {
				updatePositions()
				return GLib.SOURCE_REMOVE
			})

			return GLib.SOURCE_REMOVE
		})

		return win
	})
})
