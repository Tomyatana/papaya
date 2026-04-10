import { search_projects, type ModrinthFacets, type ModrinthMod } from './modrinth-api.ts'
import { useEffect, useState } from 'preact/hooks'

type Props = { facet: ModrinthFacets, title: String };

export function List({facet, title}: Props) {
	let [mods, setData] = useState<ModrinthMod[]>()

	useEffect(() => {
		async function fetch_projects() {
			let mods = await search_projects("", facet);
			setData(mods)
		}
		fetch_projects()
	})


	if (!mods) return <p> HOLA </p>

	return (
		<div>
			<p> {title} </p>
			<div class="wrapper">
				<div class="modlist">
					{ mods.map((m)=> ModEntry(m) ) }
					{ mods.map((m)=> ModEntry(m) ) }
				</div>
			</div>
		</div>
	)
}

export function Test({hola}: {hola: string}) {
	return (<div><p>{hola}</p></div>)
}

function ModEntry(mod: ModrinthMod) {
	let string = `${mod.title} (${mod.author})`
	if (mod.desc != null) {
		string + `: ${mod.desc}`
	}

	let mod_image = (mod.icon) ? mod.icon.toString() : "/favicon.ico"

	let mod_link = `https://modrinth.com/${mod.type}/${mod.slug}`

	return (
		<div class="container">
			<img src={mod_image}></img>
			<p> {string} </p>
			<a href={mod_link} target="_blank"> <span>a</span> </a>
		</div>
	)
}
