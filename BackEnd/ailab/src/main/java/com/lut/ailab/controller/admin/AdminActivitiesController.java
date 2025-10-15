package com.lut.ailab.controller.admin;

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

@RestController("AdminActivitiesController")
@RequestMapping("/admin/activities")
@Slf4j
@CrossOrigin(origins = "*")
public class AdminActivitiesController {

    @Autowired
    private ActivitiesService activitiesService;

    /**
     * 分页查询学术活动
     * URL: GET /admin/activities/page?pageNum=0&pageSize=10
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
     * 根据ID获取活动
     * URL: GET /admin/activities/{id}
     */
    @GetMapping("/{id}")
    public Result<Activities> getById(@PathVariable String id) {
        log.info("获取活动详情: {}", id);

        Activities activity = activitiesService.getById(id);
        if (activity != null) {
            return Result.success(activity);
        } else {
            return Result.error("活动不存在");
        }
    }

    /**
     * 新增活动
     * URL: POST /admin/activities
     */
    @PostMapping
    public Result<Activities> add(@RequestBody Activities activities) {
        log.info("新增活动: {}", activities);

        Activities savedActivity = activitiesService.save(activities);
        return Result.success(savedActivity);
    }

    /**
     * 修改活动
     * URL: PUT /admin/activities
     */
    @PutMapping
    public Result<Activities> update(@RequestBody Activities activities) {
        log.info("修改活动: {}", activities);

        Activities updatedActivity = activitiesService.save(activities);
        return Result.success(updatedActivity);
    }

    /**
     * 删除活动
     * URL: DELETE /admin/activities/{id}
     */
    @DeleteMapping("/{id}")
    public Result<String> delete(@PathVariable String id) {
        log.info("删除活动: {}", id);

        activitiesService.deleteById(id);
        return Result.success("删除成功");
    }

    /**
     * 批量删除活动
     * URL: DELETE /admin/activities/batch
     */
    @DeleteMapping("/batch")
    public Result<String> batchDelete(@RequestBody List<String> ids) {
        log.info("批量删除活动: {}", ids);

        for (String id : ids) {
            activitiesService.deleteById(id);
        }
        return Result.success("批量删除成功");
    }
}






