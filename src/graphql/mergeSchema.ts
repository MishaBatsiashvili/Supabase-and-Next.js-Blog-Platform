import { loadFilesSync } from "@graphql-tools/load-files";
import { mergeTypeDefs } from '@graphql-tools/merge'
import { writeFileSync } from "fs";
import path from "path";
import { print } from "graphql";

const typesArray = loadFilesSync('src/graphql/**/*.graphql')
const typeDefs = mergeTypeDefs(typesArray)
const typeDefsString = print(typeDefs);
const outputPath = path.join(__dirname, '/schema/schema.graphql');
writeFileSync(outputPath, 
`# !!! THIS IS GENERATED FILE

${typeDefsString}
`);