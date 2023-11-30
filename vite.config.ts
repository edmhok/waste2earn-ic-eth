/// <reference types="vitest" />
import { spawnSync } from 'child_process';
import { existsSync, readFileSync } from 'fs';
import { join } from 'path';

export const localNetwork = 'local';
export const network = process.env['DFX_NETWORK'] || localNetwork;

let canisterIdPath: string;
if (network === localNetwork) {
  // Local replica canister IDs
  canisterIdPath = join(__dirname, '.dfx/local/canister_ids.json');
} else {
  // Custom canister IDs
  canisterIdPath = join(__dirname, 'canister_ids.json');
}

if (!existsSync(canisterIdPath)) {
  // Create empty canisters
  spawnSync('dfx', ['canister', 'create', '--all'], { cwd: __dirname });

  if (!existsSync(canisterIdPath)) {
    throw new Error(
      'Unable to find canisters. Running `dfx deploy` should fix this problem.',
    );
  }
}
export const canisterIds = JSON.parse(readFileSync(canisterIdPath, 'utf8'));


