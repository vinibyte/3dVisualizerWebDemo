const sizes = { width: window.innerWidth / 1.64, height: window.innerHeight / 1.34 }
const canvas = document.querySelector('canvas.webgl')
const camera = new THREE.PerspectiveCamera(75, 1920 / 1080, 1, 100000)
const renderer = new THREE.WebGLRenderer({ canvas: canvas, antialias: true })
const loader = new THREE.GLTFLoader();
const scene = new THREE.Scene()
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
renderer.shadowMap.enabled = true;
renderer.shadowMapSoft = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;
camera.position.x = 0
camera.position.y = 350
camera.position.z = 300
scene.add(camera)
const controls = new THREE.OrbitControls(camera, canvas)

var objects = [];
var totalObjects = 1;
var currentXdrag = 0, currentYdrag = 0, currentZdrag = 0;
var currentObjectName = "Sofa";
$("#objectSelect").change(function () {
    currentObjectName = $(this).val();
});
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

const dragControls = new THREE.DragControls(objects, camera, renderer.domElement);
dragControls.addEventListener('dragstart', function () {


});
dragControls.addEventListener('drag', function (event) {

    controls.enableRotate = false;
    console.log(event.object.name)
    currentObjectName = event.object.name;
    document.getElementById("assetName").innerHTML = "Current Asset: " + currentObjectName;

    var testbox = new THREE.Box3().setFromObject(scene.getObjectByName(currentObjectName));

    var objectOffsetx = 0 + Math.floor(testbox.getSize().x) / 2;
    var objectOffsety = 0 + Math.floor(testbox.getSize().y) / 2;
    var objectOffsetz = 0 + Math.floor(testbox.getSize().z) / 2;

    if (document.getElementById("lockDragX").checked) {
        event.object.position.x = currentXdrag;
    } else {
        currentXdrag = event.object.position.x;
    }
    if (document.getElementById("lockDragY").checked) {
        event.object.position.y = currentYdrag;
    } else {
        currentYdrag = event.object.position.y;
    }
    if (document.getElementById("lockDragZ").checked) {
        event.object.position.z = currentZdrag;
    } else {
        currentZdrag = event.object.position.z;
    }

    if (event.object.position.x < -1500 + objectOffsetx) {
        event.object.position.x = -1500 + objectOffsetx
    }
    if (event.object.position.x > 1500 - objectOffsetx) {
        event.object.position.x = 1500 - objectOffsetx
    }
    if (event.object.position.y < 0 + objectOffsety) {
        event.object.position.y = 0 + objectOffsety
    }
    if (event.object.position.y > 1500 - objectOffsety) {
        event.object.position.y = 1500 - objectOffsety
    }
    if (event.object.position.z < -750 + objectOffsetz) {
        event.object.position.z = -750 + objectOffsetz
    }
    if (event.object.position.z > 2250 - objectOffsetz) {
        event.object.position.z = 2250 - objectOffsetz
    }

    // var objectHeightDictionary = {
    //     "Sofa": 100,"Table": 240,"Lamp1": 600,"Lamp2": 600
    //   };
    // if(currentObjectName in objectHeightDictionary){
    //     event.object.position.y = objectHeightDictionary[currentObjectName];
    // }

});

dragControls.addEventListener('dragend', function () {

    controls.enableRotate = true;

});

document.getElementById("cb_modern").addEventListener("click", modernWallpaper);
document.getElementById("cb_wrap").addEventListener("click", wrapWallpaper);
document.getElementById("cb_default").addEventListener("click", defaultWallpaper);
document.getElementById("cb_matte").addEventListener("click", matteWallpaper);
document.getElementById("cb_ancient").addEventListener("click", ancientWallpaper);
document.getElementById("cb_floor1").addEventListener("click", floor1Change);
document.getElementById("cb_floor2").addEventListener("click", floor2Change);
document.getElementById("cb_floor3").addEventListener("click", floor3Change);
document.getElementById("cb_floor4").addEventListener("click", floor4Change);
document.getElementById("cb_floor5").addEventListener("click", floor5Change);
document.getElementById("shot").addEventListener('click', takeScreenshot);
document.getElementById("button1").addEventListener('click', sofaTexture);
document.getElementById("button2").addEventListener('click', changeSofa);
document.getElementById("button3").addEventListener('click', addBed);
document.getElementById("button4").addEventListener('click', addLamp);
document.getElementById("button5").addEventListener('click', downloadScene);
document.getElementById("buttonDelete").addEventListener('click', deleteAsset);
document.getElementById("buttonCenter").addEventListener('click', centerAsset);


