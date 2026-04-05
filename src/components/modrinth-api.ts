export const API_URL = "https://staging-api.modrinth.com"

export async function search_projects(
    query: String, facets: ModrinthFacets | null = null,
    index = "relevance", limit = 15, 
): Promise<ModrinthMod[]> {
    let facet: String = "" // TODO: Add facet support

    if (facets != null) {
        facet = to_facets(facets)
    }

    let request = await fetch(
        `${API_URL}/v2/search?query=${query}&limit=${limit}&index=${index}${facet}`
    )

    console.assert(request.status == 200)

	let max_requests = request.headers.get("X-Ratelimit-Limit")
	let remaining_requests = request.headers.get("X-Ratelimit-Remaining")
	let time_until_reset = request.headers.get("X-Ratelimit-Reset")
	console.log(`Max Requests per minute: ${max_requests}`)
	console.log(`Requests remaining: ${remaining_requests}`)
	console.log(`Time until reset: ${time_until_reset}`)

    let json = await request.json()

    let mods: ModrinthMod[] = json.hits.map((h: any) => {
        let mod: ModrinthMod = {
            title: h.title,
			slug: h.slug,
			type: h.project_type,
            downloads: h.downloads,
            author: h.author,
            desc: h.description,
            icon: h.icon_url,
        }
        return mod
    })

    return mods
}

function to_facets(facets: ModrinthFacets): String {
    let facet = "&facets=["

    if (facets.project_type != null) {
        facet = `${facet}["project_type=${facets.project_type}"],`
    }

    if (facets.categories != null) {
		facet = `${facet}["categories=${facets.categories}"],` // FIX:
	}

    let pos = facet.lastIndexOf(',')
    facet = facet.substring(0, pos) + facet.substring(pos+1)
    facet += "]"

    return facet
}

/*
    let mut facet = "&facets=[[\"project_type=mod\"],".to_string();
    let facet_1 = "[\"";
    let facet_2 = "\"],";
    for element in categories.iter() {
        let filter = format!("{}categories:{}{}", facet_1, element, facet_2);
        facet.push_str(&filter);
    }
    if !game_version.is_empty() {
        let version = format!("{}versions:{}{}", facet_1, game_version, facet_2);
        facet.push_str(&version);
    }
    facet.push_str(facet_2);
    facet = remove_last_char(&facet, ',');
    facet = remove_last_char(&facet, '"');
    remove_last_char(&facet, ',')
*/

export interface ModrinthMod { // TODO: Add more fields
    title: String,
	slug: String,
	type: String,
    desc: String | null,
    author: String,
    downloads: number,

    icon: String | null
}

export interface ModrinthFacets {
    project_type: String | null,
    categories: String[] | null,
    version: String | null,
}
