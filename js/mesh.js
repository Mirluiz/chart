/**
 * Created by Zeynal on 3/11/2019.
 */

class Scene {

    constructor(){
        this.objects = {};
    }

    add(mesh, prop){
        this.objects[prop] = mesh;
    }
}


class Mesh {
    constructor(object, type){
        _tc({Object: object});
        _tc({String: type});

        let mesh = Object.assign({}, defaultMesh);

        this.type = type;
        this.material = Object.assign({}, defaultMeshMaterial);
        this.object = object;

        this.update = false;
        this.draw = false;
        this.setUpdate = function (functionBody) {this.updateFunction = functionBody;}
        this.updateFunction = null;
    }
}


let scene = new Scene();




function drawScene() {
    let object = scene.objects;

    for (let prop in object) {
        let elem = scene.objects[prop];
        if(elem.draw){
            if(elem.update){
                updateMesh(elem);
            }
            drawElem(elem);
        }
    }
}

function drawElem(elem) {
    _tc({Object: elem});

    switch (elem.type) {
        case 'line':
            drawLine(elem.object, elem.material.w, elem.material.color);
            break;
    }
}

function updateMesh(elem) {
    elem.updateFunction();
}