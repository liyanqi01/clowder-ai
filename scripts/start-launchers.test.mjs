import assert from 'node:assert/strict';
import { existsSync, readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { describe, it } from 'node:test';

const ROOT = resolve(process.cwd());

function read(relativePath) {
  return readFileSync(resolve(ROOT, relativePath), 'utf8');
}

describe('root start launchers', () => {
  it('exposes a repo-root PowerShell launcher', () => {
    const path = resolve(ROOT, 'start.ps1');
    assert.equal(existsSync(path), true);

    const content = read('start.ps1');
    assert.match(content, /scripts[/\\]+start-windows\.ps1/i);
    assert.match(content, /\[switch\]\$Quick/i);
    assert.match(content, /\[switch\]\$Memory/i);
    assert.match(content, /\[switch\]\$Dev/i);
    assert.match(content, /\[switch\]\$Debug/i);
  });

  it('exposes a repo-root batch wrapper', () => {
    const path = resolve(ROOT, 'start.bat');
    assert.equal(existsSync(path), true);

    const content = read('start.bat');
    assert.match(content, /start\.ps1/i);
    assert.match(content, /powershell/i);
  });

  it('exposes a repo-root shell wrapper', () => {
    const path = resolve(ROOT, 'start.sh');
    assert.equal(existsSync(path), true);

    const content = read('start.sh');
    assert.match(content, /pnpm start/);
    assert.match(content, /exec /);
  });
});
