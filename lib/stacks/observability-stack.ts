import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';

/**
 * ObservabilityStack — placeholder.
 *
 * Plan §16 / yape-parte1: CloudWatch Log Groups, métricas custom,
 * dashboards y X-Ray. Mantener retención corta en dev para evitar costos.
 */
export class ObservabilityStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);
    // TODO: Implementar CloudWatch + X-Ray básicos (MVP §16).
  }
}
