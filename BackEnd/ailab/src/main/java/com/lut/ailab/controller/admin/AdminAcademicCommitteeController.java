package com.lut.ailab.controller.admin;

import com.lut.ailab.pojo.entity.AcademicCommittee;
import com.lut.ailab.result.PageResult;
import com.lut.ailab.result.Result;
import com.lut.ailab.service.AcademicCommitteeService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController("AdminAcademicCommitteeController")
@RequestMapping("/admin/academic-committee")
@Slf4j
@CrossOrigin(origins = "*")
public class AdminAcademicCommitteeController {

    @Autowired
    private AcademicCommitteeService service;

    @GetMapping("/page")
    public Result<PageResult> page(@RequestParam(defaultValue = "0") Integer pageNum,
                                   @RequestParam(defaultValue = "20") Integer pageSize,
                                   @RequestParam(required = false) Integer status) {
        Page<AcademicCommittee> page = service.page(pageNum, pageSize, status);
        PageResult pr = new PageResult(page.getTotalElements(), page.getContent());
        return Result.success(pr);
    }

    @GetMapping("/list")
    public Result<List<AcademicCommittee>> list(@RequestParam(required = false) Integer status) {
        return Result.success(service.list(status));
    }

    @GetMapping("/{id}")
    public Result<AcademicCommittee> get(@PathVariable String id) {
        AcademicCommittee ac = service.getById(id);
        if (ac == null) return Result.error("not found");
        return Result.success(ac);
    }

    @PostMapping
    public Result<AcademicCommittee> add(@RequestBody AcademicCommittee ac) {
        log.info("新增委员: {}", ac);
        return Result.success(service.save(ac));
    }

    @PutMapping
    public Result<AcademicCommittee> update(@RequestBody AcademicCommittee ac) {
        log.info("更新委员: {}", ac);
        return Result.success(service.save(ac));
    }

    @DeleteMapping("/{id}")
    public Result<String> delete(@PathVariable String id) {
        log.info("删除委员: {}", id);
        service.delete(id);
        return Result.success("ok");
    }

    @DeleteMapping("/batch")
    public Result<String> batch(@RequestBody List<String> ids) {
        log.info("批量删除委员: {}", ids);
        ids.forEach(service::delete);
        return Result.success("ok");
    }
}




