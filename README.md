# `<ace-editor>` Polymer (ES6)


:construction: Work in progress :construction:

[![Build status](https://travis-ci.org/LasaleFamine/ace-editor.svg?branch=master)](https://travis-ci.org/LasaleFamine/ace-editor)
[![JavaScript Style Guide](https://img.shields.io/badge/code%20style-standard-brightgreen.svg)](http://standardjs.com/)


> Wrapper of [Ace Editor](https://ace.c9.io) as a customizable [Polymer 1.0](https://www.polymer-project.org/1.0/) component in ES6 syntax.

## Why

Just...

``` html
<link rel="import" href="[your_bower_folder]/ace-editor/ace-editor.html">

<ace-editor></ace-editor>

```
ready to go! :rocket:

Forget to import any library, just import the component and **polifylls** if needed ([webcomponentsjs](https://github.com/webcomponents/webcomponentsjs) just for Polymer) and you are ready to go.  
Versatility also for all the methods of ***Ace***: you can access directly the Ace instance with `this.Ace` or simply use the methods of the component itself.

## Install

    $ bower install LasaleFamine/ace-editor


## Default Properties
``` js

{
  /** Ace istance **/
  Ace: {
    type: Function,
  },
  version: {
    type: String,
    value: '1.2.5'
  },
  mode: {
    type: String,
    value: 'html',
  },
  theme: {
    type: String,
    value: 'monokai',
  }
}

```

## Note about `version` and library load
The property `version` is defined to load the version of the library that you need from the  [CloudFlare CDN](https://cdnjs.com/libraries/ace/).  
The default version is set to **1.2.5**

If two or more instances of the component are attached in the same page, **only the first one will load the library**, so this means that you can specify the version only on the first instance of the component.  
Example:  

``` html

<!-- Only the first one will load the lib -->
<ace-editor></ace-editor>
<!-- So the property "version" is pointless here -->
<ace-editor version="1.2.3"></ace-editor>

```


## API

#### .setTheme(theme)
##### theme
Type: `string`  
Set the name of the theme live-time (ref: [test mode](https://ace.c9.io/tool/mode_creator.html))
____

#### .setMode(mode)
##### mode
Type: `string`  
Set the mode live-time  (ref: [test themes](https://ace.c9.io/tool/mode_creator.html))
____

#### .getContent()
Return type: `string`  
String with the content (also the HTML) currently within the editor
___

### Events
[ref: Events section](https://ace.c9.io/#nav=api&api=editor)
#### on-change
Ace => ``` Editor.on('change') ```
#### on-blur
Ace => ``` Editor.on('blur') ```
#### on-change-selection-style
Ace => ``` Editor.on('changeSelectionStyle') ```
#### on-change-selection-style
Ace => ``` Editor.on('changeSelectionStyle') ```
#### on-change-session
Ace => ``` Editor.on('changeSession') ```
#### on-copy
Ace => ``` Editor.on('copy') ```
#### on-focus
Ace => ``` Editor.on('focus') ```
#### on-paste
Ace => ``` Editor.on('paste') ```

### Ace instance

You can also get the Ace instance and make your own methods. The property `this.Ace` is directly referenced to `window.ace` so you can, of course, call every method of Ace.

Ref: [Ace API](https://ace.c9.io/#nav=api)


## Develop

Clone the repository ***inside a folder*** (ex: `sandbox-ace-editor/ace-editor`) and inside the `ace-editor` folder:

    $ npm install && bower install

Developing mode: **watch** on base files and **Babel** that transpiles (http://localhost:8080/ace-editor/demo)

    $ gulp watch

Build: only the **Babel** action simply run

    $ gulp


## Test

[WIP]

## License

[MIT](https://github.com/LasaleFamine/ace-editor/blob/master/LICENSE.md) &copy; LasaleFamine
