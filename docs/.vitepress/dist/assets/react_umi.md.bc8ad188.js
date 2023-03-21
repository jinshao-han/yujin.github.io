import{_ as i,c as e,o as l,a}from"./app.def0b298.js";const g=JSON.parse('{"title":"umijs 简介","description":"","frontmatter":{},"headers":[{"level":2,"title":"全局安装 umi","slug":"全局安装-umi","link":"#全局安装-umi","children":[]},{"level":2,"title":"路由匹配","slug":"路由匹配","link":"#路由匹配","children":[]},{"level":2,"title":"路由跳转","slug":"路由跳转","link":"#路由跳转","children":[]},{"level":2,"title":"路由信息的获取","slug":"路由信息的获取","link":"#路由信息的获取","children":[]},{"level":2,"title":"定义全局模型","slug":"定义全局模型","link":"#定义全局模型","children":[]},{"level":2,"title":"定义局部模型","slug":"定义局部模型","link":"#定义局部模型","children":[]},{"level":2,"title":"局部样式和全局样式","slug":"局部样式和全局样式","link":"#局部样式和全局样式","children":[]},{"level":2,"title":"less","slug":"less","link":"#less","children":[]},{"level":2,"title":"代理","slug":"代理","link":"#代理","children":[]},{"level":2,"title":"数据模拟","slug":"数据模拟","link":"#数据模拟","children":[]},{"level":2,"title":"额外的约定文件","slug":"额外的约定文件","link":"#额外的约定文件","children":[]},{"level":2,"title":"umirc 配置","slug":"umirc-配置","link":"#umirc-配置","children":[{"level":3,"title":"umi 配置","slug":"umi-配置","link":"#umi-配置","children":[]},{"level":3,"title":"webpack 配置","slug":"webpack-配置","link":"#webpack-配置","children":[]}]}],"relativePath":"react/umi.md","lastUpdated":1679387290000}'),r={name:"react/umi.md"},s=a('<h1 id="umijs-简介" tabindex="-1">umijs 简介 <a class="header-anchor" href="#umijs-简介" aria-hidden="true">#</a></h1><blockquote><p>官网：<a href="https://umijs.org/" target="_blank" rel="noreferrer">https://umijs.org/</a></p></blockquote><p>umijs, nextjs(ssr 服务端渲染)，antd，antd-pro（antd+umijs）</p><ul><li>插件化</li><li>开箱即用</li><li>约定式路由</li></ul><h2 id="全局安装-umi" tabindex="-1">全局安装 umi <a class="header-anchor" href="#全局安装-umi" aria-hidden="true">#</a></h2><p>提供了一个命令行工具：umi，通过该命令可以对 umi 工程进行操作</p><blockquote><p>umi 还可以使用对应的脚手架</p></blockquote><ul><li>dev: 使用开发模式启动工程</li><li>build:打包</li></ul><h1 id="约定式路由" tabindex="-1">约定式路由 <a class="header-anchor" href="#约定式路由" aria-hidden="true">#</a></h1><p>umi 对路由的处理，主要通过两种方式：</p><ol><li><strong>约定式</strong>：使用约定好的文件夹和文件，来代表页面，umi 会根据开发者书写的页面，生成路由配置。</li><li>配置式：直接书写路由配置文件</li></ol><h2 id="路由匹配" tabindex="-1">路由匹配 <a class="header-anchor" href="#路由匹配" aria-hidden="true">#</a></h2><ul><li><p>umi 约定，工程中的 pages 文件夹中存放的是页面。如果工程包含 src 目录，则 src/pages 是页面文件夹。</p></li><li><p>umi 约定，页面的文件名，以及页面的文件路径，是该页面匹配的路由</p></li><li><p>umi 约定，如果页面的文件名是 index（不写 index 才能访问，写了反而不能访问了），则可以省略文件名（首页）(注意避免文件名和当前目录中的文件夹名称相同)</p></li><li><p>umi 约定，如果 src/layout 目录存在，则该目录中的 index.js 表示的是全局的通用布局，布局中的 children 则会添加具体的页面。</p></li><li><p>umi 约定，如果 pages 文件夹中包含_layout.js，则 layout.js 所在的目录以及其所有的子目录中的页面，共用该布局。</p></li><li><p>404 约定，umi 约定，pages/404.js，表示 404 页面，如果路由无匹配，则会渲染该页面。该约定在开发模式中无效，只有部署后生效。</p></li><li><p>使用$名称，会产生动态路由</p></li></ul><h2 id="路由跳转" tabindex="-1">路由跳转 <a class="header-anchor" href="#路由跳转" aria-hidden="true">#</a></h2><ul><li>跳转链接： 导入<code>umi/link</code>，<code>umi/navlink</code></li><li>代码跳转： 导入<code>umi/router</code></li></ul><blockquote><p>导入模块时，@表示 src 目录</p></blockquote><h2 id="路由信息的获取" tabindex="-1">路由信息的获取 <a class="header-anchor" href="#路由信息的获取" aria-hidden="true">#</a></h2><p>所有的页面、布局组件，都会通过属性 props，收到下面的属性</p><ul><li>match：等同于 react-router 的 match</li><li>history：等同于 react-router 的 history（history.location.query 被封装成了一个对象，使用的是 query-string 库进行的封装）</li><li>location：等同于 react-router 的 location（location.query 被封装成了一个对象，使用的是 query-string 库进行的封装）</li><li>route：对应的是路由配置</li></ul><p>如果需要在普通组件中获取路由信息，则需要使用 withRouter 封装，可以通过<code>umi/withRouter</code>导入</p><h1 id="配置式路由" tabindex="-1">配置式路由 <a class="header-anchor" href="#配置式路由" aria-hidden="true">#</a></h1><p>当使用了路由配置后，约定式路由全部失效。</p><p>两种方式书写 umi 配置：</p><ol><li>使用根目录下的文件<code>.umirc.js</code></li><li>使用根目录下的文件<code>config/config.js</code></li></ol><p>进行路由配置时，每个配置就是一个匹配规则，并且，每个配置是一个对象，对象中的某些属性，会直接形成 Route 组件的属性</p><p>注意：</p><ul><li>component 配置项，需要填写页面组件的路径，路径相对于 pages 文件夹</li><li>如果配置项没有 exact，则会自动添加 exact 为 true</li><li>每一个路由配置，可以添加任何属性</li><li>Routes 属性是一个数组，数组的每一项是一个组件路径，路径相对于项目根目录，当匹配到路由后，会转而渲染该属性指定的组件，并会将 component 组件作为 children 放到匹配的组件中</li></ul><p>路由配置中的信息，同样可以放到约定式路由中，方式是，为约定式路由添加第一个文档注释（注释的格式的 YAML），需要将注释放到最开始的位置</p><p>YAML 格式</p><ul><li>键值对，冒号后需要加上空格</li><li>如果某个属性有多个键或多个值，需要进行缩进（空格，不能 tab）</li></ul><h1 id="使用-dva" tabindex="-1">使用 dva <a class="header-anchor" href="#使用-dva" aria-hidden="true">#</a></h1><blockquote><p>官方插件集 umi-plugin-react 文档：<a href="https://umijs.org/zh/plugin/umi-plugin-react.html" target="_blank" rel="noreferrer">https://umijs.org/zh/plugin/umi-plugin-react.html</a></p></blockquote><p>dva 插件和 umi 整合后，将模型分为两种：</p><ol><li>全局模型：所有页面通用，工程一开始启动后，模型就会挂载到仓库</li><li>局部模型：只能被某些页面使用，访问具体的页面时才会挂载到仓库</li></ol><h2 id="定义全局模型" tabindex="-1">定义全局模型 <a class="header-anchor" href="#定义全局模型" aria-hidden="true">#</a></h2><p>在<code>src/models</code>目录下定义的 js 文件都会被看作是全局模型，默认情况下，模型的命名空间和文件名一致。</p><h2 id="定义局部模型" tabindex="-1">定义局部模型 <a class="header-anchor" href="#定义局部模型" aria-hidden="true">#</a></h2><p>局部模型定义在 pages 文件夹或其子文件夹中，在哪个文件夹定义的模型，会被该文件夹中的所有页面以及子页面、以及该文件夹的祖先文件夹中的页面所共享。</p><p>局部模型的定义和全局模型的约定类似，需要创建一个 models 文件夹</p><h1 id="使用样式" tabindex="-1">使用样式 <a class="header-anchor" href="#使用样式" aria-hidden="true">#</a></h1><p>解决两个问题：</p><ol><li>保证类样式名称的唯一性：css-module</li><li>样式代码的重复：less 或 sass</li></ol><h2 id="局部样式和全局样式" tabindex="-1">局部样式和全局样式 <a class="header-anchor" href="#局部样式和全局样式" aria-hidden="true">#</a></h2><p>底层使用了 webpack 的加载器：css-loader（内部包含了 css-module 的功能）</p><p>css 文件 -&gt; css-module -&gt; 对象</p><ol><li>某个组件特有的样式，不与其他组件共享，通常，将该样式文件与组件放置在同一个目录(非强制性)(要保证类样式名称唯一)</li><li>如果某些样式可能被某些组件共享，这样的样式，通常放到 assets/css 文件夹中。(要保证类样式名称唯一)</li><li>全局样式，名称一定唯一，不需要 css-module 处理。umijs 约定，src/global.css 样式，是全局样式，不会交给 css-module 处理。</li></ol><h2 id="less" tabindex="-1">less <a class="header-anchor" href="#less" aria-hidden="true">#</a></h2><p>less 代码 -&gt; less-loader -&gt; css 代码 -&gt; css-module -&gt; 对象</p><h1 id="代理和数据模拟" tabindex="-1">代理和数据模拟 <a class="header-anchor" href="#代理和数据模拟" aria-hidden="true">#</a></h1><h2 id="代理" tabindex="-1">代理 <a class="header-anchor" href="#代理" aria-hidden="true">#</a></h2><p>代理用于解决跨域问题</p><p>配置<code>.umirc.js</code>中的 proxy，配置方式和 devServer 中的 proxy 配置相同</p><h2 id="数据模拟" tabindex="-1">数据模拟 <a class="header-anchor" href="#数据模拟" aria-hidden="true">#</a></h2><p>用于解决前后端协同开发的问题</p><p>数据模拟可以让前端开发者在开发时，无视后端接口是否真正完成，因为使用的是模拟的数据</p><p>umijs 约定：</p><ol><li>mock 文件夹中的文件</li><li>src/pages 文件夹中的_mock.js 文件</li></ol><p>以上两种 JS 文件，均会被 umijs 读取，并作为数据模拟的配置</p><p>可以自行发挥，添加模拟数据，通常，我们会和 mockjs 配合。</p><h1 id="配置" tabindex="-1">配置 <a class="header-anchor" href="#配置" aria-hidden="true">#</a></h1><h2 id="额外的约定文件" tabindex="-1">额外的约定文件 <a class="header-anchor" href="#额外的约定文件" aria-hidden="true">#</a></h2><ul><li>src/pages/document.ejs: 页面模板文件</li><li>src/global.js：在 umi 最开始启动时运行的 js 文件</li><li>src/app.js：作运行时配置的代码 <ul><li>patchRoutes: 函数，该函数会在 umi 读取完所有静态路由配置后执行</li><li>dva <ul><li>config： 相当于 new dva(<strong>配置</strong>)</li><li>plugins： 相当于 dva.use(插件)</li></ul></li></ul></li><li>.env: 配置环境变量，这些变量会在 umi 编译期间发挥作用 <ul><li>UMI_ENV：umi 的环境变量值，可以是任意值，该值会影响到.umirc.js</li><li>PORT</li><li>MOCK</li></ul></li></ul><h2 id="umirc-配置" tabindex="-1">umirc 配置 <a class="header-anchor" href="#umirc-配置" aria-hidden="true">#</a></h2><h3 id="umi-配置" tabindex="-1">umi 配置 <a class="header-anchor" href="#umi-配置" aria-hidden="true">#</a></h3><p>书写在.umirc.js 文件中的配置</p><ul><li>plugins：配置 umijs 的插件</li><li>routes：配置路由（会导致约定式路由失效）</li><li>history：history 对象模式（默认是 browser）</li><li>outputPath：使用 umi build 后，打包的目录名称，默认./dist</li><li>base: 相当于之前 BrowserRouter 中的 basename</li><li>publicPath: 指定静态资源所在的目录</li><li>exportStatic: 开启该配置后，会打包成多个静态页面，每个页面对应一个路由，开启多静态页面应用的前提条件是：没有动态路由</li></ul><h3 id="webpack-配置" tabindex="-1">webpack 配置 <a class="header-anchor" href="#webpack-配置" aria-hidden="true">#</a></h3><h1 id="umi-脚手架" tabindex="-1">umi 脚手架 <a class="header-anchor" href="#umi-脚手架" aria-hidden="true">#</a></h1><p>create-umi</p>',69),t=[s];function d(u,h,c,o,n,p){return l(),e("div",null,t)}const b=i(r,[["render",d]]);export{g as __pageData,b as default};