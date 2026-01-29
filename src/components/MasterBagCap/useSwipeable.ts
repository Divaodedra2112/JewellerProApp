import { useRef, useCallback } from 'react';
import { Swipeable } from 'react-native-gesture-handler';

interface UseSwipeableProps {
  currentOpenSwipeable: React.MutableRefObject<Swipeable | null>;
  setOpenSwipeable: (ref: Swipeable | null) => void;
}

export const useSwipeable = ({ currentOpenSwipeable, setOpenSwipeable }: UseSwipeableProps) => {
  const swipeableRef = useRef<Swipeable>(null);

  const handleSwipeableOpen = useCallback(() => {
    if (currentOpenSwipeable.current && currentOpenSwipeable.current !== swipeableRef.current) {
      currentOpenSwipeable.current.close();
    }
    setOpenSwipeable(swipeableRef.current);
  }, [currentOpenSwipeable, setOpenSwipeable]);

  const closeSwipeable = useCallback(() => {
    if (swipeableRef.current) {
      swipeableRef.current.close();
    }
  }, []);

  return {
    swipeableRef,
    handleSwipeableOpen,
    closeSwipeable,
  };
};
