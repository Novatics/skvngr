export default class AssetLoader {
  constructor(remoteUrl) {
    this.remoteUrl = remoteUrl;
  }

  async loadTargets() {
    const res = await fetch(`${this.remoteUrl}/targets`);
    const remoteTargets = await res.json();
    const targets = {};
    
    for (remoteTarget of remoteTargets) {
      targets[remoteTarget.name] = { orientation, physicalWidth } = remoteTarget;
      targets[remoteTarget.name].source = { uri: remoteTarget.source };
    }

    return targets;
  }

  async loadMarkers() {
    const res = await fetch(`${this.remoteUrl}/markers`);
    const remoteMarkers = await res.json();
    const markers = remoteMarkers.map(({target, source, resources}) => {
      return {
        target,
        source: { uri: source },
        resource: resources.map(r => ({ uri: r })),
      }
    });

    return markers;
  }
}