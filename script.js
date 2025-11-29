 $(document).ready(function() {
    // 注册 Service Worker
    if ('serviceWorker' in navigator) {
        navigator.serviceWorker.register('/sw.js')
            .then(registration => {
                console.log('Service Worker 注册成功:', registration);
            })
            .catch(error => {
                console.log('Service Worker 注册失败:', error);
            });
    }

    // 刷新按钮点击事件
    $('#refreshBtn').on('click', function() {
        // 模拟数据刷新
        const statusMessage = $('#statusMessage');
        statusMessage.removeClass('success error').addClass('success')
            .text('数据已刷新！时间: ' + new Date().toLocaleTimeString())
            .fadeIn(300);
        
        // 3秒后隐藏消息
        setTimeout(function() {
            statusMessage.fadeOut(300);
        }, 3000);
    });

    // PWA 安装提示
    let deferredPrompt;
    const installBtn = $('#installBtn');
    const installPrompt = $('#installPrompt');

    window.addEventListener('beforeinstallprompt', (e) => {
        // 阻止默认的安装提示
        e.preventDefault();
        // 保存事件以便稍后触发
        deferredPrompt = e;
        // 显示安装按钮
        installBtn.css('display', 'block');
        installPrompt.text('点击下方按钮安装此应用到您的设备。');
    });

    installBtn.on('click', function() {
        // 隐藏安装按钮
        installBtn.css('display', 'none');
        // 显示安装提示
        if (deferredPrompt) {
            deferredPrompt.prompt();
            // 等待用户响应
            deferredPrompt.userChoice.then((choiceResult) => {
                if (choiceResult.outcome === 'accepted') {
                    installPrompt.text('应用已安装到您的设备！');
                } else {
                    installPrompt.text('您取消了应用安装。');
                }
                deferredPrompt = null;
            });
        }
    });

    // 检测应用是否从主屏幕启动
    window.addEventListener('appinstalled', (evt) => {
        console.log('应用已安装');
        installPrompt.text('应用已成功安装到您的设备！');
    });
});
