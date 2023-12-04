import React, { useEffect, useState } from 'react';
import Typography from '@material-ui/core/Typography';
import { bindActionCreators, compose } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { createStructuredSelector } from 'reselect';

import { BUTTONS_TEXT, NO_ITPS_MODAL_HEADER, NO_ITPS_MODAL_TEXT } from '../../../../../../constants';
import { DropInIcon } from '../../../../../../components/SvgIcons/svgIcons';
import IconSvg from '../../../../../../components/Icon';
import ContainedButton from '../../../../../../components/Buttons/ContainedButton';
import ModalDialog from '../../../../../../components/ModalDialog';

import { getExternalITPs } from '../../../../../../actions/jobDetails';

import { selectLineJoblITPs } from '../../../../../../selectors/jobDetailsWidgets';

import {
  AttachedITPsVDRsWrapper,
  ContentWrapper,
  LeftBlock,
  StyledTypography,
  WidgetsWrapper,
} from '../styledComponents';

const itpURLForOpen = (id) => `http://jztul0iis01/InspectionTestPlan/useronly/ProjectComponentItem.aspx?ProjectComponentID=${id}`;

const ITPWidget = ({
  match,
  getExternalITPs,
  itps,
  title,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const onGetExternalITPs = () => {
    getExternalITPs(match.params.jobId).then(response => {
      setIsModalOpen(!response.data.length);
    });
  };

  return (
    <WidgetsWrapper>
      <StyledTypography variant="subtitle1">{title}</StyledTypography>
      <ContentWrapper>
        <AttachedITPsVDRsWrapper>
          <ContentWrapper>
            <AttachedITPsVDRsWrapper>
              <ul>
                {!!itps.length && itps.map((file, index) => (
                  <li
                    key={`${file.itpNumber}-${index}`}
                  >
                    <LeftBlock>
                      <a
                        href={itpURLForOpen(file.projectComponentId)}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <Typography variant="body2">
                          {file.itpNumber}
                        </Typography>
                      </a>
                    </LeftBlock>
                  </li>
                ))}
              </ul>
            </AttachedITPsVDRsWrapper>
          </ContentWrapper>
        </AttachedITPsVDRsWrapper>
        <ContainedButton
          variant="contained"
          color="primary"
          colorType="classic"
          onClick={onGetExternalITPs}
          text={BUTTONS_TEXT.importITP}
          withIcon
          icon={(
            <IconSvg
              icon={<DropInIcon color="#ffffff" />}
              iconWidth="15px"
            />
          )}
        />
      </ContentWrapper>
      <ModalDialog
        open={isModalOpen}
        buttonsNames={{
          confirmButtonText: BUTTONS_TEXT.ok,
          cancelButtonText: '',
        }}
        informationDialog
        onClose={closeModal}
        headerText={NO_ITPS_MODAL_HEADER}
        bodyText={NO_ITPS_MODAL_TEXT}
        onClickCancel={() => {}}
        onClickConfirm={closeModal}
      />
    </WidgetsWrapper>
  );
};

const mapStateToProps = createStructuredSelector({
  itps: selectLineJoblITPs(),
});

const mapDispatchToProps = dispatch => bindActionCreators({
  getExternalITPs,
}, dispatch);

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  withRouter,
)(ITPWidget);
