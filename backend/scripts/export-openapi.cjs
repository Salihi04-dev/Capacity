require('reflect-metadata');
const fs = require('node:fs');
const path = require('node:path');
const { NestFactory } = require('@nestjs/core');
const { DocumentBuilder, SwaggerModule } = require('@nestjs/swagger');
const { AppModule } = require('../dist/app.module');

async function exportOpenApi() {
  const app = await NestFactory.create(AppModule, { logger: false });
  const config = new DocumentBuilder()
    .setTitle('CAPACITY API')
    .setDescription('Generated implementation description. Not an approved product contract until reviewed.')
    .setVersion('1')
    .addServer('/api/v1')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  const output = path.resolve('docs/openapi/capacity-api-v1.generated.json');
  fs.mkdirSync(path.dirname(output), { recursive: true });
  fs.writeFileSync(output, `${JSON.stringify(document, null, 2)}\n`);
  await app.close();
  process.stdout.write(`OpenAPI implementation description exported to ${output}\n`);
}

exportOpenApi().catch((error) => {
  process.stderr.write(`${error instanceof Error ? error.stack : String(error)}\n`);
  process.exitCode = 1;
});
