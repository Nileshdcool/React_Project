import React from 'react';
import renderer from 'react-test-renderer';
import Adapter from 'enzyme-adapter-react-16';
import 'jest-styled-components';
import {
  shallow, configure, mount,
} from 'enzyme';
import '@testing-library/jest-dom';
import AppsIcon from '@material-ui/core/SvgIcon/SvgIcon';
import ContainedButton from './ContainedButton';
import CustomIconButton from './CustomIconButton';
import { CustomContainedButton, StyledIconButton } from './styledComponents';
import { ICONS_COLORS } from '../../constants';

configure({ adapter: new Adapter() });

describe(">>>CustomButton's --- Snapshot", () => {
  it('+++Correct Snapshot of ContainedButton color primary', () => {
    const renderedValue = renderer.create(
      <ContainedButton
        variant="contained"
        color="primary"
        colorType="classic"
        text="LOGOUT"
      />,
    )
      .toJSON();
    expect(renderedValue).toMatchInlineSnapshot(`
      <button
        className="MuiButtonBase-root MuiButton-root MuiButton-contained sc-AxjAm hjxdlB MuiButton-containedPrimary"
        colortype="classic"
        disabled={false}
        onBlur={[Function]}
        onClick={[Function]}
        onDragLeave={[Function]}
        onFocus={[Function]}
        onKeyDown={[Function]}
        onKeyUp={[Function]}
        onMouseDown={[Function]}
        onMouseLeave={[Function]}
        onMouseUp={[Function]}
        onTouchEnd={[Function]}
        onTouchMove={[Function]}
        onTouchStart={[Function]}
        tabIndex={0}
        type="button"
      >
        <span
          className="MuiButton-label"
        >
          LOGOUT
        </span>
      </button>
    `);
  });
  it('+++Correct Snapshot of IconButton', () => {
    const renderedValue = renderer.create(
      <CustomIconButton
        color="primary"
        disableRipple
        icon={<AppsIcon />}
        iconFontSize="60px"
      />,
    )
      .toJSON();
    expect(renderedValue).toMatchInlineSnapshot(`
      <button
        className="MuiButtonBase-root MuiIconButton-root sc-AxirZ evnmYd MuiIconButton-colorPrimary"
        disabled={false}
        iconsize="60px"
        onBlur={[Function]}
        onClick={[Function]}
        onDragLeave={[Function]}
        onFocus={[Function]}
        onKeyDown={[Function]}
        onKeyUp={[Function]}
        onMouseDown={[Function]}
        onMouseLeave={[Function]}
        onMouseUp={[Function]}
        onTouchEnd={[Function]}
        onTouchMove={[Function]}
        onTouchStart={[Function]}
        tabIndex={0}
        type="button"
      >
        <span
          className="MuiIconButton-label"
        >
          <svg
            aria-hidden="true"
            className="MuiSvgIcon-root"
            focusable="false"
            role="presentation"
            viewBox="0 0 24 24"
          />
        </span>
      </button>
    `);
  });
});

describe('Test Button events and syles', () => {
  const mockCallBack = jest.fn();
  const mockCallBackCustomIconButton = jest.fn(x => x);
  const wrapperContainedButton = shallow(
    <ContainedButton
      variant="contained"
      color="primary"
      colorType="classic"
      text="LOGOUT"
      onClick={mockCallBack}
    />,
  );
  const wrapperCustomIconButton = shallow(
    <CustomIconButton
      color="primary"
      onClick={() => mockCallBackCustomIconButton('tileView')}
      disableRipple
      icon={<AppsIcon />}
      iconFontSize="60px"
    />,
  );
  it('Test click event for CustomIconButton', () => {
    wrapperContainedButton.simulate('click');
    expect(mockCallBack.mock.calls.length).toEqual(1);
  });
  it('Test click event returned value for CustomIconButton', () => {
    wrapperCustomIconButton.simulate('click');
    expect(mockCallBack.mock.calls[0][0]).toBe('tileView');
  });
  it('render element with text LOGOUT', () => {
    const getByText = mount(
      <ContainedButton
        variant="contained"
        color="primary"
        colorType="classic"
        text="LOGOUT"
        onClick={mockCallBack}
      />,
    );
    expect(getByText.text()).toEqual('LOGOUT');
  });
  it('should have right background-image and border primary', () => {
    const wrapper = renderer.create(
      <CustomContainedButton
        variant="contained"
        colortype="classic"
        disableRipple
        color="primary"
      >
        LOGOUT
      </CustomContainedButton>,
    ).toJSON();
    expect(wrapper).toHaveStyleRule('background-image', 'linear-gradient(to bottom,#93c6f4,#064289)');
    expect(wrapper).toHaveStyleRule('border', 'solid 1px #707070', {
      modifier: '&.MuiButton-containedPrimary',
    });
  });
  it('Icon button primary color and svg font size', () => {
    const wrapper = renderer.create(
      <StyledIconButton
        disableRipple
        iconcolor={ICONS_COLORS.primary}
        iconsize="60px"
      >
        <AppsIcon />
      </StyledIconButton>,
    ).toJSON();
    expect(wrapper).toHaveStyleRule('color', '#07639c', {
      modifier: '&.MuiIconButton-root',
    });
    expect(wrapper).toHaveStyleRule('font-size', '60px', {
      modifier: '&.MuiIconButton-root svg',
    });
  });
});
