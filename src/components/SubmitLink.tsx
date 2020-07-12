import React, { useState, useCallback } from "react";
import { RouteComponentProps } from "react-router-dom";
import { useMutation } from "urql";
import { POST_MUTATION } from "../graphql/mutations";
import { SUBMIT, NEW } from "../utils/constants";

const SubmitLink = ({ history }: RouteComponentProps) => {
  const [description, setDescription] = useState("");
  const [url, setUrl] = useState("");

  const [{ fetching }, executeMutation] = useMutation(POST_MUTATION);

  const onClick = useCallback(() => {
    executeMutation({ url, description }).then(() => {
      history.push("/");
    });
  }, [executeMutation, url, description, history]);

  return (
    <div>
      <h4 className="mv3">{NEW}</h4>
      <div className="flex flex-column">
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
      <div className="flex mt3">
        <button
          type="button"
          className="pointer mr2 button"
          disabled={fetching}
          onClick={onClick}
        >
          {SUBMIT.toLowerCase()}
        </button>
      </div>
    </div>
  );
};

export default SubmitLink;
