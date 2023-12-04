import styled from 'styled-components';
import Icon from '@material-ui/core/Icon';

export const StyledIcon = styled(Icon)`

  &.MuiIcon-root{
    display: flex;
    width: ${props => props.iconwidth};
    height: ${props => props.iconheight};
    & svg {
      font-size: ${props => props.iconsize};
    }
    &.MuiSvgIcon-fontSizeSmall {
      font-size: ${props => props.iconsize};
    }
  }
  & .MuiSvgIcon-root {
    fill: ${props => props.iconcolor};
  }
  &.MuiIconButton-root {
    padding: 0;
    & svg {
      font-size: ${props => props.iconsize};
    }
  }
`;
