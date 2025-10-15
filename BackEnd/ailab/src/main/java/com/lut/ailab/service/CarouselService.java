package com.lut.ailab.service;

import com.lut.ailab.mapper.CarouselRepository;
import com.lut.ailab.pojo.entity.Carousel;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
public class CarouselService {

    @Autowired
    private CarouselRepository carouselRepository;

    /**
     * 获取轮播图列表
     */
    public List<Carousel> getCarouselList() {
        return carouselRepository.findByStatusOrderBySortOrderAsc(1);
    }

    /**
     * 根据ID获取轮播图
     */
    public Carousel getById(String id) {
        Optional<Carousel> optional = carouselRepository.findById(id);
        return optional.orElse(null);
    }

    /**
     * 保存轮播图
     */
    public Carousel save(Carousel carousel) {
        if (carousel.getCreateTime() == null) {
            carousel.setCreateTime(LocalDateTime.now());
        }
        carousel.setUpdateTime(LocalDateTime.now());
        return carouselRepository.save(carousel);
    }

    /**
     * 删除轮播图
     */
    public void deleteById(String id) {
        carouselRepository.deleteById(id);
    }
}






