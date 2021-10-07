const sizes = { width: window.innerWidth / 1.67, height: window.innerHeight / 1.67 }
const canvas = document.querySelector('canvas.webgl')
const camera = new THREE.PerspectiveCamera(75, 1920 / 1080, 1, 10000)
const renderer = new THREE.WebGLRenderer({ canvas: canvas, antialias: true })
const loader = new THREE.GLTFLoader();
const scene = new THREE.Scene()
renderer.shadowMap.enabled = true;
renderer.shadowMapSoft = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;
camera.position.x = 0
camera.position.y = 300
camera.position.z = 250
scene.add(camera)
const controls = new THREE.OrbitControls(camera, canvas)



var objects = [], inScene = [];

// const controls = new THREE.TrackballControls(camera);
// controls.rotateSpeed = 1.0;
// controls.zoomSpeed = 1.2;
// controls.panSpeed = 0.8;
// controls.noZoom = false;
// controls.noPan = false;
// controls.staticMoving = true;
// controls.dynamicDampingFactor = 0.3;

camera.lookAt(0, 300, 0);
controls.target = new THREE.Vector3(0, 300, 0);

var dragControls = new THREE.DragControls(objects, camera, renderer.domElement);
dragControls.addEventListener('dragstart', function () {

    // controls.enabled = false;

});
dragControls.addEventListener('drag', function (event) {

    event.object.position.y = 100;
    controls.enableRotate = false;

});

dragControls.addEventListener('dragend', function () {

    // controls.enabled = true;
    controls.enableRotate = true;

});

document.getElementById("modern").addEventListener("click", modernWallpaper);
document.getElementById("wrap").addEventListener("click", wrapWallpaper);
document.getElementById("default").addEventListener("click", defaultWallpaper);
document.getElementById("matte").addEventListener("click", matteWallpaper);
document.getElementById("ancient").addEventListener("click", ancientWallpaper);
document.getElementById("shot").addEventListener('click', takeScreenshot);
document.getElementById("button1").addEventListener('click', sofaTexture);
document.getElementById("button2").addEventListener('click', changeSofa);
document.getElementById("button3").addEventListener('click', addBed);
document.getElementById("button4").addEventListener('click', addLamp);
document.getElementById("button5").addEventListener('click', floorTexture);
const directionalLight = new THREE.DirectionalLight(0x777777, 2);
directionalLight.position.x = -1000
directionalLight.position.y = 500
directionalLight.position.z = 500
directionalLight.castShadow = true;
directionalLight.shadow.mapSize.width = 2048;
directionalLight.shadow.mapSize.height = 2048;
directionalLight.shadow.camera.near = 1;
directionalLight.shadow.camera.far = 5000;
directionalLight.shadow.camera.right = 2000;
directionalLight.shadow.camera.top = 2000;
scene.add(directionalLight)

const ambientLight = new THREE.AmbientLight(0xffffff, 2);
scene.add(ambientLight)

const targetObject = new THREE.Object3D();
targetObject.position.set(-1000, 0, 0);
scene.add(targetObject);
directionalLight.target = targetObject;


loader.load('Models/sofaX_glTF/untitled.gltf', function (gltf) {
    var mesh = gltf.scene;
    mesh.scale.set(0.3, 0.3, 0.3);
    var gltfbox = new THREE.Box3().setFromObject(mesh);
    var objectwidth = Math.floor(gltfbox.getSize().x);
    var objectheight = Math.floor(gltfbox.getSize().y);
    var objectdepth = Math.floor(gltfbox.getSize().z);
    console.log(objectwidth, objectheight, objectdepth);
    objectwidth = objectwidth + parseInt(2);
    objectheight = objectheight + parseInt(2);
    objectdepth = objectdepth + parseInt(1);
    mesh.position.set(0, -objectheight / 2, 0);
    var box = drawBox(objectwidth, objectheight, objectdepth);
    box.add(mesh);
    box.name = "Sofa";
    box.position.z = -500;
    box.position.y = 100;
    scene.add(box);
    console.log("hey " + scene.getObjectByName("Sofa"))
});


