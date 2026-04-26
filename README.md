# yapepay-infra

Infraestructura como código para **YapePay** usando **AWS CDK + TypeScript**.

> Plan de implementación de referencia: [.docs/plan_implementacion_cdk_yapepay.md](.docs/plan_implementacion_cdk_yapepay.md)

---

## Estado del entorno

- ✅ AWS CLI configurado (perfil `yapepay`, región `us-east-1`)
- ✅ Bootstrap CDK realizado en `aws://628884045138/us-east-1`
- ✅ Proyecto CDK TypeScript inicializado
- ✅ `npm run build` y `cdk synth` validados

---

## Verificación del entorno local en macOS

Antes de tocar el código, valida que tu Mac (Apple Silicon recomendado)
tenga todas las herramientas requeridas y credenciales AWS válidas.

> Referencia detallada: [.docs/plan_implementacion_cdk_yapepay.md](.docs/plan_implementacion_cdk_yapepay.md) (secciones 2–11).

### 1. Ejecutar el script de verificación

```bash
chmod +x scripts/check-prerequisites.sh
./scripts/check-prerequisites.sh
```

Reporta SO/arquitectura, Homebrew, `node`, `npm`, `tsc`, `aws`, `cdk`, `git`, `code` (requeridos),
`docker`, `jq`, `tree` (opcionales), credenciales AWS y `cdk doctor`.

### 2. Credenciales AWS

Para cuenta personal Free Tier ya está configurado el perfil `yapepay`.
Para AWS Academy / Educate, ver [scripts/setup-aws-educate.md](scripts/setup-aws-educate.md).

```bash
export AWS_PROFILE=yapepay
aws sts get-caller-identity
```

### 3. CDK

```bash
cdk --version
cdk doctor
```

---

## Comandos útiles del proyecto CDK

| Comando | Qué hace |
|---|---|
| `npm run build` | Compila TypeScript a JavaScript |
| `npm run watch` | Recompila en cada cambio |
| `npm run test` | Ejecuta tests con Jest |
| `npx cdk synth` | Genera la plantilla CloudFormation (no despliega) |
| `npx cdk diff` | Diferencia entre stack desplegado y el actual |
| `npx cdk deploy` | Despliega el stack (¡cuesta dinero real!) |
| `npx cdk destroy` | Elimina el stack |

---

## Estructura del proyecto

```text
yapepay-cdk/
├── .docs/                              # Documentación de arquitectura y plan
│   └── plan_implementacion_cdk_yapepay.md
├── bin/                                # Entry point del app CDK
│   └── yapepay-cdk.ts
├── lib/                                # Definición de stacks
│   └── yapepay-cdk-stack.ts
├── scripts/
│   ├── check-prerequisites.sh
│   └── setup-aws-educate.md
├── test/
├── cdk.json
├── package.json
├── tsconfig.json
└── README.md
```

---

## Seguridad

- Las claves CSV de IAM **nunca** deben vivir dentro del repo. Guárdalas en
  `~/.aws-keys/` con permisos `600` y úsalas vía `aws configure --profile`.
- `.gitignore` bloquea `*.csv`, `*credentials*`, `.env*` y `cdk.out`.
- Activa MFA en la cuenta raíz y un budget de alerta antes de cualquier `cdk deploy`.
