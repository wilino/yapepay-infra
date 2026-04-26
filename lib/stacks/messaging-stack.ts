import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';

/**
 * MessagingStack — placeholder.
 *
 * Plan §16 / §17: SQS FIFO para eventos transaccionales y SQS Standard
 * para notificaciones, ambos con DLQ.
 */
export class MessagingStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);
    // TODO: Implementar SQS FIFO + Standard + DLQs.
  }
}
