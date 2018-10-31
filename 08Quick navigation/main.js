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

let divWrapper = document.getElementById('wrapper');

index = 0;
while (index < arr['length']) {
    let div1 = document.createElement('div');
    divWrapper.append(div1);
    row = arr[index];
    console.log(row.length);
    index2 = 0;
    while (index2 < row.length) {
        let divKbd = document.createElement('kbd');
        divKbd.textContent = row[index2];
        div1.append(divKbd);
        index2++;
    }
    index++;
}

document.onkeypress = function (event) {
    let keys = event.key;
    console.log(keys);
    let webSite = hash[keys];
    console.log(webSite);
    // location.href = 'http://'+webSite;
    window.open('http://' + webSite, '_blank');
};