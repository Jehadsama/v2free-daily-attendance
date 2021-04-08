FROM docker.gf.com.cn/node:14.13.1 as npminstall
LABEL maintainer="Jehadsama<339364351@qq.com>"

ARG nodejs_org_mirror=http://registry.npm.taobao.org/mirrors/node
ARG npm_config_registry=https://registry.npm.taobao.org
ENV NODEJS_ORG_MIRROR=${nodejs_org_mirror} NPM_CONFIG_REGISTRY=${npm_config_registry}
WORKDIR /tmp/app
COPY package*.json ./
RUN npm i --production --verbose
WORKDIR /tmp/gfsdks
COPY ./app/lib/gfsdks/package*.json ./
RUN npm i --production --verbose

# for `npm` just rm prefix `base-` from tag
FROM docker.gf.com.cn/mhart/alpine-node:slim-14.13.1
WORKDIR /src-app
COPY . ./
COPY --from=npminstall /tmp/app/node_modules /src-app/node_modules
COPY --from=npminstall /tmp/gfsdks/node_modules /src-app/app/lib/gfsdks/node_modules

ENTRYPOINT ["node", "app.js"]