//MOVEMENT
var currentObjectName = "Sofa";
$("#objectSelect").change(function () {
    currentObjectName = $(this).val();
});
var previousPosX = 0;
var previousPosZ = 0;
var previousScale = 0;


document.getElementById("assetRotate").oninput = function () {
    scene.getObjectByName(currentObjectName).rotation.y = this.value * 3.142 / 180
    scene.getObjectByName(currentObjectName).center()
}
document.getElementById("scaleButtonUp").onclick = function () {
    scene.getObjectByName(currentObjectName).scale.set(
        scene.getObjectByName(currentObjectName).scale.x * 1.1,
        scene.getObjectByName(currentObjectName).scale.y * 1.1,
        scene.getObjectByName(currentObjectName).scale.z * 1.1
    )
}
document.getElementById("scaleButtonDown").onclick = function () {
    scene.getObjectByName(currentObjectName).scale.set(
        scene.getObjectByName(currentObjectName).scale.x * 0.9,
        scene.getObjectByName(currentObjectName).scale.y * 0.9,
        scene.getObjectByName(currentObjectName).scale.z * 0.9
    )
}

function drawBox(objectwidth, objectheight, objectdepth) {
    var geometry, material, box;
    geometry = new THREE.BoxGeometry(objectwidth, objectheight, objectdepth);
    material = new THREE.MeshBasicMaterial({ color: 0xffff00, transparent: true, opacity: 0, depthTest: false });
    box = new THREE.Mesh(geometry, material);
    objects.push(box);
    box.position.set(0, 0, 0);
    return box;
};

function updateKnobPosition(posX, posZ) {
    console.log(posX + "," + previousPosX);
    if (posX > previousPosX) {
        scene.getObjectByName(currentObjectName).position.x = scene.getObjectByName(currentObjectName).position.x + 10;
    } else if (posX < previousPosX) {
        scene.getObjectByName(currentObjectName).position.x = scene.getObjectByName(currentObjectName).position.x - 10;
    }
    if (posZ > previousPosZ) {
        scene.getObjectByName(currentObjectName).position.z = scene.getObjectByName(currentObjectName).position.z + 10;
    } else if (posZ < previousPosZ) {
        scene.getObjectByName(currentObjectName).position.z = scene.getObjectByName(currentObjectName).position.z - 10;
    }
    previousPosX = posX;
    previousPosZ = posZ;
}

// document.getElementById("sofaposX").oninput = function () {
//    currentSelectedObject.position.set(this.value, 0, Zaxis)
//    Xaxis = this.value
// }
// document.getElementById("sofaposZ").oninput = function () {
//    currentSelectedObject.position.set(Xaxis, 0, this.value)
//    Zaxis = this.value
// }

const wall = new THREE.Mesh(
    new THREE.PlaneGeometry(3000, 1500, 1, 1),
    new THREE.MeshStandardMaterial({
        map: new THREE.TextureLoader().load('Resources/wallpaper_modern.jpg'),
        color: "#666",
    }));
wall.castShadow = true;
wall.receiveShadow = true;
wall.name = "Wall";
wall.userData.draggable = false;
wall.userData.name = "WallX";
wall.position.set(0, 750, -750);
scene.add(wall);

const plane = new THREE.Mesh(
    new THREE.PlaneGeometry(3000, 3000, 1, 1),
    new THREE.MeshStandardMaterial({
        map: new THREE.TextureLoader().load('Resources/floor.jpg'),
        color: "#444",
    }));
plane.position.set(0, 0, -750);
plane.castShadow = true;
plane.receiveShadow = true;
plane.rotation.x = -Math.PI / 2;
plane.name = "Ground";
plane.userData.ground = true;
plane.userData.name = "GroundX";
scene.add(plane);

