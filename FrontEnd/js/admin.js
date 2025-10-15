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
    const navItem = clickedLink.closest('.nav-item');
    
    // 如果是有子菜单的项目，切换展开状态
    if (navItem.classList.contains('has-submenu')) {
        // 切换当前项目的展开状态
        navItem.classList.toggle('open');
        
        // 关闭其他同级菜单
        const parentNav = navItem.parentElement;
        if (parentNav.classList.contains('nav-list')) {
            // 这是顶级菜单
            document.querySelectorAll('.nav-list > .nav-item.has-submenu').forEach(item => {
                if (item !== navItem) {
                    item.classList.remove('open');
                }
            });
        } else {
            // 这是子菜单
            parentNav.querySelectorAll('.nav-item.has-submenu').forEach(item => {
                if (item !== navItem) {
                    item.classList.remove('open');
                }
            });
        }
        
        // 如果点击的是父级菜单项，不切换内容
        if (clickedLink.querySelector('.submenu-arrow')) {
            return;
        }
    }
    
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

    // 懒加载对应管理模块
    if (targetSection === 'research-team') {
        if (!window.peopleAdminManager) window.peopleAdminManager = new PeopleAdminManager();
        window.peopleAdminManager.load();
    } else if (targetSection === 'academic-committee') {
        if (!window.academicCommitteeAdminManager) window.academicCommitteeAdminManager = new AcademicCommitteeAdminManager();
        window.academicCommitteeAdminManager.load();
    }
}

