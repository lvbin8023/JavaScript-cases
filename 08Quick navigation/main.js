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
    'e': 'www.ele.me/home',
    'r': 'name.renren.com',
    't': 'twitter.com',
    'y': 'it.youtube.com',
    'u': 'www.ubuntu.com',
    'i': 'www.iplaysoft.com',
    'o': 'www.opera.com',
    'p': 'tv.pptv.com',
    'a': 'www.alipay.com',
    's': 'www.sohu.com',
    'd': 'www.douban.com',
    'f': 'www.facebook.com',
    'g': 'www.google.com',
    'h': 'www.hupu.com',
    'j': 'www.jianshu.com',
    'k': 'www.kugou.com',
    'l': 'cn.linkedin.com',
    'z': 'www.zhihu.com',
    'x': 'www.mi.com',
    'c': 'codepen.io',
    'v': 'cn.vuejs.org',
    'b': 'getbootstrap.com',
    'n': 'www.netflix.com',
    'm': 'www.mclaren.com'
};
let hashInStorage = JSON.parse(localStorage.getItem('backup'||'null'));
if (hashInStorage) {
    let hash = hashInStorage;
}

// 获取id
let divWrapper = document.getElementById('wrapper');
// 遍历数组
for (let i = 0; i < arr.length; i++) {
    // 创建div标签
    let divContainer = document.createElement('div');
    // 将创建的div标签添加到id为wrapper的div标签中
    divWrapper.appendChild(divContainer);
    // 把每次遍历出来的数组存储到row中
    let row = arr[i];
    // 遍历每个数组row
    for (let j = 0; j < row.length; j++) {
        // 创建kbd标签
        let kbd = document.createElement('kbd');
        // 添加内容到kbd标签中
        kbd.textContent = row[j];
        // 创建button标签
        let kbdButton = document.createElement('button');
        // 添加内容到button标签中
        kbdButton.textContent = '编辑';
        // 添加button标签到kbd标签中
        kbd.appendChild(kbdButton);
        // 将kbd标签添加到divContainer中
        divContainer.appendChild(kbd);
        // 将row[j]绑定到button的id上
        kbdButton.id = row[j];
        // 注册button标签的点击事件
        kbdButton.onclick = function (event) {
            // 把每次编辑button的id保存在key中
            let key = event.target.id;
            // 把每次输入的网址存储到webUrl中
            let webUrl = prompt('请输入网址');
            // 把webUrl保存到hash中
            hash[key] = webUrl;
            localStorage.setItem('backup',JSON.stringify(hash))
        }
    }
}

// 注册页面按键按下的事件
document.onkeypress = function (event) {
    // 保存每次按下的每个按键信息
    let keys = event.key;
    // 将hash中的网址保存到webSite中
    let webSite = hash[keys];
    window.open('http://'+webSite,'_blank');
};