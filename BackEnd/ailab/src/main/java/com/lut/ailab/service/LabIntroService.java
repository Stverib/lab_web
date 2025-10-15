package com.lut.ailab.service;

import com.lut.ailab.mapper.LabIntroRepository;
import com.lut.ailab.pojo.entity.LabIntro;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
public class LabIntroService {

    @Autowired
    private LabIntroRepository labIntroRepository;

    /**
     * 根据页面类型获取实验室介绍内容
     */
    public List<LabIntro> getLabIntroByPageType(Integer pageType) {
        return labIntroRepository.findByStatusAndPageTypeOrderBySortOrderAsc(1, pageType);
    }

    /**
     * 获取最新通知公告（模拟数据，实际应该调用NoticesService）
     */
    public List<Object> getLatestNotices(Integer limit) {
        // 这里返回模拟数据，实际应该调用NoticesService
        return List.of(
            new Object() {
                public final String title = "关于举办全国旅游标准化技术委员会业务工作培训班的通知";
                public final String url = "notices_html/20231016.html";
                public final String date = "2023.10.16";
            },
            new Object() {
                public final String title = "甘肃省实施标准化发展战略领导小组办公室关于报送\"十四五\"以来标准化工作总结和下一步工作计划的通知";
                public final String url = "notices_html/20230518.html";
                public final String date = "2023.5.18";
            }
        );
    }

    /**
     * 获取最新学术活动（模拟数据，实际应该调用ActivitiesService）
     */
    public List<Object> getLatestActivities(Integer limit) {
        // 这里返回模拟数据，实际应该调用ActivitiesService
        return List.of(
            new Object() {
                public final String title = "人工智能与算力技术重点实验室交流座谈";
                public final String url = "activities_html/2024-10-18.html";
                public final String date = "2024.10.18";
            },
            new Object() {
                public final String title = "飞云大讲堂";
                public final String url = "activities_html/2023-10-24.html";
                public final String date = "2023.10.24";
            }
        );
    }

    /**
     * 获取最新新闻动态（模拟数据，实际应该调用NewsService）
     */
    public List<Object> getLatestNews(Integer limit) {
        // 这里返回模拟数据，实际应该调用NewsService
        return List.of(
            new Object() {
                public final String title = "着力推动文旅产业数字化建设加快发展";
                public final String url = "https://www.srdice.net/?m=home&c=View&a=index&aid=3259";
                public final String date = "2023.7.12";
            },
            new Object() {
                public final String title = "\"缘起丝路\"敦煌烽燧河古道徒步活动在香港启动";
                public final String url = "https://www.thepaper.cn/newsDetail_forward_23635925";
                public final String date = "2023.6.27";
            }
        );
    }

    /**
     * 根据ID获取内容
     */
    public LabIntro getById(String id) {
        Optional<LabIntro> optional = labIntroRepository.findById(id);
        return optional.orElse(null);
    }

    /**
     * 保存内容
     */
    public LabIntro save(LabIntro labIntro) {
        if (labIntro.getCreateTime() == null) {
            labIntro.setCreateTime(LocalDateTime.now());
        }
        labIntro.setUpdateTime(LocalDateTime.now());
        return labIntroRepository.save(labIntro);
    }

    /**
     * 删除内容
     */
    public void deleteById(String id) {
        labIntroRepository.deleteById(id);
    }
}
