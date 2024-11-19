# Supabase and Next.js Blog Platform

Welcome to my Supabase and Next.js blog platform project! This README will guide you through the architecture, features, and challenges tackled during the development of this full-stack application.

## Overview

This project is a modern blogging platform enriched with real-time features, secure authentication, a scalable backend, and custom analytics dashboard. The tech stack includes:

- **Supabase** for authentication and database management
- **Amazon S3** for image storage
- **Next.js** for both frontend and backend operations
- **Apollo Server & Client** for GraphQL APIs
- **DynamoDB** for storing and analyzing user engagement data
- **Algolia** for blog post search functionality

## Demo
Project is hosted on: https://supabase-and-next-js-blog-platform-lal7.vercel.app

### UI & Styling

- **TailwindCSS**: Utilized for utility-first CSS styling, allowing efficient and highly customizable design.
- **NextUI**: For building sleek and well-designed user interfaces effortlessly.
- **Framer Motion**: Implemented to add animations and transitions for a more dynamic user experience.

## Key Features

#### Next.js as Frontend and Backend

- **Frontend**: Utilizes Next.js's capabilities for generating server-side rendered React applications, enabling fast and SEO-friendly page loads.
- **Backend**: Leverages Next.js API routes to handle backend logic seamlessly, including authentication, data fetching, and processing, providing a cohesive development experience.

#### Authentication & User Management

- **Supabase Auth Integration**: Due to Supabase's security model, user-specific data is managed through a `profiles` table, with updates triggered by PostgreSQL functions.
- **Secure Cookies Handling**: Authentication seamlessly integrates with Next.js, employing an Express server to mediate secure backend interactions.

#### Posts & Image Handling

- **CRUD Operations**: Implemented complete CRUD functionality for blog posts, with a focus on seamless integration using GraphQL.
- **Image Storage in S3**: Images are stored and retrieved from AWS S3 using presigned URLs, ensuring efficient and secure file handling.

#### Real-time Comments

- **Supabase Subscriptions**: Utilized Supabase's real-time subscription features to handle real-time updates on comments without requiring traditional WebSockets. This leverages Supabase's capabilities to push updates directly to the client when comments are created, updated, or deleted.

- **GraphQL Cache Updates**: Integrated a strategy to update the Apollo Client cache in response to Supabase subscription events, ensuring the UI remains in sync with backend changes. This method circumvents the need for GraphQL subscriptions and avoids the complexities of custom WebSocket setups in a serverless environment like Next.js.

#### User Analytics

- **DynamoDB Data**: Captures detailed user engagement metrics, such as post creation, edits, and deletions.
- **Visualization**: Data is displayed using Chart.js on a dedicated analytics page, providing insightful user engagement trends.

#### Search

- **Algolia**: Effortlessly integrates Algolia for efficient and scalable search functionality.

### Development Workflow

A critical aspect of this project's development process is the efficient handling of type generation and server processes achieved through the `npm run dev` script:

- **Concurrently Running Tasks**: The `npm run dev` script utilizes the `concurrently` package to run multiple processes in parallel. This includes watching for changes and regenerating GraphQL types, generating Supabase TypeScript schemas, and running the Next.js development server.

  ```bash
  "dev": "concurrently -c \"red,green,blue\" -n \"graphql-ts,supabse-ts,next dev\" \"npm run graphql-typegen-watch\" \"npm run generate-schema\" \"next dev\""


## GraphQL Type Generation
- **Purpose**: Watches for changes in `index.graphql` and `.gql` files, ensuring that TypeScript types are always up to date.
- **Benefits**: Facilitates seamless integration and minimizes runtime errors.

## Supabase Schema Automation
- **Purpose**: Automatically generates TypeScript interfaces from your Supabase schema.
- **Benefits**: Reduces manual coding overhead and potential errors.

This integrated approach allows you to focus more on feature development while maintaining robust type safety and efficient workflows.

## Challenges and Solutions

### Next.js Versatility
- **Utilization**: Effectively used Next.js for both frontend and backend operations.
- **Outcome**: Supported a wide range of functionalities and ensured a smooth development experience.

### Supabase Subscriptions & GraphQL Cache
- **Strategy**: Leveraged Supabase's real-time capabilities with Apollo Client's cache management.
- **Benefit**: Facilitated real-time updates without traditional WebSockets.
