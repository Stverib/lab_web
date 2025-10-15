package com.lut.ailab.controller.pages;

import com.lut.ailab.pojo.entity.AcademicCommittee;
import com.lut.ailab.result.PageResult;
import com.lut.ailab.result.Result;
import com.lut.ailab.service.AcademicCommitteeService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/pages/academic-committee")
@Slf4j
@CrossOrigin(origins = "*")
public class AcademicCommitteeController {

    @Autowired
    private AcademicCommitteeService service;

    @GetMapping("/page")
    public Result<PageResult> page(@RequestParam(defaultValue = "0") Integer pageNum,
                                   @RequestParam(defaultValue = "100") Integer pageSize,
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
}





