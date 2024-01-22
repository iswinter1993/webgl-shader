import * as kokomi from "kokomi.js";
import * as THREE from "three";
import TWEEN from "three/addons/libs/tween.module.js";
import { TrackballControls } from "three/addons/controls/TrackballControls.js";
import {
  CSS3DRenderer,
  CSS3DObject,
} from "three/addons/renderers/CSS3DRenderer.js";
import frag from "@/shader/meshball/frag.glsl";
import vert from "@/shader/meshball/vert.glsl";
import gsap from "gsap";
import _ from 'lodash'
export default class MeshBall extends kokomi.Component {
  constructor(base) {
    super(base);
    console.log('ball:',this)
    const {tabledata} = this.base
    const vertices = [];
    const objects = [];
		this.targets = { table: [], sphere: [], helix: [], grid: [] };
    

    
    if(tabledata){
      for(var i=0; i<tabledata.length; i++){
          const element = document.createElement( 'div' );
					element.className = 'element';
					element.style.backgroundColor = 'rgba(0,127,127,' + ( Math.random() * 0.5 + 0.25 ) + ')';
          const symbol = document.createElement( 'div' );
					symbol.className = 'symbol';
					symbol.textContent = tabledata[ i ];
					element.appendChild( symbol );
          const objectCSS = new CSS3DObject( element );
					objectCSS.position.x = Math.random() * 4000 - 2000;
					objectCSS.position.y = Math.random() * 4000 - 2000;
					objectCSS.position.z = Math.random() * 4000 - 2000;
          this.base.scene.add(objectCSS)
          objects.push( objectCSS );
          const object = new THREE.Object3D();
					object.position.x = ( (i + 3 ) * 140 ) - 1330;
					object.position.y = - ( (i + 4)  * 180 ) + 990;
					this.targets.table.push( object );

          // const x = Math.random()*2 ;
          // const y = Math.random()*2 ;
          // const z = Math.random()*2;
          // vertices.push( x, y, z );
      }
      const vector = new THREE.Vector3();

				for ( let i = 0, l = objects.length; i < l; i ++ ) {

					const phi = Math.acos( - 1 + ( 2 * i ) / l );
					const theta = Math.sqrt( l * Math.PI ) * phi;

					const object = new THREE.Object3D();

					object.position.setFromSphericalCoords(  objects.length*5, phi, theta );

					vector.copy( object.position ).multiplyScalar( 2 );

					object.lookAt( vector );

					this.targets.sphere.push( object );

				}
      this.objects = objects
      this.base.renderer = new CSS3DRenderer();
      this.base.renderer.setSize( window.innerWidth, window.innerHeight );
      document.getElementById( 'container' ).appendChild( this.base.renderer.domElement );



      const controls = new TrackballControls( this.base.camera, this.base.renderer.domElement );
      
      this.controls = controls
      // this.controls.update()

      this.controls.minDistance=500
      this.controls.maxDistance=8000

      const buttonTable = document.getElementById( 'table' );
				buttonTable.addEventListener( 'click', () => {

					this.transform( this.targets.table, 2000 );

				} );
      const buttonSphere = document.getElementById( 'sphere' );
				buttonSphere.addEventListener( 'click', () => {

					this.transform( this.targets.sphere, 2000 );

				} );
        // this.base.controls.addEventListener( 'change', (v)=>{
        //   console.log(v)
        //   this.render()
        // } );
      this.transform( this.targets.sphere, 2000 );

      // const geometry = new THREE.BufferGeometry();
      // geometry.setAttribute( 'position', new THREE.Float32BufferAttribute( vertices, 3 ) );

      // const material = new THREE.PointsMaterial( { color: 0x888888,size:0.05 } );

      // const points = new THREE.Points( geometry, material );
      
      // this.points = points;
      // this.htmls = []

      // const positionAttribute = this.points.geometry.attributes.position;
      // const positions = kokomi.convertBufferAttributeToVector(positionAttribute);
      // const uniqPositions = _.uniqWith(positions, _.isEqual);
      // this.positions = uniqPositions;

      // const htmls = positions.map((position, i) => {
      //   const el = document.querySelector(`.element${i}`) ;
      //   // console.log(position)
      //   const html = new kokomi.Html(this.base, el, position);
      //   // html.
      //   html.addExisting()
      //   return html;
      // });
      // console.log(htmls)
      // this.htmls = htmls;
      // this.positions = [];
      // this.htmls = []
      // this.getPositions()
      // this.addHtmls()

    }
    
  }
  addExisting() {
    
    // this.container.add( this.points );
    // this.render()
    // this.controls.update()
  }
  update() {
    this.onWindowResize()
    this.controls.update()
    TWEEN.update();
    this.render()
    
  }
  transform( targets, duration ) {

    TWEEN.removeAll();

    for ( let i = 0; i < this.objects.length; i ++ ) {

      const object = this.objects[ i ];
      const target = targets[ i ];

      new TWEEN.Tween( object.position )
        .to( { x: target.position.x, y: target.position.y, z: target.position.z }, Math.random() * duration + duration )
        .easing( TWEEN.Easing.Exponential.InOut )
        .start();

      new TWEEN.Tween( object.rotation )
        .to( { x: target.rotation.x, y: target.rotation.y, z: target.rotation.z }, Math.random() * duration + duration )
        .easing( TWEEN.Easing.Exponential.InOut )
        .start();

    }

    new TWEEN.Tween( this )
      .to( {}, duration * 2 )
      .onUpdate(()=> this.render() )
      .start();

  }
  render() {

    this.base.renderer.render( this.base.scene, this.base.camera );

  }
   onWindowResize() {

    this.base.camera.aspect = window.innerWidth / window.innerHeight;
    this.base.camera.updateProjectionMatrix();

    this.base.renderer.setSize( window.innerWidth, window.innerHeight );

    this.render();

  }
}
