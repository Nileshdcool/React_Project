import React from 'react';
import {
  MainLayoutContent,
  MainLayoutWrapper,
} from './styledComponents';
import MainHeaderPanel from "./components/MainHeaderPanel";

export const MainLayout = (
  {
    children,
    url,
    ...props
  },
) => (
  <MainLayoutWrapper>
    {!(url.indexOf('operator-login') + 1) && <MainHeaderPanel
      url={url}
      {...props}
    />}
    <MainLayoutContent isOperator={url.indexOf('operator') + 1}>
      {children}
    </MainLayoutContent>
  </MainLayoutWrapper>
);
