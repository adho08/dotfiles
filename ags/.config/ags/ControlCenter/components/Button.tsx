import Gdk from "gi://Gdk?version=4.0"

export function Button(props: any) {
	return (
		<button
			{...props}
			$={(self) => {
				self.set_cursor((Gdk.Cursor.new_from_name("pointer", null)));
				props.$?.(self)
			}}
		/>

	)
}
