import styled from 'styled-components';
import DialogContent from '@material-ui/core/DialogContent';

const LoadingDialogContent = styled(DialogContent)`
  display: flex;
  align-items: center;
  justify-content: center;
  padding-bottom: 16px;
  margin: 20px 60px;
  color: black;
  font-size: 16px;
  &.MuiDialogContent-root {
    padding: 10px 0;
    overflow-y: hidden;
  }
  &.MuiDialogContent-root:first-child {
    padding: 0;
    height: 24px;
    width: 120px;
  }
`;

const LoadingDialogText = styled.div`
  margin-left: 10px;
`;

export { LoadingDialogContent, LoadingDialogText };
