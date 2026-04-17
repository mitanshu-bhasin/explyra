"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.buildDynamicImport=buildDynamicImport;var _core=require("@babel/core");function buildDynamicImport(e,r,t,s){const i=_core.types.isCallExpression(e)?e.arguments[0]:e.source;if(_core.types.isStringLiteral(i)||_core.types.isTemplateLiteral(i)&&0===i.quasis.length)return r?_core.template.expression.ast`
        Promise.resolve().then(() => ${s(i)})
      `:s(i);const o=_core.types.isTemplateLiteral(i)?_core.types.identifier("specifier"):_core.types.templateLiteral([_core.types.templateElement({raw:""}),_core.types.templateElement({raw:""})],[_core.types.identifier("specifier")]);return r?_core.template.expression.ast`
      (specifier =>
        new Promise(r => r(${o}))
          .then(s => ${s(_core.types.identifier("s"))})
      )(${i})
    `:t?_core.template.expression.ast`
      (specifier =>
        new Promise(r => r(${s(o)}))
      )(${i})
    `:_core.template.expression.ast`
      (specifier => ${s(o)})(${i})
    `}exports.getDynamicImportSource=function(e){const[r]=e.arguments;return _core.types.isStringLiteral(r)||_core.types.isTemplateLiteral(r)?r:_core.template.expression.ast`\`\${${r}}\``};