axis         = require 'axis'
rupture      = require 'rupture'
autoprefixer = require 'autoprefixer-stylus'
js_pipeline  = require 'js-pipeline'
css_pipeline = require 'css-pipeline'
dynamic_content = require 'dynamic-content'

module.exports =
  ignores: ['readme.md', '**/layout.*', '**/_*', '.gitignore', 'ship.*conf']

  extensions: [
    js_pipeline(manifest: "assets/js/manifest.yml"),
    css_pipeline(manifest: 'assets/css/manifest.yml'),
    dynamic_content()
  ]

  stylus:
    use: [axis(), rupture(), autoprefixer()]

  jade:
    pretty: true
    basedir: __dirname
