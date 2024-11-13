import { useEffect, useRef } from "react";

export const usePreviousValue = <T,>(value: T): T | undefined => {
    const prevValue = useRef<T>();
   
    useEffect(() => {
      prevValue.current = value;
      return () => {
        prevValue.current = undefined;
      };
    });
   
    return prevValue.current;
};
