(function() {
    var requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame ||
                                window.webkitRequestAnimationFrame || window.msRequestAnimationFrame;
    window.requestAnimationFrame = requestAnimationFrame;
  })();

(function(){
    const canvas = document.getElementById('canvas');
    let ctx = canvas.getContext('2d');
    let isDragging = false;
    const getClientRect = canvas.getBoundingClientRect()
    const offsetLeft = getClientRect.left;
    const offsetTop = getClientRect.top;
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
    const shareBrn = document.querySelector('.shareBtn');
    const removeImgBtn = document.querySelector('.removeImg');


removeImgBtn.addEventListener('click', function() {
    if (uploadedImg) uploadedImg = null;
})
    shareBrn.addEventListener('click', sendShare)
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
        if (!currentPic) return
        if (localMediaStream || uploadedImg.src) {
            modal.style.display = 'block';
            modal.classList.add('show');
            modal.style.backgroundColor = 'rgba(0, 0, 0, 0.9)';
            create_preview();
        } else return;
    }

    function create_preview() {
        const previewImg = document.querySelector('.preview-img');
        const previewComment = document.querySelector('.preview-comment-text');
        const comment = document.querySelector('.post-add__comment');
        previewImg.src = canvas.toDataURL('image/jpeg', 1.0);
        previewComment.innerHTML = comment.value
    }

    function sendShare() {
        fetch('', {
            method: 'POST',
            headers: {
                'Accept': 'application/json, application/xml, text/plain, text/html, *.*',
                'Content-Type': 'application/json'
            },
            mode: 'cors',
            body: JSON.stringify({
                submit_img: true,
                sticker: currentPic.src,
                userImg: 'asd'
            })
        })
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
    if (mouseX > (startX - stickerWidth / 2) &&
        mouseX < (startX + stickerWidth / 2) &&
        mouseY > (startY - stickerHeight / 2) &&
        mouseY < (startY + stickerHeight / 2)) {
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

        var mouseX = parseInt(e.clientX -offsetLeft);
        var mouseY = parseInt(e.clientY -offsetTop);

        var dx = mouseX - startX;
        var dy = mouseY - startY;
        defaultPosX += dx;
        defaultPosY += dy;
        startX = mouseX;
        startY = mouseY;
    }
    
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
    let uploadedImg = new Image();

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
            ctx.fillStyle = 'rgba(0,0,0,0.1)';
            ctx.fillRect(defaultPosX,defaultPosY,stickerWidth,stickerHeight);
            ctx.drawImage(currentPic, defaultPosX, defaultPosY, stickerWidth, stickerHeight);

        }
    }

    setInterval(function() {
        requestAnimationFrame(draw);
    }, 10);


/*END FILE UPLOAD*/
})()