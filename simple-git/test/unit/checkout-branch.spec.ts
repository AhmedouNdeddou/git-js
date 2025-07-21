import { simpleGit } from '../../src';
import { mkdtempSync } from 'fs';
import { tmpdir } from 'os';
import { join } from 'path';

describe('checkoutLocalBranch', () => {
  it('should create and switch to a new branch', async () => {
    const dir = mkdtempSync(join(tmpdir(), 'git-branch-'));
    const git = simpleGit(dir);

    await git.init();
    await git.commit('init', [], { '--allow-empty': null });

    await git.checkoutLocalBranch('feature-branch');

    const branch = await git.branch();
    expect(branch.current).toBe('feature-branch');
  });
});
