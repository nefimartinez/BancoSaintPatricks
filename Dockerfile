FROM node:lts-alpine AS build

WORKDIR /usr/src/app
COPY . .

RUN npm install


FROM node:20-slim

#hora de chile y librerias necesarias para oracle
RUN apt-get update && apt-get install -y libaio1 wget unzip tzdata \
    && cp /usr/share/zoneinfo/America/Santiago /etc/localtime \
    && echo "America/Santiago" > /etc/localtime
ENV TZ=America/Santiago

WORKDIR /usr/src/app
EXPOSE 3000
COPY --from=build /usr/src/app ./

RUN npm install
CMD ["npm", "start"]