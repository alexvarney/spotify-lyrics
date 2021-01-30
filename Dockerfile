FROM node:15.7.0-alpine3.10

#Create app directory
WORKDIR /usr/src/app

#Bundle app source
COPY . .

#Install dependencies and build the app
RUN yarn && cd client && yarn && yarn build

#Run the app
EXPOSE 80
ENV PRODUCTION=true
ENV HTTPS_METHOD=noredirect
CMD ["node", "bin/www"]