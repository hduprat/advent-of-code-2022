export interface Zone {
  min: number;
  max: number;
}

const overlaps = (A: Zone, B: Zone): boolean => {
  if (A.min >= B.min && A.min <= B.max) return true;
  if (A.max >= B.min && A.max <= B.max) return true;
  if (A.min <= B.min && A.max >= B.max) return true;
  return false;
};

const union2 = (A: Zone, B: Zone): Zone[] => {
  if (overlaps(A, B))
    return [{ min: Math.min(A.min, B.min), max: Math.max(A.max, B.max) }];
  return [A, B];
};

export const union = (zones: Zone[]): Zone[] => {
  if (zones.length < 2) return zones;
  const [A, B, ...rest] = zones.toSorted((a, b) => a.min - b.min);
  const U = union2(A, B);
  if (U.length === 0) return union(rest);
  if (U.length === 1) return union([U[0], ...rest]);
  return [U[0], ...union([U[1], ...rest])];
};

const remove2 = (base: Zone, zoneToRemove: Zone): Zone[] => {
  const zones: Zone[] = [];
  if (base.min < zoneToRemove.min) {
    zones.push({
      min: base.min,
      max: Math.min(zoneToRemove.min - 1, base.max),
    });
  }
  if (base.max > zoneToRemove.max) {
    zones.push({
      min: Math.max(zoneToRemove.max + 1, base.min),
      max: base.max,
    });
  }

  return zones;
};

export const remove = (baseZone: Zone, zones: Zone[]): Zone[] => {
  const Z = union(zones);
  return Z.reduce(
    (remainingZones, A) => {
      return [
        ...remainingZones.slice(0, -1),
        ...remove2(remainingZones[remainingZones.length - 1], A),
      ];
    },
    [baseZone]
  );
};
