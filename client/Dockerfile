FROM node:alpine as builder
# if the 'as builder' fails later on AWS then we need to remove it
WORKDIR '/app'

COPY package.json .
RUN npm install

COPY . .

RUN npm run build
 
FROM nginx
EXPOSE 3000
COPY ./nginx/default.conf /etc/nginx/conf.d/default.conf
COPY --from=builder /app/build /usr/share/nginx/html