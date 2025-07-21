import { writeFileSync, mkdtempSync } from 'fs';
import { tmpdir } from 'os';
import { join } from 'path';
import { simpleGit } from '../../src';

describe('log shows commit history', () => {
  it('should show two commits', async () => {
    const dir = mkdtempSync(join(tmpdir(), 'git-log-'));
    const git = simpleGit(dir);

    await git.init();

    const file1 = join(dir, 'file1.txt');
    writeFileSync(file1, 'first');
    await git.add('file1.txt');
    await git.commit('first commit');

    const file2 = join(dir, 'file2.txt');
    writeFileSync(file2, 'second');
    await git.add('file2.txt');
    await git.commit('second commit');

    const log = await git.log();
    expect(log.total).toBe(2);
    expect(log.all.map(e => e.message)).toEqual(
      expect.arrayContaining(['first commit', 'second commit'])
    );
  });
});
