import * as kokomi from "kokomi.js";
import * as THREE from "three";
import sliderVertexShader from "@/shader/Slider/vert.glsl";
import sliderFragmentShader from "@/shader/Slider/frag.glsl";
export default class Slider extends kokomi.Component {
    constructor(base) {
      super(base);
      //kokomi.js有个InfiniteGallery的类，能够创建一个无限滚动的画廊。
      const params = {
        uDistortX: {
          value: 1.15,
        },
        uDistortZ: {
          value: 2.5,
        },
      };
      this.ig = new kokomi.InfiniteGallery(this.base, {
        elList: [...document.querySelectorAll(".gallery-item")],
        direction: "horizontal",
        gap: 128,
        vertexShader: sliderVertexShader,
        fragmentShader: sliderFragmentShader,
        materialParams: {
          transparent: true,
        },
        uniforms: {
          uVelocity: {
            value: 0,
          },
          uOpacity: {
            value: 1,
          },
          uProgress: {
            value: 0,
          },
          ...params
        },
      });
      this.ws = new kokomi.WheelScroller();
      this.ws.listenForScroll();

      this.dd = new kokomi.DragDetecter(this.base);
      this.dd.detectDrag();
      this.dd.on("drag", (delta) => {
        this.ws.scroll.target -= delta[this.ig.dimensionType] * 2;
      });
    }
    async addExisting() {
        this.ig.addExisting();
        await this.ig.checkImagesLoaded();
      }
    async update() {
        this.ws.syncScroll();
        const { current,delta  } = this.ws.scroll;
        this.ig.sync(current);
        this.ig.iterate((maku) => {
          maku.mesh.material.uniforms.uVelocity.value = delta;
        });
      }
  }