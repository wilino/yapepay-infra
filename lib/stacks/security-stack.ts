import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';

/**
 * SecurityStack — placeholder.
 *
 * Plan §15 paso 5 / yape-parte1 §6: KMS Customer Managed Keys, Secrets
 * Manager con rotación 90d e IAM roles base.
 */
export class SecurityStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);
    // TODO: Implementar KMS + Secrets Manager + roles base.
  }
}
