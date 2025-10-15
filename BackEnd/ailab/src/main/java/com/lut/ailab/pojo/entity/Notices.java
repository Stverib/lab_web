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
@Document(collection = "notices")
public class Notices implements Serializable {
    // 通知公告id
    @Id
    private String id;

    // 通知标题
    private String title;

    // 通知内容
    private String content;

    // 通知链接
    private String url;

    // 通知时间
    private LocalDateTime noticeTime;

    // 是否置顶
    private Boolean isTop;

    // 状态：0-草稿，1-已发布
    private Integer status;

    // 创建时间
    private LocalDateTime createTime;

    // 更新时间
    private LocalDateTime updateTime;
}

