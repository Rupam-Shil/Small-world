import { useState, useEffect } from 'react';
import * as THREE from 'three';
import './App.css';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

function App() {
	useEffect(() => {
		// SCENE
		const scene = new THREE.Scene();

		// ON RESIZE
		const size = {
			width: window.innerWidth,
			height: window.innerHeight,
		};

		// CAMERA
		const camera = new THREE.PerspectiveCamera(
			45,
			size.width / size.height,
			0.1,
			60
		);
		camera.position.set(6, 0, 0);

		// WINDOW RESIZE
		document.addEventListener('resize', () => {
			size.width = window.innerWidth;
			size.height = window.innerHeight;
			camera.aspect = size.width / size.height;
			camera.updateProjectionMatrix();

			renderer.setSize(size.width, size.height);
			renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
		});

		// OBJECT - WORLD
		const worldTexture = new THREE.TextureLoader().load('/small-world.jpg');

		const worldGeometry = new THREE.SphereGeometry(1, 40, 40);
		const worldMaterial = new THREE.MeshBasicMaterial({
			map: worldTexture,
		});
		const world = new THREE.Mesh(worldGeometry, worldMaterial);
		scene.add(world);
		// OBJECT - CLOUD
		const cloudTexture = new THREE.TextureLoader().load('/clouds.png');

		const cloudGeometry = new THREE.SphereGeometry(1.01, 40, 40);
		const cloudMaterial = new THREE.MeshBasicMaterial({
			map: cloudTexture,
			transparent: true,
		});
		const cloud = new THREE.Mesh(cloudGeometry, cloudMaterial);
		scene.add(cloud);

		// RENDERER
		const canvas = document.getElementById('myThreeJsCanvas');
		const renderer = new THREE.WebGLRenderer({
			canvas,
			antialias: true,
			alpha: true,
		});
		renderer.setSize(size.width, size.height);
		renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

		// CONTROLS
		const controls = new OrbitControls(camera, canvas);
		controls.enableDamping = true;

		// TICK
		const tick = () => {
			world.rotation.y += 0.0005;

			cloud.rotation.y -= 0.001;
			controls.update();
			renderer.render(scene, camera);
			window.requestAnimationFrame(tick);
		};
		tick();
	}, []);

	return (
		<div
			className="main"
			style={{
				width: '100vw',
				height: '100vh',
				overflow: 'hidden',
				background:
					'radial-gradient(circle at center, white, rgba(113,129,191,0.5) 50%)',
				position: 'relative',
			}}
		>
			<canvas id="myThreeJsCanvas"></canvas>
			<div className="header">METRONOMY</div>
			<button>CONNECT TO METAVERSE</button>
		</div>
	);
}

export default App;
