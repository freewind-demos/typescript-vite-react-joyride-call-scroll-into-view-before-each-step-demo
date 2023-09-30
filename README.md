TypeScript Vite "react-joyride" Call "scrollIntoView" Before Each Call Demo
===========================

react-joyride有时候会与一些遗留系统有冲突，可能需要在每一步之前先调用一下 `step.target.scrollIntoView()`

react-joyride对于这种情况比较笨拙，需要用到 callback 中获取的信息，以及手动控制步骤。

```
npm install
npm run demo
```

It will open page on browser automatically.
