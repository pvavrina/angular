# Dockerfile

#################################################################
# Stage 1: Build the Angular application
#################################################################
FROM node:20-alpine AS build
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm install
COPY . .
# Using default build to avoid path issues: Output is dist/frontend/browser
RUN npm run build --configuration=production # Remove the problematic --output-path=./dist/app

#################################################################
# Stage 2: Serve the application with a lightweight Nginx image
#################################################################
FROM nginx:alpine AS final
# Copy the custom multi-service reverse proxy configuration
COPY nginx.conf /etc/nginx/nginx.conf

# Diagnostic: List the content of /app/dist from the build stage
# RUN ls -la /app/dist

COPY --from=build /app/dist/frontend/browser /usr/share/nginx/html
CMD ["nginx", "-g", "daemon off;"]
