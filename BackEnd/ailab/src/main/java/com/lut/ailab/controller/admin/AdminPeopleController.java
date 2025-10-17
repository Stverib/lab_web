package com.lut.ailab.controller.admin;

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

@RestController("AdminPeopleController")
@RequestMapping("/admin/people")
@Slf4j
@CrossOrigin(origins = "*")
public class AdminPeopleController {

    @Autowired
    private PeopleService peopleService;

    /**
     * 分页查询团队成员
     * URL: GET /admin/people/page?pageNum=0&pageSize=10
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
     * 根据ID获取成员
     * URL: GET /admin/people/{id}
     */
    @GetMapping("/{id}")
    public Result<People> getById(@PathVariable String id) {
        log.info("获取成员详情: {}", id);

        People person = peopleService.getById(id);
        if (person != null) {
            return Result.success(person);
        } else {
            return Result.error("成员不存在");
        }
    }

    /**
     * 新增成员
     * URL: POST /admin/people
     */
    @PostMapping
    public Result<People> add(@RequestBody People people) {
        log.info("新增成员: {}", people);

        People savedPerson = peopleService.save(people);
        return Result.success(savedPerson);
    }

    /**
     * 修改成员
     * URL: PUT /admin/people
     */
    @PutMapping
    public Result<People> update(@RequestBody People people) {
        log.info("修改成员: {}", people);

        People updatedPerson = peopleService.save(people);
        return Result.success(updatedPerson);
    }

    /**
     * 删除成员
     * URL: DELETE /admin/people/{id}
     */
    @DeleteMapping("/{id}")
    public Result<String> delete(@PathVariable String id) {
        log.info("删除成员: {}", id);

        peopleService.deleteById(id);
        return Result.success("删除成功");
    }

    /**
     * 批量删除成员
     * URL: DELETE /admin/people/batch
     */
    @DeleteMapping("/batch")
    public Result<String> batchDelete(@RequestBody List<String> ids) {
        log.info("批量删除成员: {}", ids);

        for (String id : ids) {
            peopleService.deleteById(id);
        }
        return Result.success("批量删除成功");
    }
}







