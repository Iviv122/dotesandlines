let dotes = [];

const sceneWidth = 255;
const sceneHeight = 255;
const sceneLength = 255;

const minWeight = 1;
const maxWeight = 5;

let amountOfDotes = 100;

function getInt(min, max){
    return ((Math.random()*(max-min)))+min;
}

function setupDotes(scene){
    for(let i=0;i<amountOfDotes;i++){
        const dote = document.createElement("a-sphere"); 
        dotes.push(dote);
       
        dote.setAttribute("position",`${getInt(-sceneLength,sceneLength)} ${getInt(0,sceneHeight)} ${getInt(-sceneWidth, sceneWidth)}`);
        dote.setAttribute("radius", getInt(minWeight, maxWeight));
        dote.setAttribute("color", "yellow");

        scene.appendChild(dote);
    }
}

AFRAME.registerComponent("some-line", {
    init: function(geometry) {
      // create an array of points. 
      const points = [];

      // create the line material
      const material = new THREE.LineBasicMaterial({color: 0xffffff});
      // create the geometry from points
      const line = new THREE.Line(geometry, material);
      // add it to this entity
      this.el.object3D.add(line);
    }
  })

function connectDotes(scene){

    for(let i=0;i<dotes.length;i++){
        dotes[i].Connections = [];
        for(let j=i+1;j<dotes.length;j++){
        
        dotes[i].Connections.push(dotes[j])
        }
    }

    dotes.forEach(i=>{
        i.Connections.forEach(j=>{
        const el = document.createElement("a-entity");
        scene.appendChild(el);
        
        let geometry = new THREE.BufferGeometry().setFromPoints(i.getAttribute('position'), j.getAttribute('position'));
        el.setAttribute("some-line", geometry)
        
    })
    });

}

function main(){
    const scene = document.querySelector("a-scene");
    const cam = document.querySelector("a-camera");
    cam.setAttribute("position", `${0} ${sceneHeight/2}} ${0}`);
    setupDotes(scene);
    connectDotes(scene);
}
main();
