// 首页数据管理类
class HomepageManager {
    constructor() {
        this.pagesAPI = new PagesAPI();
        this.loading = false;
        this.config = window.AppConfig || {};
    }

    // 初始化首页
    async init() {
        if (this.loading) return;
        
        this.loading = true;
        this.showLoading();

        try {
            const response = await this.pagesAPI.getHomepageData();
            
            if (response.code === 1 && response.data) {
                this.renderHomepage(response.data);
            } else {
                this.showError('获取首页数据失败: ' + (response.message || '未知错误'));
            }
        } catch (error) {
            console.error('加载首页数据失败:', error);
            this.showError('网络连接失败，请稍后重试');
        } finally {
            this.loading = false;
            this.hideLoading();
        }
    }

    // 渲染首页数据
    renderHomepage(data) {
        // 渲染轮播图
        if (data.carouselList && data.carouselList.length > 0) {
            this.renderCarousel(data.carouselList);
        }

        // 渲染通知公告
        if (data.noticesList && data.noticesList.length > 0) {
            this.renderNotices(data.noticesList);
        }

        // 渲染学术活动
        if (data.activitiesList && data.activitiesList.length > 0) {
            this.renderActivities(data.activitiesList);
        }

        // 渲染新闻动态
        if (data.newsList && data.newsList.length > 0) {
            this.renderNews(data.newsList);
        }
    }

    // 渲染轮播图
    renderCarousel(carouselList) {
        const carouselTrack = document.querySelector('.carousel-track');
        const carouselDots = document.querySelector('.carousel-dots');
        
        if (!carouselTrack || !carouselDots) return;

        // 清空现有内容
        carouselTrack.innerHTML = '';
        carouselDots.innerHTML = '';

        carouselList.forEach((item, index) => {
            // 创建轮播图项
            const slide = document.createElement('div');
            slide.className = `carousel-slide ${index === 0 ? 'active' : ''}`;
            slide.innerHTML = `
                <img src="${item.imagePath}" alt="${item.title}">
            `;
            carouselTrack.appendChild(slide);

            // 创建指示点
            const dot = document.createElement('button');
            dot.className = `carousel-dot ${index === 0 ? 'active' : ''}`;
            dot.setAttribute('data-slide', index);
            carouselDots.appendChild(dot);
        });
    }

    // 渲染通知公告
    renderNotices(noticesList) {
        const noticeList = document.querySelector('.notice-list');
        if (!noticeList) return;

        const noticesHTML = noticesList.map(notice => `
            <div class="notice-item">
                <div class="notice-date">${this.formatDate(notice.date)}</div>
                <div class="notice-content">
                    <a href="${notice.url}" target="_blank">${this.escapeHtml(notice.title)}</a>
                </div>
            </div>
        `).join('');

        noticeList.innerHTML = noticesHTML;
    }

    // 渲染学术活动
    renderActivities(activitiesList) {
        const activityList = document.querySelector('.activity-list');
        if (!activityList) return;

        const activitiesHTML = activitiesList.map(activity => `
            <div class="notice-item">
                <div class="notice-date">${this.formatDate(activity.date)}</div>
                <div class="notice-content">
                    <a href="${activity.url}" target="_blank">${this.escapeHtml(activity.title)}</a>
                </div>
            </div>
        `).join('');

        activityList.innerHTML = activitiesHTML;
    }

    // 渲染新闻动态
    renderNews(newsList) {
        const newsListElement = document.querySelector('.news-list');
        if (!newsListElement) return;

        const newsHTML = newsList.map(news => `
            <div class="news-item">
                <div class="news-content flex-row">
                    <span class="news-date">${this.formatDate(news.date)}</span>
                    <a href="${news.url}" target="_blank">${this.escapeHtml(news.title)}</a>
                </div>
            </div>
        `).join('');

        newsListElement.innerHTML = newsHTML;
    }

    // 显示加载状态
    showLoading() {
        // 可以添加加载动画
        console.log('正在加载首页数据...');
    }

    // 隐藏加载状态
    hideLoading() {
        console.log('首页数据加载完成');
    }

    // 显示错误信息
    showError(message) {
        console.error('首页数据加载失败:', message);
        // 可以显示错误提示
    }

    // 格式化日期
    formatDate(dateString) {
        if (!dateString) return '';
        
        // 如果是 YYYY.MM.DD 格式，直接返回
        if (dateString.includes('.')) {
            return dateString;
        }
        
        const date = new Date(dateString);
        if (isNaN(date.getTime())) return dateString;
        
        return date.toLocaleDateString('zh-CN', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit'
        }).replace(/\//g, '.');
    }

    // HTML转义
    escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }
}

// 创建全局实例
const homepageManager = new HomepageManager();






