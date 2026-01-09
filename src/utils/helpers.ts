/**
 * Splits a project name intelligently for display
 * "CommerceFlow" becomes ["COMMERCE", "FLOW"]
 * "My Project" becomes ["MY", "PROJECT"]
 */
export const getDisplayName = (projectName: string): [string, string] => {
  try {
    // If it contains spaces, split on spaces
    if (projectName.includes(' ')) {
      const parts = projectName.toUpperCase().split(' ');
      return (parts.length >= 2 ? [parts[0], parts.slice(1).join(' ')] : [parts[0], '']) as [string, string];
    }
    
    // Split camelCase/PascalCase words (e.g., "CommerceFlow" -> ["COMMERCE", "FLOW"])
    // Match capital letters followed by lowercase letters
    const words = projectName.match(/[A-Z][a-z]*/g) || [projectName];
    if (words.length > 1) {
      return [words[0].toUpperCase(), words.slice(1).join('').toUpperCase()] as [string, string];
    }
    
    // If single word, return as is
    return [words[0].toUpperCase(), ''] as [string, string];
  } catch (error) {
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
  try {
    return hoveredProject
      ? hoveredProject.year.toString()
      : currentTime.toLocaleTimeString('en-US', {
          hour12: false,
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
        });
  } catch (error) {
    return hoveredProject ? hoveredProject.year.toString() : '00:00:00';
  }
};
