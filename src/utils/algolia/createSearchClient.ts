import { searchClient } from "@algolia/client-search";

export const createSearchClient = () => {
    const APP_ID = process.env.NEXT_PUBLIC_ALGOLIA_APP_ID!
    const API_KEY = process.env.NEXT_PUBLIC_ALGOLIA_API_KEY!
    const client = searchClient(APP_ID, API_KEY)

    return client;
}