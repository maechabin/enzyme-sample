import React from 'react';
import ReactDOM from 'react-dom';
import { App, Title, Input, Button } from './App';

import  { shallow, mount } from 'enzyme';


describe('<App />', () => {
  test('', () => {
    const wrapper = shallow(<App />);
    expect(wrapper.find(Title).length).toBe(1);
    expect(wrapper.find(Input).length).toBe(1);
    expect(wrapper.find(Button).length).toBe(1);
  });
});

describe('<Title />', () => {
  it('', () => {
    const wrapper = shallow(<Title title={'aaa'} />);
    expect(wrapper.text()).toBe('aaa');
    wrapper.setProps({ title: 'bar' });
    expect(wrapper.text()).toBe('bar');
  });
});

describe('<Input />', () => {
  it('', () => {
    const wrapper = shallow(<Input />);
    expect(wrapper.find('input').length).toBe(1);
  });

  it('', () => {
    const wrapper = shallow(<Input />);
    const handleChange = jest.spyOn(Input.prototype, 'handleChange');
    const event = { target: { value: 'aaa' } };
    wrapper.find('input').simulate('change', event);
    expect(handleChange).toHaveBeenCalled();
  });
});
