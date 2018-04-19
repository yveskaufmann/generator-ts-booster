import * as fs from 'fs';
import * as path from 'path';
import * as Generator from 'yeoman-generator';
import { capitalize, camelCase } from 'lodash';

interface ProjectProps {
  pkgName: string;
}

class SkeletonGenerator extends Generator {

  private props: ProjectProps

  public prompting() {
    return this.prompt([
      {
        default: this.appname,
        name: 'pkgName',
        message: 'Name of your application',
        type: 'input'
      }
    ]).then((answers) => {
      this.props = answers as ProjectProps;
      this.props.pkgName = this.props.pkgName;
    });
  }

  public writingFiles() {

    let files = fs.readdirSync(path.resolve(__dirname, 'templates'));
    files.forEach((file: string) => {
      this.fs.copyTpl(
        this.templatePath(file),
        this.destinationPath(file), this.props);
    });
  }

  public install() {
    if (!this.options['skipInstall']) {
      return this.npmInstall(null);
    }
  }

}

module.exports = SkeletonGenerator;
