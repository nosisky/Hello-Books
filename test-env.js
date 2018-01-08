import $ from 'jquery';
global.$ = global.jQuery = $;
global.Materialize = { toast: jest.fn(Promise.resolve(1)) };
