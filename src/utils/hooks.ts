import { useState, useEffect } from 'react';
import { ProjectData } from '../types';

/**
 * Shared hook for managing project hover state and animation key
 */
export const useProjectHover = (hoveredProject: ProjectData | null) => {
  const [animationKey, setAnimationKey] = useState(0);

  useEffect(() => {
    // #region agent log
    try {
      fetch('http://127.0.0.1:7242/ingest/3355fed9-9be5-4c30-a353-6450cdb51e60',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'hooks.ts:useProjectHover',message:'useProjectHover effect triggered',data:{hoveredProject:hoveredProject?.title||null,hasProject:!!hoveredProject},timestamp:Date.now(),sessionId:'debug-session',runId:'error-debug',hypothesisId:'A'})}).catch(()=>{});
    } catch (e) {}
    // #endregion
    
    // Trigger animation when hoveredProject changes to a non-null value
    if (hoveredProject) {
      // #region agent log
      try {
        fetch('http://127.0.0.1:7242/ingest/3355fed9-9be5-4c30-a353-6450cdb51e60',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'hooks.ts:useProjectHover',message:'Incrementing animationKey',data:{},timestamp:Date.now(),sessionId:'debug-session',runId:'error-debug',hypothesisId:'B'})}).catch(()=>{});
      } catch (e) {}
      // #endregion
      setAnimationKey((prev) => {
        const newKey = prev + 1;
        // #region agent log
        try {
          fetch('http://127.0.0.1:7242/ingest/3355fed9-9be5-4c30-a353-6450cdb51e60',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'hooks.ts:useProjectHover',message:'animationKey updated',data:{oldKey:prev,newKey},timestamp:Date.now(),sessionId:'debug-session',runId:'error-debug',hypothesisId:'B'})}).catch(()=>{});
        } catch (e) {}
        // #endregion
        return newKey;
      });
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
    // #region agent log
    try {
      fetch('http://127.0.0.1:7242/ingest/3355fed9-9be5-4c30-a353-6450cdb51e60',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'hooks.ts:useDisplayTime',message:'useDisplayTime effect triggered',data:{hoveredProject:hoveredProject?.title||null,hasProject:!!hoveredProject},timestamp:Date.now(),sessionId:'debug-session',runId:'error-debug',hypothesisId:'C'})}).catch(()=>{});
    } catch (e) {}
    // #endregion
    
    // Only update time if not hovering over a project
    if (!hoveredProject) {
      // #region agent log
      try {
        fetch('http://127.0.0.1:7242/ingest/3355fed9-9be5-4c30-a353-6450cdb51e60',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'hooks.ts:useDisplayTime',message:'Setting up timer',data:{},timestamp:Date.now(),sessionId:'debug-session',runId:'error-debug',hypothesisId:'C'})}).catch(()=>{});
      } catch (e) {}
      // #endregion
      const timer = setInterval(() => {
        // #region agent log
        try {
          fetch('http://127.0.0.1:7242/ingest/3355fed9-9be5-4c30-a353-6450cdb51e60',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'hooks.ts:useDisplayTime',message:'Timer tick',data:{},timestamp:Date.now(),sessionId:'debug-session',runId:'error-debug',hypothesisId:'C'})}).catch(()=>{});
        } catch (e) {}
        // #endregion
        setCurrentTime(new Date());
      }, 1000);

      return () => {
        // #region agent log
        try {
          fetch('http://127.0.0.1:7242/ingest/3355fed9-9be5-4c30-a353-6450cdb51e60',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'hooks.ts:useDisplayTime',message:'Cleaning up timer',data:{},timestamp:Date.now(),sessionId:'debug-session',runId:'error-debug',hypothesisId:'C'})}).catch(()=>{});
        } catch (e) {}
        // #endregion
        clearInterval(timer);
      };
    }
  }, [hoveredProject]);

  return currentTime;
};