function takeScreenshot() {

    // open in new window like this
    //
    var w = window.open('', '');
    w.document.title = "Screenshot";
    let btn = document.createElement("button");
    var img = new Image();
    // Without 'preserveDrawingBuffer' set to true, we must render now
    renderer.render(scene, camera);
    img.src = renderer.domElement.toDataURL();
    w.document.body.appendChild(img);
    w.document.body.style.backgroundColor = "#222";
    img.style.marginLeft = "25%";
    img.style.marginTop = "5%";
    img.style.width = "50%";
    btn.innerHTML = "Download";
    btn.style.cssText += 'background-color: #fff; font-family: "Bahnschrift"; font-size: 24px; padding: 8px 20px 5px 20px; border-radius: 20px; margin-left: 46.25%; margin-top:5%;';
    btn.onclick = function () {
        var a = document.createElement('a');
        // Without 'preserveDrawingBuffer' set to true, we must render now
        renderer.render(scene, camera);
        a.href = renderer.domElement.toDataURL().replace("image/png", "image/octet-stream");
        a.download = 'canvas.png'
        a.click();
    };
    w.document.body.appendChild(document.createElement("br"));
    w.document.body.appendChild(btn);


}

function modernWallpaper() {
    const currentWall = scene.getObjectByName("Wall")
    const currentWallLoader2 = new THREE.TextureLoader().load('Resources/wallpaper_modern.jpg');
    currentWall.traverse(function (node) {
        if (node instanceof THREE.Mesh) {
            node.material.map = currentWallLoader2;
        }
    });
}
function wrapWallpaper() {
    const currentWall = scene.getObjectByName("Wall")
    const currentWallLoader2 = new THREE.TextureLoader().load('Resources/wallpaper_wrap.jpg');
    currentWall.traverse(function (node) {
        if (node instanceof THREE.Mesh) {
            node.material.map = currentWallLoader2;
        }
    });
}
function defaultWallpaper() {
    const currentWall = scene.getObjectByName("Wall")
    const currentWallLoader2 = new THREE.TextureLoader().load('Resources/wallpaper_default.jpg');
    currentWall.traverse(function (node) {
        if (node instanceof THREE.Mesh) {
            node.material.map = currentWallLoader2;
        }
    });
}
function matteWallpaper() {
    const currentWall = scene.getObjectByName("Wall")
    const currentWallLoader2 = new THREE.TextureLoader().load('Resources/wallpaper_matte.jpg');
    currentWall.traverse(function (node) {
        if (node instanceof THREE.Mesh) {
            node.material.map = currentWallLoader2;
        }
    });
}
function ancientWallpaper() {
    const currentWall = scene.getObjectByName("Wall")
    const currentWallLoader2 = new THREE.TextureLoader().load('Resources/wallpaper_ancient.jpg');
    currentWall.traverse(function (node) {
        if (node instanceof THREE.Mesh) {
            node.material.map = currentWallLoader2;
        }
    });
}

var sofaTextureTime = 1;
var floorTextureTime = 1;
var currentTextureLoader;
function sofaTexture() {
    const currentObjectX = scene.getObjectByName("Sofa")
    if (sofaTextureTime == 1) {
        currentTextureLoader = new THREE.TextureLoader().load('/Models/sofa2_glTF/textures/Sofa_baseColor2.png');
        sofaTextureTime = 2;
    } else if (sofaTextureTime == 2) {
        currentTextureLoader = new THREE.TextureLoader().load('/Models/sofa2_glTF/textures/Sofa_baseColor3.png');
        sofaTextureTime = 3;
    } else if (sofaTextureTime == 3) {
        currentTextureLoader = new THREE.TextureLoader().load('/Models/sofa2_glTF/textures/Sofa_baseColor1.png');
        sofaTextureTime = 1;
    }
    currentObjectX.traverse(function (node) {
        if (node instanceof THREE.Mesh) {
            node.material.map = currentTextureLoader;
        }
    });

}

function floorTexture() {
    const currentObjectX = scene.getObjectByName("Ground")
    if (floorTextureTime == 1) {
        currentTextureLoader = new THREE.TextureLoader().load('Resources/floor2.jpg');
        floorTextureTime = 2;
    } else if (floorTextureTime == 2) {
        currentTextureLoader = new THREE.TextureLoader().load('Resources/floor3.jpg');
        floorTextureTime = 3;
    } else if (floorTextureTime == 3) {
        currentTextureLoader = new THREE.TextureLoader().load('Resources/floor4.jpg');
        floorTextureTime = 4;
    } else if (floorTextureTime == 4) {
        currentTextureLoader = new THREE.TextureLoader().load('Resources/floor.jpg');
        floorTextureTime = 1;
    }
    currentObjectX.traverse(function (node) {
        if (node instanceof THREE.Mesh) {
            node.material.map = currentTextureLoader;
        }
    });

}

