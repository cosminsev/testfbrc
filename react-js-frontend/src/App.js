import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Theme } from './components'
import routes from './routes'
import Dashboard from './pages/Dashboard/Dasboard';

const App = () => {
  return (
    <Theme>
      <Router>
        <Routes>
          <Route exact path={routes.dashboard.path} element={<Dashboard />} />
        </Routes>
      </Router>
    </Theme>
  );
};

export default App;