import { CosmosClient } from "@azure/cosmos";

export interface Env {
	COSMOS_ENDPOINT: string;
	COSMOS_KEY: string;
	DATABASE_NAME: string;
	COLLECTION_NAME: string;
  }

  export default {
    async fetch(request: Request, env: Env, ctx: ExecutionContext): Promise<Response> {
        const client = new CosmosClient({ endpoint: env.COSMOS_ENDPOINT, key: env.COSMOS_KEY });

        const { resources: items } = await client
            .database(env.DATABASE_NAME)
            .container(env.COLLECTION_NAME)
            .items
            .query("SELECT * FROM c")
            .fetchAll();

        return new Response(JSON.stringify(items), { headers: { 'content-type': 'application/json' } });
    },
};