#!/bin/bash

# 实验室网站启动脚本
# 整合前后端项目，通过Spring Boot提供静态资源服务

echo "正在启动人工智能与算力技术实验室网站..."

# 检查Java环境
if ! command -v java &> /dev/null; then
    echo "错误: 未找到Java环境，请先安装Java 17或更高版本"
    exit 1
fi

# 检查MongoDB是否运行
if ! pgrep -x "mongod" > /dev/null; then
    echo "警告: MongoDB未运行，请先启动MongoDB服务"
    echo "Windows: net start MongoDB"
    echo "Linux/Mac: sudo systemctl start mongod"
    echo "或者: mongod --dbpath /path/to/your/db"
fi

# 进入后端目录
cd BackEnd/ailab

# 复制前端静态资源到Spring Boot的静态资源目录
echo "正在复制前端静态资源..."
mkdir -p src/main/resources/static
cp -r ../../FrontEnd/* src/main/resources/static/

# 启动Spring Boot应用
echo "正在启动Spring Boot应用..."
echo "网站将在 http://localhost:8080 启动"
echo "管理后台访问地址: http://localhost:8080/admin.html"
echo ""
echo "按 Ctrl+C 停止服务"

# Windows环境
if [[ "$OSTYPE" == "msys" || "$OSTYPE" == "win32" ]]; then
    ./mvnw.cmd spring-boot:run
else
    # Linux/Mac环境
    ./mvnw spring-boot:run
fi






