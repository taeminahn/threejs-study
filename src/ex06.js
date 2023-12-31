import * as THREE from 'three';

// ----- 주제: 브라우저 창 사이즈 변경에 대응하기

export default function example() {
  // html에서 캔버스 가져와서 사용하기
  const canvas = document.querySelector('#three-canvas');
  const renderer = new THREE.WebGLRenderer({
    canvas,
    antialias: true,
  });
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setPixelRatio(window.devicePixelRatio > 1 ? 2 : 1)

// Scene
  const scene = new THREE.Scene();

// Camera
// Perspective Camera(원근 카메라)
  const camera = new THREE.PerspectiveCamera(
    75, // 시야각(filed of view)
    window.innerWidth / window.innerHeight, // 종횡비(aspect)
    0.1, // near
    1000 // far
  );
  camera.position.z = 5;
  scene.add(camera);

  const light = new THREE.DirectionalLight(0xffffff, 1);
  light.position.x = 1;
  light.position.z = 2;
  scene.add(light);

// Mesh
  const geometry = new THREE.BoxGeometry(1, 1, 1);
  const material = new THREE.MeshStandardMaterial({
    color: 'red'
  });
  const mesh = new THREE.Mesh(geometry, material);
  scene.add(mesh);

// 그리기
  const clock = new THREE.Clock();

  function draw() {
    const delta = clock.getDelta();

     // 각도는 Radian을 사용
    // 360도는 2파이
    // mesh.rotation.y += 0.1;
    // mesh.rotation.y += THREE.MathUtils.degToRad(1);
    mesh.rotation.y += 2 * delta;
    mesh.position.y += delta;
    if(mesh.position.y > 3) {
      mesh.position.y = 0;
    }
    renderer.render(scene, camera);
    
    // window.requestAnimationFrame(draw);
    renderer.setAnimationLoop(draw);
  }

  function setSize() {
    // 카메라
    camera.aspect = window.innerWidth / window.innerHeight;
    // updateProjectionMatrix 카메라 투영에 관련된 값에 변화가 있을 경우 실행해야 함
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.render(scene, camera);
  }

// 이벤트
  window.addEventListener('resize', setSize);

  draw()
}
