# yapepay-infra

Infraestructura como código para **YapePay** usando **AWS CDK + TypeScript**.

> Plan completo (local-only, no versionado): `.docs/plan_implementacion_cdk_yapepay.md`
> Bitácora local (no versionada): `.docs/bitacora_implementacion.md`

---

## Estado actual

> **Fase: preparación completada — sin stacks funcionales todavía.**
>
> El repositorio está estructurado y listo para empezar a implementar el MVP.
> Todos los stacks en `lib/stacks/` son **placeholders** sin recursos AWS y
> `cdk synth` produce un assembly vacío (sin stacks instanciados).

---

## Requisitos

- macOS (Apple Silicon recomendado) — los scripts asumen `bash` + `zsh`.
- Node.js ≥ 22 LTS, npm ≥ 10.
- TypeScript ≥ 5.9, AWS CDK CLI ≥ 2.1119.
- AWS CLI v2 con un perfil válido.
- Git, VS Code. Opcional: Docker, jq, tree.

## Verificación local

```bash
chmod +x scripts/*.sh
./scripts/check-prerequisites.sh
```

Reporta SO/arquitectura, herramientas requeridas, credenciales AWS y
`cdk doctor`. No instala nada.

## Configuración AWS

Perfil utilizado por el proyecto:

```bash
export AWS_PROFILE=yapepay
aws sts get-caller-identity --profile yapepay
```

Cuenta `628884045138`, región `us-east-1`. Bootstrap CDK ya ejecutado.

## Comandos del proyecto

```bash
npm install                       # dependencias
npm run build                     # tsc
npm test                          # jest
./scripts/check-prerequisites.sh  # auditoría entorno
./scripts/synth.sh                # build + cdk synth
./scripts/diff.sh                 # build + cdk diff
```

> ⚠️ **No ejecutar `cdk deploy` hasta tener:**
> - Budget de billing configurado.
> - MFA activado en la cuenta root.
>
> Cuando los pre-requisitos estén listos, usar `./scripts/deploy-dev.sh` (pide
> confirmación literal). Para limpiar: `./scripts/destroy-dev.sh`.

## Estructura de carpetas

```text
yapepay-infra/
├── bin/
│   └── yapepay-infra.ts            # entrypoint CDK (App + tags + env)
├── lib/
│   ├── config/
│   │   ├── environment.ts          # tipos e interfaces
│   │   ├── dev.ts
│   │   ├── staging.ts
│   │   └── prod.ts
│   ├── constructs/                 # constructs reutilizables (placeholder)
│   ├── stacks/                     # 14 stacks placeholder
│   │   ├── storage-stack.ts
│   │   ├── messaging-stack.ts
│   │   ├── serverless-stack.ts
│   │   ├── api-stack.ts
│   │   ├── observability-stack.ts
│   │   ├── security-stack.ts
│   │   ├── network-stack.ts
│   │   ├── database-stack.ts
│   │   ├── cache-stack.ts
│   │   ├── services-stack.ts
│   │   ├── edge-stack.ts
│   │   ├── auth-stack.ts
│   │   ├── audit-stack.ts
│   │   └── pipeline-stack.ts
│   └── yapepay-infra-stage.ts
├── lambda/
│   ├── qr-handler/                 # solo .gitkeep por ahora
│   └── notification-handler/       # solo .gitkeep por ahora
├── docs/                           # documentación pública (sí versionada)
│   ├── architecture.md
│   ├── deployment.md
│   ├── cost-control.md
│   └── aws-educate-notes.md
├── scripts/
│   ├── check-prerequisites.sh
│   ├── setup-aws-educate.md
│   ├── bootstrap.sh
│   ├── synth.sh
│   ├── diff.sh
│   ├── deploy-dev.sh
│   └── destroy-dev.sh
├── test/
│   └── yapepay-infra.test.ts
├── .github/workflows/ci.yml
├── .docs/                          # local-only · NO versionar
│   ├── plan_implementacion_cdk_yapepay.md
│   └── bitacora_implementacion.md
├── cdk.json
├── package.json
├── tsconfig.json
└── README.md
```

## Roadmap del MVP

Orden de implementación previsto (plan §15–§16):

1. **StorageStack** — S3 KYC + comprobantes con versioning.
2. **MessagingStack** — SQS FIFO + Standard + DLQ.
3. **ServerlessStack** — Lambdas QR + Notification.
4. **ApiStack** — HTTP API v2 + Authorizer mock.
5. **ObservabilityStack** — CloudWatch + X-Ray básicos.

Stacks posteriores (`Network`, `Database`, `Cache`, `Services`, `Auth`,
`Edge`, `Audit`, `Pipeline`) se implementan después del MVP.

## Documentación

- [`docs/architecture.md`](docs/architecture.md)
- [`docs/deployment.md`](docs/deployment.md)
- [`docs/cost-control.md`](docs/cost-control.md)
- [`docs/aws-educate-notes.md`](docs/aws-educate-notes.md)

La documentación interna detallada vive en `.docs/` y **no se versiona**:

- `.docs/plan_implementacion_cdk_yapepay.md`
- `.docs/bitacora_implementacion.md`

## Seguridad

- Las claves CSV de IAM nunca deben vivir dentro del repo. Guardarlas en
  `~/.aws-keys/` con permisos `600`.
- `.gitignore` bloquea `*.csv`, `*credentials*`, `.env*` y `cdk.out`.
- Activar MFA en la cuenta root y un budget de alerta antes de cualquier
  `cdk deploy`.
