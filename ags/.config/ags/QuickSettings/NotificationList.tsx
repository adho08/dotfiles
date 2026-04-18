import Gtk from "gi://Gtk?version=4.0";
import { For } from "ags";
import { notifications, setNotifications } from "../widget/notifications-store";
import Notifd from "gi://AstalNotifd";
import { NotificationButton, } from "../widget/notifications";

export function NotificationList() {
	return (
		<box orientation={Gtk.Orientation.VERTICAL} spacing={8} hexpand>
			<button halign={Gtk.Align.START} hexpand={false}
				onClicked={() => {
				}} >
				<label label="Clear all" />
			</button>
			<For each={notifications}>
				{(n: Notifd.Notification) => (
					<box halign={Gtk.Align.CENTER}>
						<NotificationButton id={n.id} />
					</box>
				)}
			</For>
		</box >
	);
}
