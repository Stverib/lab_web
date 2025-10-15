package com.lut.ailab.result;

import lombok.Data;

import java.io.Serializable;


/**
 * 后端统一返回结果类
 */
@Data
public class Result<T> implements Serializable {

    private Integer code; // 编码：1 成功，0和其它数字为失败
    private String message;// 错误信息
    private T data;

    public static <T> Result<T> success() {
        Result<T> result = new Result<T>();
        result.code = 1;
        return result;
    }

    public static <T> Result<T> success(T data) {
        Result<T> result = new Result<T>();
        result.code = 1;
        result.data = data;
        return result;
    }

    public static <T> Result<T> error(T data) {
        Result<T> result = new Result<T>();
        result.code = 0;
        result.data = data;
        return result;
    }
}