const directionalLight = new THREE.DirectionalLight(0xffffff, 1.5);
directionalLight.position.x = -1500
directionalLight.position.y = 1000
directionalLight.position.z = 2000
directionalLight.castShadow = true;
directionalLight.shadow.mapSize.width = 8192;
directionalLight.shadow.mapSize.height = 8192;
directionalLight.shadow.camera.near = 1;
directionalLight.shadow.camera.far = 5000;
directionalLight.shadow.camera.right = 3000;
directionalLight.shadow.camera.top = 3000;
const ambientLight = new THREE.AmbientLight(0xffffff, 1.5);
const targetObject = new THREE.Object3D();
targetObject.position.set(-1500, 0, 1000);
scene.add(targetObject);
directionalLight.target = targetObject;
const directionalLight2 = new THREE.PointLight(0xffffff, 1);
directionalLight2.position.x = 0
directionalLight2.position.y = 2000
directionalLight2.position.z = 0
directionalLight2.target = targetObject;
scene.add(ambientLight);
scene.add(directionalLight);
scene.add(directionalLight2);

//HELPER
// const helper = new THREE.CameraHelper( directionalLight.shadow.camera );
// scene.add( helper );

loadPlaneX('Resources/wallpaper_matte.jpg', "WallFront", "#ddd", 3000, 1500, 1, 1, 0, 750, -750, 0, 0, 0)
loadPlaneX('Resources/wallpaper_matte.jpg', "WallLeft", "#eee", 3000, 1500, 1, 1, -1500, 750, 750, 0, Math.PI / 2, 0)
loadPlaneX('Resources/wallpaper_matte.jpg', "WallRight", "#eee", 3000, 1500, 1, 1, 1500, 750, 750, 0, -Math.PI / 2, 0)
loadPlaneX('Resources/wallpaper_matte.jpg', "WallBack", "#ddd", 3000, 1500, 1, 1, 0, 750, 2250, 0, Math.PI, 0)
loadPlaneX('Resources/floor3.jpg', "FloorX", "#ccc", 3000, 3000, 1, 1, 0, 0, 750, -Math.PI / 2, 0, 0)
loadGLTF('Models/sofaX_glTF/untitled.gltf', 0.3, 0, 0, -500, "Sofa")
loadGLTF('Models/sofa2_glTF/scene.gltf', 180, 1100, 0, 600, "Sofa2")
loadGLTF('Models/table_glTF/scene.gltf', 15, 0, 0, -120, "Table")
loadGLTF('Models/tv_glTF/scene.gltf', 10, 0, 350, -720, "TV")
loadGLTF('Models/attic_glTF/scene.gltf', 300, -1300, 0, -650, "Attic")
loadGLTF('Models/chair_glTF/scene.gltf', 3, -1100, 0, 0, "Chair1")

//MOVEMENT
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
    scene.getObjectByName(currentObjectName).position.y = scene.getObjectByName(currentObjectName).position.y * 1.1
}
document.getElementById("scaleButtonDown").onclick = function () {
    scene.getObjectByName(currentObjectName).scale.set(
        scene.getObjectByName(currentObjectName).scale.x * 0.9,
        scene.getObjectByName(currentObjectName).scale.y * 0.9,
        scene.getObjectByName(currentObjectName).scale.z * 0.9
    )
    scene.getObjectByName(currentObjectName).position.y = scene.getObjectByName(currentObjectName).position.y * 0.9
}

function drawBox(objectwidth, objectheight, objectdepth) {
    var geometry, material, godbox;
    geometry = new THREE.BoxGeometry(objectwidth, objectheight, objectdepth);
    material = new THREE.MeshBasicMaterial({ color: 0xffffff, transparent: true, opacity: 0, depthTest: false, wireframe: true });
    godbox = new THREE.Mesh(geometry, material);
    objects.push(godbox);
    return godbox;
};

function loadGLTF(modelPath, scaleX, posX, posY, posZ, modelName) {
    loader.load(modelPath, function (gltf) {

        var mesh = gltf.scene;
        mesh.scale.set(scaleX, scaleX, scaleX);
        var gltfbox = new THREE.Box3().setFromObject(mesh);
        var objectwidth = Math.floor(gltfbox.getSize().x * 1.01);
        var objectheight = Math.floor(gltfbox.getSize().y * 1.01);
        var objectdepth = Math.floor(gltfbox.getSize().z * 1.01);
        console.log(objectwidth, objectheight, objectdepth);
        mesh.traverse(function (node) {
            node.castShadow = true;
            if (node.isMesh) { node.receiveShadow = true; }

        });
        var box = drawBox(objectwidth, objectheight, objectdepth);
        var bbox = new THREE.Box3().setFromObject(mesh);
        var cent = bbox.getCenter(new THREE.Vector3());
        var size = bbox.getSize(new THREE.Vector3());
        bbox.setFromObject(mesh);
        bbox.getCenter(cent);
        bbox.getSize(size);
        mesh.position.copy(cent).multiplyScalar(-1);
        box.add(mesh);
        box.position.set(posX, objectheight / 2 + posY, posZ);
        box.name = modelName;
        totalObjects += 1;
        scene.add(box);
    });
}

