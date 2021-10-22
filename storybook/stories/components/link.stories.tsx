import React from "react";
import README from "@availity/link/README.md";
import { Preview } from "../util";

const Link = React.lazy(() => import("@availity/link"));

export default {
  title: "Components/Link",
  parameters: {
    readme: {
      // Show readme at the addons panel
      sidebar: README,
      StoryPreview: Preview
    }
  }
};
export const WithAbsoluteUrl = () => (
  <div className="py-3">
    <Link href="https://github.com/Availity" target="_blank">
      Availity Github
    </Link>
  </div>
);
WithAbsoluteUrl.story = {
  name: "with absolute url"
};
export const WithRelativeUrl = () => (
  <div className="py-3">
    <Link href="/public/apps/my-app" target="_blank">
      My Application
    </Link>
  </div>
);
WithRelativeUrl.story = {
  name: "with relative url"
};