function changeSofa() {
    scene.remove(scene.getObjectByName("Sofa"))
    scene.remove(scene.getObjectByName("Bed"))
    loader.load('Models/sofa1_glTF/scene.gltf', function (gltf) {
        const newobject = gltf.scene.children[0];
        newobject.scale.set(4, 4, 4);
        newobject.position.set(0, 0, -500);
        newobject.castShadow = true;
        newobject.receiveShadow = true;
        newobject.traverse(function (node) {
            node.castShadow = true;
            if (node.isMesh) { node.receiveShadow = true; }
        })
        newobject.name = "Sofa";
        scene.add(newobject);
    });

}

function addBed() {
    scene.remove(scene.getObjectByName("Sofa"))
    loader.load('Models/bed1_glTF/scene.gltf', function (gltf) {
        const newobject = gltf.scene.children[0];
        newobject.scale.set(300, 200, 300);
        newobject.position.set(0, 100, -400);
        newobject.castShadow = true;
        newobject.receiveShadow = true;
        newobject.traverse(function (node) {
            node.castShadow = true;
            if (node.isMesh) { node.receiveShadow = true; }
        })
        newobject.name = "Bed";
        scene.add(newobject);
    });

}
function addLamp() {
    loader.load('Models/lamp1_glTF/scene.gltf', function (gltf) {
        const newobject = gltf.scene.children[0];
        newobject.scale.set(300, 300, 300);
        newobject.position.set(800, 300, -500);
        newobject.castShadow = true;
        newobject.receiveShadow = true;
        newobject.traverse(function (node) {
            node.castShadow = true;
            if (node.isMesh) { node.receiveShadow = true; }
        })
        newobject.name = "Lamp1";
        scene.add(newobject);
    });
    loader.load('Models/lamp1_glTF/scene.gltf', function (gltf) {
        const newobject = gltf.scene.children[0];
        newobject.scale.set(300, 300, 300);
        newobject.position.set(-800, 300, -500);
        newobject.castShadow = true;
        newobject.receiveShadow = true;
        newobject.traverse(function (node) {
            node.castShadow = true;
            if (node.isMesh) { node.receiveShadow = true; }

        });
        newobject.name = "Lamp2";
        newobject.userData.draggable = true;
        scene.add(newobject);
    });
    loader.load('Models/table_glTF/scene.gltf', function (gltf) {

        var mesh = gltf.scene;
        mesh.scale.set(15, 15, 15);
        // mesh.position.set(0, 160, -120);
        var gltfbox = new THREE.Box3().setFromObject(mesh);
        var objectwidth = Math.floor(gltfbox.getSize().x);
        var objectheight = Math.floor(gltfbox.getSize().y);
        var objectdepth = Math.floor(gltfbox.getSize().z);
        console.log(objectwidth, objectheight, objectdepth);
        objectwidth = objectwidth + parseInt(2);
        objectheight = objectheight + parseInt(2);
        objectdepth = objectdepth + parseInt(1);
        mesh.position.set(0, -objectheight / 2, 0);
        var box = drawBox(objectwidth, objectheight, objectdepth);
        box.name = "Table";
        box.add(mesh);
        box.position.y = 160;
        box.position.z = -120;
        scene.add(group)
    });
    loader.load('Models/tv_glTF/scene.gltf', function (gltf) {
        const newobject = gltf.scene.children[0];
        newobject.scale.set(10, 10, 10);
        newobject.position.set(0, 550, -720);
        newobject.castShadow = true;
        newobject.receiveShadow = true;
        newobject.traverse(function (node) {
            node.castShadow = true;
            if (node.isMesh) { node.receiveShadow = true; }
        });
        scene.add(newobject);
    });
}
scene.background = new THREE.TextureLoader().load("Resources/backgroundX.bmp");
// scene.background = new THREE.CubeTextureLoader().load([
//     'Resources/posx.bmp',
//     'Resources/negx.bmp',
//     'Resources/posy.bmp',
//     'Resources/negy.bmp',
//     'Resources/posz.bmp',
//     'Resources/negz.bmp',
// ]);


