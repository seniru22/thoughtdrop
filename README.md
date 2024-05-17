# Blog Platform

**Blog platform** is a personal platform where **users** can sign up, log in, and **post blogs**. The platform allow users to view all posts and filter/search specific author's blog by author ID. 

# Description

In this platform, **users** can **create** and view **blogs**. The platform also allows **users** to filter blogs by **author ID**. It is primarily built using **TypeScript**. The frontend is developed with **Next.js**, **Tailwind CSS** and **Shadcn**. The **backend** is built with **Node.js** and **Express**, and **PostgreSQL** is used as the **relational database**. **JWT** is utilized for **authentication** and **authorization**, and **cookies** are used to store the **token** on the **server side**.

# Features

1. **User Registration**: Users can sign up by providing their **username**, **email**, and **password**.
2. **User Login**: Existing users can log in to their account using their **email** and **password**.
3. **Data fetching**: Data is fetched on the **homepage** and **search author page** using **server-side rendering**.
4. **Blog Viewing**: Users can view all blogs on the **homepage** and their **personal blogs** on **dashboard**.
5. **Blog Filtering/Searching**: Users can **filter/search** **specific author's blog** by **author ID**.
6. **Protected Routes**: Only logged-in users can access the **homepage**, **dashboard** and **create blogs**.

# View website

Here is the deployed website : [Deployed Link](https://blog-platform-zeta-five.vercel.app/)<br>
Here is the deployed backend server: [Backend Link](https://blog-platform-vq3i.onrender.com/);

# Installation

To install and run this project locally, add the following commands in your terminal, follow these steps:

1. Clone the repository from GitHub:

   ```bash
   `git clone https://github.com/Shreekar11/Blog-Platform.git`

   ```

2. Navigate into the project directory:

```bash
   `cd Blog-Platform`
```

3. Navigate into client:
   
```bash
   `cd client`
```

4. Navigate into server:

```bash
   `cd server`
```

## Important
5. Ensure that the version of `Node.js` and `npm` you're using is compatible with the dependencies you're installing. Some dependencies may require specific Node.js versions.
   Run the below command in **client** directory and **server** directory.

```bash
   `npm install -g npm@latest`
```

6. Install `dependencies` for the frontend in **client** directory (assuming you have `Node.js` and `npm` installed):

```bash
   `npm install`
```

7. Install `dependencies` for the backend in **server** directory (assuming you have `Node.js` and `npm` installed):

```bash
   `npm install`
```

8. Create a .env file in the **client** directory and add backend **api endpoint**:

   `NEXT_PUBLIC_BASEURL`=`http://localhost:5000` (for **local** server)

   `NEXT_PUBLIC_BASEURL`=`https://blog-platform-vq3i.onrender.com` (for **deployed** server)

9. Create a .env file in the server directory and connect with your postgresql credentials:

   `PORT`=`5000` <br>
   `HOST`=`your-host` <br>
   `USER`=`your-user` <br>
   `PASSWORD`=`your-password`<br>
   `DB`=`your-database-name`

10. Start the frontend and backend servers:

   **client**: `npm run dev`<br>
   **server**: `npm run dev`

11. Open your browser and navigate to `http://localhost:3000` to view the application.

# Images

## Home page
![Screenshot (348)](https://github.com/Shreekar11/Blog-Platform/assets/123613407/a0ff6f32-b1a8-42ac-bb11-86edab02de4f)

## Dashboard
![Screenshot (349)](https://github.com/Shreekar11/Blog-Platform/assets/123613407/2d772e5c-2b38-4237-952e-78b7500ae60c)

## Search Author blogs
![Screenshot (350)](https://github.com/Shreekar11/Blog-Platform/assets/123613407/bb6f9d2c-8280-4908-bf49-1f1c1e650370)

## Login page
![Screenshot (346)](https://github.com/Shreekar11/Blog-Platform/assets/123613407/3ca0da56-d481-446c-a858-f644863867f1)

## Register page
![Screenshot (347)](https://github.com/Shreekar11/Blog-Platform/assets/123613407/b4e955d3-201f-4804-a08d-1dbef066e1c1)

## Analysis
![Screenshot 2024-05-17 200624](https://github.com/Shreekar11/Blog-Platform/assets/123613407/1d7eb207-d858-497c-988b-4b921494172a)

