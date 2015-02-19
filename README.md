# Image Picker

This is a demo component based on the [koco generator](https://github.com/Allov/generator-koco) conventions. It has no purpose other than demoing an external bower component.

## Installation

`bower install rc.component.image-picker`.

## Usage

```javascript
var dialoger = require('dialoger');
framework.registerDialog('images', {
    title: 'Select an image',
    isBower: true
});

var koUtilities = require('knockout-utilities');
koUtilities.registerComponent('image-picker', {
    isBower: true
});
```

To use the component, just add the `<rc.components.image-picker></rc.components.image-picker>` tag in the html file you want to use it.
