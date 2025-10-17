package com.lut.ailab.controller.pages;

import com.lut.ailab.pojo.dto.PeoplePageQueryDTO;
import com.lut.ailab.pojo.entity.People;
import com.lut.ailab.result.PageResult;
import com.lut.ailab.result.Result;
import com.lut.ailab.service.PeopleService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/pages/people")
@Slf4j
@CrossOrigin(origins = "*")
public class PeopleController {

    @Autowired
    private PeopleService peopleService;

    /**
     * 分页查询团队成员
     * URL: GET /pages/people/page?pageNum=0&pageSize=10&type=1
     */
    @GetMapping("/page")
    public Result<PageResult> pageQuery(PeoplePageQueryDTO peoplePageQueryDTO) {
        log.info("分页查询团队成员: {}", peoplePageQueryDTO);

        Page<People> springDataPage = peopleService.pageQuery(peoplePageQueryDTO);
        PageResult pageResult = new PageResult(
                springDataPage.getTotalElements(),
                springDataPage.getContent()
        );

        return Result.success(pageResult);
    }

    /**
     * 获取团队成员列表
     * URL: GET /pages/people/list?type=1
     */
    @GetMapping("/list")
    public Result<List<People>> getPeopleList(@RequestParam(defaultValue = "teacher") String type) {
        log.info("获取团队成员列表，类型: {}", type);

        List<People> people = peopleService.getPeopleList(type);
        return Result.success(people);
    }

    /**
     * 根据ID获取成员详情
     * URL: GET /pages/people/{id}
     */
    @GetMapping("/{id}")
    public Result<People> getPeopleById(@PathVariable String id) {
        log.info("获取成员详情: {}", id);

        People person = peopleService.getById(id);
        if (person != null) {
            return Result.success(person);
        } else {
            return Result.error("成员不存在");
        }
    }
}
