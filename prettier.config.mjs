/** @type {import("prettier").Config} */
const config = {
    printWidth: 120, // 120 characters
    tabWidth: 4, // tab 4 characters
    semi: false, // ; off
    singleQuote: true, // Use single quotes ' '
    trailingComma: 'all', // Add trailing commas
    arrowParens: 'always', // Arrow function parentheses
}

export default config
// pnpm exec prettier . --write
