import * as path from 'path';
import * as fs from 'fs-extra';
import { spawnSync } from 'child_process';
import * as yeomanTest from 'yeoman-test';
import * as yeomanAssert from 'yeoman-assert';

const CWD = process.cwd();
const TMP_BUILD_DIR = path.resolve(CWD, 'build');
const NPM_DIR = path.resolve(TMP_BUILD_DIR, 'node_modules');
const SOURCE_DIRECTORY = path.resolve(CWD, 'src/app');

describe('Skeleton Generator', () => {

  beforeAll(async () => {
    await fs.ensureDir(TMP_BUILD_DIR);
    await yeomanTest
      .run(SOURCE_DIRECTORY)
      .cd(TMP_BUILD_DIR)
      .withPrompts({ pkgName: 'TestApp' })
      .withOptions({
        'skipInstall': true
      })
      .toPromise();
  });

  test('That package name was specified correctly', () => {
    expect(require(path.resolve(TMP_BUILD_DIR, 'package.json'))).toHaveProperty('name', 'TestApp');
  });

});

