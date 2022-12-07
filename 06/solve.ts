const IDENTICAL_CHARACTERS_REGEX = /(\w).*\1/g;

const analyzeMarkerPosition = (
  dataStream: string,
  markerLength: number
): number => {
  let i = markerLength;
  while (i <= dataStream.length) {
    const maybeMarker = dataStream.slice(i - markerLength, i);
    const duplicateChar = maybeMarker.match(IDENTICAL_CHARACTERS_REGEX);

    if (duplicateChar === null) {
      return i;
    }

    // Optimization: skip right after the first occurrence of a duplicate character
    const firstDuplicatePosition = maybeMarker.indexOf(duplicateChar[1]);
    i += Math.max(firstDuplicatePosition, 0);

    i++;
  }
  return dataStream.length;
};

export const solveProblem1 = (dataStream: string): number =>
  analyzeMarkerPosition(dataStream, 4);

export const solveProblem2 = (dataStream: string): number =>
  analyzeMarkerPosition(dataStream, 14);
