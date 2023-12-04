import { ConfirmationDialogTitle } from '../../../../../../layouts/JobDetails/SupervisorView/components/TasksWidget/styledComponents';
import Typography from "@material-ui/core/Typography";
import styled from 'styled-components';

export const CreateTemplateConfirmationDialogTitle = styled(ConfirmationDialogTitle)`
  &.MuiDialogTitle-root {
  display: flex;
  padding: 0 0 0 10px;
  height: 52px;
  background-color: #006ba6;
  margin-bottom: 15px;
  align-items: center;
  text-transform: uppercase;
  }
  & .MuiTypography-h6{
  color: white;
  font-weight: 500;
  font-size: 16px;
  line-height: 1.17;
  }
`;

export const AddTemplateModalStyledTypographyDescription = styled(Typography)`
margin-bottom: 20px;
  &.MuiTypography-body2 {
    font-weight: normal;
    margin-bottom: 15px;
    color: #425a70;
  }
`;

export const ErrorText = styled(AddTemplateModalStyledTypographyDescription)`
  &.MuiTypography-body2 {
    color: #C32806;
  }
`;
