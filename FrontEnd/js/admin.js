// 后台管理系统JavaScript功能

document.addEventListener('DOMContentLoaded', function() {
    // 初始化管理后台
    initAdminPanel();
    
    // 绑定事件监听器
    bindEventListeners();
    
    // 初始化侧边栏
    initSidebar();
    
    // 初始化导航切换
    initNavigation();
});

// 初始化管理后台
function initAdminPanel() {
    console.log('后台管理系统已启动');
    
    // 设置当前时间
    updateCurrentTime();
    
    // 初始化统计数据显示
    initStatsData();
}

// 绑定事件监听器
function bindEventListeners() {
    // 侧边栏切换按钮
    const sidebarToggle = document.getElementById('sidebarToggle');
    if (sidebarToggle) {
        sidebarToggle.addEventListener('click', toggleSidebar);
    }
    
    // 导航链接点击事件
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', handleNavClick);
    });
    
    // 快速操作按钮
    const actionBtns = document.querySelectorAll('.action-btn');
    actionBtns.forEach(btn => {
        btn.addEventListener('click', handleActionClick);
    });
    
    // 管理面板按钮
    const panelBtns = document.querySelectorAll('.btn-primary');
    panelBtns.forEach(btn => {
        btn.addEventListener('click', handlePanelAction);
    });
    
    // 窗口大小变化事件
    window.addEventListener('resize', handleResize);
}

// 初始化侧边栏
function initSidebar() {
    const sidebar = document.querySelector('.sidebar');
    const mainContent = document.querySelector('.main-content');
    
    // 检查是否为移动设备
    if (window.innerWidth <= 768) {
        sidebar.classList.add('mobile-hidden');
    }
}

// 切换侧边栏显示/隐藏
function toggleSidebar() {
    const sidebar = document.querySelector('.sidebar');
    const sidebarToggle = document.getElementById('sidebarToggle');
    
    sidebar.classList.toggle('open');
    
    // 更新按钮图标
    const icon = sidebarToggle.querySelector('i');
    if (sidebar.classList.contains('open')) {
        icon.className = 'fas fa-times';
    } else {
        icon.className = 'fas fa-bars';
    }
}

// 处理导航点击
function handleNavClick(event) {
    event.preventDefault();
    
    const clickedLink = event.currentTarget;
    const targetSection = clickedLink.getAttribute('data-section');
    
    // 移除所有活动状态
    document.querySelectorAll('.nav-link').forEach(link => {
        link.classList.remove('active');
    });
    
    document.querySelectorAll('.content-section').forEach(section => {
        section.classList.remove('active');
    });
    
    // 添加活动状态
    clickedLink.classList.add('active');
    const targetElement = document.getElementById(targetSection + '-section');
    if (targetElement) {
        targetElement.classList.add('active');
    }
    
    // 在移动设备上关闭侧边栏
    if (window.innerWidth <= 768) {
        const sidebar = document.querySelector('.sidebar');
        sidebar.classList.remove('open');
        
        const sidebarToggle = document.getElementById('sidebarToggle');
        const icon = sidebarToggle.querySelector('i');
        icon.className = 'fas fa-bars';
    }
    
    // 更新页面标题
    updatePageTitle(targetSection);
}

// 更新页面标题
function updatePageTitle(section) {
    const pageTitle = document.querySelector('.page-title');
    const sectionNames = {
        'home': '系统概览',
        'lab-intro': '认识实验室',
        'research-platform': '科研平台',
        'talent-cultivation': '人才培养',
        'cooperation': '合作交流',
        'faculty': '教师队伍',
        'research': '科学研究',
        'enrollment': '招生就业',
        'services': '对外服务'
    };
    
    if (pageTitle && sectionNames[section]) {
        pageTitle.textContent = sectionNames[section] + ' - 后台管理';
    }
}

// 处理快速操作点击
function handleActionClick(event) {
    const actionText = event.currentTarget.querySelector('span').textContent;
    
    // 显示操作提示
    showNotification(`正在执行: ${actionText}`, 'info');
    
    // 这里可以添加具体的操作逻辑
    switch(actionText) {
        case '添加新闻':
            openNewsModal();
            break;
        case '编辑公告':
            openNoticeModal();
            break;
        case '上传文件':
            openFileUpload();
            break;
        case '系统设置':
            openSystemSettings();
            break;
        default:
            console.log(`执行操作: ${actionText}`);
    }
}

