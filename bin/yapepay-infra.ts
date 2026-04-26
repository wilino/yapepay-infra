#!/usr/bin/env node
import * as cdk from 'aws-cdk-lib';

import { devConfig } from '../lib/config/dev.js';

/**
 * Entrypoint CDK de yapepay-infra.
 *
 * Esta fase del proyecto NO instancia stacks reales: solo configura el `App`,
 * el environment y los tags globales para que `cdk synth` funcione sin crear
 * recursos AWS.
 *
 * A medida que se implementen los stacks (StorageStack, MessagingStack, …),
 * deberán instanciarse a continuación —preferentemente vía
 * `YapepayInfraStage`— usando `devConfig` como fuente de configuración.
 */

const app = new cdk.App();

const env: cdk.Environment = {
  account: process.env.CDK_DEFAULT_ACCOUNT,
  region: process.env.CDK_DEFAULT_REGION ?? devConfig.region,
};

// Tags globales — se aplican al árbol completo del App.
for (const [key, value] of Object.entries(devConfig.tags)) {
  cdk.Tags.of(app).add(key, value);
}

// ---------------------------------------------------------------------------
// Stacks futuros (placeholders) — comentados a propósito.
// Descomentar y reemplazar por la implementación real cuando corresponda.
// ---------------------------------------------------------------------------
//
// import { StorageStack }       from '../lib/stacks/storage-stack.js';
// import { MessagingStack }     from '../lib/stacks/messaging-stack.js';
// import { ServerlessStack }    from '../lib/stacks/serverless-stack.js';
// import { ApiStack }           from '../lib/stacks/api-stack.js';
// import { ObservabilityStack } from '../lib/stacks/observability-stack.js';
//
// new StorageStack(app, `Yapepay-${devConfig.envName}-Storage`, { env });
// new MessagingStack(app, `Yapepay-${devConfig.envName}-Messaging`, { env });
// ...

// Suprimir warning "unused" mientras no haya stacks instanciados.
void env;

app.synth();
