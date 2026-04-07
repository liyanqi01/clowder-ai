import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { describe, it } from 'node:test';

const ROOT = resolve(process.cwd());
const content = readFileSync(resolve(ROOT, 'scripts/install-windows-helpers.ps1'), 'utf8');

describe('windows port fallback helpers', () => {
  it('falls back to netstat-based port discovery when TcpListener probing is unavailable', () => {
    assert.match(content, /function Get-ListeningTcpPorts/);
    assert.match(content, /netstat -ano -p tcp/);
    assert.match(content, /function Get-ExcludedTcpPortRanges/);
    assert.match(content, /netsh interface ipv4 show excludedportrange protocol=tcp/);
    assert.match(content, /catch \{\r?\n\s*break\r?\n\s*\}/);
    assert.match(content, /Get-Random -Minimum 20000 -Maximum 50000/);
  });
});
