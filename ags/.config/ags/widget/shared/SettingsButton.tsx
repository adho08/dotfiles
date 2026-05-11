import { Gtk } from 'ags/gtk4';
import { execAsync } from "ags/process";

type ButtonProps = JSX.IntrinsicElements["button"]

interface SettingsButtonProps extends ButtonProps {
	iconName: string
	iconSize?: number
	command?: string
}

export function SettingsButton({
	iconName,
	iconSize = 18,
	command,
	onClicked,
	...props
}: SettingsButtonProps) {
	return (
		<button
			{...props}
			onClicked={async (self) => {
				if (command) {
					await execAsync(command)
				}

				onClicked?.(self)
			}}
		>
			<Gtk.Image
				iconName={iconName}
				pixelSize={iconSize}
			/>
		</button>
	)
}
