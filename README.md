# VTEX Speed Webpack V2

This project is based on the [vtex-speed-webpack](https://github.com/raphaelcorreaoct/vtex-speed-webpack) repository by [Raphael Correa](https://github.com/raphaelcorreaoct), providing a foundational setup for VTEX projects using Webpack. It includes configurations for local development with environments for Production, Checkout, and Orderplaced.

This repository is configured with ESLint to analyze code and identify syntax, style, and logic issues, ensuring consistent and error-free code. It uses Prettier to automatically format code, maintaining uniform formatting throughout the project. Husky adds Git hooks, allowing automated tasks such as linting to run before commits. lint-staged works alongside Husky to execute linters on staged files in Git, ensuring code meets defined standards before committing. commitlint and conventional commit standards are employed to maintain a clean and meaningful commit history.

Additionally, the repository is equipped for development with React, TypeScript, and styled-components, providing a robust foundation for building modern applications with static typing and reusable components.

## Credits

- **Vitor Diniz**
- Email: [dinizadroit@gmail.com](mailto:dinizadroit@gmail.com)
- Website: [www.vitordiniz.dev](https://www.vitordiniz.dev)

## Requirements

- **Node 16**
- **Yarn**

## Getting Started

### Clone the Repository

```sh
git clone https://github.com/vitorxpd/vtex-speed-webpack-v2
```

### Insert the store name into `accountName` in the `package.json`

```json
{
  "accountName": "mystore"
}
```

### Install Dependencies

```sh
yarn install
```

### Install Husky

```sh
npx husky install
```

### Development

#### Main Store

```sh
yarn dev
```

#### Checkout

```sh
yarn dev:checkout
```

#### Orderplaced

```sh
yarn dev:orderplaced
```

### Build

#### Main Store

```sh
yarn build
```

#### Checkout

```sh
yarn build:checkout
```

#### Orderplaced

```sh
yarn build:orderplaced
```
