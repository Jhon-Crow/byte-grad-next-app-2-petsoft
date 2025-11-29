# PetSoft Project 

This project is a web application built with Next.js and TypeScript. It provides a dashboard for users to view and manage their data, and also includes a payment system with Stripe.

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [Features](#features)
- [Contributing](#contributing)
- [Prisma Database Generation](#prisma-database-generation)

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/your-username/your-project.git
   ```

2. Install the dependencies:

   ```bash
   cd your-project
   npm install
   ```

3. Create a `.env.local` file in the root directory of the project and add the following environment variables:

   ```
   NEXTAUTH_URL=<your-nextauth-url>
   NEXTAUTH_SECRET=<your-nextauth-secret>
   STRIPE_PUBLISHABLE_KEY=<your-stripe-publishable-key>
   STRIPE_WEBHOOK_SECRET_KEY=<your-stripe-webhook-secret-key>
   ```

   Replace `<your-nextauth-url>`, `<your-nextauth-secret>`, `<your-stripe-publishable-key>`, and `<your-stripe-webhook-secret-key>` with your own values.

4. Start the development server:

   ```bash
   npm run dev
   ```

## Usage

1. Open your browser and navigate to `http://localhost:3000`.

2. Sign in with your email and password.

3. Once signed in, you should be redirected to the dashboard page.

4. From the dashboard page, you can view and manage your data.

5. To make a payment, click on the "Buy lifetime access for $299" button on the payment page.

6. After clicking the button, you will be redirected to the Stripe checkout page.

7. Complete the payment process on the Stripe checkout page.

8. After completing the payment, you will be redirected back to the payment page.

9. On the payment page, you will see a button labeled "Access PetSoft". Clicking this button will redirect you to the PetSoft dashboard.

## Features

- User authentication with email and password
- User authorization based on access level
- Dashboard page for viewing and managing data
- Responsive design for mobile devices
- Payment system with Stripe

## Contributing

Contributions are welcome! If you find a bug or have a feature request, please open an issue on GitHub. If you want to contribute code, please follow these steps:

1. Fork the repository.
2. Create a new branch for your feature or bug fix.
3. Make your changes and commit them.
4. Push your changes to your forked repository.
5. Open a pull request to merge your changes into the main repository.

## Prisma Database Generation

To generate the Prisma database schema, follow these steps:

1. Install the Prisma CLI globally:

   ```bash
   npm install -g prisma
   ```

2. Run the following command to generate the Prisma schema based on your database:

   ```bash
   npx prisma generate
   ```

   This command will generate the Prisma client based on your database schema.

3. Make sure your database is running and accessible.

4. Run the following command to migrate the database:

   ```bash
   npx prisma migrate dev --name init
   ```

   This command will create the necessary tables in your database.

   Note: If you are using a different database, you may need to modify the `schema.prisma` file to match your database schema.
