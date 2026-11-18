CREATE EXTENSION IF NOT EXISTS postgis;

CREATE TYPE "SettingStatus" AS ENUM ('provisional', 'approved', 'disabled');
CREATE TYPE "AdminRole" AS ENUM ('SUPER_ADMIN', 'SUPPORT', 'MODERATOR', 'FINANCE');

CREATE TABLE "setting_versions" (
  "id" UUID NOT NULL,
  "key" TEXT NOT NULL,
  "value" JSONB,
  "status" "SettingStatus" NOT NULL,
  "version" INTEGER NOT NULL,
  "effective_at" TIMESTAMPTZ(6),
  "source" TEXT NOT NULL,
  "changed_by" UUID,
  "changed_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "change_reason" TEXT NOT NULL,
  "approved_by" UUID,
  "approved_at" TIMESTAMPTZ(6),
  CONSTRAINT "setting_versions_pkey" PRIMARY KEY ("id")
);
CREATE UNIQUE INDEX "setting_versions_key_version_key" ON "setting_versions"("key", "version");
CREATE INDEX "setting_versions_key_status_effective_at_idx" ON "setting_versions"("key", "status", "effective_at");

CREATE TABLE "audit_logs" (
  "id" UUID NOT NULL,
  "actor_id" UUID NOT NULL,
  "acting_role" TEXT NOT NULL,
  "action" TEXT NOT NULL,
  "target_type" TEXT NOT NULL,
  "target_id" TEXT NOT NULL,
  "before" JSONB,
  "after" JSONB,
  "reason" TEXT,
  "ip_address" TEXT,
  "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT "audit_logs_pkey" PRIMARY KEY ("id")
);
CREATE INDEX "audit_logs_actor_id_created_at_idx" ON "audit_logs"("actor_id", "created_at");
CREATE INDEX "audit_logs_target_type_target_id_created_at_idx" ON "audit_logs"("target_type", "target_id", "created_at");

CREATE TABLE "admin_role_assignments" (
  "id" UUID NOT NULL,
  "user_id" UUID NOT NULL,
  "role" "AdminRole" NOT NULL,
  "assigned_by" UUID NOT NULL,
  "assigned_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "revoked_at" TIMESTAMPTZ(6),
  CONSTRAINT "admin_role_assignments_pkey" PRIMARY KEY ("id")
);
CREATE INDEX "admin_role_assignments_user_id_revoked_at_idx" ON "admin_role_assignments"("user_id", "revoked_at");

CREATE OR REPLACE FUNCTION capacity_reject_mutation() RETURNS trigger AS $$
BEGIN
  RAISE EXCEPTION 'Append-only record: % is not permitted', TG_OP;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER audit_logs_append_only
BEFORE UPDATE OR DELETE ON "audit_logs"
FOR EACH ROW EXECUTE FUNCTION capacity_reject_mutation();
CREATE TRIGGER audit_logs_no_truncate
BEFORE TRUNCATE ON "audit_logs"
FOR EACH STATEMENT EXECUTE FUNCTION capacity_reject_mutation();

-- Setting versions are immutable historical policy records; changes create a new version.
CREATE TRIGGER setting_versions_append_only
BEFORE UPDATE OR DELETE ON "setting_versions"
FOR EACH ROW EXECUTE FUNCTION capacity_reject_mutation();
CREATE TRIGGER setting_versions_no_truncate
BEFORE TRUNCATE ON "setting_versions"
FOR EACH STATEMENT EXECUTE FUNCTION capacity_reject_mutation();

-- D39: Storage is intentionally disabled for the entire pilot.
INSERT INTO "setting_versions" (
  "id", "key", "value", "status", "version", "effective_at", "source", "changed_at", "change_reason"
) VALUES (
  gen_random_uuid(), 'storage.enabled', 'false'::jsonb, 'disabled', 1, CURRENT_TIMESTAMP,
  'D39 / CAPACITY Engineering Brief v3', CURRENT_TIMESTAMP,
  'Storage workflows are disabled for the pilot.'
);
