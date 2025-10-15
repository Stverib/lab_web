package com.lut.ailab.controller.pages;

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

@RestController
@RequestMapping("/pages/notices")
@Slf4j
@CrossOrigin(origins = "*")
public class NoticesController {

    @Autowired
    private NoticesService noticesService;

    /**
     * 分页查询通知公告
     * URL: GET /pages/notices/page?pageNum=0&pageSize=10
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
     * 获取最新通知公告列表（首页显示）
     * URL: GET /pages/notices/latest?limit=4
     */
    @GetMapping("/latest")
    public Result<List<Notices>> getLatestNotices(@RequestParam(defaultValue = "4") Integer limit) {
        log.info("获取最新通知公告，数量: {}", limit);

        List<Notices> notices = noticesService.getLatestNotices(limit);
        return Result.success(notices);
    }

    /**
     * 根据ID获取通知公告详情
     * URL: GET /pages/notices/{id}
     */
    @GetMapping("/{id}")
    public Result<Notices> getNoticeById(@PathVariable String id) {
        log.info("获取通知公告详情: {}", id);

        Notices notice = noticesService.getById(id);
        if (notice != null) {
            return Result.success(notice);
        } else {
            return Result.error("通知公告不存在");
        }
    }
}






