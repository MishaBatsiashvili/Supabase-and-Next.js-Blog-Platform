import { createClient } from "@/utils/supabase/server";
import { ApolloServer } from "@apollo/server";
import { loadFilesSync } from "@graphql-tools/load-files";
// This is the file where our generated types live
// (specified in our `codegen.yml` file)
import type { Resolvers } from "@/__generated__/resolvers-types"
// import { readFileSync } from 'fs';

const typeDefs = loadFilesSync('src/graphql/**/*.graphql')
const resolvers: Resolvers = {
  Query: {
    posts: async () => {
			const supabase = createClient()
			const { data, error } = await supabase.from('posts').select('*')
			
			if(error){
				return [];
			}

			return data
    },
	},
};

// server setup
export const apolloServer = new ApolloServer({
  typeDefs,
  resolvers,
});

