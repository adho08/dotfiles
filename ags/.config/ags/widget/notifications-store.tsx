import { createState } from "ags"
import app from "ags/gtk4/app"
import Notifd from "gi://AstalNotifd"
import GLib from "gi://GLib"

const notifd = Notifd.get_default()

export const [notifications, setNotifications] = createState<Notifd.Notification[]>([])

// when getting notified
notifd.connect("notified", (_, id) => {
	const n = notifd.get_notification(id)
	// if no notification, interrupt
	if (!n) return
	// add notification to list
	setNotifications([n, ...notifications()])
})

notifd.connect("resolved", (_, id) => {
	// remove notification from list
	setNotifications(notifications().filter(n => n.id !== id))
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



