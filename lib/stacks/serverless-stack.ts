import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';

/**
 * ServerlessStack — placeholder.
 *
 * Plan §16: Lambdas QR y Notification para el MVP. Posteriormente migran a
 * ECS Fargate (ServicesStack).
 */
export class ServerlessStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);
    // TODO: Implementar Lambdas QR y Notification (MVP §16).
  }
}
