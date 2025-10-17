// 页面API管理模块
class PagesAPI {
    constructor() {
        // 从配置文件获取设置
        this.config = window.AppConfig || {};
        this.baseURL = this.config.api?.baseURL || 'http://localhost:8080';
        this.apiPrefix = this.config.api?.prefix || '/pages';
        this.timeout = this.config.api?.timeout || 10000;
    }

    // 通用请求方法
    async request(url, options = {}) {
        const defaultOptions = {
            headers: {
                'Content-Type': 'application/json'
            }
        };

        const config = {
            ...defaultOptions,
            ...options,
            headers: {
                ...defaultOptions.headers,
                ...options.headers
            }
        };

        // 创建AbortController用于超时控制
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), this.timeout);

        try {
            const response = await fetch(this.baseURL + url, {
                ...config,
                signal: controller.signal
            });
            
            clearTimeout(timeoutId);
            
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            
            const data = await response.json();
            
            // 调试模式下打印响应
            if (this.config.debug) {
                console.log('API Response:', data);
            }
            
            return data;
        } catch (error) {
            clearTimeout(timeoutId);
            
            if (error.name === 'AbortError') {
                throw new Error('请求超时，请检查网络连接');
            }
            
            console.error('API请求失败:', error);
            throw error;
        }
    }

    // 获取首页数据
    async getHomepageData() {
        const url = `${this.apiPrefix}/homepage`;
        return await this.request(url, {
            method: 'GET'
        });
    }

    // 获取轮播图
    async getCarousel() {
        const url = `${this.apiPrefix}/carousel`;
        return await this.request(url, {
            method: 'GET'
        });
    }

    // 获取实验室介绍
    async getLabIntro(pageType = 1) {
        const url = `${this.apiPrefix}/lab-intro?pageType=${pageType}`;
        return await this.request(url, {
            method: 'GET'
        });
    }

    // 获取通知公告列表
    async getNotices(query = {}) {
        const params = new URLSearchParams(query);
        const url = `${this.apiPrefix}/notices/page${params.toString() ? '?' + params.toString() : ''}`;
        return await this.request(url, {
            method: 'GET'
        });
    }

    // 获取最新通知公告
    async getLatestNotices(limit = 4) {
        const url = `${this.apiPrefix}/notices/latest?limit=${limit}`;
        return await this.request(url, {
            method: 'GET'
        });
    }

    // 获取活动列表
    async getActivities(query = {}) {
        const params = new URLSearchParams(query);
        const url = `${this.apiPrefix}/activities/page${params.toString() ? '?' + params.toString() : ''}`;
        return await this.request(url, {
            method: 'GET'
        });
    }

    // 获取最新活动
    async getLatestActivities(limit = 4, type = 1) {
        const url = `${this.apiPrefix}/activities/latest?limit=${limit}&type=${type}`;
        return await this.request(url, {
            method: 'GET'
        });
    }

    // 获取团队成员列表
    async getPeople(query = {}) {
        const params = new URLSearchParams(query);
        const url = `${this.apiPrefix}/people/page${params.toString() ? '?' + params.toString() : ''}`;
        return await this.request(url, {
            method: 'GET'
        });
    }

    // 获取团队成员（不分页）
    async getPeopleList(type = 1) {
        const url = `${this.apiPrefix}/people/list?type=${type}`;
        return await this.request(url, {
            method: 'GET'
        });
    }

    // 学术委员会 - 分页
    async getAcademicCommittee(query = {}) {
        const params = new URLSearchParams(query);
        const url = `${this.apiPrefix}/academic-committee/page${params.toString() ? '?' + params.toString() : ''}`;
        return await this.request(url, { method: 'GET' });
    }

    // 学术委员会 - 不分页
    async getAcademicCommitteeList(status = 1) {
        const url = `${this.apiPrefix}/academic-committee/list${status != null ? `?status=${status}` : ''}`;
        return await this.request(url, { method: 'GET' });
    }
}

// 创建全局实例
const pagesAPI = new PagesAPI();