// 更新页面标题
function updatePageTitle(section) {
    const pageTitle = document.querySelector('.page-title');
    const sectionNames = {
        'home': '系统概览',
        'lab-intro': '认识实验室',
        'research-platform': '科研平台',
        'key-labs': '重点实验室',
        'culture-lab': '文旅重点实验室',
        'ai-lab': '人工智能与算力技术重点实验室',
        'committee': '标委会',
        'talent-cultivation': '人才培养',
        'cooperation': '合作交流',
        'faculty': '教师队伍',
        'research-team': '研究队伍',
        'academic-committee': '学术委员会',
        'research': '科学研究',
        'comprehensive-research': '综合研究',
        'special-research': '专项研究',
        'enrollment': '招生就业',
        'master-enrollment': '硕士招生',
        'phd-enrollment': '博士招生',
        'postdoc-enrollment': '博士后招生',
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

// 通知公告管理功能
class NoticesManager {
    constructor() {
        this.currentPage = 0;
        this.pageSize = 10;
        this.totalPages = 0;
        this.notices = [];
    }

    async loadNotices() {
        try {
            const response = await adminAPI.getNotices({
                pageNum: this.currentPage,
                pageSize: this.pageSize
            });

            if (response.code === 1 && response.data) {
                this.notices = response.data.rows || [];
                this.totalPages = Math.ceil(response.data.total / this.pageSize);
                this.renderNotices();
            }
        } catch (error) {
            console.error('加载通知公告失败:', error);
            showNotification('加载通知公告失败', 'error');
        }
    }

    renderNotices() {
        const container = document.querySelector('#notices-section .panel-content');
        if (!container) return;

        const html = `
            <div class="data-table">
                <div class="table-header">
                    <button class="btn btn-primary" onclick="noticesManager.openAddModal()">
                        <i class="fas fa-plus"></i> 添加通知
                    </button>
                </div>
                <table class="table">
                    <thead>
                        <tr>
                            <th>标题</th>
                            <th>发布时间</th>
                            <th>状态</th>
                            <th>操作</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${this.notices.map(notice => `
                            <tr>
                                <td>${notice.title}</td>
                                <td>${this.formatDate(notice.noticeTime)}</td>
                                <td>
                                    <span class="status-badge status-${notice.status === 1 ? 'active' : 'inactive'}">
                                        ${notice.status === 1 ? '已发布' : '草稿'}
                                    </span>
                                </td>
                                <td>
                                    <button class="btn btn-sm btn-primary" onclick="noticesManager.openEditModal('${notice.id}')">
                                        <i class="fas fa-edit"></i>
                                    </button>
                                    <button class="btn btn-sm btn-danger" onclick="noticesManager.deleteNotice('${notice.id}')">
                                        <i class="fas fa-trash"></i>
                                    </button>
                                </td>
                            </tr>
                        `).join('')}
                    </tbody>
                </table>
                <div class="pagination">
                    <button class="btn btn-sm" onclick="noticesManager.prevPage()" ${this.currentPage === 0 ? 'disabled' : ''}>
                        上一页
                    </button>
                    <span>第 ${this.currentPage + 1} 页，共 ${this.totalPages} 页</span>
                    <button class="btn btn-sm" onclick="noticesManager.nextPage()" ${this.currentPage >= this.totalPages - 1 ? 'disabled' : ''}>
                        下一页
                    </button>
                </div>
            </div>
        `;

        container.innerHTML = html;
    }

    async openAddModal() {
        this.openModal();
    }

    async openEditModal(id) {
        try {
            const response = await adminAPI.getNoticeById(id);
            if (response.code === 1) {
                this.openModal(response.data);
            }
        } catch (error) {
            console.error('获取通知详情失败:', error);
            showNotification('获取通知详情失败', 'error');
        }
    }

    openModal(notice = null) {
        const modal = document.createElement('div');
        modal.className = 'modal-overlay';
        modal.innerHTML = `
            <div class="modal-content">
                <div class="modal-header">
                    <h3>${notice ? '编辑通知' : '添加通知'}</h3>
                    <button class="modal-close">&times;</button>
                </div>
                <div class="modal-body">
                    <form id="noticeForm">
                        <div class="form-group">
                            <label>标题</label>
                            <input type="text" name="title" value="${notice ? notice.title : ''}" required>
                        </div>
                        <div class="form-group">
                            <label>内容</label>
                            <textarea name="content" rows="5">${notice ? notice.content : ''}</textarea>
                        </div>
                        <div class="form-group">
                            <label>链接</label>
                            <input type="url" name="url" value="${notice ? notice.url : ''}">
                        </div>
                        <div class="form-group">
                            <label>发布时间</label>
                            <input type="datetime-local" name="noticeTime" value="${notice ? this.formatDateTimeLocal(notice.noticeTime) : ''}">
                        </div>
                        <div class="form-group">
                            <label>
                                <input type="checkbox" name="isTop" ${notice && notice.isTop ? 'checked' : ''}>
                                置顶
                            </label>
                        </div>
                        <div class="form-group">
                            <label>状态</label>
                            <select name="status">
                                <option value="0" ${notice && notice.status === 0 ? 'selected' : ''}>草稿</option>
                                <option value="1" ${notice && notice.status === 1 ? 'selected' : ''}>已发布</option>
                            </select>
                        </div>
                    </form>
                </div>
                <div class="modal-footer">
                    <button class="btn btn-secondary" onclick="this.closest('.modal-overlay').remove()">取消</button>
                    <button class="btn btn-primary" onclick="noticesManager.saveNotice('${notice ? notice.id : ''}')">保存</button>
                </div>
            </div>
        `;

        document.body.appendChild(modal);

        // 绑定关闭事件
        modal.querySelector('.modal-close').onclick = () => modal.remove();
        modal.onclick = (e) => {
            if (e.target === modal) modal.remove();
        };
    }

    async saveNotice(id) {
        const form = document.getElementById('noticeForm');
        const formData = new FormData(form);
        
        const data = {
            title: formData.get('title'),
            content: formData.get('content'),
            url: formData.get('url'),
            noticeTime: formData.get('noticeTime') ? new Date(formData.get('noticeTime')).toISOString() : null,
            isTop: formData.get('isTop') === 'on',
            status: parseInt(formData.get('status'))
        };

        if (id) {
            data.id = id;
        }

        try {
            const response = id ? await adminAPI.updateNotice(data) : await adminAPI.addNotice(data);
            if (response.code === 1) {
                showNotification(id ? '更新成功' : '添加成功', 'success');
                document.querySelector('.modal-overlay').remove();
                this.loadNotices();
            }
        } catch (error) {
            console.error('保存通知失败:', error);
            showNotification('保存通知失败', 'error');
        }
    }

    async deleteNotice(id) {
        if (confirm('确定要删除这条通知吗？')) {
            try {
                const response = await adminAPI.deleteNotice(id);
                if (response.code === 1) {
                    showNotification('删除成功', 'success');
                    this.loadNotices();
                }
            } catch (error) {
                console.error('删除通知失败:', error);
                showNotification('删除通知失败', 'error');
            }
        }
    }

    prevPage() {
        if (this.currentPage > 0) {
            this.currentPage--;
            this.loadNotices();
        }
    }

    nextPage() {
        if (this.currentPage < this.totalPages - 1) {
            this.currentPage++;
            this.loadNotices();
        }
    }

    formatDate(dateString) {
        if (!dateString) return '';
        return new Date(dateString).toLocaleDateString('zh-CN');
    }

    formatDateTimeLocal(dateString) {
        if (!dateString) return '';
        const date = new Date(dateString);
        return date.toISOString().slice(0, 16);
    }
}

// 创建全局实例
const noticesManager = new NoticesManager();

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

// 研究队伍管理
class PeopleAdminManager {
    constructor() {
        this.currentPage = 0;
        this.pageSize = 10;
        this.totalPages = 0;
        this.rows = [];
    }

    async load() {
        await this.fetch();
        this.render();
    }

    async fetch() {
        try {
            const res = await adminAPI.getPeople({ pageNum: this.currentPage, pageSize: this.pageSize, status: 1, type: 'teacher', sortField: 'sortOrder', sortDirection: 'ASC' });
            if (res && res.data) {
                this.rows = res.data.rows || [];
                this.totalPages = Math.ceil((res.data.total || 0) / this.pageSize);
            }
        } catch (e) {
            showNotification('加载研究队伍失败', 'error');
        }
    }

    render() {
        const container = document.querySelector('#research-team-section .panel-content');
        if (!container) return;
        container.innerHTML = `
            <div class="data-table">
                <div class="table-header">
                    <button class="btn btn-primary" onclick="peopleAdminManager.openModal()"><i class="fas fa-plus"></i> 添加成员</button>
                </div>
                <table class="table">
                    <thead>
                        <tr>
                            <th>姓名</th>
                            <th>职称</th>
                            <th>研究方向</th>
                            <th>类型</th>
                            <th>状态</th>
                            <th>排序</th>
                            <th>操作</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${this.rows.map(m => `
                        <tr>
                            <td>${m.name || ''}</td>
                            <td>${m.title || ''}</td>
                            <td>${m.researchDirection || ''}</td>
                            <td>${m.type || ''}</td>
                            <td><span class="status-badge status-${m.status === 1 ? 'active' : 'inactive'}">${m.status === 1 ? '显示' : '隐藏'}</span></td>
                            <td>${m.sortOrder ?? ''}</td>
                            <td>
                                <button class="btn btn-sm btn-primary" onclick="peopleAdminManager.openModal('${m.id}')"><i class="fas fa-edit"></i></button>
                                <button class="btn btn-sm btn-danger" onclick="peopleAdminManager.delete('${m.id}')"><i class="fas fa-trash"></i></button>
                            </td>
                        </tr>`).join('')}
                    </tbody>
                </table>
                <div class="pagination">
                    <button class="btn btn-sm" onclick="peopleAdminManager.prev()" ${this.currentPage === 0 ? 'disabled' : ''}>上一页</button>
                    <span>第 ${this.currentPage + 1} 页，共 ${this.totalPages} 页</span>
                    <button class="btn btn-sm" onclick="peopleAdminManager.next()" ${this.currentPage >= this.totalPages - 1 ? 'disabled' : ''}>下一页</button>
                </div>
            </div>
        `;
    }

    prev() { if (this.currentPage > 0) { this.currentPage--; this.load(); } }
    next() { if (this.currentPage < this.totalPages - 1) { this.currentPage++; this.load(); } }

    async openModal(id) {
        let data = null;
        if (id) {
            const res = await adminAPI.getPersonById(id);
            if (res && res.data) data = res.data;
        }
        const modal = document.createElement('div');
        modal.className = 'modal-overlay';
        modal.innerHTML = `
            <div class="modal-content">
                <div class="modal-header">
                    <h3>${id ? '编辑成员' : '添加成员'}</h3>
                    <button class="modal-close">&times;</button>
                </div>
                <div class="modal-body">
                    <form id="peopleForm">
                        <div class="form-group"><label>姓名</label><input name="name" value="${data?.name || ''}" required></div>
                        <div class="form-group"><label>职称</label><input name="title" value="${data?.title || ''}"></div>
                        <div class="form-group"><label>研究方向</label><input name="researchDirection" value="${data?.researchDirection || ''}"></div>
                        <div class="form-group"><label>个人简介</label><textarea name="bio" rows="3">${data?.bio || ''}</textarea></div>
                        <div class="form-group"><label>头像URL</label><input name="avatarUrl" value="${data?.avatarUrl || ''}"></div>
                        <div class="form-group"><label>个人主页</label><input name="personalHomepage" value="${data?.personalHomepage || ''}"></div>
                        <div class="form-group"><label>类型</label>
                            <select name="type">
                                <option value="teacher" ${data?.type === 'teacher' ? 'selected' : ''}>teacher</option>
                                <option value="student" ${data?.type === 'student' ? 'selected' : ''}>student</option>
                            </select>
                        </div>
                        <div class="form-group"><label>排序</label><input type="number" name="sortOrder" value="${data?.sortOrder ?? ''}"></div>
                        <div class="form-group"><label>状态</label>
                            <select name="status">
                                <option value="1" ${data?.status === 1 ? 'selected' : ''}>显示</option>
                                <option value="0" ${data?.status === 0 ? 'selected' : ''}>隐藏</option>
                            </select>
                        </div>
                    </form>
                </div>
                <div class="modal-footer">
                    <button class="btn btn-secondary modal-cancel">取消</button>
                    <button class="btn btn-primary modal-save">保存</button>
                </div>
            </div>`;
        document.body.appendChild(modal);
        modal.querySelector('.modal-close').onclick = () => modal.remove();
        modal.querySelector('.modal-cancel').onclick = () => modal.remove();
        modal.querySelector('.modal-save').onclick = () => this.save(id || '');
        modal.onclick = (e) => { if (e.target === modal) modal.remove(); };
    }

    async save(id) {
        const form = document.getElementById('peopleForm');
        const fd = new FormData(form);
        const payload = Object.fromEntries(fd.entries());
        payload.sortOrder = payload.sortOrder ? parseInt(payload.sortOrder) : null;
        payload.status = payload.status ? parseInt(payload.status) : 0;
        try {
            const res = id ? await adminAPI.updatePerson({ id, ...payload }) : await adminAPI.addPerson(payload);
            if (res && res.code === 1) {
                showNotification('保存成功', 'success');
                document.querySelector('.modal-overlay').remove();
                this.load();
            }
        } catch (e) {
            showNotification('保存失败', 'error');
        }
    }

    async delete(id) {
        if (!confirm('确认删除该成员？')) return;
        try {
            const res = await adminAPI.deletePerson(id);
            if (res && res.code === 1) {
                showNotification('删除成功', 'success');
                this.load();
            }
        } catch (e) {
            showNotification('删除失败', 'error');
        }
    }
}

// 学术委员会管理
class AcademicCommitteeAdminManager {
    constructor() {
        this.currentPage = 0;
        this.pageSize = 10;
        this.totalPages = 0;
        this.rows = [];
    }

    async load() {
        await this.fetch();
        this.render();
    }

    async fetch() {
        try {
            const res = await adminAPI.getAcademicCommittee({ pageNum: this.currentPage, pageSize: this.pageSize, status: 1 });
            if (res && res.data) {
                this.rows = res.data.rows || [];
                this.totalPages = Math.ceil((res.data.total || 0) / this.pageSize);
            }
        } catch (e) {
            showNotification('加载学术委员会失败', 'error');
        }
    }

    render() {
        const container = document.querySelector('#academic-committee-section .panel-content');
        if (!container) return;
        container.innerHTML = `
            <div class="data-table">
                <div class="table-header">
                    <button class="btn btn-primary" onclick="academicCommitteeAdminManager.openModal()"><i class="fas fa-plus"></i> 添加委员</button>
                </div>
                <table class="table">
                    <thead>
                        <tr>
                            <th>姓名</th>
                            <th>性别</th>
                            <th>职称</th>
                            <th>单位</th>
                            <th>学术任职</th>
                            <th>荣誉</th>
                            <th>状态</th>
                            <th>排序</th>
                            <th>操作</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${this.rows.map(m => `
                        <tr>
                            <td>${m.name || ''}</td>
                            <td>${m.gender || ''}</td>
                            <td>${m.title || ''}</td>
                            <td>${m.organization || ''}</td>
                            <td>${m.academicPosition || ''}</td>
                            <td>${m.honor || ''}</td>
                            <td><span class="status-badge status-${m.status === 1 ? 'active' : 'inactive'}">${m.status === 1 ? '显示' : '隐藏'}</span></td>
                            <td>${m.sortOrder ?? ''}</td>
                            <td>
                                <button class="btn btn-sm btn-primary" onclick="academicCommitteeAdminManager.openModal('${m.id}')"><i class="fas fa-edit"></i></button>
                                <button class="btn btn-sm btn-danger" onclick="academicCommitteeAdminManager.delete('${m.id}')"><i class="fas fa-trash"></i></button>
                            </td>
                        </tr>`).join('')}
                    </tbody>
                </table>
                <div class="pagination">
                    <button class="btn btn-sm" onclick="academicCommitteeAdminManager.prev()" ${this.currentPage === 0 ? 'disabled' : ''}>上一页</button>
                    <span>第 ${this.currentPage + 1} 页，共 ${this.totalPages} 页</span>
                    <button class="btn btn-sm" onclick="academicCommitteeAdminManager.next()" ${this.currentPage >= this.totalPages - 1 ? 'disabled' : ''}>下一页</button>
                </div>
            </div>
        `;
    }

    prev() { if (this.currentPage > 0) { this.currentPage--; this.load(); } }
    next() { if (this.currentPage < this.totalPages - 1) { this.currentPage++; this.load(); } }

    async openModal(id) {
        let data = null;
        if (id) {
            const res = await adminAPI.getAcademicCommitteeById(id);
            if (res && res.data) data = res.data;
        }
        const modal = document.createElement('div');
        modal.className = 'modal-overlay';
        modal.innerHTML = `
            <div class="modal-content">
                <div class="modal-header">
                    <h3>${id ? '编辑委员' : '添加委员'}</h3>
                    <button class="modal-close">&times;</button>
                </div>
                <div class="modal-body">
                    <form id="committeeForm">
                        <div class="form-group"><label>姓名</label><input name="name" value="${data?.name || ''}" required></div>
                        <div class="form-group"><label>性别</label><input name="gender" value="${data?.gender || ''}"></div>
                        <div class="form-group"><label>职称</label><input name="title" value="${data?.title || ''}"></div>
                        <div class="form-group"><label>单位</label><input name="organization" value="${data?.organization || ''}"></div>
                        <div class="form-group"><label>学术任职</label><input name="academicPosition" value="${data?.academicPosition || ''}"></div>
                        <div class="form-group"><label>国家级荣誉</label><input name="honor" value="${data?.honor || ''}"></div>
                        <div class="form-group"><label>头像URL</label><input name="avatarUrl" value="${data?.avatarUrl || ''}"></div>
                        <div class="form-group"><label>排序</label><input type="number" name="sortOrder" value="${data?.sortOrder ?? ''}"></div>
                        <div class="form-group"><label>状态</label>
                            <select name="status">
                                <option value="1" ${data?.status === 1 ? 'selected' : ''}>显示</option>
                                <option value="0" ${data?.status === 0 ? 'selected' : ''}>隐藏</option>
                            </select>
                        </div>
                    </form>
                </div>
                <div class="modal-footer">
                    <button class="btn btn-secondary modal-cancel">取消</button>
                    <button class="btn btn-primary modal-save">保存</button>
                </div>
            </div>`;
        document.body.appendChild(modal);
        modal.querySelector('.modal-close').onclick = () => modal.remove();
        modal.querySelector('.modal-cancel').onclick = () => modal.remove();
        modal.querySelector('.modal-save').onclick = () => this.save(id || '');
        modal.onclick = (e) => { if (e.target === modal) modal.remove(); };
    }

    async save(id) {
        const form = document.getElementById('committeeForm');
        const fd = new FormData(form);
        const payload = Object.fromEntries(fd.entries());
        payload.sortOrder = payload.sortOrder ? parseInt(payload.sortOrder) : null;
        payload.status = payload.status ? parseInt(payload.status) : 0;
        try {
            const res = id ? await adminAPI.updateAcademicCommittee({ id, ...payload }) : await adminAPI.addAcademicCommittee(payload);
            if (res && res.code === 1) {
                showNotification('保存成功', 'success');
                document.querySelector('.modal-overlay').remove();
                this.load();
            }
        } catch (e) {
            showNotification('保存失败', 'error');
        }
    }

    async delete(id) {
        if (!confirm('确认删除该委员？')) return;
        try {
            const res = await adminAPI.deleteAcademicCommittee(id);
            if (res && res.code === 1) {
                showNotification('删除成功', 'success');
                this.load();
            }
        } catch (e) {
            showNotification('删除失败', 'error');
        }
    }
}
