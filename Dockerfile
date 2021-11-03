# FROM nginx:1.17
FROM nginxinc/nginx-unprivileged
COPY . /usr/share/nginx/html/webVisualizer/
CMD ["nginx", "-g", "daemon off;"]

# docker build -t visualizer .