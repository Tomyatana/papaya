import { type ModrinthMod } from './modrinth-api.ts'
import '../styles/ModEntry.css'

export function ModEntry(mod: ModrinthMod) {
	let string = `${mod.title} (${mod.author})`
	if (mod.desc != null) {
		string + `: ${mod.desc}`
	}

	let mod_image = (mod.icon) ? mod.icon.toString() : "/favicon.ico"

	let mod_link = `https://modrinth.com/${mod.type}/${mod.slug}`

	return (
		<div class="container" style={{"--bg": mod.icon_color?.toString()}}>
			<img src={mod_image}></img>
			<p> {string} </p>
			<a href={mod_link} target="_blank"> <span></span> </a>
		</div>
	)
}
