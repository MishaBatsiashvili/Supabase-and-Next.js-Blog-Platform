import { createClient } from "@/utils/supabase/server";
import { ApolloServer } from "@apollo/server";
import { loadFilesSync } from "@graphql-tools/load-files";
// This is the file where our generated types live
// (specified in our `codegen.yml` file)
import type { Resolvers } from "@/__generated__/resolvers-types";
import axios from "axios";
// import { readFileSync } from 'fs';

const typeDefs = loadFilesSync("src/graphql/**/*.graphql");
const resolvers: Resolvers = {
  Query: {
    posts: async () => {
      const supabase = createClient();
      const { data, error } = await supabase.from("posts").select("*").order('id');

      if (error) {
        return [];
      }

      return data;
    },
    post: async (_, args) => {
      const supabase = createClient();
      const { data } = await supabase
        .from("posts")
        .select("*")
        .eq("id", args.id)
        .single();
      return data;
    },
    s3uploadUrl: async (_, args) => {
      const res = await axios.get<{ url: string }>(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/s3image-upload-url?objectKey=${args.objectKey}`)
      return res.data.url
    }
  },
  Mutation: {
    deletePost: async (_, args) => {
      const supabase = createClient();
      const { data, error, status } = await supabase
        .from("posts")
        .delete()
        .eq("id", args.id)
        .select();

      if (error) {
        throw new Error(error.message);
      }

      return {
        status: status,
        affectedRows: data.length,
      };
    },
    createPost: async (_, { input }) => {
      const supabase = createClient();
      const resp = await supabase.auth.getUser()

      if(!resp.data.user){
        throw new Error("Not logged in");
      }

      const userId = resp.data.user.id

      const { data, error } = await supabase
        .from("posts")
        .insert({
          title: input.title,
          content: input.content,
          user_id: userId,
        })
        .select()
        .single();

      if (error) {
        throw new Error("Problem inserting data");
      }

      return data
    },
    updatePost: async (_, { input }) => {
      const supabase = createClient();
      const resp = await supabase.auth.getUser()

      if(!resp.data.user){
        throw new Error("Not logged in");
      }

      const userId = resp.data.user.id

      const { data, error } = await supabase.from('posts').update({
        title: input.title,
        content: input.content
      }).eq('id', input.id).eq('user_id', userId).select().single()

      if(error){
        throw new Error("Problem updating data");
      }

      return data
    }
  },
};

// server setup
export const apolloServer = new ApolloServer({
  typeDefs,
  resolvers,
});
