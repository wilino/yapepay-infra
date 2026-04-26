# Despliegue — yapepay-infra

## Cuenta y región

- Perfil AWS CLI: `yapepay`
- Cuenta: `628884045138`
- Región: `us-east-1`
- Bootstrap CDK: ya ejecutado.

```bash
export AWS_PROFILE=yapepay
aws sts get-caller-identity
```

## Comandos seguros (no crean recursos)

```bash
./scripts/check-prerequisites.sh   # auditoría de entorno local
./scripts/synth.sh                 # build + cdk synth
./scripts/diff.sh                  # build + cdk diff
```

## Comandos sensibles (crean o destruyen recursos)

> No ejecutar hasta tener:
> - Budget de billing configurado en AWS Billing Console.
> - MFA activado en la cuenta root.
> - `cdk diff` revisado.

```bash
./scripts/deploy-dev.sh    # pide confirmación literal
./scripts/destroy-dev.sh   # pide confirmación literal
```

## Flujo recomendado

1. `./scripts/check-prerequisites.sh`
2. `npm install`
3. `npm run build`
4. `npm test`
5. `./scripts/synth.sh`
6. (opcional) `./scripts/diff.sh`
7. **Solo cuando estén budget + MFA**: `./scripts/deploy-dev.sh`.

## Estado actual

No hay stacks reales instanciados. `cdk synth` produce un assembly vacío.
Cualquier `cdk deploy` no creará recursos hasta que se implementen los
stacks placeholder en `lib/stacks/`.
