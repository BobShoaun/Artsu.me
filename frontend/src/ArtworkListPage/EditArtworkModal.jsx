import { useRef, useState, useEffect, useCallback } from "react";
import { apiUrl } from "../config";
import { useAuthentication } from "../hooks/useAuthentication";
import axios from "axios";

const EditArtworkModal = ({ onClose, artwork }) => {
  const { accessToken } = useAuthentication();

  const titleInput = useRef(null);
  const summaryInput = useRef(null);
  const descriptionInput = useRef(null);

  const [titleError, setTitleError] = useState("");
  const [summaryError, setSummaryError] = useState("");
  const [tags, setTags] = useState([]);

  const getTags = useCallback(async () => {
    try {
      const { data: tags } = await axios.get(`${apiUrl}/tags`);

      setTags(
        tags.map(tag => {
          if (artwork.tagIds.includes(tag._id)) tag.selected = true;
          return tag;
        })
      );
    } catch (e) {
      console.log(e);
    }
  }, [artwork]);

  useEffect(() => getTags(), [getTags]);

  const edit = async e => {
    e.preventDefault();

    setTitleError("");
    setSummaryError("");

    const title = titleInput.current.value;
    const summary = summaryInput.current.value;
    const description = descriptionInput.current.value;
    const tagIds = tags.filter(tag => tag.selected).map(tag => tag._id);

    if (!title) return setTitleError("cannot be empty");
    if (!summary) return setTitleError("cannot be empty");

    try {
      const response = await axios.patch(
        `${apiUrl}/artworks/${artwork._id}`,
        [
          { op: "replace", path: "/name", value: title },
          { op: "replace", path: "/summary", value: summary },
          { op: "replace", path: "/description", value: description },
          { op: "replace", path: "/tagIds", value: tagIds },
        ],
        {
          headers: { Authorization: `Bearer ${accessToken}` },
        }
      );

      console.log("EDITED", response);
      onClose();
      // TODO show loading success prompt
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <main
      onClick={onClose}
      className="cursor-pointer fixed inset-0 z-30 overflow-auto bg-gray-900 bg-opacity-50 backdrop-filter backdrop-blur-sm flex"
    >
      <form
        onClick={e => e.stopPropagation()}
        onSubmit={edit}
        className="bg-gray-700 p-8 m-auto max-w-4xl flex gap-8 shadow-lg rounded-md cursor-auto"
      >
        <div className="" style={{ flexBasis: "45%" }}>
          <img className="mb-5" src={artwork.imageUrl} alt={artwork.name} />

          <label className="dark:text-gray-200 text-sm text-right mb-2">Tags:</label>

          <div>
            {tags?.map((tag, index) => (
              <button
                key={tag._id}
                onClick={e => {
                  e.preventDefault();
                  const tagsCpy = [...tags];
                  tagsCpy[index].selected = !tagsCpy[index].selected;
                  setTags(tagsCpy);
                }}
                className={`${
                  tag.selected ? "bg-teal-500 hover:bg-teal-600" : "bg-gray-400 hover:bg-gray-500"
                } text-gray-900 font-semibold text-xs m-1 px-2 py-1 rounded-md`}
              >
                {tag.label}
              </button>
            ))}
          </div>
        </div>

        <div className="" style={{ flexBasis: "55%" }}>
          <label className="dark:text-gray-200 text-sm text-right mb-2">Title:</label>
          {titleError && <em className="text-rose-400 text-sm float-right">*{titleError}</em>}
          <input
            ref={titleInput}
            defaultValue={artwork.name}
            className="px-2 py-1 mb-8 w-full"
            type="text"
          />

          <label className="dark:text-gray-200 text-sm text-right mb-2">Summary:</label>
          {summaryError && <em className="text-rose-400 text-sm float-right">*{summaryError}</em>}
          <input
            ref={summaryInput}
            defaultValue={artwork.summary}
            className="px-2 py-1 mb-8 w-full"
            type="text"
          />

          <label className="dark:text-gray-200 text-sm text-right mb-2">Description:</label>
          <textarea
            className="px-2 py-1 mb-8 w-full"
            defaultValue={artwork.description}
            ref={descriptionInput}
            rows="5"
          ></textarea>

          <button
            type="submit"
            className="text-white tracking-wider py-2.5 text-sm rounded-sm shadow-lg font-semibold bg-gradient-to-r from-rose-400 to-teal-500 hover:to-teal-400 hover:from-rose-400 block w-full"
          >
            EDIT
          </button>
        </div>
      </form>
    </main>
  );
};

export default EditArtworkModal;
