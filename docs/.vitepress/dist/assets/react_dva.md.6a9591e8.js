import{_ as a,c as e,o as i,a as l}from"./app.876eb61b.js";const p=JSON.parse('{"title":"dva","description":"","frontmatter":{},"headers":[{"level":2,"title":"dva-loading","slug":"dva-loading","link":"#dva-loading","children":[]}],"relativePath":"react/dva.md","lastUpdated":1679387290000}'),d={name:"react/dva.md"},r=l('<h1 id="dva" tabindex="-1">dva <a class="header-anchor" href="#dva" aria-hidden="true">#</a></h1><div class="danger custom-block"><p class="custom-block-title">DANGER</p><p>已经不维护了，仅供学习</p></div><blockquote><p>官方网站：<a href="https://dvajs.com" target="_blank" rel="noreferrer">https://dvajs.com</a> dva 不仅仅是一个第三方库，更是一个框架，它主要整合了 redux 的相关内容，让我们处理数据更加容易，实际上，dva 依赖了很多：react、react-router、redux、redux-saga、react-redux、connected-react-router 等。</p></blockquote><h1 id="dva-的使用" tabindex="-1">dva 的使用 <a class="header-anchor" href="#dva-的使用" aria-hidden="true">#</a></h1><ol><li>dva 默认导出一个函数，通过调用该函数，可以得到一个 dva 对象</li><li>dva 对象.router：路由方法，传入一个函数，该函数返回一个 React 节点，将来，应用程序启动后，会自动渲染该节点。</li><li>dva 对象.start: 该方法用于启动 dva 应用程序，可以认为启动的就是 react 程序，该函数传入一个选择器，用于选中页面中的某个 dom 元素，react 会将内容渲染到该元素内部。</li><li>dva 对象.model: 该方法用于定义一个模型，该模型可以理解为 redux 的 action、reducer、redux-saga 副作用处理的整合，整合成一个对象，将该对象传入 model 方法即可。</li><li>namespace：命名空间，该属性是一个字符串，字符串的值，会被作为仓库中的属性保存</li><li>state：该模型的默认状态</li><li>reducers: 该属性配置为一个对象，对象中的每个方法就是一个 reducer，dva 约定，方法的名字，就是匹配的 action 类型</li><li>effects: 处理副作用，底层是使用 redux-saga 实现的，该属性配置为一个对象，对象中的每隔方法均处理一个副作用，方法的名字，就是匹配的 action 类型。 <ol><li>函数的参数 1：action</li><li>参数 2：封装好的 saga/effects 对象</li></ol></li><li>subscriptions：配置为一个对象，该对象中可以写任意数量任意名称的属性，每个属性是一个函数，这些函数会在模型加入到仓库中后立即运行。</li><li>在 dva 中同步路由到仓库</li><li>在调用 dva 函数时，配置 history 对象</li><li>使用 ConnectedRouter 提供路由上下文</li><li>配置：</li><li>history：同步到仓库的 history 对象</li><li>initialState：创建 redux 仓库时，使用的默认状态</li><li>onError: 当仓库的运行发生错误的时候，运行的函数</li><li>onAction: 可以配置 redux 中间件 <ol><li>传入一个中间件对象</li><li>传入一个中间件数组</li></ol></li><li>onStateChange: 当仓库中的状态发生变化时运行的函数</li><li>onReducer：对模型中的 reducer 的进一步封装</li><li>onEffect：类似于对模型中的 effect 的进一步封装</li><li>extraReducers：用于配置额外的 reducer，它是一个对象，对象的每一个属性是一个方法，每个方法就是一个需要合并的 reducer，方法名即属性名。</li><li>extraEnhancers: 它是用于封装 createStore 函数的，dva 会将原来的仓库创建函数作为参数传递，返回一个新的用于创建仓库的函数。函数必须放置到数组中。</li></ol><h1 id="dva-插件" tabindex="-1">dva 插件 <a class="header-anchor" href="#dva-插件" aria-hidden="true">#</a></h1><p>通过<code>dva对象.use(插件)</code>，来使用插件，插件本质上就是一个对象，该对象与配置对象相同，dva 会在启动时，将传递的插件对象混合到配置中。</p><h2 id="dva-loading" tabindex="-1">dva-loading <a class="header-anchor" href="#dva-loading" aria-hidden="true">#</a></h2><p>该插件会在仓库中加入一个状态，名称为 loading，它是一个对象，其中有以下属性</p><ul><li>global：全局是否正在处理副作用（加载），只要有任何一个模型在处理副作用，则该属性为 true</li><li>models：一个对象，对象中的属性名以及属性的值，表示哪个对应的模型是否在处理副作用中（加载中）</li><li>effects：一个对象，对象中的属性名以及属性的值，表示是哪个 action 触发了副作用</li></ul>',10),t=[r];function o(c,n,s,u,v,h){return i(),e("div",null,t)}const f=a(d,[["render",o]]);export{p as __pageData,f as default};
