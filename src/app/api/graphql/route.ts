import { apolloServer } from "@/graphql/server/server";
import { startServerAndCreateNextHandler } from '@as-integrations/next';

const handler = startServerAndCreateNextHandler(apolloServer);

export { handler as GET, handler as POST };

export const dynamic = "force-dynamic";