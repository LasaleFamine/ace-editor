'use strict';

/** TODO: code syntax ESLint */

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

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
        mode: {
          type: String,
          value: 'html'
        },
        theme: {
          type: String,
          value: 'monokai',
          notify: true
        },
        _isAceInit: {
          type: Boolean,
          value: false
        }
      };
    }

    // onReady insert Ace.js library from CDN

  }, {
    key: 'ready',
    value: function ready() {
      this._insertLib('https://cdnjs.cloudflare.com/ajax/libs/ace/1.2.5/ace.js', 'ace');
    }
  }, {
    key: 'detached',
    value: function detached() {
      this._removeLib();
    }

    /**
     *  {function} setTheme set the choosen theme
     *  {string} theme Name of the theme to set
     *  {return} null
     **/

  }, {
    key: 'setTheme',
    value: function setTheme(theme) {
      this.set('theme', theme);
      this.Ace.setTheme('ace/theme/' + this.theme);
    }

    /**
     *  {function} setMode set the choosen mode
     *  {string} mode Name of the mode to set
     **/

  }, {
    key: 'setMode',
    value: function setMode(mode) {
      this.set('mode', mode);
      this.Ace.getSession().setMode('ace/mode/' + this.mode);
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
    /* Insert at the end of the body the js lib */

  }, {
    key: '_insertLib',
    value: function _insertLib(link, type) {
      var _this = this;

      if (document.querySelector('#' + type)) {
        this._addListener();
        return false;
      }
      this._addListener();
      var src = document.createElement('script');
      src.setAttribute('src', link);
      src.id = type;
      src.async = true;
      src.onreadystatechange = src.onload = function (evt) {
        _this._onLoadLib(evt, type);
      };
      document.body.appendChild(src);
    }

    /** Remove lib from the dom */

  }, {
    key: '_removeLib',
    value: function _removeLib() {
      window.ace.remove();
    }
  }, {
    key: '_initAce',
    value: function _initAce() {
      this.Ace = ace.edit(this.$.editor);
      this._initListeners();
      this.Ace.setTheme("ace/theme/" + this.theme);
      this.Ace.getSession().setMode("ace/mode/" + this.mode);
    }

    /* Add listener to the document for the load of the library */

  }, {
    key: '_addListener',
    value: function _addListener() {
      var _this2 = this;

      document.addEventListener('ace-editor-loaded', function () {
        if (window.ace && !_this2._isAceInit) _this2._initAce();
      });
    }
  }, {
    key: '_initListeners',
    value: function _initListeners() {
      var _this3 = this;

      this.Ace.on('change', function (e) {
        _this3.dispatchEvent(new CustomEvent('change'));
      });
      this.Ace.on('blur', function (e) {
        _this3.dispatchEvent(new CustomEvent('blur'));
      });
      this.Ace.on('changeSelectionStyle', function (e) {
        _this3.dispatchEvent(new CustomEvent('change-selection-style'));
      });
      this.Ace.on('changeSession', function (e) {
        _this3.dispatchEvent(new CustomEvent('change-session'));
      });
      this.Ace.on('copy', function (e) {
        _this3.dispatchEvent(new CustomEvent('copy'));
      });
      this.Ace.on('focus', function (e) {
        _this3.dispatchEvent(new CustomEvent('focus'));
      });
      this.Ace.on('paste', function (e) {
        _this3.dispatchEvent(new CustomEvent('paste'));
      });
    }

    /** ===============
     * Event listeners
     **/
    /* On lib loaded */

  }, {
    key: '_onLoadLib',
    value: function _onLoadLib(evt, type) {
      setTimeout(function () {
        document.dispatchEvent(new CustomEvent('ace-editor-loaded'));
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