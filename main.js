window.jQuery = function(nodeOrSelector) {
    let nodes = {}
    nodes.addClass = function() {}
    nodes.html = function() {}
    return nodes
}
window.$ = window.jQuery

window.jQuery.ajax = function({ url, method, body, successFn, failFn, headers }) {
    //可将函数的参数改为obj
    //let { url, method, body, successFn, failFn, headers } = obj  效果一致
    //ES6解构赋值

    let request = new XMLHttpRequest()
    request.open(method, url) // 配置request
    for (let key in headers) {
        let value = headers[key]
        request.setRequestHeader(key, value)
    }
    request.onreadystatechange = () => {
        if (request.readyState === 4) {
            if (request.status >= 200 && request.status < 300) {
                successFn.call(undefined, request.responseText)
            } else if (request.status >= 400) {
                failFn.call(undefined, request)
            }
        }
    }
    request.send(body)
}

function f1(responseText) {
    console.log(responseText)
}

function f2(responseText) {
    console.log(responseText)
}

myButton.addEventListener('click', (e) => {
    window.jQuery.ajax({
        url: '/xxx',
        method: 'get',
        headers: {
            'content-type': 'application/x-www-form-urlencoded',
            'w': '18'
        },
        successFn: (responseText) => {
            f1.call(undefined, responseText)
            f2.call(undefined, responseText)
        },
        failFn: (request) => {
            console.log(request)
            console.log(request.status)
            console.log(request.responseText)
        }
    })
})