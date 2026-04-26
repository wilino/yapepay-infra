# Arquitectura — yapepay-infra

Este documento es la versión **pública** y resumida de la arquitectura objetivo.
La versión extendida vive en `.docs/plan_implementacion_cdk_yapepay.md` y
`.docs/yape-parte1.md` (no versionados en GitHub).

## Arquitectura objetivo

```text
CloudFront + WAF        → EdgeStack
API Gateway HTTP v2     → ApiStack            (JWT Authorizer contra Keycloak)
Lambda QR/Notification  → ServerlessStack     (MVP; luego migran a ECS)
SQS Standard + FIFO     → MessagingStack      (eventos transaccionales + DLQ)
S3 versionado           → StorageStack        (KYC + comprobantes)
CloudWatch + X-Ray      → ObservabilityStack
KMS + Secrets Manager   → SecurityStack       (rotación 90 días)
VPC Multi-AZ            → NetworkStack        (subnets pública/privada/aislada)
RDS PostgreSQL 15       → DatabaseStack       (Multi-AZ, AES-256)
ElastiCache Redis 7     → CacheStack          (idempotencia + rate limit)
ECS Fargate + ECR       → ServicesStack       (microservicios NestJS)
Keycloak 22             → AuthStack           (OIDC sobre ECS)
AuditLog (5 años SBS)   → AuditStack
Pipeline despliegue     → PipelineStack
```

## MVP vs arquitectura completa

El MVP (plan §16) implementa **solo** una porción mínima orientada a validar
herramientas, costos y despliegue end-to-end:

1. `StorageStack` — S3 KYC + comprobantes.
2. `MessagingStack` — SQS FIFO/Standard + DLQ.
3. `ServerlessStack` — Lambdas QR + Notification.
4. `ApiStack` — HTTP API v2 con Authorizer mock.
5. `ObservabilityStack` — CloudWatch básico.

El resto (`NetworkStack`, `DatabaseStack`, `CacheStack`, `ServicesStack`,
`AuthStack`, `EdgeStack`, `AuditStack`, `PipelineStack`) llega en fases
posteriores y permanece **NO implementado** mientras existan únicamente
placeholders.

## Estado actual (fase de preparación)

- Estructura de carpetas creada (`lib/config`, `lib/constructs`, `lib/stacks`,
  `lib/yapepay-infra-stage.ts`, `lambda/`).
- Archivos de stack son placeholders sin recursos AWS.
- `cdk synth` produce un assembly vacío (sin stacks instanciados todavía).

## Qué NO está implementado

- Ningún recurso AWS real (S3, SQS, Lambda, API GW, RDS, Redis, ECS, WAF, etc.).
- Ningún `cdk deploy` ejecutado contra la cuenta `628884045138`.
- Pipeline de CI/CD aplicativo (solo CI de validación con GitHub Actions).
