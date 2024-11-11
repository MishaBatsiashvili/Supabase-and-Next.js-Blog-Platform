import { loadFilesSync } from "@graphql-tools/load-files";
import { mergeTypeDefs } from '@graphql-tools/merge';
import { writeFileSync, unlinkSync, existsSync } from "fs";
import path from "path";
import { print } from "graphql";

const outputPath = path.join(__dirname, '/schema/schema.graphql');
if (existsSync(outputPath)) {
  unlinkSync(outputPath);
}

const typesArray = loadFilesSync('src/graphql/**/*.graphql');
const typeDefs = mergeTypeDefs(typesArray);
const typeDefsString = print(typeDefs);


// Write the new schema to the file
writeFileSync(outputPath, 
`# !!! THIS IS GENERATED FILE

${typeDefsString}
`);
