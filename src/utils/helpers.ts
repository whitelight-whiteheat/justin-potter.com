/**
 * Splits a project name intelligently for display
 * "CommerceFlow" becomes ["COMMERCE", "FLOW"]
 * "My Project" becomes ["MY", "PROJECT"]
 */
export const getDisplayName = (projectName: string): [string, string] => {
  // #region agent log
  try {
    fetch('http://127.0.0.1:7242/ingest/3355fed9-9be5-4c30-a353-6450cdb51e60',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'helpers.ts:getDisplayName',message:'getDisplayName called',data:{projectName,projectNameType:typeof projectName,projectNameLength:projectName?.length},timestamp:Date.now(),sessionId:'debug-session',runId:'error-debug',hypothesisId:'D'})}).catch(()=>{});
  } catch (e) {}
  // #endregion
  
  try {
    // If it contains spaces, split on spaces
    if (projectName.includes(' ')) {
      const parts = projectName.toUpperCase().split(' ');
      const result = parts.length >= 2 ? [parts[0], parts.slice(1).join(' ')] : [parts[0], ''];
      // #region agent log
      try {
        fetch('http://127.0.0.1:7242/ingest/3355fed9-9be5-4c30-a353-6450cdb51e60',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'helpers.ts:getDisplayName',message:'getDisplayName result (spaces)',data:{result},timestamp:Date.now(),sessionId:'debug-session',runId:'error-debug',hypothesisId:'D'})}).catch(()=>{});
      } catch (e) {}
      // #endregion
      return result as [string, string];
    }
    
    // Split camelCase/PascalCase words (e.g., "CommerceFlow" -> ["COMMERCE", "FLOW"])
    // Match capital letters followed by lowercase letters
    const words = projectName.match(/[A-Z][a-z]*/g) || [projectName];
    if (words.length > 1) {
      const result = [words[0].toUpperCase(), words.slice(1).join('').toUpperCase()];
      // #region agent log
      try {
        fetch('http://127.0.0.1:7242/ingest/3355fed9-9be5-4c30-a353-6450cdb51e60',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'helpers.ts:getDisplayName',message:'getDisplayName result (camelCase)',data:{result},timestamp:Date.now(),sessionId:'debug-session',runId:'error-debug',hypothesisId:'D'})}).catch(()=>{});
      } catch (e) {}
      // #endregion
      return result as [string, string];
    }
    
    // If single word, return as is
    const result = [words[0].toUpperCase(), ''];
    // #region agent log
    try {
      fetch('http://127.0.0.1:7242/ingest/3355fed9-9be5-4c30-a353-6450cdb51e60',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'helpers.ts:getDisplayName',message:'getDisplayName result (single word)',data:{result},timestamp:Date.now(),sessionId:'debug-session',runId:'error-debug',hypothesisId:'D'})}).catch(()=>{});
    } catch (e) {}
    // #endregion
    return result as [string, string];
  } catch (error) {
    // #region agent log
    try {
      fetch('http://127.0.0.1:7242/ingest/3355fed9-9be5-4c30-a353-6450cdb51e60',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'helpers.ts:getDisplayName',message:'ERROR in getDisplayName',data:{error:error instanceof Error ? error.message : String(error),projectName},timestamp:Date.now(),sessionId:'debug-session',runId:'error-debug',hypothesisId:'E'})}).catch(()=>{});
    } catch (e) {}
    // #endregion
    return [projectName.toUpperCase(), ''];
  }
};

/**
 * Formats time display - shows year when hovering project, current time otherwise
 */
export const formatDisplayTime = (
  hoveredProject: { year: number } | null,
  currentTime: Date
): string => {
  // #region agent log
  try {
    fetch('http://127.0.0.1:7242/ingest/3355fed9-9be5-4c30-a353-6450cdb51e60',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'helpers.ts:formatDisplayTime',message:'formatDisplayTime called',data:{hasProject:!!hoveredProject,year:hoveredProject?.year,currentTimeType:typeof currentTime,currentTimeValid:currentTime instanceof Date},timestamp:Date.now(),sessionId:'debug-session',runId:'error-debug',hypothesisId:'F'})}).catch(()=>{});
  } catch (e) {}
  // #endregion
  
  try {
    const result = hoveredProject
      ? hoveredProject.year.toString()
      : currentTime.toLocaleTimeString('en-US', {
          hour12: false,
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
        });
    // #region agent log
    try {
      fetch('http://127.0.0.1:7242/ingest/3355fed9-9be5-4c30-a353-6450cdb51e60',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'helpers.ts:formatDisplayTime',message:'formatDisplayTime result',data:{result},timestamp:Date.now(),sessionId:'debug-session',runId:'error-debug',hypothesisId:'F'})}).catch(()=>{});
    } catch (e) {}
    // #endregion
    return result;
  } catch (error) {
    // #region agent log
    try {
      fetch('http://127.0.0.1:7242/ingest/3355fed9-9be5-4c30-a353-6450cdb51e60',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'helpers.ts:formatDisplayTime',message:'ERROR in formatDisplayTime',data:{error:error instanceof Error ? error.message : String(error),hasProject:!!hoveredProject},timestamp:Date.now(),sessionId:'debug-session',runId:'error-debug',hypothesisId:'E'})}).catch(()=>{});
    } catch (e) {}
    // #endregion
    return hoveredProject ? hoveredProject.year.toString() : '00:00:00';
  }
};
