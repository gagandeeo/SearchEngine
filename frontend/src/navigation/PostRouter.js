import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import HomeScreen from "../components/HomeScreen";
import SinglePost from "../components/SinglePost";
function PostRouter() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={HomeScreen} />
        <Route exact path="/upload/:uploadId" component={SinglePost} />
      </Switch>
    </BrowserRouter>
  );
}

export default PostRouter;
