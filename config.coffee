exports.config =
  # See http://brunch.io/#documentation for documentation.
  # https://github.com/brunch/brunch/blob/master/src/helpers.coffee

  # install growlnotify on osx to see notifications in growl
  # http://growl.info/downloads
  notifications: on

  conventions:
    # ignore bootstrap css files since they are included by less
    # use regex instead of function since function doesn't seem to work with less-brunch
    ignored: /^vendor(\/|\\)styles(\/|\\)bootstrap/

  files:
    javascripts:
      joinTo:
        'javascripts/app.js': /^app/
        'javascripts/vendor.js': /^vendor/
        'test/javascripts/test.js': /^test[\\/](?!vendor)/
        'test/javascripts/test-vendor.js': /^test[\\/](?=vendor)/
      order:
        # Files in `vendor` directories are compiled before other files
        # even if they aren't specified in order.before.
        before: [
          'vendor/scripts/console-polyfill.js',
          'vendor/scripts/jquery-1.9.1.js',
          'vendor/scripts/underscore-1.4.4.js',
          'vendor/scripts/backbone-0.9.10.js'
          'vendor/scripts/bootstrap-2.3.1/alert.js',
          'vendor/scripts/bootstrap-2.3.1/affix.js'
          'vendor/scripts/bootstrap-2.3.1/button.js',
          'vendor/scripts/bootstrap-2.3.1/carousel.js',
          'vendor/scripts/bootstrap-2.3.1/collapse.js',
          'vendor/scripts/bootstrap-2.3.1/dropdown.js',
          'vendor/scripts/bootstrap-2.3.1/modal.js',
          'vendor/scripts/bootstrap-2.3.1/scrollspy.js',
          'vendor/scripts/bootstrap-2.3.1/tab.js',
          'vendor/scripts/bootstrap-2.3.1/tooltip.js',
          'vendor/scripts/bootstrap-2.3.1/popover.js',
          'vendor/scripts/bootstrap-2.3.1/transition.js',
          'vendor/scripts/bootstrap-2.3.1/typeahed.js'
        ]
        after: [
          'test/vendor/scripts/test-helper.js'
        ]

    stylesheets:
      joinTo:
        'stylesheets/app.css': /^(app|vendor)/
        'test/stylesheets/test.css': /^test/
      order:
        before: [
          'app/views/styles/reset.styl',
          'vendor/styles/styles.less'
        ]
        after: ['vendor/styles/helpers.css']

    templates:
      joinTo: 'javascripts/app.js'
