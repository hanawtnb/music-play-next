import React, { useState } from "react";
import { useRouter } from "next/router";

const Form = () => {
  const router = useRouter();
  const [search, setSearch] = useState("");
  const onSubmitForm = (event) => {
    event.preventDefault();
    router.push({ pathname: "/", query: { search } }, undefined, {
      shallow: true,
    });
  };
  return (
    <form action="submit" onSubmit={onSubmitForm}>
      <input
        type="text"
        onChange={(event) => setSearch(event.target.value)}
        value={search}
      />
      <button type="submit">submit</button>
    </form>
  );
};

export default Form;
