import React from 'react'
import Lifecycle from '../lifecycle'
import { shallow } from 'enzyme';

import axios from 'axios'
import MockAdapter from "axios-mock-adapter"

describe('<Lifecycle />', () => {
	beforeEach(function () {
		const mock = new MockAdapter(axios);
		mock.onGet("https://api.github.com/users").reply(200, {
			users: [{ login: "John Smith" }],
		});

		mock.onGet("/users/12345").reply(200, {
			users: [{ login: "John Smith" }],
		});
	})

	it('render scorret', () => {
		const wrapper = shallow(<Lifecycle />)
		const ins = wrapper.instance()
		expect(wrapper).toMatchSnapshot();

		ins.getApi();

	})

});