// //DRAG

var raycaster = new THREE.Raycaster();
var mouse = new THREE.Vector2();



function onMouseMove( event ) {
  // calculate mouse position in normalized device coordinates
  // (-1 to +1) for both components
  mouse.x = ( event.clientX / window.innerWidth ) * 2 - 1;
  mouse.y = - ( event.clientY / window.innerHeight ) * 2 + 1;

  // update the picking ray with the camera and mouse position
  raycaster.setFromCamera( mouse, camera );

  // calculate objects intersecting the picking ray
  var intersects = raycaster.intersectObjects( scene.children, true );
  if(intersects && intersects[0]) {
    console.log('GROUP IS ' + intersects[0].object.name)
  }
}

document.addEventListener('mousemove', onMouseMove)

//JOYSTICK
document.addEventListener('DOMContentLoaded', function () {

    var joystick = document.getElementById("joystick"),
        knob = document.getElementById("knob"),
        target_x = joystick.clientWidth / 2 - knob.clientWidth / 2,
        target_y = joystick.clientHeight / 2 - knob.clientHeight / 2;

    // var panSpan  = document.getElementById("panValue"),
    // tiltSpan = document.getElementById("tiltValue");

    knob.style.webkitTransform = "translate(" + target_x + "px, " + target_y + "px)";

    // update the position attributes
    var target = document.getElementById("knob");
    updatePositionAttributes(target, target_x, target_y);

    // target elements with the "draggable" class
    interact('.draggable')
        .draggable({
            inertia: false,
            // keep the element within the area of its parent
            restrict: {
                restriction: "parent",
                endOnly: false,
                elementRect: { top: 0, left: 0, bottom: 1, right: 1 }
            },
            onmove: dragMoveListener,
            onend: function (event) {
                var target = event.target;
                TweenLite.to(target, 0.2, { ease: Back.easeOut.config(1.7), "webkitTransform": "translate(" + target_x + "px, " + target_y + "px)" });
                updatePositionAttributes(target, target_x, target_y);
                // panSpan.innerHTML = 0;
                // tiltSpan.innerHTML = 0;
            }
        });

    function dragMoveListener(event) {
        var target = event.target,
            // keep the dragged position in the data-x/data-y attributes
            x = (parseFloat(target.getAttribute('data-x')) || 0) + event.dx,
            y = (parseFloat(target.getAttribute('data-y')) || 0) + event.dy;

        // translate the element
        target.style.webkitTransform = target.style.transform = 'translate(' + x + 'px, ' + y + 'px)';
        updatePositionAttributes(target, x, y);

        // update text display 
        // panSpan.innerHTML = (x-joystick.clientWidth/4);
        // tiltSpan.innerHTML = (y-joystick.clientHeight/4);
        updateKnobPosition((x - joystick.clientWidth / 4), (y - joystick.clientHeight / 4));
    }

    function updatePositionAttributes(element, x, y) {
        target.setAttribute('data-x', x);
        target.setAttribute('data-y', y);
    }

});

function onDocumentMouseDown(event) {
    const mouse = {
        x: (event.clientX / renderer.domElement.clientWidth) * 2 - 1,
        y: -(event.clientY / renderer.domElement.clientHeight) * 2 + 1,
    };
    raycaster.setFromCamera(mouse, camera);

    const intersects = raycaster.intersectObjects(sceneMeshes, false);

    const color = Math.random() * 0xffffff;

    if (intersects.length > 0) {
        let n = new THREE.Vector3();
        n.copy(intersects[0].face.normal);
        n.transformDirection(intersects[0].object.matrixWorld);
        const selectedObject = intersects[0];
        alert('this is a Drink');

    }
}

//FINALS//
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
const finale = document.getElementById("canvas");
const animate = () => {
    // Update objects & render
    // dragObject()
    // controls.update();
    renderer.render(scene, camera)
    window.requestAnimationFrame(animate)
}
animate()