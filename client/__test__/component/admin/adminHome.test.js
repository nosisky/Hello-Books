import React from 'react';
import expect from 'expect';
import { stub } from 'sinon';
import hammerjs from 'hammerjs';
import { shallow, configure, mount } from 'enzyme';
// import swal from 'sweetalert';
import Adapter from 'enzyme-adapter-react-15';
import mockData from '../../__mocks__/mockData';
import { AdminHome, 
  mapDispatchToProps,
mapStateToProps } from '../../../components/admin/AdminHome';
import { getAllBooksAction } from '../../../actions/BookActions';
import DashboardFooter from '../../../components/includes/DashboardFooter';
import { mapSeries } from 'bluebird';

configure({ adapter: new Adapter() });

jest.mock('../../../components/admin/includes/AdminHeader');
jest.mock('../../../components/admin/includes/AdminSideBar');

// swal = jest.mock('swal', Promise.resolve(true));

let props;

const setup = () => {
	props = {
		user: {
			fullName: 'test',
			id: 1,
			plan: 'Silver',
			isAdmin: 0
		},
		actions: {
			getAllBooksAction: jest.fn()
		},
		books: mockData.modifiedBook
	};
	return shallow(<AdminHome {...props} />);
};

describe('Component: AdminHome', () => {
	it('tests that the component received the user props', () => {
		const wrapper = setup();
		expect(wrapper.instance().props.user.fullName).toBe('test');
		expect(wrapper.instance().props.user.plan).toBe('Silver');
		expect(wrapper.instance().props.user.isAdmin).toBe(0);
	});

	it('tests that the component received the action creator', () => {
		const wrapper = setup();
		const handlePageChangeSpy = jest.spyOn(wrapper.instance(), 'handlePageChange');

		const handleClickSpy = jest.spyOn(wrapper.instance(), 'handleClick');

		wrapper.instance().handlePageChange({ page: { selected: 1 } });
		wrapper.instance().handleClick(1);

		expect(wrapper.instance().handleClickSpy).toHaveBeenCalled();
		expect(wrapper.instance().handlePageChangeSpy).toHaveBeenCalled();
		expect(wrapper.instance().props.actions.getAllBooksAction).toHaveBeenCalled();
		expect(wrapper.instance().props.books[0].title).toBe('This is a test');
		expect(wrapper.instance().props.books[0].author).toBe('dealwap');
	});

	it('should render Footer component', () => {
		const footerWrapper = shallow(<DashboardFooter />);
		expect(footerWrapper).toBeDefined();
	});

	it('should receive the book props', () => {
		const wrapper = setup();
		expect(wrapper.instance().props.books[0].title).toBe('This is a test');
		expect(wrapper.instance().props.books[0].author).toBe('dealwap');
  });

  it('should ensure mapDispatchToProps returns binded actions', () => {
    const dispatch = jest.fn();
    expect(mapDispatchToProps().actions.getAllBooksAction).toBeTruthy;
  });

  it('should ensure mapStateToProps returns prop from redux store', () => {
    const storeState = {
      book: {
        data: [{ title: 'test book' }],
        count: 1
      },
      auth: { user: { } }
    };
    expect(mapStateToProps(storeState).books).toHaveLength(1);
    expect(mapStateToProps(storeState).count).toBe(1);
  });
});
