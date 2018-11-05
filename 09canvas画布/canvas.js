let canvas = document.getElementById('canvas');
let context = canvas.getContext('2d');
let active = document.getElementById('active');
let eraser = document.getElementById('eraser');
let brush = document.getElementById('brush');

// 自动设置canvas的宽高，并自动监听页面宽高变化进行刷新
autoSetCanvasSize(canvas);

// 监听鼠标事件
listenToUser(canvas);


// 注册按钮点击事件
let eraseEnabled = false;
eraser.onclick = function () {
    eraseEnabled = true;
    active.className = 'active x'
};
brush.onclick = function () {
    eraseEnabled = false;
    active.className = 'active';
};


// 封装的实时自动获取页面宽高的函数
function autoSetCanvasSize(canvas) {
    function setCanvasSize() {
        let pageWidth = document.documentElement.clientWidth;
        let pageHeight = document.documentElement.clientHeight;
        canvas.width = pageWidth;
        canvas.height = pageHeight;
    }

    setCanvasSize();

    window.onresize = function () {
        setCanvasSize()
    }
}

// 封装的画线函数
function drawLine(x1, y1, x2, y2, color) {
    context.beginPath();
    context.moveTo(x1, y1);
    context.lineTo(x2, y2);
    context.lineWidth = 3;
    context.strokeStyle = color;
    context.stroke();
}

function listenToUser(canvas) {
    let using = false;
    let lastPoint = {x: null, y: null};
    // 特性检测
    if (document.body.ontouchstart !== undefined) {
        // 触屏设备
        canvas.ontouchstart = function (event) {
            let x = event.touches[0].clientX;
            let y = event.touches[0].clientY;
            console.log(x,y);
            using = true;
            if (eraseEnabled) {
                context.clearRect(x - 5, y - 5, 10, 10);
            } else {
                lastPoint = {x: x, y: y};
            }
        };
        canvas.ontouchmove = function (event) {
            let x = event.touches[0].clientX;
            let y = event.touches[0].clientY;
            if (!using) {
                return false
            }
            if (eraseEnabled) {
                context.clearRect(x - 5, y - 5, 10, 10);
            } else {
                let newPoint = {x: x, y: y};
                drawLine(lastPoint.x, lastPoint.y, newPoint.x, newPoint.y, 'black');
                lastPoint = newPoint;
            }
        };
        canvas.ontouchend = function () {
            // 停止使用
            using = false;
        }
    } else {
        // 非触屏设备
        // 鼠标键按下事件
        canvas.onmousedown = function (event) {
            let x = event.clientX;
            let y = event.clientY;
            using = true;
            if (eraseEnabled) {
                context.clearRect(x - 5, y - 5, 10, 10);
            } else {
                lastPoint = {x: x, y: y};
            }
        };

        // 鼠标移动事件
        canvas.onmousemove = function (event) {
            let x = event.clientX;
            let y = event.clientY;
            if (!using) {
                return false
            }
            if (eraseEnabled) {
                context.clearRect(x - 5, y - 5, 10, 10);
            } else {
                let newPoint = {x: x, y: y};
                drawLine(lastPoint.x, lastPoint.y, newPoint.x, newPoint.y, 'black');
                lastPoint = newPoint;
            }
        };

        // 鼠标抬起事件
        canvas.onmouseup = function () {
            // 停止使用
            using = false;
        };
    }
}