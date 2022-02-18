type CSSModuleClasses = { readonly [key: string]: string };

declare module '*.module.css' {
  const classes: CSSModuleClasses;
  export default classes;
}
declare module '*.module.scss' {
  const classes: CSSModuleClasses;
  export default classes;
}

declare module '*.css' {
  const classes: CSSModuleClasses;
  export default classes;
}
declare module '*.scss' {
  const classes: CSSModuleClasses;
  export default classes;
}
