function toPascalCase(value) {
  return String(value)
    .replace(/[^a-zA-Z0-9]+(.)/g, (_, char) => char.toUpperCase())
    .replace(/^[a-z]/, (char) => char.toUpperCase())
}

function toCamelCase(value) {
  const pascalCase = toPascalCase(value)
  return pascalCase.replace(/^[A-Z]/, (char) => char.toLowerCase())
}

module.exports = function plopConfig(plop) {
  plop.setHelper('pascalCase', toPascalCase)
  plop.setHelper('camelCase', toCamelCase)
  plop.setHelper('closeBrace', () => '}')

  plop.setGenerator('component', {
    description: 'Create a React component with CSS Module and barrel export',
    prompts: [
      {
        type: 'input',
        name: 'name',
        message: 'Component name:',
      },
    ],
    actions: [
      {
        type: 'add',
        path: 'src/components/{{pascalCase name}}/{{pascalCase name}}.jsx',
        templateFile: 'plop-templates/component/Component.jsx.hbs',
      },
      {
        type: 'add',
        path: 'src/components/{{pascalCase name}}/{{pascalCase name}}.module.css',
        templateFile: 'plop-templates/component/Component.module.css.hbs',
      },
      {
        type: 'add',
        path: 'src/components/{{pascalCase name}}/index.js',
        templateFile: 'plop-templates/component/index.js.hbs',
      },
    ],
  })
}
