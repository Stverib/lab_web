// 管理端API客户端
class AdminAPI {
    constructor() {
        this.config = window.AppConfig || {};
        this.baseURL = this.config.api?.baseURL || 'http://localhost:8080';
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
            
            if (this.config.debug) {
                console.log('Admin API Response:', data);
            }
            
            return data;
        } catch (error) {
            clearTimeout(timeoutId);
            
            if (error.name === 'AbortError') {
                throw new Error('请求超时，请检查网络连接');
            }
            
            console.error('Admin API请求失败:', error);
            throw error;
        }
    }

    // 通知公告管理
    async getNotices(query = {}) {
        const params = new URLSearchParams(query);
        const url = `/admin/notices/page${params.toString() ? '?' + params.toString() : ''}`;
        return await this.request(url, { method: 'GET' });
    }

    async getNoticeById(id) {
        const url = `/admin/notices/${id}`;
        return await this.request(url, { method: 'GET' });
    }

    async addNotice(data) {
        const url = '/admin/notices';
        return await this.request(url, {
            method: 'POST',
            body: JSON.stringify(data)
        });
    }

    async updateNotice(data) {
        const url = '/admin/notices';
        return await this.request(url, {
            method: 'PUT',
            body: JSON.stringify(data)
        });
    }

    async deleteNotice(id) {
        const url = `/admin/notices/${id}`;
        return await this.request(url, { method: 'DELETE' });
    }

    async batchDeleteNotices(ids) {
        const url = '/admin/notices/batch';
        return await this.request(url, {
            method: 'DELETE',
            body: JSON.stringify(ids)
        });
    }

    // 活动管理
    async getActivities(query = {}) {
        const params = new URLSearchParams(query);
        const url = `/admin/activities/page${params.toString() ? '?' + params.toString() : ''}`;
        return await this.request(url, { method: 'GET' });
    }

    async getActivityById(id) {
        const url = `/admin/activities/${id}`;
        return await this.request(url, { method: 'GET' });
    }

    async addActivity(data) {
        const url = '/admin/activities';
        return await this.request(url, {
            method: 'POST',
            body: JSON.stringify(data)
        });
    }

    async updateActivity(data) {
        const url = '/admin/activities';
        return await this.request(url, {
            method: 'PUT',
            body: JSON.stringify(data)
        });
    }

    async deleteActivity(id) {
        const url = `/admin/activities/${id}`;
        return await this.request(url, { method: 'DELETE' });
    }

    async batchDeleteActivities(ids) {
        const url = '/admin/activities/batch';
        return await this.request(url, {
            method: 'DELETE',
            body: JSON.stringify(ids)
        });
    }

    // 人员管理
    async getPeople(query = {}) {
        const params = new URLSearchParams(query);
        const url = `/admin/people/page${params.toString() ? '?' + params.toString() : ''}`;
        return await this.request(url, { method: 'GET' });
    }

    async getPersonById(id) {
        const url = `/admin/people/${id}`;
        return await this.request(url, { method: 'GET' });
    }

    async addPerson(data) {
        const url = '/admin/people';
        return await this.request(url, {
            method: 'POST',
            body: JSON.stringify(data)
        });
    }

    async updatePerson(data) {
        const url = '/admin/people';
        return await this.request(url, {
            method: 'PUT',
            body: JSON.stringify(data)
        });
    }

    async deletePerson(id) {
        const url = `/admin/people/${id}`;
        return await this.request(url, { method: 'DELETE' });
    }

    async batchDeletePeople(ids) {
        const url = '/admin/people/batch';
        return await this.request(url, {
            method: 'DELETE',
            body: JSON.stringify(ids)
        });
    }

    // 学术委员会管理
    async getAcademicCommittee(query = {}) {
        const params = new URLSearchParams(query);
        const url = `/admin/academic-committee/page${params.toString() ? '?' + params.toString() : ''}`;
        return await this.request(url, { method: 'GET' });
    }

    async getAcademicCommitteeById(id) {
        const url = `/admin/academic-committee/${id}`;
        return await this.request(url, { method: 'GET' });
    }

    async addAcademicCommittee(data) {
        const url = '/admin/academic-committee';
        return await this.request(url, {
            method: 'POST',
            body: JSON.stringify(data)
        });
    }

    async updateAcademicCommittee(data) {
        const url = '/admin/academic-committee';
        return await this.request(url, {
            method: 'PUT',
            body: JSON.stringify(data)
        });
    }

    async deleteAcademicCommittee(id) {
        const url = `/admin/academic-committee/${id}`;
        return await this.request(url, { method: 'DELETE' });
    }

    async batchDeleteAcademicCommittee(ids) {
        const url = '/admin/academic-committee/batch';
        return await this.request(url, {
            method: 'DELETE',
            body: JSON.stringify(ids)
        });
    }
}

// 创建全局实例
const adminAPI = new AdminAPI();





