import { simpleGit, SimpleGit } from '../../src';
import { mkdtempSync } from 'fs';
import { tmpdir } from 'os';
import { join } from 'path';

describe('simpleGit().status() on empty repo', () => {
  it('should return initial status for new repo', async () => {
    const dir = mkdtempSync(join(tmpdir(), 'git-empty-'));
    const git: SimpleGit = simpleGit(dir);

    await git.init();
    const status = await git.status();

    expect(status).toBeDefined();
    expect(status.isClean()).toBe(true);
    expect(status.files.length).toBe(0);
  });
});
