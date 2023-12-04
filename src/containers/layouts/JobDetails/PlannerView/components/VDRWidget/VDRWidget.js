import React, { useEffect, useState } from 'react';
import { bindActionCreators, compose } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { createStructuredSelector } from 'reselect';

import VDRWidgetItem from './VDRWidgetItem';

import {
  handleUnsavedChangesInDocuments,
  updateSavedLineJobDocuments,
} from '../../../../../../actions/jobDetails';
import {
  AttachedITPsVDRsWrapper,
  ContentWrapper,
  StyledTypography,
  WidgetsWrapper,
} from '../styledComponents';
import { selectLineJobExternalVDRs } from '../../../../../../selectors/jobDetailsWidgets';

const VDRWidget = ({
  vdrs,
  title,
}) => (
  <WidgetsWrapper>
    <StyledTypography variant="subtitle1">{title}</StyledTypography>
    <ContentWrapper>
      <AttachedITPsVDRsWrapper>
        <ContentWrapper>
          <AttachedITPsVDRsWrapper>
            <ul>
              {Boolean(vdrs.length) && vdrs.map((file, index) => (
                <VDRWidgetItem
                  key={`${file.fileName}-${index}`}
                  sequence={file.sequence}
                  subject={file.subject} 
                  url={file.url}
                />
              ))}
            </ul>
          </AttachedITPsVDRsWrapper>
        </ContentWrapper>
      </AttachedITPsVDRsWrapper>
    </ContentWrapper>
  </WidgetsWrapper>
);

const mapDispatchToProps = dispatch => bindActionCreators({
  updateSavedLineJobDocuments,
  handleUnsavedChangesInDocuments,
}, dispatch);


const mapStateToProps = createStructuredSelector({
  vdrs: selectLineJobExternalVDRs(),
});

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  withRouter,
)(VDRWidget);
