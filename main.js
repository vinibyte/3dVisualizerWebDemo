const canvas = document.querySelector('canvas.webgl')
const renderer = new THREE.WebGLRenderer({ canvas: canvas, antialias: true })
const loader = new THREE.GLTFLoader();
const scene = new THREE.Scene()
const camera = new THREE.PerspectiveCamera(90, window.innerWidth / 1.4 / window.innerHeight / 1.05, 1, 100000)
renderer.setSize(window.innerWidth / 1.4, window.innerHeight / 1.05)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
renderer.shadowMap.enabled = true;
renderer.shadowMapSoft = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;
camera.position.x = 0
camera.position.y = 350
camera.position.z = 600
scene.add(camera)
const controls = new THREE.OrbitControls(camera, canvas)
const transformControl = new THREE.TransformControls(camera, renderer.domElement);

const directionalLight = new THREE.DirectionalLight(0xffffff, 1.5);
const pointLight = new THREE.PointLight(0xffffff, 1);
const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
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
const targetObject = new THREE.Object3D();
targetObject.position.set(-1500, 0, 1000);
scene.add(targetObject);
directionalLight.target = targetObject;
pointLight.position.x = 0
pointLight.position.y = 1200
pointLight.position.z = 500
pointLight.target = targetObject;
const directionalLight2 = new THREE.DirectionalLight(0xffffff, 1.5);
directionalLight2.position.x = 0
directionalLight2.position.y = 0
directionalLight2.position.z = 1000
directionalLight2.castShadow = true;
const targetObject2 = new THREE.Object3D();
targetObject2.position.set(0, 5000, 1000);
scene.add(targetObject2);
directionalLight2.target = targetObject2;


scene.add(directionalLight2);
scene.add(directionalLight);
scene.add(ambientLight);
scene.add(pointLight);


//HELPER
// const helper = new THREE.CameraHelper( directionalLight.shadow.camera );
// scene.add( helper );



var objects = [];
var totalObjects = 0;
var transformActive = false;
var currentXdrag = 0, currentYdrag = 0, currentZdrag = 0;
var currentObjectName = "Sofa";
$("#objectSelect").change(function () {
    currentObjectName = $(this).val();
});


camera.lookAt(0, 300, 0);
controls.target = new THREE.Vector3(0, 300, 0);


transformControl.addEventListener('dragging-changed', function (event) {
    controls.enabled = !event.value;
    controls.enableRotate = true;
});
transformControl.size = 0.8;
scene.add(transformControl);

