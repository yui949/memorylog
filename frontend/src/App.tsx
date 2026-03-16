import { BrowserRouter, Routes, Route } from "react-router-dom";
import EventList from "./screens/EventList";
import PeopleList from "./screens/PeopleList";
import PeopleDetail from "./screens/PeopleDetail";
import EventNew from "./screens/EventNew";
import EventEdit from "./screens/EventEdit";
import EventMemo from "./screens/EventMemo";
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
        <Route path="/events/:id/edit" element={<EventEdit />} />
        <Route path="/events/:id/memo" element={<EventMemo />} />
      </Routes>

      <Footer />
    </BrowserRouter>
  );
}

export default App;