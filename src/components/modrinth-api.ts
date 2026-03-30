export const API_URL = "https://staging-api.modrinth.com"

export async function search_projects(query: String, index = "relevance", limit = 10): Promise<ModrinthMod[]> {
    let facet = "" // TODO: Add facet support
    let request = await fetch(
        `${API_URL}/v2/search?query=${query}&limit=${limit}&index=${index}${facet}`
    )

    console.assert(request.status == 200)

    let json = await request.json()

    let mods: ModrinthMod[] = json.hits.map((h: any) => {
        let mod: ModrinthMod = {
            title: h.title,
            downloads: h.downloads,
            author: h.author,
            desc: h.description,
            icon: h.icon_url,
        }
        return mod
    })

    return mods
}

export interface ModrinthMod { // TODO: Add more fields
    title: String,
    desc: String | null,
    author: String,
    downloads: number,

    icon: String | null
}
