import { useCallback, useEffect, useState } from "react";
import type { LessonFiles } from "../types";

const STORAGE_KEY = "bb-progress-v2";

interface ProgressState {
  completed: Record<string, true>;
  drafts: Record<string, LessonFiles>;
}

const empty: ProgressState = { completed: {}, drafts: {} };

function read(): ProgressState {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return empty;
    const parsed = JSON.parse(raw) as Partial<ProgressState>;
    return {
      completed: parsed.completed ?? {},
      drafts: parsed.drafts ?? {}
    };
  } catch {
    return empty;
  }
}

function write(state: ProgressState) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch {
    // ignore quota errors
  }
}

function key(trackId: string, lessonId: string) {
  return `${trackId}/${lessonId}`;
}

export function useProgress() {
  const [state, setState] = useState<ProgressState>(read);

  useEffect(() => {
    write(state);
  }, [state]);

  const isCompleted = useCallback(
    (trackId: string, lessonId: string) =>
      Boolean(state.completed[key(trackId, lessonId)]),
    [state]
  );

  const markCompleted = useCallback((trackId: string, lessonId: string) => {
    setState((prev) => ({
      ...prev,
      completed: { ...prev.completed, [key(trackId, lessonId)]: true }
    }));
  }, []);

  const getDraft = useCallback(
    (trackId: string, lessonId: string): LessonFiles | undefined =>
      state.drafts[key(trackId, lessonId)],
    [state]
  );

  const saveDraft = useCallback(
    (trackId: string, lessonId: string, files: LessonFiles) => {
      setState((prev) => ({
        ...prev,
        drafts: { ...prev.drafts, [key(trackId, lessonId)]: files }
      }));
    },
    []
  );

  const resetDraft = useCallback((trackId: string, lessonId: string) => {
    setState((prev) => {
      const next = { ...prev.drafts };
      delete next[key(trackId, lessonId)];
      return { ...prev, drafts: next };
    });
  }, []);

  return { isCompleted, markCompleted, getDraft, saveDraft, resetDraft };
}
