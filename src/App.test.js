import React from 'react';
import ReactDOM from 'react-dom';
import { App, Title, Input, Button } from './App';
import renderer from 'react-test-renderer';
import  { shallow, mount } from 'enzyme';

/**
 * Appコンポーネントのテスト
 */
describe('<App />', () => {
  const wrapper = shallow(<App />);

  test('子コンポーネントの存在確認', () => {
    expect(wrapper.find(Title).length).toBe(1);
    expect(wrapper.find(Input).length).toBe(1);
    expect(wrapper.find(Button).length).toBe(1);
  });

  test('setStateでthis.state.textを更新した時のclass名', () => {
    wrapper.setState({
      text: 'XXX',
    });
    expect(wrapper.find('.XXX').length).toBe(1);
  });

  test('handleChangeの呼び出し', () => {
    const setStateSpy = jest.spyOn(App.prototype, 'setState');
    wrapper.instance().handleChange('XXX');
    expect(setStateSpy).toHaveBeenCalledWith({
      inputValue: 'XXX',
    });
  });

  test('handleClickの呼び出し', () => {
    const setStateSpy = jest.spyOn(App.prototype, 'setState');
    wrapper.setState({
      text: 'XXX',
    });
    wrapper.instance().handleClick();
    expect(setStateSpy).toHaveBeenCalledWith({
      text: 'XXX',
      inputValue: '',
    });
  });

  test('スナップショット', () => {
    const tree = renderer
      .create(<App />)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});

/**
 * Titleコンポーネントのテスト
 */
describe('<Title />', () => {
  test('h1要素の存在確認', () => {
    const wrapper = shallow(<Title text={'React'} />);
    expect(wrapper.find('h1').length).toBe(1);
  });

  test('propsの値', () => {
    const wrapper = shallow(<Title text={'React'} />);
    expect(wrapper.text()).toBe('Hello React');
    wrapper.setProps({ text: 'World' });
    expect(wrapper.text()).toBe('Hello World');
  });

  test('スナップショット', () => {
    const tree = renderer
      .create(<Title text={'React'} />)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});

/**
 * Inputコンポーネントのテスト
 */
describe('<Input />', () => {
  test('input要素の存在確認', () => {
    const wrapper = shallow(<Input />);
    expect(wrapper.find('input').length).toBe(1);
  });

  test('changeイベント発火時のコールバック関数の呼び出し', () => {
    const handleChangeSpy = jest.fn();
    const wrapper = mount(<Input handleChange={handleChangeSpy} />);

    const event = { target: { value: 'aaa' } };
    wrapper.find('input').simulate('change', event);
    expect(handleChangeSpy).toHaveBeenCalledWith('aaa');
  });

  test('スナップショット', () => {
    const handleChangeSpy = jest.fn();
    const value = 'XXX';
    const tree = renderer
      .create(<Input onChange={handleChangeSpy} value={value} />)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});

/**
 * Buttonコンポーネントのテスト
 */
describe('<Button />', () => {
  test('要素の存在', () => {
    const wrapper = shallow(<Button />);
    expect(wrapper.find('button').length).toBe(1);
  });
  
  test('clickイベント発火時のコールバック関数の呼び出し', () => {
    const handleClickSpy = jest.fn();
    const wrapper = shallow(<Button handleClick={handleClickSpy} />);
    wrapper.find('button').simulate('click');
    expect(handleClickSpy).toHaveBeenCalled();
  });

  test('スナップショット', () => {
    const handleClickSpy = jest.fn();
    const tree = renderer
      .create(<Button handleClick={handleClickSpy} />)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
