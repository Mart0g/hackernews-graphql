import React, { useState, useCallback } from "react";
import { useMutation } from "urql";
import { POST_MUTATION } from "../utils/queries";

const CreateLink = () => {
  const [description, setDescription] = useState("");
  const [url, setUrl] = useState("");

  const [{ fetching }, executeMutation] = useMutation(POST_MUTATION);

  const onClick = useCallback(() => {
    executeMutation({ url, description });
  }, [executeMutation, url, description]);

  return (
    <div>
      <div className="flex flex-column mt3">
        <input
          className="mb2"
          value={description}
          onChange={({ target }) => setDescription(target.value)}
          type="text"
          placeholder="The description for the link"
        />
        <input
          className="mb2"
          value={url}
          onChange={({ target }) => setUrl(target.value)}
          type="text"
          placeholder="The URL for the link"
        />
      </div>
      <button disabled={fetching} onClick={onClick}>
        Submit
      </button>
    </div>
  );
};

export default CreateLink;
