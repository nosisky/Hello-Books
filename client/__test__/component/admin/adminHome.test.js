import React from 'react';
import expect from 'expect';
import { stub } from 'sinon';
import hammerjs from 'hammerjs';
import { shallow, configure, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-15';
import mockData from '../../__mocks__/mockData';

import { AdminHome, 
  mapDispatchToProps,
mapStateToProps } from '../../../components/admin/AdminHome';
import { getAllBooksAction } from '../../../actions/BookActions';
import DashboardFooter from '../../../components/includes/DashboardFooter';
import { mapSeries } from 'bluebird';
import { Promise } from 'firebase';

configure({ adapter: new Adapter() });

jest.mock('../../../components/admin/includes/AdminHeader');
jest.mock('../../../components/admin/includes/AdminSideBar');

let props;

const setup = () => {
	props = {
    count: 12,
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
	it('should render the component successfully', () => {
		const wrapper = setup();
		expect(wrapper.instance().props.user.fullName).toBe('test');
		expect(wrapper.instance().props.user.plan).toBe('Silver');
		expect(wrapper.instance().props.user.isAdmin).toBe(0);
	});

	it('should receive the action creators', () => {
		const wrapper = setup();
		const handlePageChangeSpy = jest.spyOn(wrapper.instance(), 'handlePageChange');

		const handleClickSpy = jest.spyOn(wrapper.instance(), 'handleClick');

    const renderPaginationSPy = jest.spyOn(wrapper.instance(), 'renderPagination');

		wrapper.instance().handlePageChange({ page: { selected: 1 } });
		wrapper.instance().renderPagination(2);
		wrapper.instance().handleClick(1);

		expect(wrapper.instance().handleClick).toHaveBeenCalled();
		expect(wrapper.instance().renderPagination).toHaveBeenCalled();
		expect(wrapper.instance().handlePageChange).toHaveBeenCalled();
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
