package com.lut.ailab.controller.pages;

import com.lut.ailab.pojo.entity.Carousel;
import com.lut.ailab.pojo.entity.LabIntro;
import com.lut.ailab.result.Result;
import com.lut.ailab.service.CarouselService;
import com.lut.ailab.service.LabIntroService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/pages")
@Slf4j
@CrossOrigin(origins = "*")
public class PagesController {

    @Autowired
    private LabIntroService labIntroService;

    @Autowired
    private CarouselService carouselService;

    /**
     * 获取实验室介绍内容
     * URL: GET /pages/lab-intro?pageType=1
     */
    @GetMapping("/lab-intro")
    public Result<List<LabIntro>> getLabIntro(@RequestParam(defaultValue = "1") Integer pageType) {
        log.info("获取实验室介绍内容，页面类型: {}", pageType);

        List<LabIntro> labIntro = labIntroService.getLabIntroByPageType(pageType);
        return Result.success(labIntro);
    }

    /**
     * 获取轮播图列表
     * URL: GET /pages/carousel
     */
    @GetMapping("/carousel")
    public Result<List<Carousel>> getCarousel() {
        log.info("获取轮播图列表");

        List<Carousel> carousel = carouselService.getCarouselList();
        return Result.success(carousel);
    }

    /**
     * 获取首页数据（轮播图 + 最新通知 + 最新活动 + 最新新闻）
     * URL: GET /pages/homepage
     */
    @GetMapping("/homepage")
    public Result<Object> getHomepageData() {
        log.info("获取首页数据");

        // 获取轮播图
        List<Carousel> carousel = carouselService.getCarouselList();
        
        // 获取最新通知公告
        List<Object> notices = labIntroService.getLatestNotices(4);
        
        // 获取最新学术活动
        List<Object> activities = labIntroService.getLatestActivities(4);
        
        // 获取最新新闻动态
        List<Object> news = labIntroService.getLatestNews(8);

        return Result.success(new Object() {
            public final List<Carousel> carouselList = carousel;
            public final List<Object> noticesList = notices;
            public final List<Object> activitiesList = activities;
            public final List<Object> newsList = news;
        });
    }
}






