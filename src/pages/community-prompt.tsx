import React, { useEffect, useState, useCallback, useRef, useContext } from "react";
import { useLocation } from "@docusaurus/router";
import { App } from "antd";
import { AuthProvider, AuthContext } from "@site/src/components/AuthContext";
import CommunityPromptPage from "@site/src/components/CommunityPromptPage";
import { getSingleCommPrompt, voteOnUserPrompt } from "@site/src/api";

interface PromptData {
  id: number;
  title: string;
  description: string;
  remark?: string;
  notes?: string;
  owner?: string;
  upvotes?: number;
  downvotes?: number;
  upvoteDifference?: number;
}

function CommunityPromptDetail() {
  const location = useLocation();
  const { message: messageApi } = App.useApp();
  const { userAuth } = useContext(AuthContext);
  const [prompt, setPrompt] = useState<PromptData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  // Extract ID from URL query: /community-prompt?id=123 -> 123
  const promptId = React.useMemo(() => {
    const params = new URLSearchParams(location.search);
    const idParam = params.get("id");
    if (idParam) {
      const id = parseInt(idParam, 10);
      return Number.isInteger(id) && id > 0 ? id : null;
    }
    return null;
  }, [location.search]);

  useEffect(() => {
    if (!promptId) {
      setError(new Error("Invalid prompt ID"));
      setLoading(false);
      return;
    }

    const fetchPrompt = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await getSingleCommPrompt(promptId);
        if (data) {
          setPrompt(data);
        } else {
          setError(new Error("Prompt not found"));
        }
      } catch (err) {
        setError(err instanceof Error ? err : new Error("Failed to fetch prompt"));
      } finally {
        setLoading(false);
      }
    };

    fetchPrompt();
  }, [promptId]);

  // Vote handling with optimistic UI
  const sessionVotedIdsRef = useRef<Set<string>>(new Set());

  const handleVote = useCallback(
    async (id: number, action: "upvote" | "downvote") => {
      if (!userAuth) {
        messageApi.warning("Please log in to vote.");
        return;
      }

      const voteKey = `${id}_${action}`;
      if (sessionVotedIdsRef.current.has(voteKey)) {
        messageApi.info(`You have already ${action}d this prompt in this session.`);
        return;
      }
      sessionVotedIdsRef.current.add(voteKey);

      // Optimistic UI update
      const originalPrompt = prompt;
      if (prompt && prompt.id === id) {
        setPrompt({
          ...prompt,
          upvotes: action === "upvote" ? (prompt.upvotes || 0) + 1 : prompt.upvotes,
          downvotes: action === "downvote" ? (prompt.downvotes || 0) + 1 : prompt.downvotes,
          upvoteDifference: (prompt.upvoteDifference || 0) + (action === "upvote" ? 1 : -1),
        });
      }

      try {
        const response = await voteOnUserPrompt(id, action);
        if (response?.data?.counts && prompt) {
          const { upvotes, downvotes } = response.data.counts;
          setPrompt({
            ...prompt,
            upvotes,
            downvotes,
            upvoteDifference: upvotes - downvotes,
          });
        }
        messageApi.success(`Successfully ${action}d!`);
      } catch (err) {
        // Rollback on error
        sessionVotedIdsRef.current.delete(voteKey);
        if (originalPrompt) {
          setPrompt(originalPrompt);
        }
        const errorMessage = (err as any)?.strapiMessage || `Failed to ${action}. Please try again.`;
        messageApi.error(errorMessage);
      }
    },
    [prompt, messageApi, userAuth]
  );

  return <CommunityPromptPage prompt={prompt} loading={loading} error={error} onVote={handleVote} />;
}

export default function WrappedCommunityPromptDetail() {
  return (
    <AuthProvider>
      <CommunityPromptDetail />
    </AuthProvider>
  );
}
