(function(){
    const canvas = document.getElementById('canvas');
    let ctx = canvas.getContext('2d');
    const offsetX=canvas.offsetLeft;
    const offsetY=canvas.offsetTop;
    let isDragging = false;
    const canvasWidth = canvas.width;
    const canvasHeight = canvas.height;
    let currentX = 0;
    let currentY = 0;
    canvas.onselectstart = () => false;
    
/*
** Canvas mouse handlers
*/

function handleMouseDown(e){
	var mouseX = parseInt(e.clientX - offsetX);
	var mouseY = parseInt(e.clientY - offsetY);
    // set the drag flag
    console.log(mouseX, mouseY);
	if (mouseX) {
      isDraggable = true;
      //currentX = mouseX;
      //currentY = mouseY;
    }
  }

  function handleMouseUp(e){
	
	// clear the drag flag
	isDragging=false;

  }

  function handleMouseOut(e){
	
	
	// user has left the canvas, so clear the drag flag
	isDragging=false;
  }

  function handleMouseMove(e){
	  
	if (isDragging) {
		canMouseX=parseInt(e.clientX-offsetX);
        canMouseY=parseInt(e.clientY-offsetY);
        console.log(canMouseX, canMouseY, e.clientX, e.clientY);
		ctx.drawImage(currentPic, canMouseX, canMouseY, 150,150);
	}
	
	// if the drag flag is set, clear the canvas and draw the image

  }

canvas.addEventListener('mousedown', handleMouseDown, false);
canvas.addEventListener('mouseup', handleMouseUp, false);
canvas.addEventListener('mousemove', handleMouseMove, false);
canvas.addEventListener('mouseout', handleMouseOut, false);


/*
** END Canvas mouse handlers
*/

/*
** FILE UPLOAD HANDLERS
*/

    const selectedFile = document.getElementById('file');
    const fr = new FileReader();
    const faces = document.getElementsByClassName('face-preset');
    let currentPic = null;
    const uploadedImg = new Image();

    function addEventListenerForFaces() {
        for (let i = 0; i < faces.length; i++) {
            faces[i]
            .addEventListener('click', e => {
                currentPic = e.target;
                console.log(currentPic);
            });
        }
    }

    addEventListenerForFaces();

    selectedFile.addEventListener("change", handleFiles, false);

    function handleFiles() {
        const file = this.files[0];
        fr.onload = createImage;
        fr.readAsDataURL(file);
    }

    function createImage() {
        
        uploadedImg.onload = function() {
            ctx.drawImage(uploadedImg, 0, 0, canvasWidth, canvasHeight);
        }
        uploadedImg.src = fr.result;
    }

    function draw() {
        if(canvas.getContext && uploadedImg && !isDragging) {
            ctx.drawImage(uploadedImg, 0, 0, canvasWidth, canvasHeight);
        }
        if (canvas.getContext && currentPic && isDragging) {
            ctx.drawImage(currentPic, canMouseX, canMouseY, 150, 150);
        }
    }

    setInterval(function() {
        ctx.clearRect(0,0,canvas.width,canvas.height);
        draw();
      }, 100);


/*END FILE UPLOAD*/
})()