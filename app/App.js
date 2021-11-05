import React, { Suspense, lazy } from 'React';
import Html from './Html';
import SidebarLoader from './SidebarLoader.js';

const Header = lazy(() => import('./Header'));
const Sidebar = lazy(() => import('./Sidebar'));
const Content = lazy(() => import('./Content'));

const App = ({ assets, store }) => {
  return (
    <Html assets={assets} store={store}>
      <div className="wrapper">
        <div className="header-container">
          <Suspense fallback={<div>Loading header</div>}>
            <Header store={store} />
          </Suspense>
        </div>
        <div className="sidebar-container">
          <Suspense fallback={<SidebarLoader />}>
            <Sidebar store={store} />
          </Suspense>
        </div>
        <div className="content-container">
          <Suspense fallback={<div>Loading content</div>}>
            <Content store={store} />
          </Suspense>
        </div>
      </div>
    </Html>
  )
}

export default App;