import * as kokomi from "kokomi.js";
import postprocessingFragmentShader from "@/shader/Postprocessing/frag.glsl";

export default class Postprocessing extends kokomi.Component {
  constructor(base) {
    super(base);

    this.ce = new kokomi.CustomEffect(this.base, {
      fragmentShader: postprocessingFragmentShader,
      uniforms: {
        uRGBShift: {
          value: .01,
        },
      },
    });
  }
  addExisting() {
    this.ce.addExisting();
  }
}