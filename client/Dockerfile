# Stage 1: Build the Vite app
FROM node:18 AS build
WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .
RUN npm run build

# Stage 2: Serve with Nginx
FROM nginx:alpine

# Copy Vite output from 'dist' directory
COPY --from=build /app/dist /usr/share/nginx/html

# Copy your custom nginx config
COPY ./nginx.conf /etc/nginx/conf.d/default.conf

# Expose the default Nginx port
EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
