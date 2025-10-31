import React, { createContext, useContext, useRef, ReactNode } from "react";

interface CarControls {
  forward: boolean;
  back: boolean;
  left: boolean;
  right: boolean;
}

const CarControlsContext = createContext<React.MutableRefObject<CarControls> | null>(null);

export function CarControlsProvider({ children }: { children: ReactNode }) {
  const controls = useRef<CarControls>({
    forward: false,
    back: false,
    left: false,
    right: false,
  });

  return (
    <CarControlsContext.Provider value={controls}>
      {children}
    </CarControlsContext.Provider>
  );
}

export function useCarControls() {
  const controls = useContext(CarControlsContext);
  if (!controls) {
    throw new Error("useCarControls must be used within CarControlsProvider");
  }
  return controls;
}