function deleteAsset() {
    scene.remove(scene.getObjectByName(currentObjectName))
    scene.remove(scene.getObjectByName(currentObjectName))
    objects.pop(objects.getObjectByName(currentObjectName))
    totalObjects -= 1;
    dragControls.deactivate();
    dragControls.activate();
}
function centerAsset() {
    var testbox = new THREE.Box3().setFromObject(scene.getObjectByName(currentObjectName));
    var objectOffset = 0 + Math.floor(testbox.getSize().y) / 2;
    scene.getObjectByName(currentObjectName).position.x = 0
    scene.getObjectByName(currentObjectName).position.y = objectOffset
    scene.getObjectByName(currentObjectName).position.z = 0
}

function changeSofa() {
    loadGLTF('Models/sofa1_glTF/scene.gltf', 4, 0, 0, -500, "Sofa1");
}

function addBed() {
    scene.remove(scene.getObjectByName("Sofa"))
    loadGLTF('Models/bed1_glTF/scene.gltf', 300, 0, 100, 400, "Bed")

}
function addLamp() {
    loadGLTF('Models/pcdesk_glTF/scene.gltf', 3.5, 1100, 0, -350, "PCDesk")
    loadGLTF('Models/lamp1_glTF/scene.gltf', 280, 700, 0, -600, "Lamp1")
    loadGLTF('Models/lamp1_glTF/scene.gltf', 280, -700, 0, -600, "Lamp2")
}

document.getElementById('myDrag').onclick = function () {
    var checkBox = document.getElementById("myDrag");
    if (checkBox.checked == true) {
        dragControls.activate();
    }
    else if (checkBox.checked == false) {
        dragControls.deactivate();
    }
}

document.getElementById('myWire').onclick = function () {
    var checkBox = document.getElementById("myWire");
    if (checkBox.checked == true) {
        for (let i = 0; i < objects.length; i++) {
            objects[i].traverse(function (node) {
                if (node instanceof THREE.Mesh) {
                    node.material.transparent = false;
                }
            });
        }
    }
    else if (checkBox.checked == false) {
        for (let i = 0; i < objects.length; i++) {
            objects[i].traverse(function (node) {
                if (node instanceof THREE.Mesh) {
                    node.material.transparent = true;
                }
            });
        }
    }
}

document.getElementById('lockCamera').onclick = function () {
    var checkBox = document.getElementById("lockCamera");
    if (checkBox.checked == true) {
        controls.enabled = false;
    }
    else if (checkBox.checked == false) {
        controls.enabled = true;
    }
}
//   function updateKnobPosition(posX, posZ) {
//     console.log(posX + "," + previousPosX);
//     if (posX > previousPosX) {
//         scene.getObjectByName(currentObjectName).position.x = scene.getObjectByName(currentObjectName).position.x + 10;
//     } else if (posX < previousPosX) {
//         scene.getObjectByName(currentObjectName).position.x = scene.getObjectByName(currentObjectName).position.x - 10;
//     }
//     if (posZ > previousPosZ) {
//         scene.getObjectByName(currentObjectName).position.z = scene.getObjectByName(currentObjectName).position.z + 10;
//     } else if (posZ < previousPosZ) {
//         scene.getObjectByName(currentObjectName).position.z = scene.getObjectByName(currentObjectName).position.z - 10;
//     }
//     previousPosX = posX;
//     previousPosZ = posZ;
// }
// document.getElementById("sofaposX").oninput = function () {
//    currentSelectedObject.position.set(this.value, 0, Zaxis)
//    Xaxis = this.value
// }
// document.getElementById("sofaposZ").oninput = function () {
//    currentSelectedObject.position.set(Xaxis, 0, this.value)
//    Zaxis = this.value
// }


