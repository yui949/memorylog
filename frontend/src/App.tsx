import { BrowserRouter, Routes, Route } from "react-router-dom";
import EventList from "./screens/EventList";
import PeopleList from "./screens/PeopleList";
import PeopleDetail from "./screens/PeopleDetail";
import Footer from "./components/Footer";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<EventList />} />
        <Route path="/events" element={<EventList />} />
        <Route path="/people" element={<PeopleList />} />
        <Route path="/people/:id" element={<PeopleDetail />} />
      </Routes>

      <Footer />
    </BrowserRouter>
  );
}

export default App;