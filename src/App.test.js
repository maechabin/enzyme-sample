import React from 'react';
import ReactDOM from 'react-dom';
import { App, Title, Input, Button } from './App';
import renderer from 'react-test-renderer';

import  { shallow, mount } from 'enzyme';


describe('<App />', () => {
  const wrapper = shallow(<App />);

  test('', () => {
    expect(wrapper.find(Title).length).toBe(1);
    expect(wrapper.find(Input).length).toBe(1);
    expect(wrapper.find(Button).length).toBe(1);
  });

  test('スナップショット', () => {
    const tree = renderer
      .create(<App />)
      .toJSON();
    expect(tree).toMatchSnapshot('aa');
  });

  test('setState', () => {
    wrapper.setState({
      text: 'aaa',
    });
    expect(wrapper.find('.aaa').length).toBe(1);
  });
});

describe('<Title />', () => {
  test('', () => {
    const wrapper = shallow(<Title text={'React'} />);
    expect(wrapper.text()).toBe('Hello React');
    wrapper.setProps({ text: 'World' });
    expect(wrapper.text()).toBe('Hello World');
  });
});

describe('<Input />', () => {
  test('', () => {
    const wrapper = shallow(<Input />);
    expect(wrapper.find('input').length).toBe(1);
  });

  test('', () => {
    const handleChangeSpy = jest.fn();
    const wrapper = mount(<Input handleChange={handleChangeSpy} />);

    const event = { target: { value: 'aaa' } };
    wrapper.find('input').simulate('change', event);
    expect(handleChangeSpy).toHaveBeenCalledWith('aaa');
  });

});

describe('<Button />', () => {
  test('', () => {
    const wrapper = shallow(<Button />);
    expect(wrapper.find('button').length).toBe(1);
  });
  
  test('', () => {
    const handleClickSpy = jest.fn();
    const wrapper = shallow(<Button handleClick={handleClickSpy} />);
    wrapper.find('button').simulate('click');
    expect(handleClickSpy).toHaveBeenCalled();
  })
});

