# Dockerfile
FROM node:12.18.0-alpine
WORKDIR /app/

# here we are reading the value from the build args and inserting into the environment variables
ARG CI_URL
ENV NEXT_PUBLIC_BASE_URL=${CI_URL}
ARG GIT_URL
ENV NEXT_PUBLIC_GIT_URL=${GIT_URL}
ARG PORT
ENV PORT=${PORT}

COPY . .
RUN npm i
RUN npm run build
EXPOSE ${PORT}
CMD npm run start -- -p ${PORT}