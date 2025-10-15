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
@Document(collection = "carousel")
public class Carousel implements Serializable {
    // 轮播图id
    @Id
    private String id;

    // 图片标题
    private String title;

    // 图片路径
    private String imagePath;

    // 链接地址
    private String linkUrl;

    // 排序权重
    private Integer sortOrder;

    // 状态：0-隐藏，1-显示
    private Integer status;

    // 创建时间
    private LocalDateTime createTime;

    // 更新时间
    private LocalDateTime updateTime;
}






