import { useEffect, useState } from 'react';
import Header from "../components/Header";

export {}; // 追加

type Event = {
  id: number;
  title: string;
  date: string;
  memo: string | null;
};

export default function EventList() {
  const [events, setEvents] = useState<Event[]>([]);

 useEffect(() => {
  fetch("http://localhost:3000/events")
    .then(res => res.json())
    .then(data => {
      console.log("events data:", data);
      setEvents(data);
    });
}, []);

  return (
    <div style={{ padding: '20px', fontFamily: 'sans-serif' }}>
      <Header />
      <h1>イベント一覧</h1>
      {events.length === 0 ? (
        <p>イベントがまだありません</p>
      ) : (
        <ul>
          {events.map(event => (
            <li key={event.id}>
              <strong>{event.title}</strong> — {event.date}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}