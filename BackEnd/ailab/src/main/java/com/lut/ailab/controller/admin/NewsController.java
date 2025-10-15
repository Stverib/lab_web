package com.lut.ailab.controller.admin;

import com.lut.ailab.pojo.dto.NewsPageQueryDTO;
import com.lut.ailab.pojo.entity.News;//
import com.lut.ailab.result.PageResult; //
import com.lut.ailab.result.Result;
import com.lut.ailab.service.NewsService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page; // 引入Spring Data的分页类
import org.springframework.web.bind.annotation.*;


@RestController("AdminNewsController")
@RequestMapping("/admin/news")
@Slf4j
public class NewsController {

    @Autowired
    private  NewsService newsService;

    /**
     * 分页查询用户的新闻链接
     * URL 示例: GET /admin/news/page?userId=U123&pageNum=0&pageSize=10
     * * 注意：为了更优雅地接收查询参数，我们将 userID 放在 Query 参数中，
     * 或者让 DTO 包含 userID。我们采用 DTO 方式。
     * * @param newsPageQueryDTO 封装了查询条件、分页参数 (pageNum, pageSize) 的对象
     * @return 统一结果对象，其中数据部分是分页结果
     */
    @GetMapping("/page")
    public Result<PageResult> pageQuery(NewsPageQueryDTO newsPageQueryDTO){
        log.info("分页查询:{}", newsPageQueryDTO);

        // 1. 调用 Service 层进行分页查询，返回 Spring Data 的 Page 对象
        Page<News> springDataPage = newsService.pageQuery(newsPageQueryDTO);

        // 2. 将 Spring Data 的 Page 转换为自定义的 PageResult
        PageResult pageResult = new PageResult(
                springDataPage.getTotalElements(), // 总记录数
                springDataPage.getContent()        // 当前页数据列表
        );

        return Result.success(pageResult);
    }
}