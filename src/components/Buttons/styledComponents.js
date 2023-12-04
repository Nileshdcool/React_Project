import styled from 'styled-components';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import { BUTTONS_BACKGROUND_COLORS } from '../../constants';

export const CustomContainedButton = styled(Button)`
  height: 30px;
  visibility: ${props => (props.ishidden ? 'hidden' : 'visible')};
  background-image: ${props =>
    (BUTTONS_BACKGROUND_COLORS[props.colortype])};
  &.MuiButtonBase-root {
    color: ${props => props.color};
  }
  &.MuiButton-contained:hover {
    background-image: ${props =>
    (BUTTONS_BACKGROUND_COLORS[`${props.colortype}Hovered`])};
  }
  &.selectedButton {
    background-image: ${BUTTONS_BACKGROUND_COLORS.classicInverted};
    }
  &.selectedButton:hover {
    background-image: ${BUTTONS_BACKGROUND_COLORS.classicInvertedHovered};
  }
  &.MuiButton-containedPrimary {
    border: solid 1px #707070;
    ${props => props.borderRadius && `border-radius: ${props.borderRadius}px`}
  }
  &.MuiButton-containedSecondary {
    border: solid 1px #425a70;
  }
  &.MuiButton-contained.Mui-disabled {
    background-image: ${BUTTONS_BACKGROUND_COLORS.disabled};
  }
`;

export const StyledIconButton = styled(IconButton)`
  &.MuiIconButton-root {
    padding: 0;
    color: ${props => props.iconcolor};
    background-image: ${props => props.backimage};
    border-radius: ${props => props.borderradius};
    padding: ${props => props.padding};
    position: ${props => props.position};
    right: ${props => props.right};
    &:hover {
      background-color:  transparent;
      background-image:  ${props => (props.backimagehover)};
    }
    & svg {
      font-size: ${props => props.iconsize};
    }
    
  }
`;

export const StyledButton = styled(Button)`
  &.MuiButtonBase-root{
  
  &:hover {
    background-color: transparent;
  }
  color: ${props => (props.textcolor ? props.textcolor : 'black')};
  font-weight: bold;
  font-size: 16px;
  line-height: 1.19;
  letter-spacing: normal;
  height: 100%;
  margin-top: 4px;
  justify-content: flex-start;
  padding: 0;
  }
`;
