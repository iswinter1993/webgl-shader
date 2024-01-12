import * as kokomi from "kokomi.js";
import Waterball from './ball.js'
export default class WaterWorld extends kokomi.Component {
    constructor(base){
        super(base)
        // this.base.am.on('ready',async ()=>{
            
        // })
        this.waterball = new Waterball(this.base)
        console.log('waterball:',this.waterball)
        this.waterball.addExisting()
        this.base.interactionManager.add(this.waterball.mesh);
        this.waterball.mesh.addEventListener('click',(e)=>{
            console.log(e)

        })
    }
}