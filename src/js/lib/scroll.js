import * as THREE from 'three';

export default scroll = {
  zoompos: 10,
  minzoomspeed: .015,
  zoomspeed: .015,
  minzoom: 2,
  maxzoom: 20,
  mouse: [.5, .5],

  onScrollWheel() {
    window.addEventListener('wheel', e => {
      const amount = e.deltaY;
      if ( amount === 0 ) return;
      const dir = amount / Math.abs(amount);
      this.zoomspeed = dir / 20;
      // Slow down default zoom speed after user starts zooming, to give them more control
      this.minzoomspeed = 0.001;
    });
  },

  zoom(camera) {
    // Put some limits on zooming
    let damping = (Math.abs(this.zoomspeed) > this.minzoomspeed ? .95 : 1.0);
    // Zoom out faster the further out you go
    const zoom = THREE.Math.clamp(Math.pow(Math.E, this.zoompos), this.minzoom, this.maxzoom);

    this.zoompos = Math.log(zoom);
    // Slow down quickly at the zoom limits
    if ((zoom == this.minzoom && this.zoomspeed < 0) || (zoom == this.maxzoom && this.zoomspeed > 0)) {
      damping = .85;
    }
    this.zoompos += this.zoomspeed;
    this.zoomspeed *= damping;

    camera.position.x = Math.sin(.5 * Math.PI * (this.mouse[0] - .5)) * zoom;
    camera.position.y = Math.sin(.25 * Math.PI * (this.mouse[1] - .5)) * zoom;
    camera.position.z = Math.cos(.5 * Math.PI * (this.mouse[0] - .5)) * zoom;
  }
};