const dragControls = new THREE.DragControls(objects, camera, renderer.domElement);
dragControls.addEventListener('dragstart', function () {


});
dragControls.addEventListener('drag', function (event) {

    controls.enableRotate = false;
    // console.log(event.object.name)
    currentObjectName = event.object.name;
    document.getElementById("assetName").innerHTML = "Current Asset: " + currentObjectName;


    if (transformActive) {
        transformControl.attach(scene.getObjectByName(currentObjectName));
        // transformControl.setMode('rotate');
        transformControl.addEventListener('change', renderFunction);
        dragControls.deactivate();
    } else {
        transformControl.detach(scene.getObjectByName(currentObjectName));
        dragControls.activate();
    }

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



//BUTTON

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
document.getElementById("cb_ceiling1").addEventListener("click", ceiling1Change);
document.getElementById("cb_ceiling2").addEventListener("click", ceiling2Change);
document.getElementById("cb_ceiling3").addEventListener("click", ceiling3Change);
document.getElementById("cb_ceiling4").addEventListener("click", ceiling4Change);
document.getElementById("cb_ceiling5").addEventListener("click", ceiling5Change);
document.getElementById("cb_assetTexture1").addEventListener("click", assetTexture1Change);
document.getElementById("cb_assetTexture2").addEventListener("click", assetTexture2Change);
document.getElementById("cb_assetTexture3").addEventListener("click", assetTexture3Change);
document.getElementById("cb_assetTexture4").addEventListener("click", assetTexture4Change);
document.getElementById("cb_assetTexture5").addEventListener("click", assetTexture5Change);
document.getElementById("cb_assetTexture6").addEventListener("click", assetTexture6Change);
document.getElementById("cb_assetTexture7").addEventListener("click", assetTexture7Change);
document.getElementById("cb_assetTexture8").addEventListener("click", assetTexture8Change);
document.getElementById("cb_assetTexture9").addEventListener("click", assetTexture9Change);
document.getElementById("cb_assetTexture10").addEventListener("click", assetTexture10Change);
document.getElementById("buttonAddAsset").addEventListener('click', addAssetFunction);
document.getElementById("shot").addEventListener('click', takeScreenshot);
document.getElementById("buttonDeleteAll").addEventListener('click', resetScene);
document.getElementById("buttonResetScene").addEventListener('click', resetScene);
document.getElementById("button5").addEventListener('click', downloadScene);
document.getElementById("buttonDelete").addEventListener('click', deleteAsset);
document.getElementById("buttonCenter").addEventListener('click', centerAsset);
document.getElementById("buttonEdit").addEventListener('click', editFunction);
document.getElementById("buttonTransformScale").addEventListener('click', transformScale);
document.getElementById("buttonTransformRotate").addEventListener('click', transformRotate);
document.getElementById("buttonTransformMove").addEventListener('click', transformMove);


//WORK

function loadInitials() {
    console.log("Adding Objects!")
    loadPlaneX('Resources/wallpaper_matte.jpg', "WallFront", "#ddd", 3000, 1500, 1, 1, 0, 750, -750, 0, 0, 0)
    loadPlaneX('Resources/wallpaper_matte.jpg', "WallLeft", "#eee", 3000, 1500, 1, 1, -1500, 750, 750, 0, Math.PI / 2, 0)
    loadPlaneX('Resources/wallpaper_matte.jpg', "WallRight", "#eee", 3000, 1500, 1, 1, 1500, 750, 750, 0, -Math.PI / 2, 0)
    loadPlaneX('Resources/wallpaper_matte.jpg', "WallBack", "#ddd", 3000, 1500, 1, 1, 0, 750, 2250, 0, Math.PI, 0)
    loadPlaneX('Resources/floor3.jpg', "FloorX", "#ccc", 3000, 3000, 1, 1, 0, 0, 750, -Math.PI / 2, 0, 0)
    loadPlaneX('Resources/ceiling2.jpg', "CeilingX", "#ccc", 3000, 3000, 1, 1, 0, 1500, 750, Math.PI / 2, 0, 0)
}

loadInitials();

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

function drawBox(objectwidth, objectheight, objectdepth, modelName) {
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
        var box = drawBox(objectwidth, objectheight, objectdepth, modelName);
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
function makeid() {
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    for (var i = 0; i < 32; i++)
        text += possible.charAt(Math.floor(Math.random() * possible.length));

    return text;
}
function deleteAsset() {
    deleteIndividualAsset(currentObjectName)
}
function deleteIndividualAsset(currentObjectNameX) {
    scene.getObjectByName(currentObjectNameX).scale.set(0, 0, 0)
    scene.getObjectByName(currentObjectNameX).position.set(0, 10000, 0)
    console.log(currentObjectNameX)
    const currentObjectX = scene.getObjectByName(currentObjectNameX)
    const currentTextureLoader = new THREE.TextureLoader().load('/Resources/floor1.jpg');
    currentObjectX.traverse(function (node) {
        if (node instanceof THREE.Mesh) {
            node.material.map = currentTextureLoader;
        }
    });
    const tempName = makeid();
    scene.getObjectByName(currentObjectNameX).name = tempName;
    totalObjects -= 1;
}

function centerAsset() {
    var testbox = new THREE.Box3().setFromObject(scene.getObjectByName(currentObjectName));
    var objectOffset = 0 + Math.floor(testbox.getSize().y) / 2;
    scene.getObjectByName(currentObjectName).position.set(0, objectOffset, 0)
    scene.getObjectByName(currentObjectName).rotation.set(0, 0, 0)
}

//ASSET MANAGEMENT
const assetList = document.getElementById('chooseAssets');
const myAssets = ['Sofa', 'Sofa Classic', 'Sofa Modern', 'Television', 'Small Attic', 'Lamps', 'Table', 'PC Desk', 'Bed', 'Chairs'];
myAssets.forEach(function (item) {
    const option = document.createElement('option');
    option.value = item;
    assetList.appendChild(option);
});

function addAssetFunction() {
    const assetSelected = document.getElementById('myAsset').value;
    document.getElementById('myAsset').value = '';
    console.log("Asset Selected: " + assetSelected)
    switch (assetSelected) {
        case 'Sofa':
            loadGLTF('Models/sofaX_glTF/untitled.gltf', 0.3, 0, 0, -500, assetSelected)
            break;
        case 'Sofa Classic':
            loadGLTF('Models/sofa1_glTF/scene.gltf', 4, -800, 0, -500, assetSelected);
            break;
        case 'Sofa Modern':
            loadGLTF('Models/sofa2_glTF/scene.gltf', 180, 800, 0, -500, assetSelected)
            break;
        case 'Television':
            loadGLTF('Models/tv_glTF/scene.gltf', 10, 0, 350, -720, assetSelected)
            break;
        case 'Small Attic':
            loadGLTF('Models/attic_glTF/scene.gltf', 300, 0, 0, 0, assetSelected)
            break;
        case 'Table':
            loadGLTF('Models/table_glTF/scene.gltf', 15, 0, 0, -120, assetSelected)
            break;
        case 'Chairs':
            loadGLTF('Models/chair_glTF/scene.gltf', 3, 0, 0, 0, assetSelected)
            break;
        case 'PC Desk':
            loadGLTF('Models/pcdesk_glTF/scene.gltf', 3.5, 0, 0, 0, assetSelected)
            break;
        case 'Bed':
            loadGLTF('Models/bed1_glTF/scene.gltf', 250, 0, 0, 0, assetSelected)
            break;
        case 'Lamps':
            loadGLTF('Models/lamp1_glTF/scene.gltf', 280, 700, 0, -600, assetSelected + "1")
            loadGLTF('Models/lamp1_glTF/scene.gltf', 280, -700, 0, -600, assetSelected + "2")
            break;
        case '':
            alert("Please Select an Asset")
            break;

    }
}

function editFunction(){
    var checkBox = document.getElementById("myTransformer");
    if (checkBox.checked == false){
        document.getElementById("myTransformer").checked = true;
        dragControls.deactivate();
        transformControl.attach(scene.getObjectByName(currentObjectName));
        transformActive = true;
        document.getElementById("myDrag").checked = false;
        $("#enableinfo").hide()
        $("#info").show()
    }
    else if (checkBox.checked == true) {
        document.getElementById("myTransformer").checked = false;
        transformControl.detach(scene.getObjectByName(currentObjectName));
        transformActive = false;
        controls.enableRotate = true;
        dragControls.activate();
        document.getElementById("myDrag").checked = true;
        $("#enableinfo").show()
        $("#info").hide()

    }

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

document.getElementById('myTransformer').onclick = function () {
    editFunction()
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

function downloadScene() {
    // alert("Under Development")
    // const json = scene.toJSON();
    // const a = document.createElement('a');
    // const type = "Scene"
    // a.href = URL.createObjectURL(new Blob([json], { type: `text/${type === "txt" ? "plain" : type}` }));
    // a.download = name;
    // a.click();

    resetScene()
    ancientWallpaper()
    floor5Change()
    ceiling5Change()
    loadGLTF('Models/sofaX_glTF/untitled.gltf', 0.3, 0, 0, -500, "Sofa")
    loadGLTF('Models/tv_glTF/scene.gltf', 10, 0, 350, -720, "TV")
    loadGLTF('Models/lamp1_glTF/scene.gltf', 280, 700, 0, -600, "Lamp1")
    loadGLTF('Models/lamp1_glTF/scene.gltf', 280, -700, 0, -600, "Lamp2")
    loadGLTF('Models/table_glTF/scene.gltf', 15, 0, 0, -120, "Table")
    loadGLTF('Models/attic_glTF/scene.gltf', 300, -1000, 0, -600, "Attic")


}

window.addEventListener('resize', onWindowResize, false);

function onWindowResize() {

    camera.aspect = window.innerWidth / 1.4 / window.innerHeight / 1.05;
    camera.updateProjectionMatrix();

    renderer.setSize(window.innerWidth / 1.4, window.innerHeight / 1.05)

}

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
    if (nameX == "CeilingX") {
        planeObject.castShadow = false;
        planeObject.receiveShadow = false;
    }
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
    var x = document.getElementById("wallOptions").value;
    if (x == "AllWalls") {
        changeTextureX("WallFront", 'Resources/wallpaper_modern.jpg')
        changeTextureX("WallLeft", 'Resources/wallpaper_modern.jpg')
        changeTextureX("WallRight", 'Resources/wallpaper_modern.jpg')
        changeTextureX("WallBack", 'Resources/wallpaper_modern.jpg')
    } else {
        changeTextureX(x, 'Resources/wallpaper_modern.jpg')
    }
}
function wrapWallpaper() {
    var x = document.getElementById("wallOptions").value;
    if (x == "AllWalls") {
        changeTextureX("WallFront", 'Resources/wallpaper_wrap.jpg')
        changeTextureX("WallLeft", 'Resources/wallpaper_wrap.jpg')
        changeTextureX("WallRight", 'Resources/wallpaper_wrap.jpg')
        changeTextureX("WallBack", 'Resources/wallpaper_wrap.jpg')
    } else {
        changeTextureX(x, 'Resources/wallpaper_wrap.jpg')
    }
}
function defaultWallpaper() {
    var x = document.getElementById("wallOptions").value;
    if (x == "AllWalls") {
        changeTextureX("WallFront", 'Resources/wallpaper_default.jpg')
        changeTextureX("WallLeft", 'Resources/wallpaper_default.jpg')
        changeTextureX("WallRight", 'Resources/wallpaper_default.jpg')
        changeTextureX("WallBack", 'Resources/wallpaper_default.jpg')
    } else {
        changeTextureX(x, 'Resources/wallpaper_default.jpg')
    }
}
function matteWallpaper() {
    var x = document.getElementById("wallOptions").value;
    if (x == "AllWalls") {
        changeTextureX("WallFront", 'Resources/wallpaper_matte.jpg')
        changeTextureX("WallLeft", 'Resources/wallpaper_matte.jpg')
        changeTextureX("WallRight", 'Resources/wallpaper_matte.jpg')
        changeTextureX("WallBack", 'Resources/wallpaper_matte.jpg')
    } else {
        changeTextureX(x, 'Resources/wallpaper_matte.jpg')
    }
}
function ancientWallpaper() {
    var x = document.getElementById("wallOptions").value;
    if (x == "AllWalls") {
        changeTextureX("WallFront", 'Resources/wallpaper_ancient.jpg')
        changeTextureX("WallLeft", 'Resources/wallpaper_ancient.jpg')
        changeTextureX("WallRight", 'Resources/wallpaper_ancient.jpg')
        changeTextureX("WallBack", 'Resources/wallpaper_ancient.jpg')
    } else {
        changeTextureX(x, 'Resources/wallpaper_ancient.jpg')
    }
}
function floor1Change() {
    changeTextureX("FloorX", 'Resources/floor1.jpg')
}
function floor2Change() {
    changeTextureX("FloorX", 'Resources/floor2.jpg')
}

function floor3Change() {
    changeTextureX("FloorX", 'Resources/floor3.jpg')
}

function floor4Change() {
    changeTextureX("FloorX", 'Resources/floor4.jpg')
}

function floor5Change() {
    changeTextureX("FloorX", 'Resources/floor5.jpg')
}

function ceiling1Change() {
    changeTextureX("CeilingX", 'Resources/ceiling1.jpg')
}
function ceiling2Change() {
    changeTextureX("CeilingX", 'Resources/ceiling2.jpg')
}

function ceiling3Change() {
    changeTextureX("CeilingX", 'Resources/ceiling3.jpg')
}

function ceiling4Change() {
    changeTextureX("CeilingX", 'Resources/ceiling4.jpg')
}

function ceiling5Change() {
    changeTextureX("CeilingX", 'Resources/ceiling5.jpg')
}
function assetTexture1Change() {
    changeTextureX(currentObjectName, '/Resources/assetTexture1.jpg')
}

function assetTexture2Change() {
    changeTextureX(currentObjectName, '/Resources/assetTexture2.jpg')
}
function assetTexture3Change() {
    changeTextureX(currentObjectName, '/Resources/assetTexture3.jpg')
}
function assetTexture4Change() {
    changeTextureX(currentObjectName, '/Resources/assetTexture4.jpg')
}
function assetTexture5Change() {
    changeTextureX(currentObjectName, '/Resources/assetTexture5.jpg')
}
function assetTexture6Change() {
    changeTextureX(currentObjectName, '/Resources/assetTexture6.jpg')
}
function assetTexture7Change() {
    changeTextureX(currentObjectName, '/Resources/assetTexture7.jpg')
}
function assetTexture8Change() {
    changeTextureX(currentObjectName, '/Resources/assetTexture8.jpg')
}
function assetTexture9Change() {
    changeTextureX(currentObjectName, '/Resources/assetTexture9.jpg')
}
function assetTexture10Change() {
    changeTextureX(currentObjectName, '/Resources/assetTexture10.jpg')
}
function changeTextureX(nameX, locationX) {
    const currentWall = scene.getObjectByName(nameX)
    const currentWallLoader2 = new THREE.TextureLoader().load(locationX);
    currentWall.traverse(function (node) {
        if (node instanceof THREE.Mesh) {
            node.material.map = currentWallLoader2;
        }
    });
}

function resetScene() {
    const size = scene.children.length
    for (var i = size; i > 0; i--) {
        const obj = scene.children[i];
        try {
            console.log(obj.name)
            if (obj.name != "") {
                deleteIndividualAsset(obj.name)
            }
        } catch (error) {
        }
    }
    totalObjects = 0
    loadInitials()
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
function transformMove(){
    transformControl.setMode('translate');
}
function transformScale(){
    transformControl.setMode('scale');
}
function transformRotate(){
    transformControl.setMode('rotate');
}
window.addEventListener('keydown', function (event) {

    switch (event.keyCode) {

        case 81: // Q
            transformControl.setSpace(transformControl.space === 'local' ? 'world' : 'local');
            break;

        case 16: // Shift
            transformControl.setTranslationSnap(100);
            transformControl.setRotationSnap(THREE.MathUtils.degToRad(15));
            transformControl.setScaleSnap(0.25);
            break;

        case 87: // W
            transformControl.setMode('translate');
            break;

        case 82: // R
            transformControl.setMode('rotate');
            break;

        case 69: // E
            transformControl.setMode('scale');
            break;

        case 67: // C
            const position = currentCamera.position.clone();

            currentCamera = currentCamera.isPerspectiveCamera ? cameraOrtho : cameraPersp;
            currentCamera.position.copy(position);

            orbit.object = currentCamera;
            transformControl.camera = currentCamera;

            currentCamera.lookAt(orbit.target.x, orbit.target.y, orbit.target.z);
            onWindowResize();
            break;

        case 86: // V
            const randomFoV = Math.random() + 0.1;
            const randomZoom = Math.random() + 0.1;

            camera.fov = randomFoV * 160;
            cameraOrtho.bottom = - randomFoV * 500;
            cameraOrtho.top = randomFoV * 500;

            camera.zoom = randomZoom * 5;
            cameraOrtho.zoom = randomZoom * 5;
            onWindowResize();
            break;

        case 187:
        case 107: // +, =, num+
            transformControl.setSize(transformControl.size + 0.1);
            break;

        case 189:
        case 109: // -, _, num-
            transformControl.setSize(Math.max(transformControl.size - 0.1, 0.1));
            break;

        case 88: // X
            transformControl.showX = !transformControl.showX;
            break;

        case 89: // Y
            transformControl.showY = !transformControl.showY;
            break;

        case 90: // Z
            transformControl.showZ = !transformControl.showZ;
            break;

        case 32: // Spacebar
            transformControl.enabled = !transformControl.enabled;
            break;

    }

});

window.addEventListener('keyup', function (event) {

    switch (event.keyCode) {

        case 16: // Shift
            transformControl.setTranslationSnap(null);
            transformControl.setRotationSnap(null);
            transformControl.setScaleSnap(null);
            break;

    }

});


//FINALS//

const animate = () => {
    renderFunction();
    document.getElementById("assetCount").innerHTML = "Total Assets: " + totalObjects;
    window.requestAnimationFrame(animate)
}
function renderFunction() {

    renderer.render(scene, camera);

}
animate()