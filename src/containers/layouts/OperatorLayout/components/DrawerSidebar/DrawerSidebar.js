import React, { useState } from 'react';
import {
  SideBarContent,
  SideBarHeader,
  StationTitle,
  StyledDrawer,
} from './styledComponents';
import {
  selectLastOpenedDrawing,
  selectOperatorKPI,
  selectOperatorSidebarData,
} from '../../../../../selectors/operatorSelectors';

import CustomIconButton from '../../../../../components/Buttons/CustomIconButton';
import { DRAWER_TABS } from '../../../../../constants';
import LogsBlock from './Logs/LogsBlock';
import { SidebarChevronIcon } from '../../../../../components/SvgIcons/svgIcons';
import { SidebarTabs } from './components/SideBarTabsPanel';
import SignalsBlock from "./components/SignalsBlock/SignalsBlock";
import { StationUnitsInformationBlock } from './components/StationUnitsInformation';
import TasksItem from './Tasks/TasksTab';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

const DrawerSidebar = ({
  sideBarData,
  handleDrawerButton,
  open,
  fileToOpen,
  kpi,
  lastOpenedDrawing
}) => {
  const [choosedTab, setChoosedTab] = useState('tasks');

  const handleOpenItemData = tab => {
    setChoosedTab(tab);
  };

  const handleSwitcher = () => {
    // if (fileToOpen.type === 'document') {
    //   disableSwitcher(true);
    // }
  };
  return (
    <StyledDrawer
      variant="permanent"
      anchor="right"
      open={open}
      onClick={() => !!fileToOpen && handleSwitcher()}
    >
      <SideBarHeader>
        <CustomIconButton
          disableRipple
          onClick={handleDrawerButton}
          icon={<SidebarChevronIcon />}
        />
        <StationTitle
          variant="h4"
          open={open}
        >
          STATION {!!sideBarData && sideBarData.name.toUpperCase()}
        </StationTitle>
      </SideBarHeader>
      <SideBarContent open={open}>
        {[DRAWER_TABS.tasks, DRAWER_TABS.signal].includes(choosedTab)
          ? <StationUnitsInformationBlock
            sideBarData={sideBarData}
            kpi={kpi}
            choosedTab={choosedTab}
          />
          : null}
        {choosedTab === DRAWER_TABS.tasks
          && (
            <TasksItem
              drawingName={lastOpenedDrawing}
              sideBarData={sideBarData}
            />
          )}
        {choosedTab === DRAWER_TABS.signal &&
          <SignalsBlock />
        }
        {choosedTab === DRAWER_TABS.log
          && (
            <LogsBlock
              drawingName={lastOpenedDrawing}
              sideBarData={sideBarData}
            />)}
      </SideBarContent>
      <SidebarTabs
        open={open}
        handleOpenItemData={handleOpenItemData}
        choosedTab={choosedTab}
      />
    </StyledDrawer>
  );
};

const mapStateToProps = createStructuredSelector({
  sideBarData: selectOperatorSidebarData(),
  lastOpenedDrawing: selectLastOpenedDrawing(),
  kpi: selectOperatorKPI(),
});

const withConnect = connect(
  mapStateToProps,
);

export default compose(
  withConnect,
)(DrawerSidebar);
