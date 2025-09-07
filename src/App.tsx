import { useState } from 'react'

export default function App() {
  const [query, setQuery] = useState("toof-jp");
  const [userId, setUserId] = useState("toof-jp");

  function submitHundler() {
    if (query.trim() !== "") {
      setUserId(query.trim());
    }
  }

  return (
    <>
      <form action={submitHundler}>
        <input
          name="user_id"
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button type="submit">Search</button>
      </form>
      <Dashboard user_id={userId} />
    </>
  );
}


function Dashboard({ user_id }: { user_id: string }) {
  const github_urls = [
    "https://github.com/{user_id}",
    "https://github.com/{user_id}?tab=repositories&type=source",
    "https://github.com/{user_id}?tab=following",
    "https://github.com/{user_id}?tab=stars",
    "https://github.com/{user_id}?tab=repositories&type=fork",
    "https://github.com/pulls?q=author%3A{user_id}+-user%3A{user_id}+is%3Apublic",
  ];
  
  const stats_urls = [
    "https://github-readme-stats.vercel.app/api?username={user_id}&show=reviews,discussions_started,discussions_answered,prs_merged,prs_merged_percentage",
    "https://github-readme-stats.vercel.app/api/top-langs/?username={user_id}&layout=donut-vertical",
  ]

  return (
    <div>
      <ul>
        {github_urls.map((url, idx) => {
          const replacedUrl = url.replace(/\{user_id\}/g, user_id);
          return (
            <li key={idx}>
              <a href={replacedUrl} target="_blank" rel="noopener noreferrer">
                {replacedUrl}
              </a>
            </li>
          );
        })}
        {stats_urls.map((url, idx) => {
          const replacedUrl = url.replace(/\{user_id\}/g, user_id);
          return (
            <li key={idx + github_urls.length}>
              <a href="https://github.com/anuraghazra/github-readme-stats" target="_blank" rel="noopener noreferrer">
                <img src={replacedUrl} />
              </a>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
