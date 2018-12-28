export default class AssetLoader {
  constructor(remoteUrl) {
    this.remoteUrl = remoteUrl;
  }

  async loadTargets() {
    const res = await fetch(`${this.remoteUrl}/targets`);
    const remoteTargets = await res.json();
    const targets = {};

    Object.values(remoteTargets).forEach(
      ({ name, orientation, physicalWidth, source }) => {
        targets[name] = {
          orientation,
          physicalWidth,
          source: { uri: source },
        };
      },
    );

    return targets;
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
