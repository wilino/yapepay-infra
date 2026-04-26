import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';

/**
 * ApiStack — placeholder.
 *
 * Plan §16 / yape-parte1 §5.1: API Gateway HTTP API v2 con JWT Authorizer
 * (Keycloak) y rutas hacia Lambdas (MVP) y, luego, ECS.
 */
export class ApiStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);
    // TODO: Implementar HTTP API v2 + JWT Authorizer mock (MVP §16).
  }
}
