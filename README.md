# React + Firebase and typescript url shortener 
![Alt Text](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/5n0o9go5ggg9wfpkam0q.png)
___

## prerequisites
- create-react-app installed and up to date or simply pull boiler plate using [npx](https://create-react-app.dev/docs/getting-started/).
- [firebase account](https://firebase.google.com/)
- understanding the basics react and Typescript
- basic understanding and use of npm/yarn and firebase.

#### first thing we need to set up our firebase app inside the firebase console
after you must have setup your firebase account click on get started which should redirect you to the firebase console [https://console.firebase.google.com/u/0/](https://console.firebase.google.com/u/0/)

#part 1

#### create new project.
![Alt Text](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/1hbrppx8q8lbpwcl57pe.png)

#### Add project name
![image](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/x7nyucrlhcseycqgcodh.png) 
![Alt Text](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/6xmv1g1ekgly4i1ji0au.png)
select and click create app
![image](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/67rh851nc0hv9fkfhmuz.png)
add firebase to web app, click here
![Alt Text](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/sbtevggrfrxi4vl4e3qt.png)
Register project
![Alt Text](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/dn9vy5ew1hrb3t2fr361.png)
Next, next and continue to console
![Alt Text](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/yktvhn0hms2qim8nj7kj.png)
click on project settings
![Alt Text](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/irfvyx59sp1v06b2nna3.png)
copy the fifrebase config object and paste in
####[project-root]/src/config/index.ts
better still create a *.env* file and store your keys in it.
![Alt Text](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/7xag9mqf1omilr88gsvp.png)

#part 2
We need to add firebase to our react app.

start by making a new react app from the terminal.

```
create-react-app url-shortner
```
or using [npx](https://create-react-app.dev/docs/getting-started/).
```
npx create-react-app url-shortner
cd my-app
npm start
```
once installed, cd into the app url-shortner

```
cd url-shortner
```
make a new folder called **config** inside the src folder then an **index.ts** file.
you can make the file at the same time too!
```
mkdir src/config && touch src/config/index.ts
```
###Add dependencies (yarn) have yarn installed or use npm
```
yarn add  shortid firebase react-router-dom
```
since we use typescript we should also include
```
yarn add -D @types/react-router-dom @types/shortid 
```
since i use scss i also included node-sass
```
yarn add -D node-sass
```

in **src/config/index.ts**
```typescript

import firebase from "firebase";
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const apikey = process.env.REACT_APP_API_KEY;
const authDomain = process.env.REACT_APP_AUTH_DOMAIN;
const projectId = process.env.REACT_APP_PROJECT_ID;
const storageBucket = process.env.REACT_APP_STORAGE_BUCKET;
const messagingSenderId = process.env.REACT_APP_MESSAGING_SENDER_ID;
const appId = process.env.REACT_APP_APP_ID;
const measurementId = process.env.REACT_APP_MEASUREMENT_ID;

const firebaseConfig = {
  apiKey: apikey,
  authDomain: authDomain,
  projectId: projectId,
  storageBucket: storageBucket,
  messagingSenderId: messagingSenderId,
  appId: appId,
  measurementId: measurementId,
};

const app = firebase.initializeApp(firebaseConfig);
export const db = app.firestore();

```
create **component** folder in **project/root/src**
create **Home** folder in **project/root/src/component**
create **link** folder in **project/root/src/component**

create **index.tsx** file component in  folder 
**project/root/src/component/Home**

create **index.tsx** file component in  folder **project/root/src/component/link**

in **project/root/src/component/Home/index.tsx**
```typescript
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

```
in **project/root/src/component/link/index.tsx**
```typescript
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

```
in **src/App.tsx** we also used react-router-dom

```typescript
import React from "react";
import "./App.scss";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Home from "./components/home";
import Link from "./components/link/";

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/:shorturl" component={Link} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;

```

[link to repo](https://github.com/chuddyjoachim/url.sh)
[link to live project on vercel](https://url-sh-pi.vercel.app/)







