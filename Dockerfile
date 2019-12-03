FROM ubuntustfbase

USER root
RUN echo "/usr/local/lib" >> /etc/ld.so.conf && \
    ldconfig

# Copy app source.
COPY . /tmp/build/

RUN chown -R stf:stf /tmp /app

USER stf

RUN set -x && \
    cd /tmp/build && \
    #配置环境变量
    export PATH=$PWD/node_modules/.bin:$PATH && \
    #手动安装一些插件
    npm install phantomjs-prebuilt@2.1.16 --ignore-script && \
    npm install node-sass@3.13.1 --registry http://registry.npm.taobao.org  && \
    npm install jpeg-turbo --registry=https://registry.npm.taobao.org && \
    npm install zmq && \
    #以下安装不要使用淘宝镜像，很慢
    npm install --loglevel http && \
    #打包
    npm pack && \
    tar xzf stf-*.tgz --strip-components 1 -C /app && \
    bower cache clean && \
    npm prune --production && \
    #移动node_modules文件到app目录下面
    mv node_modules /app && \
    #清缓存
    npm cache clear --force && \
    rm -rf ~/.node-gyp && \
    cd /app && \
    rm -rf /tmp/*

#检测STF安装情况
RUN cd /app/bin && \
    ./stf doctor

# Show help by default.
CMD stf --help
