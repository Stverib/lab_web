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
@Document(collection = "lab_intro")
public class LabIntro implements Serializable {
    // 内容id
    @Id
    private String id;

    // 页面类型：1-实验室介绍，2-文旅重点实验室，3-组织结构
    private Integer pageType;

    // 内容标题
    private String title;

    // 内容正文
    private String content;

    // 图片路径
    private String imagePath;

    // 排序权重
    private Integer sortOrder;

    // 状态：0-草稿，1-已发布
    private Integer status;

    // 创建时间
    private LocalDateTime createTime;

    // 更新时间
    private LocalDateTime updateTime;
}






