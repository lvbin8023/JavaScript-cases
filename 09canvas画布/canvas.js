let canvas = document.getElementById('canvas');
let context = canvas.getContext('2d');

let pen = document.getElementById('pen');
let eraser = document.getElementById('eraser');
let red = document.getElementById('red');
let yellow = document.getElementById('yellow');
let blue = document.getElementById('blue');
let black = document.getElementById('black');
let thin = document.getElementById('thin');
let thick = document.getElementById('thick');
let clear = document.getElementById('clear');
let lineWidth = 5;

// 自动设置canvas的宽高，并自动监听页面宽高变化进行刷新
autoSetCanvasSize(canvas);

// 监听鼠标事件
listenToUser(canvas);


// 注册按钮点击事件
let eraseEnabled = false;
pen.onclick = function () {
    eraseEnabled = false;
    pen.classList.add('active');
    eraser.classList.remove('active');
};
eraser.onclick = function () {
    eraseEnabled = true;
    eraser.classList.add('active');
    pen.classList.remove('active');
};

// 画笔颜色
penColor(red, 'red', 'active', yellow, blue, black);
penColor(yellow, 'yellow', 'active', red, blue, black);
penColor(blue, 'blue', 'active', red, yellow, black);
penColor(black, 'black', 'active', red, yellow, blue);

// 画笔粗细
thin.onclick = function () {
    lineWidth = 5;
};
thick.onclick = function () {
    lineWidth = 20;
};
// 清空画布
clear.onclick = function () {
    context.clearRect(0, 0, canvas.width, canvas.height);
    // 清除橡皮擦开启状态
    eraser.classList.remove('active');
};

// 封装的颜色函数
function penColor(id, color, className, one, two, three) {
    id.onclick = function () {
        context.strokeStyle = color;
        id.classList.add(className);
        one.classList.remove(className);
        two.classList.remove(className);
        three.classList.remove(className);
    };
}

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
function drawLine(x1, y1, x2, y2) {
    context.beginPath();
    context.moveTo(x1, y1);
    context.lineTo(x2, y2);
    context.lineWidth = lineWidth;
    context.stroke();
}

// 封装的监听用户使用的函数
function listenToUser(canvas) {
    let using = false;
    let lastPoint = {x: null, y: null};
    // 特性检测
    if (document.body.ontouchstart !== undefined) {
        // 触屏设备
        canvas.ontouchstart = function (event) {
            let x = event.touches[0].clientX;
            let y = event.touches[0].clientY;
            console.log(x, y);
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
                drawLine(lastPoint.x, lastPoint.y, newPoint.x, newPoint.y);
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