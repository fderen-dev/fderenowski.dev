import {
  createContext,
  ElementType,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

import { methodNotImplementedError } from "utils/errors";
import { WithChildren } from "utils/types";

import styles from "./typewriter.module.scss";

interface TypewriterApi {
  play: () => void;
}

const TypewriterApiContext = createContext<TypewriterApi>({
  play: () => {
    throw methodNotImplementedError;
  },
});

interface TypewriteState {
  isPlaying: boolean;
}

const TypewriterStateContext = createContext<TypewriteState>({
  isPlaying: false,
});

interface TypewriterProviderProps extends WithChildren {}

export const TypewriterProvider = ({ children }: TypewriterProviderProps) => {
  const [isPlaying, setIsPlaying] = useState(false);

  const play = useCallback(() => {
    setIsPlaying(true);
  }, []);

  const api: TypewriterApi = useMemo(
    () => ({
      play,
    }),
    [play]
  );

  const state = useMemo(
    () => ({
      isPlaying,
    }),
    [isPlaying]
  );

  return (
    <TypewriterApiContext.Provider value={api}>
      <TypewriterStateContext.Provider value={state}>
        {children}
      </TypewriterStateContext.Provider>
    </TypewriterApiContext.Provider>
  );
};

export const useTypewriterApi = () => useContext(TypewriterApiContext);
const useTypewriterState = () => useContext(TypewriterStateContext);

interface TypewriterProps {
  text: string;
  characterTypingDurationMs: number;
  as: ElementType;
}

export const Typewriter = ({
  text,
  characterTypingDurationMs,
  as,
}: TypewriterProps) => {
  const Tag = as;
  const [characters, setCharacters] = useState<Array<string>>([]);
  const { isPlaying } = useTypewriterState();

  useEffect(() => {
    let canRun = true;
    let intervalHandler: NodeJS.Timeout | undefined;
    const clear = () => {
      clearInterval(intervalHandler);
      intervalHandler = undefined;
    };

    if (canRun && isPlaying) {
      let iterator = 0;
      const textLength = text.length;

      intervalHandler = setInterval(() => {
        setCharacters((prev) => [...prev, text[iterator]]);
        iterator = iterator + 1;

        if (iterator === textLength) {
          clear();
          canRun = true;
        }
      }, characterTypingDurationMs);
    }

    return () => {
      clear();
      setCharacters([]);
      canRun = false;
    };
  }, [isPlaying, characterTypingDurationMs, text]);

  return (
    <Tag className={styles.container}>
      {characters.map((character, index) => (
        <span key={`${character}_${index}`}>{character}</span>
      ))}
    </Tag>
  );
};
