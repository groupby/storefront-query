import commands from 're-start/presets/typescript';
import copy from 'start-copy';
import files from 'start-files';

module.exports = commands;

commands.postBuild = function postBuild() {
  return commands.start(
    files(['src/**/*.html', 'src/**/*.css']),
    copy('dist/')
  )
}
