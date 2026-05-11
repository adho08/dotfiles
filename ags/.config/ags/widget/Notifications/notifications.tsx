import Notifd from "gi://AstalNotifd"
import { Astal, Gtk } from "ags/gtk4"
import app from "ags/gtk4/app"
import Pango from "gi://Pango"
import GLib from "gi://GLib?version=2.0"
import { createBinding, createRoot } from "gnim"
import { timeout } from "ags/time"

const notifd = Notifd.get_default()
const { TOP, RIGHT } = Astal.WindowAnchor
const wins: any[] = []
const WIN_HEIGHT = 80
const WIN_WIDTH = 300
const SPACING = 20
const TIMEOUT = 4000

function deleteNotificationPopup(win: any, root: any) {
	const idx = wins.indexOf(win)
	if (idx !== -1) wins.splice(idx, 1)

	app.remove_window(win)
	root.destroy()

	GLib.idle_add(GLib.PRIORITY_DEFAULT, () => {
		updatePositions()
		return GLib.SOURCE_REMOVE
	})

	return GLib.SOURCE_REMOVE
}

function updatePositions() {
	let offset = 10
	for (const win of wins) {
		// put all notifications lower and put the newest at the top
		win.set_margin_top(offset)
		win.set_margin_end(10)
		offset += WIN_HEIGHT + SPACING
	}
}

export function NotificationButton({ css, id }: { css: string, id: number }) {
	const n = notifd.get_notification(id)
	return (
		<button cssClasses={[css]}
			onClicked={() =>
				n?.invoke("default")
			}>
			<box spacing={10}>
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
		</button >
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
			<NotificationButton css={"notifd-button"} id={id} />
		</window>
	)
}

export function displayNotification(id: number) {

	if (notifd.dont_disturb) return

	const root = createRoot(() => {
		const win = <NotificationPopup id={id} /> as any

		app.add_window(win)
		wins.unshift(win)
		updatePositions()

		const t = timeout(TIMEOUT, () => {
			deleteNotificationPopup(win, root)
		})

		win._timeout = t

		return win
	})
}

export function DoNotDisturbButton({ iconSize }: { iconSize: number }) {
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

