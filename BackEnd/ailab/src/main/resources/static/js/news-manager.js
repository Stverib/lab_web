// 新闻页面管理类
class NewsManager {
    constructor() {
        this.pagesAPI = new PagesAPI();
        this.newsContainer = null;
        this.loading = false;
        this.config = window.AppConfig || {};
    }

    // 初始化新闻页面
    init() {
        this.newsContainer = document.querySelector('.news-wrapper');
        if (this.newsContainer) {
            this.loadNews();
        }
    }

    // 加载新闻列表
    async loadNews(query = {}) {
        if (this.loading) return;
        
        this.loading = true;
        this.showLoading();

        try {
            // 设置默认查询参数
            const defaultQuery = {
                pageNum: 0,
                pageSize: 20,
                ...query
            };

            const response = await this.pagesAPI.getNotices(defaultQuery);
            
            if (response.code === 1 && response.data) {
                let newsList = [];
                
                if (response.data.rows) {
                    newsList = response.data.rows;
                } else if (Array.isArray(response.data)) {
                    newsList = response.data;
                } else {
                    newsList = [];
                }
                
                this.renderNews(newsList);
            } else {
                this.showError('获取新闻数据失败: ' + (response.message || '未知错误'));
            }
        } catch (error) {
            console.error('加载新闻失败:', error);
            this.showError('网络连接失败，请稍后重试');
        } finally {
            this.loading = false;
            this.hideLoading();
        }
    }

    // 渲染新闻列表
    renderNews(newsList) {
        if (!this.newsContainer) return;

        const newsHTML = newsList.map(news => {
            const publishDate = this.formatDate(news.noticeTime || news.createTime);
            const newsUrl = news.url || '#';
            const newsTitle = news.title || '无标题';
            
            return `
                <div class="news-item-full" data-news-id="${news.id}">
                    <div class="news-content-full">
                        <h3>${this.escapeHtml(newsTitle)}</h3>
                        ${newsUrl !== '#' ? 
                            `<a href="${newsUrl}" class="news-link" target="_blank">阅读全文</a>` : 
                            `<a href="javascript:void(0)" class="news-link" onclick="newsManager.showNewsDetail('${news.id}')">查看详情</a>`
                        }
                    </div>
                    <div class="news-date-full">${publishDate}</div>
                </div>
            `;
        }).join('');

        this.newsContainer.innerHTML = newsHTML;
    }

    // 显示新闻详情
    async showNewsDetail(newsId) {
        try {
            const response = await this.pagesAPI.getNotices({ id: newsId });
            if (response.code === 1 && response.data) {
                this.openNewsModal(response.data);
            }
        } catch (error) {
            console.error('获取新闻详情失败:', error);
            alert('获取新闻详情失败');
        }
    }

    // 打开新闻详情模态框
    openNewsModal(news) {
        const modal = document.createElement('div');
        modal.className = 'news-modal';
        modal.innerHTML = `
            <div class="news-modal-content">
                <div class="news-modal-header">
                    <h2>${this.escapeHtml(news.title)}</h2>
                    <span class="news-modal-close">&times;</span>
                </div>
                <div class="news-modal-body">
                    <div class="news-meta">
                        <span class="news-date">${this.formatDate(news.createTime)}</span>
                    </div>
                    <div class="news-content">
                        ${news.content || '暂无内容'}
                    </div>
                </div>
            </div>
        `;

        document.body.appendChild(modal);

        // 绑定关闭事件
        const closeBtn = modal.querySelector('.news-modal-close');
        closeBtn.onclick = () => {
            document.body.removeChild(modal);
        };

        modal.onclick = (e) => {
            if (e.target === modal) {
                document.body.removeChild(modal);
            }
        };
    }

    // 显示加载状态
    showLoading() {
        if (this.newsContainer) {
            this.newsContainer.innerHTML = `
                <div class="loading-container">
                    <div class="loading-spinner"></div>
                    <p>正在加载新闻...</p>
                </div>
            `;
        }
    }

    // 隐藏加载状态
    hideLoading() {
        const loadingContainer = document.querySelector('.loading-container');
        if (loadingContainer) {
            loadingContainer.remove();
        }
    }

    // 显示错误信息
    showError(message) {
        if (this.newsContainer) {
            this.newsContainer.innerHTML = `
                <div class="error-container">
                    <p class="error-message">${message}</p>
                    <button onclick="newsManager.loadNews()" class="retry-btn">重试</button>
                </div>
            `;
        }
    }

    // 格式化日期
    formatDate(dateString) {
        if (!dateString) return '';
        
        const date = new Date(dateString);
        if (isNaN(date.getTime())) return dateString;
        
        return date.toLocaleDateString('zh-CN', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit'
        });
    }

    // HTML转义
    escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }
}

// 创建全局实例
const newsManager = new NewsManager();

// 页面加载完成后初始化
document.addEventListener('DOMContentLoaded', function() {
    newsManager.init();
});






