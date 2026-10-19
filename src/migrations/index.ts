import * as migration_20260727_031026_initial_schema from './20260727_031026_initial_schema';
import * as migration_20261019_084053_add_reset_password_requested_at from './20261019_084053_add_reset_password_requested_at';

export const migrations = [
  {
    up: migration_20260727_031026_initial_schema.up,
    down: migration_20260727_031026_initial_schema.down,
    name: '20260727_031026_initial_schema',
  },
  {
    up: migration_20261019_084053_add_reset_password_requested_at.up,
    down: migration_20261019_084053_add_reset_password_requested_at.down,
    name: '20261019_084053_add_reset_password_requested_at'
  },
];
