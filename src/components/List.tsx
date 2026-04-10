import { search_projects, type ModrinthFacets, type ModrinthMod } from './modrinth-api.ts'
import { useEffect, useState } from 'preact/hooks'
import { ModEntry } from './ModEntry.tsx';

import '../styles/List.css'

type Props = { facet: ModrinthFacets, title: String };

export function List({facet, title}: Props) {
	let [mods, setMods] = useState<ModrinthMod[]>()
	let [index, setIndex] = useState("relevance")

	useEffect(() => {
		async function fetch_projects() {
			let mods = await search_projects("", facet, index);
			setMods(mods)
		}
		fetch_projects()
	}, [facet, index])


	if (!mods) return <p> Loading... </p>

	return (
		<div>
			<p> {title} </p>
			<select value={index} onChange={(ev) => setIndex((ev.target as HTMLSelectElement).value)}>
				<option value="relevance">Relevance</option>
				<option value="downloads">Downloads</option>
				<option value="follows">Follows</option>
				<option value="updated">Updated</option>
				<option value="newest">Newest</option>
			</select>
			<div class="wrapper">
				<div class="modlist">
					{ mods.map((m)=> ModEntry(m) ) }
					{ mods.map((m)=> ModEntry(m) ) }
				</div>
			</div>
		</div>
	)
}

// Valid indices:
// 		relevance
// 		downloads
// 		follows
// 		newest
// 		updated
