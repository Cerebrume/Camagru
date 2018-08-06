(function(){
    const canvas = document.getElementById('canvas');
    let ctx = canvas.getContext('2d');
    var BB=canvas.getBoundingClientRect();
    var offsetX=BB.left;
    var offsetY=BB.top;
    let isDragging = false;
    const canvasWidth = canvas.width;
    const canvasHeight = canvas.height;
    canvas.onselectstart = () => false;
    let localMediaStream = null;
    const video = document.getElementById('video');
    let defaultPosX = 240 - 75;
    let defaultPosY = 240 - 75;
    const snapBtn = document.getElementById('snap');
    const modal = document.getElementById('exampleModal')

    snapBtn.addEventListener('click', snapshot);
    video.addEventListener('play', draw, false);

    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
        navigator.mediaDevices
        .getUserMedia({video: true})
        .then(function(stream){
            video.srcObject = stream;
            video.play();
            localMediaStream = stream;
        }).catch(e => console.log(e))
    }

    
    function snapshot() {
        console.log(currentPic, localMediaStream, uploadedImg.src)
        if (!currentPic) return
        if (localMediaStream || uploadedImg.src) {
            modal.style.display = 'block';
            modal.classList.add('show');
            modal.style.backgroundColor = 'rgba(0, 0, 0, 0.9)';
            //create_preview();
        } else return;
    }
    
/*
** Canvas mouse handlers
*/

function handleMouseDown(e){
    e.preventDefault();
    e.stopPropagation();
	var mouseX = parseInt(e.clientX - offsetX);
	var mouseY = parseInt(e.clientY - offsetY);
    // set the drag flag
    isDragging = false;
    if (mouseX > defaultPosX - 150 && mouseX < defaultPosX + 150 
        && mouseY > defaultPosY - 150 && mouseY < defaultPosY + 150) {
        isDragging = true;
    
    }
    defaultPosX = mouseX;
    defaultPosY = mouseY;

  }

  function handleMouseUp(e){
    e.preventDefault();
    e.stopPropagation();
	isDragging=false;
  }

  function handleMouseOut(e){
    e.preventDefault();
    e.stopPropagation();
	// user has left the canvas, so clear the drag flag
	isDragging=false;
  }

  function handleMouseMove(e){
    e.preventDefault();
    e.stopPropagation();
        var mouseX = parseInt(e.clientX - offsetX);
        var mouseY = parseInt(e.clientY - offsetY);

        var dx = mouseX - defaultPosX;
        var dy = mouseY - defaultPosY;
        if (isDragging) {
            defaultPosX += dx;
            defaultPosY += dy;
            defaultPosX = mouseX;
            defaultPosY = mouseY;
    
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
            ctx.clearRect(0,0,canvas.width,canvas.height);

            ctx.drawImage(uploadedImg, 0, 0, canvasWidth, canvasHeight);
        }
        uploadedImg.src = fr.result;
    }

    function draw() {
        ctx.clearRect(0,0,canvas.width,canvas.height);
        if (localMediaStream) {
            ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
        }
        if(uploadedImg) {
            ctx.drawImage(uploadedImg, 0, 0, canvasWidth, canvasHeight);
        }
        if (currentPic){
		    ctx.drawImage(currentPic, defaultPosX, defaultPosY, 150, 150);
        }
    }

    setInterval(function() {
        draw();
      }, 10);


/*END FILE UPLOAD*/
})()