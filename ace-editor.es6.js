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

  // onReady insert Ace.js library from CDN
  ready () {
    this._insertLib(`https://cdnjs.cloudflare.com/ajax/libs/ace/${this.version}/ace.js`, 'ace')
  }

  detached () {
    this._removeLib()
    document.removeEventListener('ace-editor-loaded', (evt) => {
      console.info('EVT listener removed correctly')
    })
  }

  /**
   *  {function} setTheme set the choosen theme
   *  {string} theme Name of the theme to set
   *  {return} null
   **/
  setTheme (theme) {
    this.set('theme', theme)
    this.Ace.setTheme('ace/theme/' + this.theme)
  }

  /**
   *  {function} setMode set the choosen mode
   *  {string} mode Name of the mode to set
   **/
  setMode (mode) {
    this.set('mode', mode)
    this.Ace.getSession().setMode('ace/mode/' + this.mode)
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
  /* Insert at the end of the body the js lib */
  _insertLib (link, type) {
    if (document.querySelector('#' + type)) {
      this._addListener()
      return false
    }
    this._addListener()
    let src = document.createElement('script')
    src.setAttribute('src', link)
    src.id = type
    src.async = true
    src.onreadystatechange = src.onload = (evt) => {
      this._onLoadLib(evt, type)
    }
    document.body.appendChild(src)
  }

  /** Remove lib from the dom */
  _removeLib () {
    window.ace.remove()
  }

  _initAce () {
    this.Ace = window.ace.edit(this.$.editor)
    this._initListeners()
    this.Ace.setTheme('ace/theme/' + this.theme)
    this.Ace.getSession().setMode('ace/mode/' + this.mode)
  }

  /* Add listener to the document for the load of the library */
  _addListener () {
    document.addEventListener('ace-editor-loaded', () => {
      if (window.ace && !this._isAceInit) this._initAce()
    })
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

  /** ===============
   * Event listeners
   **/
  /* On lib loaded */
  _onLoadLib (evt, type) {
    setTimeout(() => {
      document.dispatchEvent(new CustomEvent('ace-editor-loaded'))
    })
  }

}

// Register the element using Polymer's constructor.
Polymer(aceEditor)
