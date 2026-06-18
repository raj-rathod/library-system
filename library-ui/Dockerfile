FROM node:20-alpine AS build
WORKDIR /app

COPY package*.json ./
RUN npm ci

# Copy the rest of the application code
COPY . .
RUN npm run build -- --configuration=production

# Stage 2: Serve using an optimized Nginx server
FROM nginx:alpine

COPY --from=build /app/dist/library-ui/browser /usr/share/nginx/html

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]