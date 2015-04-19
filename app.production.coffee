axis         = require 'axis'
rupture      = require 'rupture'
autoprefixer = require 'autoprefixer-stylus'
js_pipeline  = require 'js-pipeline'
css_pipeline = require 'css-pipeline'
dynamic_content = require 'dynamic-content'

module.exports =
  ignores: ['readme.md', '**/layout.*', '**/_*', '.gitignore', 'ship.*conf']

  extensions: [
    js_pipeline(manifest: "assets/js/manifest.yml", out: 'js/build.css', minify: true, hash: true),
    css_pipeline(manifest: 'assets/css/manifest.yml', out: 'css/build.css', minify: true, hash: true),
    dynamic_content()
  ]

  env: 'production'

  stylus:
    use: [axis(), rupture(), autoprefixer()]

  jade:
    basedir: __dirname
