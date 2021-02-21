import React from "react";
import { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import { db } from "../../config";

function Link() {
  interface ParamTypes {
    shorturl: string;
  }
  const { shorturl } = useParams<ParamTypes>();
  const history = useHistory();

  useEffect(() => {
    let dbQuery = db
      .collection("urls")
      .where("shortUrl", "==", shorturl)
      .onSnapshot((data) => {
        if (data.empty) {
          console.log("no data");
          return history.push("/");
        }
        let resData = data.docs[0].data();
        window.location.replace(resData.url);
      });
  }, []);

  return (
    <div>
      <h2>Redirecting...</h2>
    </div>
  );
}

export default Link;
