class CommitteeManager {
    constructor() {
        this.pagesAPI = new PagesAPI();
    }

    async init() {
        await this.loadMembers();
    }

    async loadMembers() {
        // 先尝试独立的学术委员会分页接口
        try {
            const res = await this.pagesAPI.getAcademicCommittee({ status: 1, pageNum: 0, pageSize: 100 });
            const rows = res?.data?.rows || [];
            if (Array.isArray(rows) && rows.length > 0) {
                this.render(rows);
                return;
            }
        } catch (e) {
            console.warn('分页接口获取学术委员会失败，尝试不分页接口:', e);
        }

        // 兜底：不分页接口
        try {
            const listRes = await this.pagesAPI.getAcademicCommitteeList(1);
            const list = Array.isArray(listRes?.data) ? listRes.data : [];
            if (list.length > 0) {
                this.render(list);
            } else {
                console.info('未获取到学术委员会数据，保留页面原有静态内容');
            }
        } catch (e) {
            console.error('不分页接口获取学术委员会失败，保留静态内容:', e);
        }
    }

    render(members) {
        const tbody = document.querySelector('#committee-tbody');
        if (!tbody) return;
        if (!Array.isArray(members) || members.length === 0) return; // 无数据则保留原有表格行
        tbody.innerHTML = '';
        members.forEach((m, idx) => {
            const tr = document.createElement('tr');
            if (idx % 2 === 1) tr.style.backgroundColor = '#f9f9f9';
            tr.innerHTML = `
                <td style="padding: 15px; text-align: center;">${idx + 1}</td>
                <td style="padding: 15px; text-align: center; font-weight: bold;">${m.name || ''}</td>
                <td style="padding: 15px; text-align: center;">${m.gender || ''}</td>
                <td style="padding: 15px; text-align: center;">${m.title || ''}</td>
                <td style="padding: 15px; text-align: center;">${m.organization || ''}</td>
                <td style="padding: 15px; text-align: center;">${m.academicPosition || ''}</td>
                <td style="padding: 15px; text-align: center;">${m.honor || ''}</td>
            `;
            tbody.appendChild(tr);
        });
    }
}

document.addEventListener('DOMContentLoaded', () => {
    // 仅在 academic-committee.html 中执行
    if (document.querySelector('#committee-tbody')) {
        const mgr = new CommitteeManager();
        mgr.init();
    }
});


