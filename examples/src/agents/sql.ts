import { OpenAI } from "langchain-gpt4all/llms/openai";
import { SqlDatabase } from "langchain-gpt4all/sql_db";
import { createSqlAgent, SqlToolkit } from "langchain-gpt4all/agents";
import { DataSource } from "typeorm";

/** This example uses Chinook database, which is a sample database available for SQL Server, Oracle, MySQL, etc.
 * To set it up follow the instructions on https://database.guide/2-sample-databases-sqlite/, placing the .db file
 * in the examples folder.
 */
export const run = async () => {
  const datasource = new DataSource({
    type: "sqlite",
    database: "Chinook.db",
  });
  const db = await SqlDatabase.fromDataSourceParams({
    appDataSource: datasource,
  });
  const toolkit = new SqlToolkit(db);
  const model = new OpenAI({ temperature: 0 });
  const executor = createSqlAgent(model, toolkit);

  const input = `List the total sales per country. Which country's customers spent the most?`;

  console.log(`Executing with input "${input}"...`);

  const result = await executor.call({ input });

  console.log(`Got output ${result.output}`);

  console.log(
    `Got intermediate steps ${JSON.stringify(
      result.intermediateSteps,
      null,
      2
    )}`
  );

  await datasource.destroy();
};
