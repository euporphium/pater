## Migrations

### Create a new migration

```bash
supabase migration new create_some_table
```

### Push all local migrations to a remote database.

```bash
supabase db push
```

### Recreate database from scratch and run all migrations.

```bash
supabase db reset
```

### Generate TypeScript types for database schema.

```bash
supabase gen types typescript --local > database.gen.ts
```
