// Create `window.describe` etc. for our BDD-like tests.
mocha.setup({
  ui: 'bdd',
  globals: ['jQuery*']
});

// Create another global variable for simpler syntax.
window.expect = chai.expect;