// 处理管理面板操作
function handlePanelAction(event) {
    const buttonText = event.currentTarget.textContent.trim();
    showNotification(`正在执行: ${buttonText}`, 'info');
}

// 初始化导航切换
function initNavigation() {
    // 默认显示首页
    const homeLink = document.querySelector('[data-section="home"]');
    if (homeLink) {
        homeLink.click();
    }
}

// 初始化统计数据
function initStatsData() {
    // 这里可以从API获取真实数据
    const stats = {
        news: 12,
        notices: 8,
        activities: 15,
        members: 25
    };
    
    // 更新统计数字（可以添加动画效果）
    updateStatNumbers(stats);
}

// 更新统计数字
function updateStatNumbers(stats) {
    const statNumbers = document.querySelectorAll('.stat-number');
    statNumbers.forEach((element, index) => {
        const values = Object.values(stats);
        if (values[index] !== undefined) {
            animateNumber(element, 0, values[index], 1000);
        }
    });
}

// 数字动画效果
function animateNumber(element, start, end, duration) {
    const startTime = performance.now();
    
    function updateNumber(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        
        const current = Math.floor(start + (end - start) * progress);
        element.textContent = current;
        
        if (progress < 1) {
            requestAnimationFrame(updateNumber);
        }
    }
    
    requestAnimationFrame(updateNumber);
}

// 处理窗口大小变化
function handleResize() {
    const sidebar = document.querySelector('.sidebar');
    const sidebarToggle = document.getElementById('sidebarToggle');
    
    if (window.innerWidth > 768) {
        sidebar.classList.remove('open', 'mobile-hidden');
        if (sidebarToggle) {
            const icon = sidebarToggle.querySelector('i');
            icon.className = 'fas fa-bars';
        }
    } else {
        sidebar.classList.add('mobile-hidden');
    }
}

// 显示通知
function showNotification(message, type = 'info') {
    // 创建通知元素
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <i class="fas fa-${getNotificationIcon(type)}"></i>
            <span>${message}</span>
        </div>
    `;
    
    // 添加样式
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${getNotificationColor(type)};
        color: white;
        padding: 12px 20px;
        border-radius: 4px;
        box-shadow: 0 4px 12px rgba(0,0,0,0.15);
        z-index: 10000;
        animation: slideInRight 0.3s ease-out;
    `;
    
    // 添加到页面
    document.body.appendChild(notification);
    
    // 3秒后自动移除
    setTimeout(() => {
        notification.style.animation = 'slideOutRight 0.3s ease-out';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 300);
    }, 3000);
}

// 获取通知图标
function getNotificationIcon(type) {
    const icons = {
        'info': 'info-circle',
        'success': 'check-circle',
        'warning': 'exclamation-triangle',
        'error': 'times-circle'
    };
    return icons[type] || 'info-circle';
}

// 获取通知颜色
function getNotificationColor(type) {
    const colors = {
        'info': '#3498db',
        'success': '#27ae60',
        'warning': '#f39c12',
        'error': '#e74c3c'
    };
    return colors[type] || '#3498db';
}

// 更新当前时间
function updateCurrentTime() {
    const now = new Date();
    const timeString = now.toLocaleString('zh-CN');
    
    // 如果有时间显示元素，更新它
    const timeElement = document.querySelector('.current-time');
    if (timeElement) {
        timeElement.textContent = timeString;
    }
}

// 打开新闻模态框
function openNewsModal() {
    showNotification('新闻管理功能开发中...', 'info');
}

// 打开公告模态框
function openNoticeModal() {
    showNotification('公告管理功能开发中...', 'info');
}

// 打开文件上传
function openFileUpload() {
    showNotification('文件上传功能开发中...', 'info');
}

// 打开系统设置
function openSystemSettings() {
    showNotification('系统设置功能开发中...', 'info');
}

// 添加CSS动画样式
const style = document.createElement('style');
style.textContent = `
    @keyframes slideInRight {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOutRight {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(100%);
            opacity: 0;
        }
    }
    
    .notification-content {
        display: flex;
        align-items: center;
        gap: 8px;
    }
    
    .notification-content i {
        font-size: 16px;
    }
`;
document.head.appendChild(style);