//ASSETS
function loadPlaneX(resourceLocation, nameX, colorX, sizeX, sizeY, widthX, widthY, posX, posY, posZ, rotX, rotY, rotZ) {
    const planeObject = new THREE.Mesh(
        new THREE.PlaneGeometry(sizeX, sizeY, widthX, widthY),
        new THREE.MeshPhysicalMaterial({
            map: new THREE.TextureLoader().load(resourceLocation),
            clearcoat: 0,
            cleacoatRoughness: 0.9,
            metalness: 0.9,
            roughness: 0.9,
            color: colorX,
        }));
    planeObject.castShadow = true;
    planeObject.receiveShadow = true;
    planeObject.name = nameX;
    planeObject.position.set(posX, posY, posZ);
    planeObject.rotation.set(rotX, rotY, rotZ);
    scene.add(planeObject);

}


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
    changeWallpaper("WallFront", 'Resources/wallpaper_modern.jpg')
    changeWallpaper("WallLeft", 'Resources/wallpaper_modern.jpg')
    changeWallpaper("WallRight", 'Resources/wallpaper_modern.jpg')
    changeWallpaper("WallBack", 'Resources/wallpaper_modern.jpg')
}
function wrapWallpaper() {
    changeWallpaper("WallFront", 'Resources/wallpaper_wrap.jpg')
    changeWallpaper("WallLeft", 'Resources/wallpaper_wrap.jpg')
    changeWallpaper("WallRight", 'Resources/wallpaper_wrap.jpg')
    changeWallpaper("WallBack", 'Resources/wallpaper_wrap.jpg')
}
function defaultWallpaper() {
    changeWallpaper("WallFront", 'Resources/wallpaper_default.jpg')
    changeWallpaper("WallLeft", 'Resources/wallpaper_default.jpg')
    changeWallpaper("WallRight", 'Resources/wallpaper_default.jpg')
    changeWallpaper("WallBack", 'Resources/wallpaper_default.jpg')
}
function matteWallpaper() {
    changeWallpaper("WallFront", 'Resources/wallpaper_matte.jpg')
    changeWallpaper("WallLeft", 'Resources/wallpaper_matte.jpg')
    changeWallpaper("WallRight", 'Resources/wallpaper_matte.jpg')
    changeWallpaper("WallBack", 'Resources/wallpaper_matte.jpg')
}
function ancientWallpaper() {
    changeWallpaper("WallFront", 'Resources/wallpaper_ancient.jpg')
    changeWallpaper("WallLeft", 'Resources/wallpaper_ancient.jpg')
    changeWallpaper("WallRight", 'Resources/wallpaper_ancient.jpg')
    changeWallpaper("WallBack", 'Resources/wallpaper_ancient.jpg')
}
function floor1Change() {
    changeWallpaper("FloorX", 'Resources/floor1.jpg')
}
function floor2Change() {
    changeWallpaper("FloorX", 'Resources/floor2.jpg')
}

function floor3Change() {
    changeWallpaper("FloorX", 'Resources/floor3.jpg')
}

function floor4Change() {
    changeWallpaper("FloorX", 'Resources/floor4.jpg')
}

function floor5Change() {
    changeWallpaper("FloorX", 'Resources/floor5.jpg')
}


function changeWallpaper(wallName, locationX) {
    const currentWall = scene.getObjectByName(wallName)
    const currentWallLoader2 = new THREE.TextureLoader().load(locationX);
    currentWall.traverse(function (node) {
        if (node instanceof THREE.Mesh) {
            node.material.map = currentWallLoader2;
        }
    });
}

var sofaTextureTime = 1;
var currentTextureLoader;
function sofaTexture() {
    const currentObjectX = scene.getObjectByName(currentObjectName)
    if (sofaTextureTime == 1) {
        currentTextureLoader = new THREE.TextureLoader().load('/Models/sofaX_glTF/textures/Sofa_baseColor2.png');
        sofaTextureTime = 2;
    } else if (sofaTextureTime == 2) {
        currentTextureLoader = new THREE.TextureLoader().load('/Models/sofaX_glTF/textures/Sofa_baseColor3.png');
        sofaTextureTime = 3;
    } else if (sofaTextureTime == 3) {
        currentTextureLoader = new THREE.TextureLoader().load('/Models/sofaX_glTF/textures/Sofa_baseColor1.png');
        sofaTextureTime = 1;
    }
    currentObjectX.traverse(function (node) {
        if (node instanceof THREE.Mesh) {
            node.material.map = currentTextureLoader;
        }
    });

}

function downloadScene() {
    const exporter = new THREE.GLTFExporter();
    exporter.parse(scene, function (gltfJson) {
        saveX(new Blob([gltfJson]), "Model.glb")
    }, { binary: true });
}
const link = document.createElement('a')
document.body.appendChild(link)

function saveX(blob, fileName) {
    link.href = URL.createObjectURL(blob)
    link.download = fileName
    link.click()
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


//DRAG
document.addEventListener('mousemove', onMouseMove)
function onMouseMove(event) {
    var raycaster = new THREE.Raycaster();
    var mouse = new THREE.Vector2();

    // calculate mouse position in normalized device coordinates
    // (-1 to +1) for both components
    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = - (event.clientY / window.innerHeight) * 2 + 1;

    // update the picking ray with the camera and mouse position
    raycaster.setFromCamera(mouse, camera);

    // calculate objects intersecting the picking ray
    var intersects = raycaster.intersectObjects(scene.children, true);
    if (intersects && intersects[0]) {
        // console.log('ITEM IS ' + intersects[0].object.name)
    }

}


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
const animate = () => {
    // Update objects & render
    // dragObject()
    // controls.update();
    renderer.render(scene, camera)
    window.requestAnimationFrame(animate)
}
animate()