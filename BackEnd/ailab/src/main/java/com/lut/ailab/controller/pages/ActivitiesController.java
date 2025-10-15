package com.lut.ailab.controller.pages;

import com.lut.ailab.pojo.dto.ActivitiesPageQueryDTO;
import com.lut.ailab.pojo.entity.Activities;
import com.lut.ailab.result.PageResult;
import com.lut.ailab.result.Result;
import com.lut.ailab.service.ActivitiesService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/pages/activities")
@Slf4j
@CrossOrigin(origins = "*")
public class ActivitiesController {

    @Autowired
    private ActivitiesService activitiesService;

    /**
     * 分页查询学术活动
     * URL: GET /pages/activities/page?pageNum=0&pageSize=10&type=1
     */
    @GetMapping("/page")
    public Result<PageResult> pageQuery(ActivitiesPageQueryDTO activitiesPageQueryDTO) {
        log.info("分页查询学术活动: {}", activitiesPageQueryDTO);

        Page<Activities> springDataPage = activitiesService.pageQuery(activitiesPageQueryDTO);
        PageResult pageResult = new PageResult(
                springDataPage.getTotalElements(),
                springDataPage.getContent()
        );

        return Result.success(pageResult);
    }

    /**
     * 获取最新学术活动列表（首页显示）
     * URL: GET /pages/activities/latest?limit=4&type=1
     */
    @GetMapping("/latest")
    public Result<List<Activities>> getLatestActivities(
            @RequestParam(defaultValue = "4") Integer limit,
            @RequestParam(defaultValue = "academic") String type) {
        log.info("获取最新学术活动，数量: {}, 类型: {}", limit, type);

        List<Activities> activities = activitiesService.getLatestActivities(limit, type);
        return Result.success(activities);
    }

    /**
     * 根据ID获取活动详情
     * URL: GET /pages/activities/{id}
     */
    @GetMapping("/{id}")
    public Result<Activities> getActivityById(@PathVariable String id) {
        log.info("获取活动详情: {}", id);

        Activities activity = activitiesService.getById(id);
        if (activity != null) {
            return Result.success(activity);
        } else {
            return Result.error("活动不存在");
        }
    }
}
