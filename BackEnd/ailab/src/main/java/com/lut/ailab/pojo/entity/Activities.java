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
@Document(collection = "activities")
public class Activities implements Serializable {
    // 活动id
    @Id
    private String id;

    // 活动标题
    private String title;

    // 活动内容/描述
    private String content;

    // 活动链接
    private String url;

    // 活动时间
    private LocalDateTime activityTime;

    // 活动类型：academic-学术活动，service-对外服务
    private String type;

    // 封面图片URL
    private String coverImage;

    // 是否置顶
    private Boolean isTop;

    // 状态：0-草稿，1-已发布
    private Integer status;

    // 排序顺序
    private Integer sortOrder;

    // 创建时间
    private LocalDateTime createTime;

    // 更新时间
    private LocalDateTime updateTime;
}






