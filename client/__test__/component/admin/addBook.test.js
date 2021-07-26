import React from 'react';
import expect from 'expect';
import hammerjs from 'hammerjs';
import { shallow, configure, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-15';
import { AddBookModal, mapStateToProps, mapDispatchToProps } from '../../../components/admin/includes/AddBookModal';

window.localStorage = {};

jest.mock('../../../components/auth/GoogleLogin');

configure({ adapter: new Adapter() });


let props;
const setup = () => {
	props = {
		actions: {
			getCategoryAction: jest.fn(),
			addBookAction: jest.fn(() => Promise.resolve(1))
		},
		onSubmit: jest.fn(() => Promise.resolve(1)),
		storageRef: {
			firebase: {
				storage: jest.fn()
			}
		}
	};
	return mount(<AddBookModal {...props} />);
};

describe('Component: AddBook', () => {
	it('should render the component successfully', () => {
		const wrapper = setup();
		const action = wrapper.instance();

		expect(wrapper.find('div').length).toBe(20);
		expect(wrapper.find('form').length).toBe(1);
		expect(wrapper.find('input').length).toBe(6);
		expect(wrapper.find('button').length).toBe(1);
		expect(action.renderCategory).toBeTruthy();
	});
	it('should set book title in local state', () => {
		const wrapper = setup();

		const action = wrapper.instance();

		const event = {
			target: {
				name: 'title',
				value: 'This is a test'
			}
		};
		action.onChange(event);
		expect(action.state.title).toEqual('This is a test');
	});

	it('should set book isbn in local state', () => {
		const wrapper = setup();

		const action = wrapper.instance();

		const event = {
			target: {
				name: 'isbn',
				value: '123-isbn-book'
			}
		};
		action.onChange(event);
		expect(action.state.isbn).toEqual('123-isbn-book');
	});

	it('should set book description in local state', () => {
		const wrapper = setup();

		const action = wrapper.instance();

		const event = {
			target: {
				name: 'description',
				value: 'This is just a test'
			}
		};
		action.onChange(event);
		expect(action.state.description).toEqual('This is just a test');
	});

	it('should set book author in local state', () => {
		const wrapper = setup();

		const action = wrapper.instance();

		const event = {
			target: {
				name: 'author',
				value: 'Newton'
			}
		};
		action.onChange(event);
		expect(action.state.author).toEqual('Newton');
	});

	it('should ensure mapStateToProps returns prop from redux store', () => {
		const storeState = {
			book: {
				category: [ { name: 'test' } ]
			}
		};
		expect(mapStateToProps(storeState).category).toHaveLength(1);
	});

	it('should ensure mapDispatchToProps returns binded actions', () => {
		const dispatch = jest.fn();
		expect(mapDispatchToProps(dispatch).actions.getCategoryAction).toBeTruthy;
	});

	it('should clear description value for description with 5 characters and above', () => {
		const wrapper = setup();

		const action = wrapper.instance();

		const event = {
			target: {
				name: 'description',
				value: 'This is just a book'
			}
		};
		action.onFocus(event);
		expect(action.state.descriptionError).toEqual('');
	});

	it('should clear isbn value for isbn with 5 characters and above', () => {
		const wrapper = setup();

		const action = wrapper.instance();

		const event = {
			target: {
				name: 'isbn',
				value: 'book-isbn-123'
			}
		};
		action.onFocus(event);
		expect(action.state.isbnError).toEqual('');
	});

	it('should clear author value for author with 2 characters and above', () => {
		const wrapper = setup();

		const action = wrapper.instance();

		const event = {
			target: {
				name: 'author',
				value: 'James'
			}
		};
		action.onFocus(event);
		expect(action.state.authorError).toEqual('');
	});

	it('should clear productionYearError when productionYear is 4 characters', () => {
		const wrapper = setup();

		const action = wrapper.instance();

		const event = {
			target: {
				name: 'productionYear',
				value: 1992
			}
		};
		action.onFocus(event);
		expect(action.state.productionYearError).toEqual('');
	});

	it('should change isbn value as entered by user', () => {
		const wrapper = setup();

		const action = wrapper.instance();

		const event = {
			target: {
				name: 'isbn',
				value: 'isbn-123-test'
			}
		};
		action.onChange(event);
		expect(action.state.isbn).toEqual('isbn-123-test');
	});

	it('should change author value as entered by user', () => {
		const wrapper = setup();

		const action = wrapper.instance();

		const event = {
			target: {
				name: 'author',
				value: 'James Boo'
			}
		};
		action.onChange(event);
		expect(action.state.author).toEqual('James Boo');
	});

	it('should change title value as entered by user', () => {
		const wrapper = setup();

		const action = wrapper.instance();

		const event = {
			target: {
				name: 'title',
				value: 'Newton Freeman'
			}
		};
		action.onChange(event);
		expect(action.state.title).toEqual('Newton Freeman');
	});

	it('should change cover value as entered by user', () => {
		const wrapper = setup();

		const action = wrapper.instance();

		const event = {
			target: {
				name: 'cover',
				value: 'http://example.com/file.jpg'
			}
		};
		action.onChange(event);
		expect(action.state.cover).toEqual('http://example.com/file.jpg');
	});

	it('should add book when form is submitted', () => {
		const wrapper = setup();
		wrapper.instance().state.cover = 'http://example.com/file.jpg';
		const saveCategory = jest.spyOn(wrapper.instance(), 'handleSubmit');
		wrapper.instance().handleSubmit({ preventDefault: () => 1 });
		expect(props.onSubmit).toBeTruthy;
	});

	it('should set isbnError value for ibn with 4 characters', () => {
		const wrapper = setup();

		const action = wrapper.instance();

		const event = {
			target: {
				name: 'isbn',
				value: 'test'
			}
		};
		action.onBlur(event);
    expect(action.state.isbnError)
    .toEqual('Book ISBN must be a minimum of 5 characters');
	});

	it('should set authorError value for author name with less than 2 characters', () => {
		const wrapper = setup();

		const action = wrapper.instance();

		const event = {
			target: {
				name: 'author',
				value: 'a'
			}
		};
		action.onBlur(event);
    expect(action.state.authorError)
    .toEqual('Book author name must be greater than 2 characters');
  });
  
  it('should set description error value when description is undefined', () => {
		const wrapper = setup();

		const action = wrapper.instance();

		const event = {
			target: {
				name: 'description',
				value: false
			}
		};
		action.onBlur(event);
		expect(action.state.descriptionError).toEqual('Book description is required');
  });

  it('should set titleError value when title is undefined', () => {
		const wrapper = setup();

		const action = wrapper.instance();

		const event = {
			target: {
				name: 'title',
				value: false
			}
		};
		action.onBlur(event);
    expect(action.state.titleError)
    .toEqual('Book title must be greater than 5 characters');
	});


	it('should set descriptionError value for description with less than 4 characters', () => {
  
		const wrapper = setup();

		const action = wrapper.instance();

		const event = {
			target: {
				name: 'description',
				value: 'test'
			}
		};
		action.onBlur(event);
		expect(action.state.descriptionError).toEqual('Book description is required');
	});

	it('should set titleError value for title with less than 4 characters', () => {
		const wrapper = setup();

		const action = wrapper.instance();

		const event = {
			target: {
				name: 'title',
				value: 'w'
			}
		};
		action.onBlur(event);
		expect(action.state.titleError).toEqual('Book title must be greater than 5 characters');
	});

	it('should set productionYearError value for title with less than 4 characters', () => {
		const wrapper = setup();

		const action = wrapper.instance();

		const event = {
			target: {
				name: 'productionYear',
				value: '123'
			}
		};
		action.onBlur(event);
		expect(action.state.productionYearError).toEqual('Production year is not valid');
	});

	it('Should set upload error when book cover upload fails', () => {
		const wrapper = setup();

		const action = wrapper.instance();

		const handleUploadError = jest.spyOn(wrapper.instance(), 'handleUploadError');

		wrapper.instance().handleUploadError({});

		expect(action.state.isUploading).toBeFalsy;
  });
  

	it('Should set upload progress when cover upload starts', () => {
		const wrapper = setup();

		const action = wrapper.instance();

		const handleProgress = jest.spyOn(wrapper.instance(), 'handleProgress');

		wrapper.instance().handleProgress(50);

		expect(action.state.progress).toEqual(50);
  });
  
  it('Should set isUploading to true when cover upload starts', () => {

		const wrapper = setup();

		const action = wrapper.instance();

		const handleUploadStart = jest.spyOn(wrapper.instance(), 'handleUploadStart');

		wrapper.instance().handleUploadStart();

    expect(action.state.isUploading).toBeTruthy;
    expect(action.state.progress).toEqual(0);
	});

});
