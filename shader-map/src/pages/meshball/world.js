import * as kokomi from "kokomi.js";
import MeshBall from './ball.js'
export default class MeshBallWorld extends kokomi.Component{
    constructor(base){
        super(base)
        this.meshBall = new MeshBall(this.base)
        console.log('meshBall:',this)
        this.meshBall.addExisting()
        // this.base.interactionManager.add(this.meshBall.mesh);
        // this.meshBall.mesh.addEventListener('click',(e)=>{
        //     console.log(e)

        // })
    }
}