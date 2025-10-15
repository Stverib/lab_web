@echo off
chcp 65001 >nul
echo 正在启动人工智能与算力技术实验室网站...

REM 检查Java环境
java -version >nul 2>&1
if %errorlevel% neq 0 (
    echo 错误: 未找到Java环境，请先安装Java 17或更高版本
    pause
    exit /b 1
)

REM 进入后端目录
cd BackEnd\ailab

REM 复制前端静态资源到Spring Boot的静态资源目录
echo 正在复制前端静态资源...
if not exist "src\main\resources\static" mkdir "src\main\resources\static"
xcopy "..\..\FrontEnd\*" "src\main\resources\static\" /E /Y /Q

REM 启动Spring Boot应用
echo 正在启动Spring Boot应用...
echo 网站将在 http://localhost:8080 启动
echo 管理后台访问地址: http://localhost:8080/admin.html
echo.
echo 按 Ctrl+C 停止服务
echo.

mvnw.cmd spring-boot:run

pause






