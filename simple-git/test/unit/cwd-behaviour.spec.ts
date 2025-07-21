import { join } from 'path';
import { simpleGit, SimpleGit } from '../../src'; // falls notwendig anpassen
import fs from 'fs';

describe('simpleGit().cwd()', () => {
  const REMOTE = 'https://github.com/steveukx/git-js.git';
  const TARGET = join(__dirname, '..', 'tmp', 'cwd-test');

  it('should change working directory after clone', async () => {
    const git: SimpleGit = simpleGit();

    // Bereinigen falls nötig
    if (fs.existsSync(TARGET)) {
      fs.rmSync(TARGET, { recursive: true });
    }

    await git.clone(REMOTE, TARGET);

    await git.cwd({ path: TARGET });

    const status = await git.status();

    expect(status).toBeDefined();
    expect(typeof status.current).toBe('string');
  });
});
