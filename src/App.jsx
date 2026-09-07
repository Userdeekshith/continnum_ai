import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AppProvider } from './context/AppContext';
import AppShell from './components/AppShell';
import Overview from './pages/Overview';
import Architecture from './pages/Architecture';
import ComponentsPage from './pages/Components';
import DataFlowPage from './pages/DataFlow';
import Team from './pages/Team';
import RoadmapPage from './pages/Roadmap';
import Demo from './pages/Demo';

export default function App() {
  return (
    <AppProvider>
      <BrowserRouter>
        <Routes>
          <Route element={<AppShell />}>
            <Route index element={<Overview />} />
            <Route path="architecture" element={<Architecture />} />
            <Route path="components" element={<ComponentsPage />} />
            <Route path="data-flow" element={<DataFlowPage />} />
            <Route path="team" element={<Team />} />
            <Route path="roadmap" element={<RoadmapPage />} />
            <Route path="demo" element={<Demo />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </AppProvider>
  );
}
