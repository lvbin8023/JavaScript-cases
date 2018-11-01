let arr = {
    0: {
        0: 'q',
        1: 'w',
        2: 'e',
        3: 'r',
        4: 't',
        5: 'y',
        6: 'u',
        7: 'i',
        8: 'o',
        9: 'p',
        length: 10
    },
    1: {
        0: 'a',
        1: 's',
        2: 'd',
        3: 'f',
        4: 'g',
        5: 'h',
        6: 'j',
        7: 'k',
        8: 'l',
        length: 9
    },
    2: {
        0: 'z',
        1: 'x',
        2: 'c',
        3: 'v',
        4: 'b',
        5: 'n',
        6: 'm',
        length: 7
    },
    'length': 3
};
let hash = {
    'q': 'www.qq.com',
    'w': 'www.weibo.com',
    'e': 'www.ele.me',
    'r': 'www.renren.com',
    't': 'tencent.com',
    'y': 'www.yahoo.com',
    'u': 'www.uc.cn',
    'i': 'www.iplaysoft.com',
    'o': 'www.opera.com',
    'p': 'tv.pptv.com',
    'a': 'www.apple.com',
    's': 'www.sogou.com',
    'd': 'www.douban.com',
    'f': 'www.facebook.com',
    'g': 'www.google.com',
    'h': 'www.hupu.com',
    'j': 'www.jianshu.com',
    'k': 'www.kugou.com',
    'l': 'cn.linkedin.com',
    'z': 'www.zhihu.com',
    'x': 'www.mi.com',
    'c': 'www.canon.com.cn',
    'v': 'www.vivo.com.cn',
    'b': 'getbootstrap.com',
    'n': 'http://www.newbalance.com.cn/',
    'm': 'www.mclaren.com'
};
// 取出localStorage中的backup对应的hash
let hashInStorage = JSON.parse(localStorage.getItem('backup' || 'null'));
if (hashInStorage) {
    let hash = hashInStorage;
}

// 获取id
let divWrapper = document.getElementById('wrapper');
// 遍历数组
for (let i = 0; i < arr.length; i++) {
    // 创建div标签
    let divContainer = document.createElement('div');
    // 为每行div添加样式
    divContainer.className = 'row';
    // 将创建的div标签添加到id为wrapper的div标签中
    divWrapper.appendChild(divContainer);
    // 把每次遍历出来的数组存储到row中
    let row = arr[i];
    // 遍历每个数组row
    for (let j = 0; j < row.length; j++) {
        // 创建kbd标签
        let kbd = document.createElement('kbd');
        // 将kbd标签添加到divContainer中
        divContainer.appendChild(kbd);
        // 添加样式
        kbd.className = 'key';
        // 创建span标签
        let span = document.createElement('span');
        // 添加内容到span标签中
        span.textContent = row[j];
        // 添加span标签到kbd标签中
        kbd.appendChild(span);
        // 添加样式
        span.className = 'text';
        // 创建img标签
        let img = document.createElement('img');
        // 判断img是否正常加载
        if (hash[row[j]]) {
            // 为img标签设置src
            img.src = 'http://' + hash[row[j]] + '/favicon.ico';
        } else {
            img.src = '//i.loli.net/2017/11/10/5a05afbc5e183.png';
        }
        // 监听img下载情况
        img.onerror = function (event) {
            event.target.src = '//i.loli.net/2017/11/10/5a05afbc5e183.png';
        };
        // 添加img标签到kbd标签中
        kbd.appendChild(img);
        // 创建button标签
        let kbdButton = document.createElement('button');
        // 添加内容到button标签中
        kbdButton.textContent = '编辑';
        // 添加button标签到kbd标签中
        kbd.appendChild(kbdButton);
        // 将row[j]绑定到button的id上
        kbdButton.id = row[j];
        // 注册button标签的点击事件
        kbdButton.onclick = function (event) {
            let button2 = event.target;
            let img2 = button2.previousSibling;
            // 把每次编辑button的id保存在key中
            let key = button2.id;
            // 把每次输入的网址存储到webUrl中
            let webUrl = prompt('请输入网址');
            img2.src = 'http://' + webUrl + '/favicon.ico';
            img2.onerror = function (event) {
                event.target.src = '//i.loli.net/2017/11/10/5a05afbc5e183.png';
            };
            // 把webUrl保存到hash中
            hash[key] = webUrl;
            localStorage.setItem('backup', JSON.stringify(hash))
        }
    }
}

// 监听页面按键按下的事件
document.onkeypress = function (event) {
    // 保存每次按下的每个按键信息
    let keys = event.key;
    // 将hash中的网址保存到webSite中
    let webSite = hash[keys];
    window.open('http://' + webSite, '_blank');
};