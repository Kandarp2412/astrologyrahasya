import { Outlet } from 'react-router-dom';
import { useMediaQuery } from '@material-ui/core';
import { styled, useTheme } from '@material-ui/core/styles';
import { Footer } from '../components/footer';
import { DashboardNavbar } from '../components/dashboard-navbar';
import { DashboardSidebar } from '../components/dashboard-sidebar';
import { useSettings } from '../contexts/settings-context';

const DashboardLayoutRoot = styled('div')(
  ({ theme }) => ({
    backgroundColor: theme.palette.background.paper,
    display: 'flex',
    height: '100%',
    overflow: 'hidden',
    width: '100%'
  })
);

const DashboardLayoutContentWrapper = styled('div')(
  () => ({
    display: 'flex',
    flex: '1 1 auto',
    overflow: 'hidden',
    paddingTop: '64px'
  })
);

const DashboardLayoutContent = styled('div')({
  display: 'flex',
  flex: '1 1 auto',
  flexDirection: 'column',
  overflow: 'auto'
});

export const DashboardLayout = () => {
  const theme = useTheme();
  const mdDown = useMediaQuery(theme.breakpoints.down('md'));
  const { settings, saveSettings } = useSettings();

  const handlePinSidebar = () => {
    saveSettings({
      ...settings,
      pinSidebar: !settings.pinSidebar
    });
  };

  return (
    <DashboardLayoutRoot>
      <DashboardNavbar />
      {!mdDown && (
        <DashboardSidebar
          onPin={handlePinSidebar}
          pinned={settings.pinSidebar}
        />
      )}
      <DashboardLayoutContentWrapper
        sx={{
          pl: {
            md: settings.pinSidebar ? '295px' : '73px'
          }
        }}
      >
        <DashboardLayoutContent>
          <Outlet />
          <Footer />
        </DashboardLayoutContent>
      </DashboardLayoutContentWrapper>
    </DashboardLayoutRoot>
  );
};
