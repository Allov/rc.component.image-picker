# Image Picker

## Table of content

- [Quick start](#quick-start)
- [Register components](#register-components)
- [Usages](#usages)

## Quick start

- Install with [Bower](http://bower.io): `bower install rc.component.image-picker`.

## Register components

In the `app/startup.js` file, add these lines of code before the `framework.init()` function:

    framework.registerDialog({
        name: 'images',
        title: 'Select an image',
        isBower: true
    });

    framework.registerComponent({
        name: 'image-picker',
        isBower: true
    });

## Usages

To use the component, just add the `<image-picker></image-picker>` tag in the html file you want to use it.