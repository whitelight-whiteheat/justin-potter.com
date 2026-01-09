import { useState, useEffect } from 'react';
import { ProjectData } from '../types';

/**
 * Shared hook for managing project hover state and animation key
 */
export const useProjectHover = (hoveredProject: ProjectData | null) => {
  const [animationKey, setAnimationKey] = useState(0);

  useEffect(() => {
    // Trigger animation when hoveredProject changes to a non-null value
    if (hoveredProject) {
      setAnimationKey((prev) => prev + 1);
    }
  }, [hoveredProject]);

  return animationKey;
};

/**
 * Shared hook for managing current time display
 */
export const useDisplayTime = (hoveredProject: ProjectData | null) => {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    // Only update time if not hovering over a project
    if (!hoveredProject) {
      const timer = setInterval(() => {
        setCurrentTime(new Date());
      }, 1000);

      return () => clearInterval(timer);
    }
  }, [hoveredProject]);

  return currentTime;
};
