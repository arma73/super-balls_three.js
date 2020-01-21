# Super Balls

[![N|Solid](screen/favicon.png)](https://superballs.arma.now.sh/)

Animated 3D computer graphics created using the three.js JavaScript library, together with HTML5 Canvas.
See at https://superballs.arma.now.sh/

### Features!

  - Mesh path is a sinusoid 
    ![](screen/Sinusoid.png)
  - Each moving ball leaves a fading shadow
  
    ![](screen/ShadowParticle.png)
  - Rendering is divided into two scenarios and we can observe with two different abstractions.
    ![](screen/Display.png)
  - Don't clean the camera when rendering
    ![](screen/Clear_Flag.png)
  - We can only control the display of the first scenario using the camera flag

You can also press the key:
  - "C" Don't clear the camera.
  - "W" Translate.
  - "E" Rotate.
  - "+/-" Increase/Decrease size.
  - "Q" Toggle word/local space.
  ...

### Installation

Install the dependencies and devDependencies and start the server (localhost:8082).

```sh
$ npm install 
$ npm run dev
```

For production environments...

```sh
$ npm run build
```
Your project will be in directory /dist
