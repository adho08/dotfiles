import Notifd from "gi://AstalNotifd"
import { Astal, Gtk } from "ags/gtk4"
import Pango from "gi://Pango"
import GLib from "gi://GLib?version=2.0"
import { createState, For } from "gnim"
import app from "ags/gtk4/app"

log("NOTIFICATIONS FILE LOADED")

const notifd = Notifd.get_default()
const { TOP, RIGHT } = Astal.WindowAnchor
const WIN_HEIGHT = 80
const WIN_WIDTH = 300
const SPACING = 10
const TIMEOUT = 4000

export const [toasts, setToasts] = createState<number[]>([])

export function NotificationButton({ css, id }: { css: string, id: number }) {
	const n = notifd.get_notification(id)
	if (!n) return <></>
	return (
		<button cssClasses={[css]} onClicked={() => n?.invoke("default")}>
			<box spacing={SPACING}>
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

function NotificationWindow({ id }: { id: number }) {
	print("NotificationWindow")
	return (
		<box
			// monitor={0}
			visible
			// anchor={RIGHT | TOP}
			heightRequest={WIN_HEIGHT}
			widthRequest={WIN_WIDTH}
			// defaultWidth={WIN_WIDTH}
			hexpand={false}
		// namespace={"notifications"}
		// layer={Astal.Layer.OVERLAY}
		>
			<NotificationButton css="notifd-button" id={id} />
		</box>
	)
}


export function NotificationPopups() {
	return (
		<window
			monitor={0}
			visible={toasts().length > 0}
			focusable={false}
			sensitive={false}
			canFocus={false}
			canTarget={false}
			anchor={RIGHT | TOP}
			heightRequest={WIN_HEIGHT}
			widthRequest={WIN_WIDTH}
			defaultWidth={WIN_WIDTH}
			hexpand={false}
			cssClasses={["notifd-window"]}
			namespace={"notifications"}
			layer={Astal.Layer.OVERLAY}
		>
			<box orientation={Gtk.Orientation.VERTICAL}>

				<For each={toasts}>
					{(id) => <NotificationButton css="notifd-button" id={id} />}
				</For>
			</box>
		</window>
	)
}

export function showToast(id: number) {
	GLib.timeout_add(GLib.PRIORITY_DEFAULT, TIMEOUT, () => {
		setToasts(prev => prev.filter(x => x !== id))
		print(toasts)
		return GLib.SOURCE_REMOVE
	})
}

toasts.subscribe(() => {
	const win = app.get_window("notifd-window")
	if (!win) return

	GLib.idle_add(GLib.PRIORITY_DEFAULT, () => {
		const h = toasts().length * 90
		win.set_size_request(300, Math.max(1, h))
		return GLib.SOURCE_REMOVE
	})
})
