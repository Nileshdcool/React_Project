import React from 'react';
import { OPERATOR_SIDEBAR_TABS } from '../../../../../../constants';
import { SideBarItem, SidebarTabsPanel } from '../styledComponents';

export const SidebarTabs = React.memo(({ open, handleOpenItemData, choosedTab }) => (
  <SidebarTabsPanel open={open}>
    {
      OPERATOR_SIDEBAR_TABS.map(item => (
        <SideBarItem
          key={item.id}
          icon={item.icon}
          name={item.name}
          isActive={choosedTab === item.id}
          onClick={() => handleOpenItemData(item.id)}
          id={item.id}
          className={item.id}
        />
      ))
    }
  </SidebarTabsPanel>
));
