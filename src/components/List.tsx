import { search_projects, type ModrinthFacets, type ModrinthMod } from './modrinth-api.ts'
import { useEffect, useState } from 'preact/hooks'
import { ModEntry } from './ModEntry.tsx';

import '../styles/List.css'

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


	if (!mods) return <p> Loading... </p>

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
