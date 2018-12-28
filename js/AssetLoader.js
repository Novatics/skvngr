export default class AssetLoader {
  constructor(remoteUrl) {
    this.remoteUrl = remoteUrl;
  }

  async loadTargets() {
    const res = await fetch(`${this.remoteUrl}/targets`);
    const remoteTargets = await res.json();

    return Object.values(remoteTargets)
      .map(({ name, orientation, physicalWidth, source }) => ({
        name,
        orientation,
        physicalWidth,
        source: { uri: source },
      }))
      .reduce(
        (object, { name, ...target }) => ({ ...object, [name]: target }),
        {},
      );
  }

  async loadMarkers() {
    /* global fetch */
    const res = await fetch(`${this.remoteUrl}/markers`);
    const remoteMarkers = await res.json();
    const markers = remoteMarkers.map(({ target, source, resources }) => ({
      target,
      source: { uri: source },
      resources: resources.map(r => ({ uri: r })),
    }));

    return markers;
  }
}
