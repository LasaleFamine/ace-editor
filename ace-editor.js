'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Polymer = window.Polymer;
var CustomEvent = window.CustomEvent;

var aceEditor = function () {
  function aceEditor() {
    _classCallCheck(this, aceEditor);
  }

  _createClass(aceEditor, [{
    key: 'beforeRegister',


    // Element setup goes in beforeRegister instead of createdCallback.
    value: function beforeRegister() {
      this.is = 'ace-editor';

      // Define the properties object in beforeRegister.
      this.properties = {
        /** Ace istance **/
        Ace: {
          type: Function
        },
        uniqueId: {
          type: String,
          value: 'aceEditorPolymerLibLoader'
        },
        version: {
          type: String,
          value: '1.2.5'
        },
        mode: {
          type: String,
          value: 'html'
        },
        theme: {
          type: String,
          value: 'monokai'
        },
        _isAceInit: {
          type: Boolean,
          value: false
        }
      };
    }

    // onReady fill <lib-loader> component to load Ace.js from CDN

  }, {
    key: 'ready',
    value: function ready() {
      this._computeLibLink();
      this._computeUniqueId();
    }

    /**
     *  {function} setTheme set the choosen theme
     *  {string} theme Name of the theme to set
     **/

  }, {
    key: 'setTheme',
    value: function setTheme(theme) {
      this.Ace.setTheme('ace/theme/' + this.theme);
      this.set('theme', theme);
    }

    /**
     *  {function} setMode set the choosen mode
     *  {string} mode Name of the mode to set
     **/

  }, {
    key: 'setMode',
    value: function setMode(mode) {
      this.Ace.getSession().setMode('ace/mode/' + this.mode);
      this.set('mode', mode);
    }

    /**
     *
     *  {function} setContent set the passed content
     *  {string} content Content that will override the current content
     **/

  }, {
    key: 'setContent',
    value: function setContent(content) {
      this.Ace.setValue(content, 1);
    }

    /**
     *
     *  {function} appendContent append the passed content
     *  {string} content Content that will be appended to the after the current content
     **/

  }, {
    key: 'appendContent',
    value: function appendContent(content) {
      this.Ace.setValue(this.Ace.getValue() + ' ' + content, 1);
    }

    /**
     *  {function} getContent get all the content
     *  {string} return content getted from the editor
     **/

  }, {
    key: 'getContent',
    value: function getContent() {
      return this.Ace.getValue();
    }

    /** ===============
     * Private methods
     **/

  }, {
    key: '_computeLibLink',
    value: function _computeLibLink() {
      this.$.loaderAce.set('lib', 'https://cdnjs.cloudflare.com/ajax/libs/ace/' + this.version + '/ace.js');
    }
  }, {
    key: '_computeUniqueId',
    value: function _computeUniqueId() {
      this.$.loaderAce.set('libUniqueId', this.uniqueId);
    }
  }, {
    key: '_initAce',
    value: function _initAce() {
      this.Ace = window.ace.edit(this.$.editor);
      this.Ace.$blockScrolling = Infinity;
      this._initListeners();
      this.Ace.setTheme('ace/theme/' + this.theme);
      this.Ace.getSession().setMode('ace/mode/' + this.mode);
      this._isAceInit = true;
      this.dispatchEvent(new CustomEvent('ace-ready'));
    }
  }, {
    key: '_initListeners',
    value: function _initListeners() {
      var _this = this;

      this.Ace.on('change', function (e) {
        _this.dispatchEvent(new CustomEvent('change'));
      });
      this.Ace.on('blur', function (e) {
        _this.dispatchEvent(new CustomEvent('blur'));
      });
      this.Ace.on('changeSelectionStyle', function (e) {
        _this.dispatchEvent(new CustomEvent('change-selection-style'));
      });
      this.Ace.on('changeSession', function (e) {
        _this.dispatchEvent(new CustomEvent('change-session'));
      });
      this.Ace.on('copy', function (e) {
        _this.dispatchEvent(new CustomEvent('copy'));
      });
      this.Ace.on('focus', function (e) {
        _this.dispatchEvent(new CustomEvent('focus'));
      });
      this.Ace.on('paste', function (e) {
        _this.dispatchEvent(new CustomEvent('paste'));
      });
    }
  }, {
    key: 'behaviors',

    // Define behaviors with a getter.
    get: function get() {
      return [];
    }
  }]);

  return aceEditor;
}();

// Register the element using Polymer's constructor.


Polymer(aceEditor);