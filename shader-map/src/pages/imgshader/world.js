import * as kokomi from "kokomi.js";
import * as THREE from "three";
import Slider from "./slider.js";
import gsap from "gsap";

gsap.registerPlugin(SplitText);
export default class World extends kokomi.Component {
    constructor(base) {
      super(base);
  
      this.base.am.on("ready", async () => {
        var split = new SplitText("#el");
        var split1 = new SplitText("#el1");
        var splitTextTimeline = gsap.timeline()
        gsap.set('#el', {perspective:400,opacity:0});
        gsap.set('#el1', {perspective:400,opacity:0});
        this.slider = new Slider(this.base);
        await this.slider.addExisting();

        this.currentActiveMesh = null;
        this.speed = this.slider.ws.target
        this.slider.ig.iterate((maku) => {
          this.base.interactionManager.add(maku.mesh);
          maku.mesh.addEventListener("click", () => {
            if (Math.abs(this.slider.ws.scroll.delta) > 5) {
              return;
            }
            console.log(maku);
            const otherMakus = this.slider.ig.makuGroup.makus.filter(
              (item) => item !== maku
            );
            if (!this.currentActiveMesh) {
              this.slider.ws.disable();
              this.slider.dd.disable();
              otherMakus.forEach((item) => {
                gsap.to(item.mesh.material.uniforms.uOpacity, {
                  value: 0,
                  ease: "power2.out",
                });
              });
              const that = this;
              gsap.to(maku.mesh.material.uniforms.uProgress, {
                value: 1,
                duration: 1,
                ease: "power2.out",
                delay: 0.5,
                onUpdate() {
                  if (this.progress() >= 0.5) {
                      splitTextTimeline.clear().time(0);
                      split.revert();
                    split.split({type:"chars, words"})
                    split1.split({type:'words'})
                    splitTextTimeline.from(split.chars, {duration: 0.6, scale:4, autoAlpha:0, rotationX:-180,transformOrigin:"100% 50%", ease:"back", stagger: 0.02});
                    splitTextTimeline.from(split1.words,{duration: 0.6,autoAlpha:0,y:100},0.3)
                    that.currentActiveMesh = maku.mesh;
                  }
                },
              });
              // this.currentActiveMesh = maku.mesh;
            }
          });
        });
        this.base.container.addEventListener("click", () => {
          if (this.currentActiveMesh) {
            const that = this;
            gsap.to(this.currentActiveMesh.material.uniforms.uProgress, {
              value: 0,
              duration: 1,
              ease: "power2.inOut",
              onUpdate() {
                if (this.progress() >= 0.5) {
                  that.slider.ws.enable();
                  that.slider.dd.enable();
                  splitTextTimeline.clear().time(0);
                      split.revert();
                    split.split({type:"chars, words"})
                    split1.split({type:'words'})
                    splitTextTimeline.to(split.chars, {duration: 0.6, scale:4, autoAlpha:0, rotationX:-180,transformOrigin:"100% 50%", ease:"back", stagger: 0.02});
                    splitTextTimeline.to(split1.words,{duration: 0.6,autoAlpha:0,y:100},0.3)
                  that.currentActiveMesh = null;
                }
              },
            });
            this.slider.ig.iterate((item) => {
              gsap.to(item.mesh.material.uniforms.uOpacity, {
                value: 1,
                delay: 0.5,
                ease: "power2.out",
              });
            });
            // this.currentActiveMesh = null;
          }
        });
        document.querySelector(".loader-screen")?.classList.add("hollow");
      });
    }
    
  }