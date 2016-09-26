module.exports = {
  verbose: true,
  sauce: false,
  suites: ['test/index.html'],
  plugins: {
    sauce: {
      disabled: true
    },
    local: {
      remote: false,
      browsers: ['chrome']
    }
  }
}
