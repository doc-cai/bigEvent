$('.regleft').click(function () {
    $('.form_login').show()
    $('.form_reg').hide();
})
$('.logleft').click(function () {
    $('.form_reg').show()
    $('.form_login').hide();
})

var form = layui.form
form.verify({
    pwd: [/^[\S]{6,12}$/, '密码必须6到12位，且不能出现空格'],
    // 校验两次密码是否一致的规则
    repwd: function (value) {
        // 通过形参拿到的是确认密码框中的内容
        // 还需要拿到密码框中的内容
        // 然后进行一次等于的判断
        // 如果判断失败,则return一个提示消息即可
        var pwd = $('.originpwd').val()
        if (pwd !== value) {
            return '两次密码不一致！'
        }
    }
})
// 注册请求数据
$('#form_reg').on('submit', function (e) {
    console.log(1);
    e.preventDefault()
    // 获取注册的账号密码
    var data = {
        username: $('#form_reg [name=username]').val(),
        password: $('#form_reg [name=password]').val()
    }
    console.log(data);
    $.post('/api/reguser', data, function (res) {
        if (res.status != 0) {
            layer.msg('不开心。。', {
                icon: 5
            });
        }
        layer.alert('Suprise Mother Fucker', {
            icon: 1
        });
        $('.logleft').click()

    })
})
// 登录请求数据
$('#form_login').on('submit', function (e) {

    e.preventDefault()

    $.ajax({
        url: '/api/login',
        method: 'POST',
        data: $(this).serialize(),
        success: function (res) {
            if (res.status !== 0) {
                return layer.msg('不开心。。', {
                    icon: 5
                });
            }
            localStorage.setItem('token', res.token)
            layer.alert('Suprise MOTHER fucker', {
                icon: 1
            });
            location.href = 'index.html'
        }
    })


})