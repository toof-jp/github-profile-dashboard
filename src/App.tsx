import { useState } from 'react'

export default function App() {
  const [query, setQuery] = useState("toof-jp");
  const [userId, setUserId] = useState("toof-jp");

  function submit() {
    if (query.trim() !== "") {
      setUserId(query.trim());
    }
  }

  return (
    <>
      <form action={submit}>
        <input
          name="user_id"
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button type="submit">Submit</button>
      </form>
      <Dashboard user_id={userId} />
    </>
  );
}


function Dashboard({ user_id }: { user_id: string }) {
  const urls = [
    "https://github.com/{user_id}?tab=repositories&type=source",
    "https://github.com/{user_id}?tab=following",
    "https://github.com/{user_id}?tab=stars",
    "https://github.com/{user_id}?tab=repositories&type=fork",
    "https://github.com/pulls?q=author%3A{user_id}+-user%3A{user_id}+is%3Apublic",
  ];

  return (
    <div>
      <ul>
        {urls.map((url, idx) => {
          const replacedUrl = url.replace(/\{user_id\}/g, user_id);
          return (
            <li key={idx}>
              <a href={replacedUrl} target="_blank" rel="noopener noreferrer">
                {replacedUrl}
              </a>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
