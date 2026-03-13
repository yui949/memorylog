import { BrowserRouter, Routes, Route } from "react-router-dom";
import EventList from "./screens/EventList";
import PeopleList from "./screens/PeopleList";
import PeopleDetail from "./screens/PeopleDetail";
import EventNew from "./screens/EventNew";
import Footer from "./components/Footer";
import EventDetail from "./screens/EventDetail";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<EventList />} />
        <Route path="/events" element={<EventList />} />
        <Route path="/people" element={<PeopleList />} />
        <Route path="/people/:id" element={<PeopleDetail />} />
        <Route path="/events/:id" element={<EventDetail />} />
        <Route path="/EventNew" element={<EventNew />} />
      </Routes>

      <Footer />
    </BrowserRouter>
  );
}

export default App;