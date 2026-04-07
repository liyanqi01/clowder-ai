import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { describe, it } from 'node:test';

const ROOT = resolve(process.cwd());
const content = readFileSync(resolve(ROOT, 'scripts/stop-windows.ps1'), 'utf8');

describe('windows stop port inspection fallback', () => {
  it('uses netstat-based listening port lookup instead of Get-NetTCPConnection', () => {
    assert.match(content, /function Get-TcpListeningConnections/);
    assert.match(content, /netstat -ano -p tcp/);
    assert.match(content, /Get-TcpListeningConnections -Port \$Port/);
    assert.match(content, /Get-TcpListeningConnections -Port \$RedisPort/);
  });
});
