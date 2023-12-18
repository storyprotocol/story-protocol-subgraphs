# story-protocol-subgraphs

## Set up
To use a specific version of the subgraph, go to the subgraphs/(your version) folder and do:
1. Set up the .env.js file based on the .env.example.js
2. `npm run codegen` : This will generate **subgraph.yaml** based on **template.yaml** and also generate the code based on the schema.graphql 
3. `npm run build` : This will build the code in /src folder.  
4. `npm run deploy` : This will deploy the code to the graph
