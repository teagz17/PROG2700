# **🚀 Client Side Development with Docker & GNS3: Assignment**
## **🔹 Learning Objectives**
1️⃣ Create a simple **HTML, CSS, and JavaScript** website.  
2️⃣ Set up a **Docker container** to serve the website.  
3️⃣ Push the **Docker image** to **Docker Hub**.  
4️⃣ Import the container into **GNS3** for testing.  
5️⃣ Name the GNS3 appliance as **W#-myWebSite** for grading.  

---

## **📌 Step 1: Set Up Your Development Environment**
### **1️⃣ Install the Required Tools**
Ensure you have the following installed on your machine:  
✅ **Docker Desktop** → [Download Here](https://www.docker.com/products/docker-desktop/)  
✅ **Visual Studio Code (VS Code)** → [Download Here](https://code.visualstudio.com/)  
✅ **GNS3 (Graphical Network Simulator)** → [Download Here](https://www.gns3.com/software/download)  
✅ **Git (optional, for version control)**  

---

## **📌 Step 2: Create Your Web Project**
### **1️⃣ Open VS Code and Create a New Folder**
Run the following commands to create a project folder:  
```sh
mkdir myWebsite
cd myWebsite
```

### **2️⃣ Create Your HTML, CSS, and JavaScript Files**
Inside `myWebsite`, create the following **three files**:  
📄 `index.html`  
📄 `style.css`  
📄 `script.js`  

Inside `myWebsite`, create the following **directory**:  
📂 `admin`  

#### **📄 index.html (Basic Web Page)**
```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>My First Website</title>
    <link rel="stylesheet" href="style.css">
</head>
<body>
    <h1>Welcome to My Website!</h1>
    <p>This is a simple webpage running inside a Docker container.</p>
    <button onclick="showMessage()">Click Me</button>
    <script src="script.js"></script>
</body>
</html>
```

#### **📄 style.css (Basic Styling)**
```css
body {
    font-family: Arial, sans-serif;
    text-align: center;
    margin-top: 50px;
}

button {
    background-color: blue;
    color: white;
    padding: 10px;
    border: none;
    cursor: pointer;
}
```

#### **📄 script.js (Simple JavaScript Interaction)**
```js
function showMessage() {
    alert("Hello! You clicked the button.");
}
```
#### **📄 index.html (Admin Web Page)**
```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>My Admin Area</title>
    <link rel="stylesheet" href="style.css">
</head>
<body>
    <h1>Welcome to My Admin Area!</h1>
    <p>This is a simple webpage running inside a Docker container with the admin area.</p>
    <button onclick="showMessage()">Click Me</button>
    <script src="script.js"></script>
</body>
</html>
```
---

## **📌 Step 3: Create a Dockerfile**
Create a file named **`Dockerfile`** (without an extension) inside the `myWebsite` folder.

#### **📄 Dockerfile**
```dockerfile
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
```

### **📌 Explanation**
- **`FROM nginx:latest`** → Uses **Nginx** as a lightweight web server.  
- **`COPY . /usr/share/nginx/html`** → Copies all files to Nginx’s web directory.  
- **`EXPOSE 80`** → Exposes port **80** to serve the website.  
- **`CMD ["nginx", "-g", "daemon off;"]`** → Starts Nginx in the foreground.  

---

## **📌 Step 4: Create a `docker-compose.yml` File**
Create a file named `docker-compose.yml` in `myWebsite`:

#### **📄 docker-compose.yml**
```yaml
services:
  web:
    build: .
    ports:
      - "8080:80"
    volumes:
      - .:/usr/share/nginx/html
```
- **`build: .`** → Builds from the `Dockerfile`.  
- **`ports: "8080:80"`** → Maps **localhost:8080** to **container port 80**.  
- **`volumes`** → Allows live updates inside the container.  

---

## **📌 Step 5: Build and Run Your Container**
### **1️⃣ Build the Docker Image**
Run the following command inside `myWebsite`:
```sh
docker compose build
```

### **2️⃣ Run the Container**
```sh
docker compose up -d
```
Your website is now live at:  
👉 **http://localhost:8080**

---

## **📌 Step 6: Push to Docker Hub**
### **1️⃣ Log in to Docker Hub**
```sh
docker login
```
Enter your **Docker Hub username and password**.

### **2️⃣ Tag the Image**
Replace **your-username** with your Docker Hub ID:
```sh
docker tag mywebsite your-username/mywebsite:latest
```

### **3️⃣ Push the Image to Docker Hub**
```sh
docker push your-username/mywebsite:latest
```

---

## **📌 Step 7: Import the Container into GNS3**
### **1️⃣ Open GNS3 and Navigate to Preferences**
- Click **Edit → Preferences**  
- Select **Docker container templates**  

### **2️⃣ Add a New Docker Template**
- Click **"New"**
- Choose **"Add a new template"**
- Select **"Docker Container"**
- Name it **"W#-myWebSite"** (replace `W#` with your student ID)
- Set **"Image name"** to **`your-username/mywebsite:latest`**
- Click **"Save"**  

### **3️⃣ Add the Container to Your Network**
- Drag **"W#-myWebSite"** onto the GNS3 topology
- Connect it to a **GNS3 router or switch**
- Right-click → **Start**  
- Open a browser in **GNS3 VM** and access:  
  👉 **http://W#-myWebSite:80**

---

# **📌 Grading Rubric**
| **Criteria**              | **Points** | **Description** |
|--------------------------|------------|----------------|
| **Website Functionality** | **25** | Website loads, buttons work, and CSS is applied correctly. |
| **Dockerfile & Compose**  | **20** | Docker setup follows best practices and runs without errors. |
| **Push to Docker Hub**    | **20** | Image is successfully pushed to Docker Hub. |
| **GNS3 Integration**      | **25** | Container is added as a GNS3 appliance and functions properly. |
| **Correct Naming**        | **10** | GNS3 appliance is named **W#-myWebSite** for grading. |
| **Total**                | **100** | ✅ Perfect score! |

---
