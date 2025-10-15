package com.lut.ailab.pojo.entity;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.io.Serializable;
import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Document(collection = "news_links")
public class News implements Serializable {
    // 新闻id
    @Id
    private String id;

    // 新闻标题
    private String title;

    // 新闻链接
    private String url;

    //新闻时间
    private LocalDateTime newsTime;

    //创建时间
    private LocalDateTime createTime;

    //更新时间
    private LocalDateTime updateTime;
}
