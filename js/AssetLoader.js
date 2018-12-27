export default class AssetLoader {
  constructor(remoteUrl) {
    this.remoteUrl = remoteUrl;
  }

  async loadTargets() {
    const res = await fetch(`${this.remoteUrl}/markers`);
    const markers = await res.json();
    const targets = {};
    
    for (marker of markers) {
      targets[marker.name] = { orientation, physicalWidth } = marker;
      targets[marker.name].source = { uri: marker.source };
    }

    return targets;
  }
}