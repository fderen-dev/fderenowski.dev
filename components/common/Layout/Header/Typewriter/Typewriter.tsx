import {
  createContext,
  Dispatch,
  ElementType,
  MutableRefObject,
  SetStateAction,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

import { methodNotImplementedError } from "utils/errors";
import { WithChildren } from "utils/types";

import styles from "./typewriter.module.scss";

interface TypewriterApi {
  setCharacters: Dispatch<SetStateAction<string>>;
  setCharacterIndex: (index: number) => void;
}

const TypewriterApiContext = createContext<TypewriterApi>({
  setCharacters: () => {
    throw methodNotImplementedError;
  },
  setCharacterIndex: (index: number) => {
    throw methodNotImplementedError;
  },
});

interface TypewriteState {
  characters: string;
  characterIndex: MutableRefObject<number> | null;
}

const TypewriterStateContext = createContext<TypewriteState>({
  characters: "",
  characterIndex: null,
});

interface TypewriterProviderProps extends WithChildren {}

export const TypewriterProvider = ({ children }: TypewriterProviderProps) => {
  const [characters, setCharacters] = useState<string>("");
  const characterIndex = useRef<number>(0);

  const setCharacterIndex = useCallback((index: number) => {
    characterIndex.current = index;
  }, []);

  const api: TypewriterApi = useMemo(
    () => ({
      setCharacters,
      setCharacterIndex,
    }),
    [setCharacterIndex]
  );

  const state = useMemo(
    () => ({
      characters,
      characterIndex,
    }),
    [characters]
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
  text: propText,
  characterTypingDurationMs,
  as,
}: TypewriterProps) => {
  const Tag = as;
  const { characters, characterIndex } = useTypewriterState();
  const { setCharacters } = useTypewriterApi();
  const text = `${propText}         `;
  const canRun = text.length !== characters.length;

  useEffect(() => {
    let intervalHandler: NodeJS.Timeout | undefined;
    const clear = () => {
      clearInterval(intervalHandler);
      intervalHandler = undefined;
    };

    if (canRun && characterIndex) {
      intervalHandler = setInterval(() => {
        setCharacters((prev) => {
          const next = `${prev}${text[characterIndex.current]}`;
          characterIndex.current++;

          return next;
        });
      }, characterTypingDurationMs);
    } else {
      clear();
    }

    return () => {
      clear();
    };
  }, [canRun, setCharacters, characterIndex, characterTypingDurationMs, text]);

  return (
    <Tag className={styles.container}>
      <span className={styles.text}>{characters}</span>
      <span className={styles.cursor}></span>
    </Tag>
  );
};
