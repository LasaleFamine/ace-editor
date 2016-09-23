# `<ace-editor>` Polymer (ES6)


:construction: Work in progress :construction:

> Wrapper of [Ace Editor](https://ace.c9.io) as a customizable [Polymer 1.0](https://www.polymer-project.org/1.0/) component in ES6 syntax.

## Why

Just...

``` html
<link rel="import" href="[your_bower_folder]/ace-editor/ace-editor.html">

<ace-editor></ace-editor>

```
ready to go! :rocket:

Forget to import any library, just import the component and polifylls if needed ([webcomponentsjs](https://github.com/webcomponents/webcomponentsjs) just for Polymer) and you are ready to go.  
Versatility also for all the methods of ***Ace***: you can access directly the Ace instance with `this.Ace` or simply use the methods of the component itself.

## Install

    $ bower install LasaleFamine/ace-editor

## Default Properties
``` js

this.properties = {
  /** Ace istance **/
  Ace: {
    type: Function,
  },
  mode: {
    type: String,
    value: 'html',
  },
  theme: {
    type: String,
    value: 'monokai',
    notify: true,
  },
  _isAceInit: {
    type: Boolean,
    value: false
  },
};

```

## API

#### .setTheme(theme)
##### theme
Type: `string`  
Name of the mode to set (ref: [test mode](https://ace.c9.io/tool/mode_creator.html))
____

#### .setMode(mode)
##### mode
Type: `string`  
Name of the theme to set (ref: [test themes](https://ace.c9.io/tool/mode_creator.html))
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




## Develop

Clone the repository ***inside a folder*** (ex: `sandbox-ace-editor/ace-editor`) and inside the `ace-editor` folder:

    $ npm install && bower install

Developing mode: **watch** on base files and **Babel** that transpiles (http://localhost:8080/ace-editor/demo)

    $ gulp watch

Build: only the **Babel** action simply run

    $ gulp


## License

[MIT](https://github.com/LasaleFamine/ace-editor/blob/master/LICENSE.md) &copy; LasaleFamine
