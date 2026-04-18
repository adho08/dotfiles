import Notifd from "gi://AstalNotifd"
import { Astal, Gtk } from "ags/gtk4"
import Pango from "gi://Pango"
import GLib from "gi://GLib?version=2.0"
import { createState, For } from "gnim"
import app from "ags/gtk4/app"

const notifd = Notifd.get_default()
const { TOP, RIGHT } = Astal.WindowAnchor
const NOTIF_HEIGHT = 74
const NOTIF_GAP = 10
const MARGIN_TOP = 10
const MARGIN_RIGHT = 10

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

function NotificationWindow({ id, index }: { id: number, index: number }) {
	return (
		<window
			application={app}
			monitor={0}
			name={`notifd-${id}`}
			namespace={`notifd-${id}`}
			visible
			focusable={false}
			anchor={RIGHT | TOP}
			layer={Astal.Layer.OVERLAY}
			marginTop={MARGIN_TOP + index * (NOTIF_HEIGHT + NOTIF_GAP)}
			marginRight={MARGIN_RIGHT}
			cssClasses={["notifd-window"]}
		>
			<NotificationButton css="notifd-button" id={id} />
		</window>
	)
}

export function NotificationPopups() {
	return (
		<For each={toasts}>
			{(id, index) => <NotificationWindow id={id} index={index()} />}
		</For>
	)
}

export function showToast(id: number) {
	GLib.timeout_add(GLib.PRIORITY_DEFAULT, TIMEOUT, () => {
		setToasts(prev => prev.filter(x => x !== id))
		return GLib.SOURCE_REMOVE
	})
}
