import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { EventProvider } from './contexts/EventContext';
import Layout from './components/Layout';
import Home from './pages/Home';
import EventDetail from './pages/EventDetail';
import RSVPSuccess from './pages/RSVPSuccess';
import CreateEvent from './pages/CreateEvent';

function App() {
  return (
    <BrowserRouter>
      <EventProvider>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="event/:id" element={<EventDetail />} />
            <Route path="rsvp-success" element={<RSVPSuccess />} />
            <Route path="create" element={<CreateEvent />} />
          </Route>
        </Routes>
      </EventProvider>
    </BrowserRouter>
  );
}

export default App;
