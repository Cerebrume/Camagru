(function(){
    const canvas = document.getElementById('canvas');
    let ctx = canvas.getContext('2d');
    let isDragging = false;
    const getClientRect = canvas.getBoundingClientRect()
    const offsetLeft = getClientRect.left;
    const offsetTop = getClientRect.top;
    console.log(getClientRect);
    const canvasWidth = canvas.width;
    const canvasHeight = canvas.height;
    canvas.onselectstart = () => false;
    let localMediaStream = null;
    const stickerWidth = 150;
    const stickerHeight = 150;
    const video = document.getElementById('video');
    let defaultPosX = 0;
    let defaultPosY = 0;
    let startX;
    let startY;
    const snapBtn = document.getElementById('snap');
    const modal = document.getElementById('exampleModal')
    const closeBtnX = document.querySelector('.close');
    const closeBtn = document.querySelector('.closeBtn');

    closeBtnX.addEventListener('click', closeModal)
    closeBtn.addEventListener('click', closeModal)

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

    function closeModal () {
        modal.style.display = 'none';
        modal.classList.remove('show');
        modal.style.backgroundColor = '';

    }


    function snapshot() {
        console.log(currentPic, localMediaStream, uploadedImg.src)
        if (!currentPic) return
        if (localMediaStream || uploadedImg.src) {
            modal.style.display = 'block';
            modal.classList.add('show');
            modal.style.backgroundColor = 'rgba(0, 0, 0, 0.9)';
            create_preview();
        } else return;
    }

    function create_preview() {
        
    }
    
/*
** Canvas mouse handlers
*/

function handleMouseDown(e){
    e.preventDefault();
    e.stopPropagation();
	var mouseX = parseInt(e.clientX - offsetLeft);
	var mouseY = parseInt(e.clientY - offsetTop);
    // set the drag flag
    isDragging = false;
    if (mouseX > defaultPosX &&
        mouseX < (startX + stickerWidth) &&
        mouseY > defaultPosY &&
        mouseY < (startY + stickerHeight)) {
        isDragging = true;
    
    }
    startX = mouseX;
    startY = mouseY;

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
    if (isDragging) {

        var mouseX = parseInt(e.clientX - offsetLeft);
        var mouseY = parseInt(e.clientY - offsetTop);

        var dx = mouseX - startX;
        var dy = mouseY - startY;
        console.log(mouseX, mouseY, e.clientX, e.clientY)
        defaultPosX += dx;
        defaultPosY += dy;
        startX = mouseX;
        startY = mouseY;

    }
	// if the drag flag is set, clear the canvas and draw the image
    ctx.lineTo(mouseX, mouseY);
    ctx.stroke()
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
            faces[i].style.width = stickerWidth;
            faces[i].style.height = stickerHeight;
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
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            ctx.drawImage(uploadedImg, 0, 0, canvasWidth, canvasHeight);
        }
        uploadedImg.src = fr.result;
    }
    function draw() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        if (localMediaStream) {
            ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
        }
        if(uploadedImg) {
            ctx.drawImage(uploadedImg, 0, 0, canvasWidth, canvasHeight);
        }
        if (currentPic){
		    ctx.drawImage(currentPic, defaultPosX, defaultPosY, stickerWidth, stickerHeight);
        }

    }

    setInterval(function() {
        draw();
      }, 100);


/*END FILE UPLOAD*/
})()