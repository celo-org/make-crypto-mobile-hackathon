// This error says that there is something wrong with node manifest
// and we should stop immediately.
// Note that error message should give user a hint what exactly is missing/wrong
// with the manifest file.
export default class ManifestConfigError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "ManifestConfigError";
  }
}
