import React, { useState, useEffect } from "react";
import { db } from "../../config";
import * as shortid from "shortid";
import "./Home.scss";
import copy from "../../svg/copy-svgrepo-com.svg";

function Home() {
  const [{ url, showModal, shortUrl }, setState] = useState({
    url: "",
    showModal: false,
    shortUrl: "",
  });

  let gen = shortid.generate();
  useEffect(() => {
    setState((_) => ({ ..._, shortUrl: gen }));
  }, []);

  const submitUrl = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    const res = await db
      .collection("urls")
      .add({
        url: url,
        shortUrl: shortUrl,
      })
      .then(() => {
        setState((_) => ({ ..._, showModal: true }));
      });
  };

  const disableModal = async () => {
    setState((_) => ({ ..._, showModal: false }));

    try {
      await navigator.clipboard.writeText(host + shortUrl);
      document.execCommand("Copy");
      alert("Link coppied to Clipboard");
    } catch (err) {
      alert("Failed to copy!");
    }
  };
  const host = window.location.href;
  console.log(process.env);

  return (
    <div className="outter_container">
      <div className="form_holder">
        <form id="form__submnt" onSubmit={submitUrl}>
          <input
            type="text"
            name="url"
            id="url_"
            className="url_"
            value={url}
            onChange={(e) => {
              setState((_) => ({ ..._, url: e.target.value }));
            }}
            placeholder="Enter or Paste url here"
          />
          <input type="submit" id="sub_go" className="sub_go" value="GO" />
        </form>
      </div>
      {showModal ? (
        <div className="modal_wrapper">
          <div className="modal_bx">
            <div className="top__">
              <button className="cancel">X</button>
            </div>
            <div className="content">
              <p className="cnt">
                <a href={host + shortUrl}>{host + shortUrl}</a>
              </p>
              <button
                className="copy_btn"
                onClick={() => {
                  disableModal();
                }}
              >
                <img src={copy} alt="" className="copy_icn" />
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div></div>
      )}
    </div>
  );
}

export default Home;
