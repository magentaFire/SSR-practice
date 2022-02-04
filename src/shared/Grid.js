import * as React from "react";
import { useParams } from "react-router-dom";

export default function Grid({ fetchInitialData, data }) {
  const [repos, setRepos] = React.useState(() => {
    return __isBrowser__ ? window.__initialData__ : data;
  });
  const [loading, setLoading] = React.useState(repos ? false : true);
  const { id } = useParams();

  React.useEffect(() => {
    setLoading(true);
    fetchInitialData(id).then((repos) => {
      setRepos(repos);
      setLoading(false);
    });
  }, [id]);

  if (!!loading) return <i className="loading">🤹‍♂️</i>;

  return (
    <ul className="grid">
      {data.map(({ name, owner, stargazers_count, html_url }, i) => (
        <li key={name}>
          <h2>#{i + 1}</h2>
          <h3>
            <a href={html_url}>{name}</a>
          </h3>
          <p>
            by
            <a href={`https://github.com/${owner.login}`}>@{owner.login}</a>
          </p>
          <p>{stargazers_count.toLocaleString()} stars</p>
        </li>
      ))}
    </ul>
  );
}
