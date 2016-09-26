'use strict'

const Polymer = window.Polymer
const CustomEvent = window.CustomEvent

class aceEditor {
  // Define behaviors with a getter.
  get behaviors () {
    return []
  }

  // Element setup goes in beforeRegister instead of createdCallback.
  beforeRegister () {
    this.is = 'ace-editor'

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
    }
  }

  // onReady fill <lib-loader> component to load Ace.js from CDN
  ready () {
    this._computeLibLink()
    this._computeUniqueId()
  }

  /**
   *  {function} setTheme set the choosen theme
   *  {string} theme Name of the theme to set
   **/
  setTheme (theme) {
    this.Ace.setTheme('ace/theme/' + this.theme)
    this.set('theme', theme)
  }

  /**
   *  {function} setMode set the choosen mode
   *  {string} mode Name of the mode to set
   **/
  setMode (mode) {
    this.Ace.getSession().setMode('ace/mode/' + this.mode)
    this.set('mode', mode)
  }

  /**
   *
   *  {function} setContent set the passed content
   *  {string} content Content that will override the current content
   **/
  setContent (content) {
    this.Ace.setValue(content, 1)
  }

  /**
   *
   *  {function} appendContent append the passed content
   *  {string} content Content that will be appended to the after the current content
   **/
  appendContent (content) {
    this.Ace.setValue(this.Ace.getValue() + ' ' + content, 1)
  }

  /**
   *  {function} getContent get all the content
   *  {string} return content getted from the editor
   **/
  getContent () {
    return this.Ace.getValue()
  }

  /** ===============
   * Private methods
   **/
  _computeLibLink () {
    this.$.loaderAce.set('lib', `https://cdnjs.cloudflare.com/ajax/libs/ace/${this.version}/ace.js`)
  }
  _computeUniqueId () {
    this.$.loaderAce.set('libUniqueId', this.uniqueId)
  }

  _initAce () {
    this.Ace = window.ace.edit(this.$.editor)
    this.Ace.$blockScrolling = Infinity
    this._initListeners()
    this.Ace.setTheme('ace/theme/' + this.theme)
    this.Ace.getSession().setMode('ace/mode/' + this.mode)
    this._isAceInit = true
    this.dispatchEvent(new CustomEvent('ace-ready'))
  }

  _initListeners () {
    this.Ace.on('change', (e) => {
      this.dispatchEvent(new CustomEvent('change'))
    })
    this.Ace.on('blur', (e) => {
      this.dispatchEvent(new CustomEvent('blur'))
    })
    this.Ace.on('changeSelectionStyle', (e) => {
      this.dispatchEvent(new CustomEvent('change-selection-style'))
    })
    this.Ace.on('changeSession', (e) => {
      this.dispatchEvent(new CustomEvent('change-session'))
    })
    this.Ace.on('copy', (e) => {
      this.dispatchEvent(new CustomEvent('copy'))
    })
    this.Ace.on('focus', (e) => {
      this.dispatchEvent(new CustomEvent('focus'))
    })
    this.Ace.on('paste', (e) => {
      this.dispatchEvent(new CustomEvent('paste'))
    })
  }

}

// Register the element using Polymer's constructor.
Polymer(aceEditor)
