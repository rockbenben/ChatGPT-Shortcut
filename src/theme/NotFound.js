import React, { useEffect } from "react";
import Translate, { translate } from "@docusaurus/Translate";
import { PageMetadata } from "@docusaurus/theme-common";
import Layout from "@theme/Layout";

export default function NotFound() {
  useEffect(() => {
    const timer = setTimeout(() => {
      window.location.href = "/";
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <PageMetadata
        title={translate({
          id: "theme.NotFound.title",
          message: "Page Not Found",
        })}
      />
      <Layout>
        <main className="container margin-vert--l">
          <div className="row">
            <div className="col col--6 col--offset-3">
              <h1 align="center">
                  404 - Page Not Found
              </h1>
              <p align="center">
                  Whoops! We can't find what you're looking for.
              </p>
              <p align="center">
                <button className="homepage">
                  <a href="/">Back to home</a>
                </button>
                <button className="homepage">
                  <a href="https://github.com/rockbenben/ChatGPT-Shortcut/issues/new?assignees=rockbenben&labels=bug&template=bug-report.yml&title=%5BBug%5D">
                    Report this bug
                  </a>
                </button>
              </p>
              <p align="center">
                <img
                  className="svg"
                  src="/img/404.svg"
                  alt="404 image"
                  width="250"
                />
              </p>
            </div>
          </div>
        </main>
      </Layout>
    </>
  );
}
