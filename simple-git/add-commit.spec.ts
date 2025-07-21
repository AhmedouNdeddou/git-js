import { writeFileSync, mkdtempSync } from 'fs';
import { tmpdir } from 'os';
import { join } from 'path';
import { simpleGit } from '../../src';

describe('add and commit', () => {
  it('should add and commit a file', async () => {
    const dir = mkdtempSync(join(tmpdir(), 'git-add-'));
    const git = simpleGit(dir);

    await git.init();
    const filePath = join(dir, 'test.txt');
    writeFileSync(filePath, 'hello world');

    await git.add('test.txt');
    await git.commit('Add test.txt');

    const log = await git.log();
    expect(log.total).toBeGreaterThan(0);
    expect(log.latest?.message).toBe('Add test.txt');
  });
});
