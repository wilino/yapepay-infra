# Control de costos — yapepay-infra

Este proyecto se ejecuta en una cuenta personal AWS Free Tier con USD 200 de
crédito (válidos 6 meses). Es crítico mantener la disciplina de costos.

## Acciones obligatorias antes del primer `cdk deploy`

1. **Activar MFA en la cuenta root.**
   - Console → IAM → "Add MFA" para el root user.
2. **Crear un Budget en AWS Billing.**
   - Console → Billing and Cost Management → Budgets → Create budget.
   - Sugerido: budget mensual USD 20 con alerta al 50/80/100%.
3. **Activar alertas por correo.**

## Servicios a evitar en la fase MVP

Estos servicios generan costo recurrente aún en uso bajo:

- **NAT Gateway** (~USD 32/mes solo por estar encendido).
- **RDS Multi-AZ** y `db.t3.medium+`.
- **ElastiCache Redis** (no entra al Free Tier en cluster mode).
- **WAF** (cargo por web ACL + reglas + requests).
- **CloudFront** (Free Tier limitado; cuidar con egress).
- **ECS Fargate** corriendo 24/7.
- **NAT Instance** sin apagado nocturno.

## Buenas prácticas

- **Destruir** recursos cuando no se usen (`./scripts/destroy-dev.sh`).
- Usar `RemovalPolicy.DESTROY` y `autoDeleteObjects` en buckets de dev.
- Mantener `features.enableCostlyResources = false` para `dev` mientras dure
  el MVP.
- Revisar Cost Explorer al menos 1 vez por semana.
- Etiquetar todos los recursos con `Project=yapepay`, `Environment=dev`,
  `Owner=equipo-ucb` (los aplica el entrypoint vía `cdk.Tags.of(app)`).

## Recordatorio

> **Free Tier ≠ costo cero.** Hay recursos fuera del Free Tier (ej. NAT GW,
> RDS Multi-AZ) y cuotas mensuales. Revisar siempre la
> [tabla oficial de Free Tier](https://aws.amazon.com/free/) antes de añadir
> un nuevo servicio.
