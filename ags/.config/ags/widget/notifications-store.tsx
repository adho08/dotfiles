import { createState } from "ags"
import app from "ags/gtk4/app"
import Notifd from "gi://AstalNotifd"
import GLib from "gi://GLib"
import { setToasts, showToast, toasts } from "./notifications"

const notifd = Notifd.get_default()
export const [notifications, setNotifications] = createState<Notifd.Notification[]>([])


// when getting notified
notifd.connect("notified", (_, id) => {
	const n = notifd.get_notification(id)
	// if no notification, interrupt
	if (!n) return

	if (toasts().includes(id)) return
	// add notification to lists
	setToasts(prev => [id, ...prev])
	setNotifications(prev => [n, ...prev])
	showToast(id)
})

notifd.connect("resolved", (_, id) => {
	// remove notification from list
	setNotifications(prev => prev.filter(n => n.id !== id))
	setToasts(prev => prev.filter(x => x !== id))
	// update size of quick-settings 
	app.get_window("quick-settings")?.queue_allocate()
})

// resize quick-settings if list changed
notifications.subscribe(() => {
	GLib.idle_add(GLib.PRIORITY_DEFAULT, () => {
		app.get_window("quick-settings")?.queue_allocate()
		return GLib.SOURCE_REMOVE
	})
})
