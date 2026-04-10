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


	return (
		<div>
			<h2> {title} </h2>
			<label for="index"> Sort by: </label>
			<select name="index" value={index} onChange={(ev) => { 
				setIndex((ev.target as HTMLSelectElement).value)
				setMods(undefined)
			}}>
				<option value="relevance">Relevance</option>
				<option value="downloads">Downloads</option>
				<option value="follows">Follows</option>
				<option value="updated">Updated</option>
				<option value="newest">Newest</option>
			</select>
			<div class="wrapper">
				{ListHelper(mods)}
			</div>
		</div>
	)
}

function ListHelper(mods: ModrinthMod[] | undefined) {
	if (mods) {
		return (
			<div class="modlist">
				{ mods.map((m)=> ModEntry(m) ) }
				{ mods.map((m)=> ModEntry(m) ) }
			</div>
		)
	} else {
		return (<div><p>Loading...</p></div>)
	}
}
