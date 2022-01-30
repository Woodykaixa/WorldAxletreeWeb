export type Version = {
  majorVersion: number;
  minorVersion: number;
  patchVersion: number;
};

/**
 * Compare two game version objects
 * @return true, if a > b
 */
export function greater(a: Version, b: Version): boolean {
  if (a.majorVersion > b.majorVersion) {
    console.log('a.majorVersion > b.majorVersion');
    return true;
  }
  if (a.majorVersion < b.majorVersion) {
    console.log('a.majorVersion < b.majorVersion');
    return false;
  }
  if (a.minorVersion > b.minorVersion) {
    console.log('a.minorVersion > b.minorVersion');
    return true;
  }
  if (a.minorVersion < b.minorVersion) {
    console.log('a.minorVersion < b.minorVersion');
    return false;
  }
  return a.patchVersion > b.patchVersion;
}
