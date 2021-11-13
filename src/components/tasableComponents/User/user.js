import React, { useState, useEffect } from "react";

const apiName = "https://api.github.com";

export default function User({ name }) {
  const [user, setUser] = useState(null);

  async function fetchUserData(name) {
    const response = await fetch(`${apiName}/users/${name}`);
    setUser(await response.json());
  }

  useEffect(() => {
    fetchUserData(name);
  }, [name]);

  if (!user) {
    return <div>loading...</div>;
  }

  return (
    <details>
      <summary>{user.name}</summary>
      <strong>{user.followers}</strong> followers
      <br></br>
      lives in {user.location}
    </details>
  );
}
