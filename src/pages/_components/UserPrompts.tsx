import React, { useContext, useState, useEffect } from 'react';
import clsx from "clsx";
import Translate from "@docusaurus/Translate";
import copy from "copy-text-to-clipboard";
import styles from "./ShowcaseCard/styles.module.css";
import Link from "@docusaurus/Link";
import { Spin } from 'antd';
import Heading from "@theme/Heading";
import { AuthContext } from './AuthContext';

export default function UserPromptsPage() {
  const userAuth = useContext(AuthContext);
  const [userprompts, setUserPrompts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [copiedIndex, setCopiedIndex] = useState(null);
  //console.log('userAuth:', userAuth);

  useEffect(() => {
    if (userAuth && userAuth.userAuth.data.userprompts) {
      setUserPrompts(userAuth.userAuth.data.userprompts);
    }
  }, [userAuth]);

  const handleCopyClick = (index) => {
    const UserPrompt = userprompts[index];
    if (UserPrompt) {
      copy(UserPrompt.description);
      setCopiedIndex(index);
      setTimeout(() => {
        setCopiedIndex(null);
      }, 2000);
    }
  };

  if (loading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', padding: '50px' }}>
        <Spin size="large" />
      </div>
    );
  }

  return (
    <ul className="clean-list showcaseList_Cwj2">
      {userprompts.length === 0 ? (
        <li className="card shadow--md">
          <div className={clsx("card__body", styles.cardBodyHeight)}>
            <p>No user prompts submitted yet.</p>
            <p>Please submit your prompts.</p>
          </div>
        </li>
      ) : (
        userprompts.map((UserPrompt, index) => (
          <li key={UserPrompt.id} className="card shadow--md">
            <div className={clsx("card__body", styles.cardBodyHeight)}>
              <div className={clsx(styles.showcaseCardHeader)}>
                <Heading as="h4" className={styles.showcaseCardTitle}>
                  <Link className={styles.showcaseCardLink}>
                    {UserPrompt.title}{" "}
                  </Link>
                </Heading>
                <button
                  className={clsx(
                    "button button--secondary button--sm",
                    styles.showcaseCardSrcBtn
                  )}
                  type="button"
                  onClick={() => handleCopyClick(index)}
                >
                  {copiedIndex === index ? (
                    <Translate>已复制</Translate>
                  ) : (
                    <Translate>复制</Translate>
                  )}
                </button>
              </div>
              <p className={styles.showcaseCardBody}>
                👉 {UserPrompt.remark}
              </p>
              <p className={styles.showcaseCardBody} >
                {UserPrompt.description}
              </p>
            </div>
          </li>
        ))
      )}
    </ul>
  );
}
