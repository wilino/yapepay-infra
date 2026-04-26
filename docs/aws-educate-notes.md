# Notas sobre AWS Educate / AWS Academy

## Decisión actual

El proyecto **no** se ejecuta sobre AWS Educate ni AWS Academy.
Se eligió **AWS Free Tier** sobre una cuenta personal (`628884045138`) con
USD 200 de crédito válido 6 meses.

## Motivo

| Plataforma | CLI / programmatic access | Notas |
|---|---|---|
| AWS Educate (`awseducate.com`) | ❌ No | Solo labs guiados en consola web. |
| AWS Academy (`awsacademy.instructure.com`) | ✅ Sí | Requiere enrolamiento institucional vía universidad. |
| AWS Free Tier (cuenta personal) | ✅ Sí | Opción elegida. |

AWS Educate fue descartada porque no entrega credenciales utilizables con la
AWS CLI ni con CDK, lo que bloquea el flujo `cdk bootstrap` / `cdk deploy`.

## Si se migrase a AWS Academy en el futuro

- Las credenciales son **temporales** (incluyen `AWS_SESSION_TOKEN`).
- Hay que reconfigurar el perfil `yapepay` en cada sesión, o usar variables
  de entorno (`AWS_ACCESS_KEY_ID`, `AWS_SECRET_ACCESS_KEY`,
  `AWS_SESSION_TOKEN`).
- Mantener la guía operativa en `scripts/setup-aws-educate.md`, que ya
  describe ese escenario.

## Estado

- `scripts/setup-aws-educate.md` se mantiene como referencia de respaldo.
- El flujo activo del proyecto asume el perfil `yapepay` apuntando a la
  cuenta personal Free Tier.
