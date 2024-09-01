import { apolloServer } from "@/graphql/server";
import { startServerAndCreateNextHandler } from '@as-integrations/next';

const handler = startServerAndCreateNextHandler(apolloServer);

export { handler as GET, handler as POST };