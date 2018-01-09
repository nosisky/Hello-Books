const $ = require('jquery');
global.$ = global.jQuery = $;
global.Materialize = { toast: jest.fn(Promise.resolve(1)) };
window.jQuery = $;
global.sweetalert = jest.genMockFromModule('sweetalert');
