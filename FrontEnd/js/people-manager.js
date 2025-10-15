// 教师队伍页面管理器
class PeopleManager {
    constructor() {
        this.pagesAPI = new PagesAPI();
        this.currentPage = 0;
        this.pageSize = 20;
    }

    /**
     * 初始化页面
     */
    async init() {
        console.log('初始化教师队伍页面...');
        await this.loadTeachers();
    }

    /**
     * 加载教师数据
     */
    async loadTeachers() {
        try {
            console.log('正在加载教师数据...');
            const response = await this.pagesAPI.getPeople({
                status: 1,
                type: 'teacher',
                pageNum: this.currentPage,
                pageSize: this.pageSize
            });

            console.log('教师数据加载成功:', response);

            const rows = response?.data?.rows || [];
            if (rows.length > 0) {
                this.renderTeachers(rows);
            } else {
                // 兜底：尝试不分页接口
                try {
                    const listRes = await this.pagesAPI.getPeopleList('teacher');
                    const list = Array.isArray(listRes?.data) ? listRes.data : [];
                    if (list.length > 0) {
                        console.log('使用不分页接口加载教师数据');
                        this.renderTeachers(list);
                    } else {
                        console.warn('没有找到教师数据，显示默认内容');
                    }
                } catch (e) {
                    console.warn('不分页接口加载失败:', e);
                }
            }
        } catch (error) {
            console.error('加载教师数据失败:', error);
            // 如果加载失败，保持原有的静态内容
        }
    }

    /**
     * 渲染教师列表
     */
    renderTeachers(teachers) {
        const grid = document.querySelector('.people-grid');
        if (!grid) {
            console.error('未找到 .people-grid 元素');
            return;
        }

        // 清空现有内容
        grid.innerHTML = '';

        // 渲染每个教师卡片
        teachers.forEach(teacher => {
            const card = this.createTeacherCard(teacher);
            grid.appendChild(card);
        });

        console.log(`成功渲染 ${teachers.length} 位教师`);
    }

    /**
     * 创建教师卡片
     */
    createTeacherCard(teacher) {
        const card = document.createElement('div');
        card.className = 'people-card';
        card.setAttribute('data-category', 'teachers');

        // 构建卡片HTML
        card.innerHTML = `
            <div class="people-image">
                <img src="${teacher.avatarUrl || 'images/placeholder.jpg'}" alt="${teacher.name}">
            </div>
            <div class="people-info">
                <h3>${teacher.name}</h3>
                <p class="people-title">${teacher.title || ''}</p>
                <p class="people-research">研究方向：${teacher.researchDirection || '暂无'}</p>
                ${teacher.personalHomepage ? `
                <div class="people-links">
                    <a href="${teacher.personalHomepage}" target="_blank">
                        <i class="fas fa-globe"></i> 个人主页
                    </a>
                </div>
                ` : ''}
                <p class="people-bio">${teacher.bio || ''}</p>
            </div>
        `;

        return card;
    }

    /**
     * 格式化日期
     */
    formatDate(dateString) {
        if (!dateString) return '';
        const date = new Date(dateString);
        return date.toLocaleDateString('zh-CN', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit'
        });
    }
}

// 页面加载完成后初始化
document.addEventListener('DOMContentLoaded', function() {
    const peopleManager = new PeopleManager();
    peopleManager.init();
});

