
// const sizes = {
//     width: window.innerWidth,
//     height: window.innerHeight
// }

// window.addEventListener('resize', () =>
// {
//     // Update sizes
//     sizes.width = window.innerWidth
//     sizes.height = window.innerHeight

//     // Update camera
//     camera.aspect = sizes.width / sizes.height
//     camera.updateProjectionMatrix()

//     // Update renderer
//     renderer.setSize(sizes.width, sizes.height)
//     renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
// })



// <!-- <div class="buttonsX">
// <button><input type="range" id="sofaposX" min="-900" max="1000" value="100" style="width: 90px;">Move</button>
// </div>
// <div class="buttonsX">
// <button><input type="range" id="sofaposZ" min="-1000" max="0" value="-500" style="width: 90px;">Move</button>
// </div> -->
// <!-- <div id="console">
// <h4>Pan: <span id="panValue">0</span>, Tilt: <span id="tiltValue">0</span></h4>
// </div> -->


// <div class="container">
// <div class="row">


// </div>
// </div>



// MENU

// var mouse = new THREE.Vector2();
// var raycaster = new THREE.Raycaster();
// var intersect;
// var rect = renderer.domElement.getBoundingClientRect();

// window.addEventListener('mousemove', onDocumentMouseMove, false);
// window.addEventListener('mousedown', onMouseDown, false);
// window.addEventListener('resize', onWindowResize, false);
// if (document.addEventListener) {
//   document.addEventListener('contextmenu', function (e) {
//     e.preventDefault();
//   }, false);
// } else {
//   document.attachEvent('oncontextmenu', function () {
//     window.event.returnValue = false;
//   });
// }


// function onDocumentMouseMove(event) {
//   event.preventDefault();
  
//   mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
//   mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;

// }

// function onMouseDown(event) {
//   event.preventDefault();
//   var rightclick;
//     if (!event) var event = window.event;
//     if (event.which) rightclick = (event.which == 3);
//     else if (event.button) rightclick = (event.button == 2);
//   if (!rightclick) return;

//   raycaster.setFromCamera(mouse, camera);

//   var intersects = raycaster.intersectObjects(objects,true);

//   if (intersects.length) {
//     intersect = intersects[0].object;
//     menu.style.left = (event.clientX - rect.left) + "px";
//     menu.style.top = (event.clientY - rect.top) + "px";
//     menu.style.display = "";
//   }
//   else{
//     intersect = undefined;
//   }
// }

// // changeColor.addEventListener("click", function(){
// // 	intersect.material.color.setHex(Math.random() * 0x777777 + 0x777777);
// //   menu.style.display = "none";
// // }, false);

// function onWindowResize(event) {
//   camera.aspect = window.innerWidth / window.innerHeight;
//   camera.updateProjectionMatrix();
//   renderer.setSize(window.innerWidth, window.innerHeight);
// }


// <!-- <div id="menu" style="position:absolute;display:none;background-color:red">
// <span color="red">Object</span>
// <button style="cursor: pointer; font-size: 32px;" id="scaleButtonDown">-</button> Scale <button
//   style="cursor: pointer; font-size: 32px;" id="scaleButtonUp">+</button>
// <br>
// <button><input type="range" id="assetRotate" min="-360" max="360" value="0"
//     style="width: 250px;">Rotate</button>
// <br>
// </div> -->


// <!-- <div class="panel" style="display: none;">
// <div class="block">
// </div>
// <div class="buttonsX">
//   <div id="joystick">
//     <div class="draggable" id="knob"></div>
//   </div>
// </div>
// </div> -->



// //JOYSTICK
// document.addEventListener('DOMContentLoaded', function () {

//     var joystick = document.getElementById("joystick"),
//         knob = document.getElementById("knob"),
//         target_x = joystick.clientWidth / 2 - knob.clientWidth / 2,
//         target_y = joystick.clientHeight / 2 - knob.clientHeight / 2;

//     // var panSpan  = document.getElementById("panValue"),
//     // tiltSpan = document.getElementById("tiltValue");

//     knob.style.webkitTransform = "translate(" + target_x + "px, " + target_y + "px)";

//     // update the position attributes
//     var target = document.getElementById("knob");
//     updatePositionAttributes(target, target_x, target_y);

//     // target elements with the "draggable" class
//     interact('.draggable')
//         .draggable({
//             inertia: false,
//             // keep the element within the area of its parent
//             restrict: {
//                 restriction: "parent",
//                 endOnly: false,
//                 elementRect: { top: 0, left: 0, bottom: 1, right: 1 }
//             },
//             onmove: dragMoveListener,
//             onend: function (event) {
//                 var target = event.target;
//                 TweenLite.to(target, 0.2, { ease: Back.easeOut.config(1.7), "webkitTransform": "translate(" + target_x + "px, " + target_y + "px)" });
//                 updatePositionAttributes(target, target_x, target_y);
//                 // panSpan.innerHTML = 0;
//                 // tiltSpan.innerHTML = 0;
//             }
//         });

//     function dragMoveListener(event) {
//         var target = event.target,
//             // keep the dragged position in the data-x/data-y attributes
//             x = (parseFloat(target.getAttribute('data-x')) || 0) + event.dx,
//             y = (parseFloat(target.getAttribute('data-y')) || 0) + event.dy;

//         // translate the element
//         target.style.webkitTransform = target.style.transform = 'translate(' + x + 'px, ' + y + 'px)';
//         updatePositionAttributes(target, x, y);

//         // update text display 
//         // panSpan.innerHTML = (x-joystick.clientWidth/4);
//         // tiltSpan.innerHTML = (y-joystick.clientHeight/4);
//         updateKnobPosition((x - joystick.clientWidth / 4), (y - joystick.clientHeight / 4));
//     }

//     function updatePositionAttributes(element, x, y) {
//         target.setAttribute('data-x', x);
//         target.setAttribute('data-y', y);
//     }

// });

// function onDocumentMouseDown(event) {
//     const mouse = {
//         x: (event.clientX / renderer.domElement.clientWidth) * 2 - 1,
//         y: -(event.clientY / renderer.domElement.clientHeight) * 2 + 1,
//     };
//     raycaster.setFromCamera(mouse, camera);

//     const intersects = raycaster.intersectObjects(sceneMeshes, false);

//     const color = Math.random() * 0xffffff;

//     if (intersects.length > 0) {
//         let n = new THREE.Vector3();
//         n.copy(intersects[0].face.normal);
//         n.transformDirection(intersects[0].object.matrixWorld);
//         const selectedObject = intersects[0];
//         alert('this is a Drink');

//     }
// }



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
