# Use Nginx as the web server
FROM nginx:latest

# Remove the default Nginx web files
RUN rm -rf /usr/share/nginx/html/*

# Copy website files to the container
COPY . /usr/share/nginx/html

# Expose port 80 for web traffic
EXPOSE 80

# Start Nginx when the container runs
CMD ["nginx", "-g", "daemon off;"]