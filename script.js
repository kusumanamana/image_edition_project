
<script>
    const CANVAS_DIM = 500;
    let canvas, memeImage, generateMeme, panel, changeImage, ctx;
    let reader = new FileReader();
    let img = new Image();
    let textInput, textColorInput;

    const addImage = (img) => {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(
            img, 0, 0, img.width, img.height, // source rectangle
            0, 0, canvas.width, canvas.height // destination rectangle
        );
    };

    const createChangeImageButton = () => {
        changeImage = document.createElement('button');
        changeImage.classList = ['button'];
        changeImage.textContent = "Change Image";
        changeImage.addEventListener('click', () => {
            // remove the changeImage button
            panel.removeChild(changeImage);
            // add the memeImage input
            panel.appendChild(memeImage);
        });
    };

    const handleImageChange = () => {
        img.src = reader.result;
        addImage(img);
    };

    const handleTextChange = () => {
        const text = textInput.value.trim();
        const textColor = textColorInput.value;
        drawText(text, textColor);
    };

    const generateRandomColor = () => {
        const randomColor = Math.floor(Math.random() * 16777215).toString(16);
        return "#" + randomColor;
    };

    const init = () => {
        
        canvas = document.getElementById('memeCanvas');
        memeImage = document.getElementById('memeImage');
        generateMeme = document.getElementById('generateMeme');
        panel = document.getElementById('configPanel');
        textInput = document.getElementById('textInput');
        textColorInput = document.getElementById('textColorInput');

        createChangeImageButton();
        ctx = canvas.getContext('2d');

        canvas.height = canvas.width = CANVAS_DIM;

        memeImage.addEventListener('change', () => {
            reader.readAsDataURL(memeImage.files[0]);
            panel.removeChild(memeImage);
            panel.appendChild(changeImage);
        });
        reader.onload = handleImageChange;
        reader.onloadend = handleImageChange;

        textInput.addEventListener('input', handleTextChange);
        textColorInput.addEventListener('input', handleTextChange);

        generateMeme.addEventListener('click', function () {
            let dimage = canvas.toDataURL('image/jpg');
            this.href = dimage;
        });
    };

    const drawText = (text, color) => {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = generateRandomColor();
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(
            img, 0, 0, img.width, img.height, 
            0, 0, canvas.width, canvas.height 
        );
        ctx.fillStyle = color;
        ctx.font = '30px Impact';
        ctx.textAlign = 'center';
        ctx.fillText(text, canvas.width / 2, canvas.height - 50);
    };

    init();
</script>