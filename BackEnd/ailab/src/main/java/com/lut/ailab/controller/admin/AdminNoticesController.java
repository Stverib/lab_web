package com.lut.ailab.controller.admin;

import com.lut.ailab.pojo.dto.NoticesPageQueryDTO;
import com.lut.ailab.pojo.entity.Notices;
import com.lut.ailab.result.PageResult;
import com.lut.ailab.result.Result;
import com.lut.ailab.service.NoticesService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController("AdminNoticesController")
@RequestMapping("/admin/notices")
@Slf4j
@CrossOrigin(origins = "*")
public class AdminNoticesController {

    @Autowired
    private NoticesService noticesService;

    /**
     * 分页查询通知公告
     * URL: GET /admin/notices/page?pageNum=0&pageSize=10
     */
    @GetMapping("/page")
    public Result<PageResult> pageQuery(NoticesPageQueryDTO noticesPageQueryDTO) {
        log.info("分页查询通知公告: {}", noticesPageQueryDTO);

        Page<Notices> springDataPage = noticesService.pageQuery(noticesPageQueryDTO);
        PageResult pageResult = new PageResult(
                springDataPage.getTotalElements(),
                springDataPage.getContent()
        );

        return Result.success(pageResult);
    }

    /**
     * 根据ID获取通知公告
     * URL: GET /admin/notices/{id}
     */
    @GetMapping("/{id}")
    public Result<Notices> getById(@PathVariable String id) {
        log.info("获取通知公告详情: {}", id);

        Notices notice = noticesService.getById(id);
        if (notice != null) {
            return Result.success(notice);
        } else {
            return Result.error("通知公告不存在");
        }
    }

    /**
     * 新增通知公告
     * URL: POST /admin/notices
     */
    @PostMapping
    public Result<Notices> add(@RequestBody Notices notices) {
        log.info("新增通知公告: {}", notices);

        Notices savedNotice = noticesService.save(notices);
        return Result.success(savedNotice);
    }

    /**
     * 修改通知公告
     * URL: PUT /admin/notices
     */
    @PutMapping
    public Result<Notices> update(@RequestBody Notices notices) {
        log.info("修改通知公告: {}", notices);

        Notices updatedNotice = noticesService.save(notices);
        return Result.success(updatedNotice);
    }

    /**
     * 删除通知公告
     * URL: DELETE /admin/notices/{id}
     */
    @DeleteMapping("/{id}")
    public Result<String> delete(@PathVariable String id) {
        log.info("删除通知公告: {}", id);

        noticesService.deleteById(id);
        return Result.success("删除成功");
    }

    /**
     * 批量删除通知公告
     * URL: DELETE /admin/notices/batch
     */
    @DeleteMapping("/batch")
    public Result<String> batchDelete(@RequestBody List<String> ids) {
        log.info("批量删除通知公告: {}", ids);

        for (String id : ids) {
            noticesService.deleteById(id);
        }
        return Result.success("批量删除成功");
    }
}






