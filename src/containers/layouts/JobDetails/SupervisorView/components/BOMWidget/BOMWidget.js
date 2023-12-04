import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { bindActionCreators, compose } from 'redux';

import { getChoosedLineJobBOMs, updateChoseLineJobBOMs } from '../../../../../../actions/jobDetails';
import { addBOMsToStation } from '../../../../../../actions/supervisorJobDetails';
import ContainedButton from '../../../../../../components/Buttons/ContainedButton';
import { BUTTONS_TEXT } from '../../../../../../constants';
import {
  HeaderButtonsWrapper,
  StyledTypography, SupervisorBOMWidgetHeader,
  SupervisorBOMWidgetWrapper,
} from '../styledComponents';
import BOMsComponent from './BOMsMultiSelectGroup/components/WidgetBoms/BOMsComponent';

class BOM extends Component {
  constructor(props) {
    super(props);
    this.deleteWidgetBOM = React.createRef();
  }

  state = {
    selectedBomData: null,
  };

  selectBOM = (id, isDeleted) => {
    const { selectedBomData } = this.state;
    if (selectedBomData && selectedBomData.id === id) {
      this.setState({ selectedBomData: null });
    } else {
      this.setState({ selectedBomData: { id, isDeleted } });
    }
  }

  cancelDeleteBOM = () => {
    this.setState({ selectedBomData: null });
  }

  deleteBOM = () => {
    const { selectedBomData } = this.state;
    this.deleteWidgetBOM.current.deleteWidgetBOM(selectedBomData.id);
    this.setState({ selectedBomData: null });
  }

  render() {
    const {
      boms,
      lineStations,
      lineJobStations,
      updateChoseLineJobBOMs,
      addBOMsToStation,
      checkedSupervisorLineBOMs,
      openedStation,
      setIsStationChangesSaved,
      handleAddedEntities,
      addedStationsBoms,
      initialStationBOMs,
      isStationDataSavedChanges,
    } = this.props;
    const { selectedBomData } = this.state;
    const parsedBoms = boms && boms.map(bom => bom.bom);
    return (
      <SupervisorBOMWidgetWrapper>
        <SupervisorBOMWidgetHeader>
          <StyledTypography variant="subtitle1">BILL OF MATERIALS</StyledTypography>
          {!!selectedBomData && (
          <HeaderButtonsWrapper>
            <ContainedButton
              variant="contained"
              color="secondary"
              colorType="white"
              text={BUTTONS_TEXT.cancel}
              onClick={this.cancelDeleteBOM}
            />
            <ContainedButton
              variant="contained"
              color="primary"
              colorType="classic"
              text={BUTTONS_TEXT.delete}
              onClick={this.deleteBOM}
            />
          </HeaderButtonsWrapper>
          )}
        </SupervisorBOMWidgetHeader>
        {parsedBoms && parsedBoms.length > 0
        && (
        <BOMsComponent
          boms={parsedBoms}
          lineStations={lineStations}
          checkedBoms={checkedSupervisorLineBOMs}
          updateBoms={updateChoseLineJobBOMs}
          addToStation={addBOMsToStation}
          openedStation={openedStation}
          liveUpdateBoms={() => {}}
          setIsStationChangesSaved={setIsStationChangesSaved}
          handleAddedEntities={handleAddedEntities}
          addedStationsBoms={addedStationsBoms}
          lineJobStations={lineJobStations}
          isStationDataSavedChanges={isStationDataSavedChanges}
          initialStationBOMs={initialStationBOMs}
          selectBOM={this.selectBOM}
          ref={this.deleteWidgetBOM}
          selectedBomData={selectedBomData}
        />
        )}
      </SupervisorBOMWidgetWrapper>
    );
  }
}

const mapStateToProps = state => ({
  supervisorLineBOMs: state.jobDetails.supervisorLineBOMs,
  checkedSupervisorLineBOMs: state.supervisorJobDetails.checkedSupervisorLineBOMs,
  lineStations: state.supervisorJobDetails.lineStations,
  lineJobStations: state.supervisorJobDetails.lineJobStations,
  addedStationsBoms: state.jobDetails.addedStationsBoms,
  initialStationBOMs: state.supervisorJobDetails.initialStationBOMs,
});

const mapDispatchToProps = dispatch => bindActionCreators({
  getChoosedLineJobBOMs,
  updateChoseLineJobBOMs,
  addBOMsToStation,
}, dispatch);

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  withRouter,
)(BOM);
