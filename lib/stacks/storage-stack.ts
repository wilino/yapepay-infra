import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';

/**
 * StorageStack — placeholder.
 *
 * Plan §16 / §17 (MVP): S3 buckets para KYC y comprobantes con versioning,
 * cifrado SSE-S3/KMS, lifecycle policies y bloqueo público total.
 *
 * Estado: vacío. No crea recursos para evitar costos/efectos colaterales.
 */
export class StorageStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);
    // TODO: Implementar S3 buckets para KYC y comprobantes (MVP §16).
  }
}
