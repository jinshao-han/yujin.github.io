import{_ as s,c as n,o as a,a as p}from"./app.5146eedb.js";const e="/assets/2023-02-01-13-46-04.6c717bd8.png",l="/assets/2023-02-01-13-48-01.99bd7f6c.png",o="/assets/2023-02-01-13-49-33.2c20338b.png",r="/assets/2023-02-01-13-52-47.6a1c0330.png",c="/assets/2023-02-01-13-55-15.078d7618.png",t="/assets/2023-02-01-13-56-31.fb7de130.png",B="/assets/2023-02-01-13-58-47.a4395511.png",C=JSON.parse('{"title":"Vue2 数据响应原理","description":"","frontmatter":{},"headers":[{"level":2,"title":"vue2 官方阐述","slug":"vue2-官方阐述","link":"#vue2-官方阐述","children":[]},{"level":2,"title":"Observer","slug":"observer","link":"#observer","children":[]},{"level":2,"title":"Dep","slug":"dep","link":"#dep","children":[]},{"level":2,"title":"Watcher","slug":"watcher","link":"#watcher","children":[]},{"level":2,"title":"Scheduler","slug":"scheduler","link":"#scheduler","children":[]},{"level":2,"title":"总体流程","slug":"总体流程","link":"#总体流程","children":[]}],"relativePath":"vue/reactive.md","lastUpdated":null}'),i={name:"vue/reactive.md"},y=p('<h1 id="vue2-数据响应原理" tabindex="-1">Vue2 数据响应原理 <a class="header-anchor" href="#vue2-数据响应原理" aria-hidden="true">#</a></h1><h2 id="vue2-官方阐述" tabindex="-1">vue2 官方阐述 <a class="header-anchor" href="#vue2-官方阐述" aria-hidden="true">#</a></h2><p><a href="https://cn.vuejs.org/v2/guide/reactivity.html" target="_blank" rel="noreferrer">https://cn.vuejs.org/v2/guide/reactivity.html</a></p><p><img src="'+e+'" alt=""> 通过 <code>Object.defineProperty</code> 遍历对象的每一个属性，把数据变成 <code>getter</code>,<code>setter</code>。读取属性 <code>getter</code>, 更改属性 <code>setter</code>。形成了响应式数据。组件 <code>render</code> 函数会生成虚拟 <code>DOM</code> 树，影响到界面。怎么让响应式数据和虚拟 <code>dom</code> 连接起来呢？<code>render</code> 运行的时候用到了响应式数据，于是收集了依赖，数据 变化，会通知 <code>watch</code>，<code>watch</code> 会重新运行 render 函数</p><p><strong>响应式数据的最终目标</strong>，是当对象本身或对象属性发生变化时，将会运行一些函数，最常见的就是 render 函数。 在具体实现上，vue2 用到了<strong>几个核心模块</strong>：</p><ol><li>Observer</li><li>Dep</li><li>Watcher</li><li>Scheduler</li></ol><h2 id="observer" tabindex="-1">Observer <a class="header-anchor" href="#observer" aria-hidden="true">#</a></h2><p>Observer 要实现的目标非常简单，就是把一个普通的对象转换为响应式的对象</p><p>为了实现这一点，Observer 把对象的每个属性通过 Object.defineProperty 转换为带有 getter 和 setter 的属性，这样一来，当访问或设置属性时，vue 就有机会做一些别的事情。</p><p><img src="'+l+`" alt=""></p><p>Observer 是 vue 内部的构造器，我们可以通过 Vue 提供的静态方法 Vue.observable( object )间接的使用该功能。</p><div class="language-javascript line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">javascript</span><pre class="shiki one-dark-pro vp-code-dark"><code><span class="line"><span style="color:#C678DD;">var</span><span style="color:#ABB2BF;"> </span><span style="color:#E06C75;">obj</span><span style="color:#ABB2BF;"> </span><span style="color:#56B6C2;">=</span><span style="color:#ABB2BF;"> {</span></span>
<span class="line"><span style="color:#ABB2BF;">  </span><span style="color:#E06C75;">a</span><span style="color:#ABB2BF;">: </span><span style="color:#D19A66;">1</span><span style="color:#ABB2BF;">,</span></span>
<span class="line"><span style="color:#ABB2BF;">  </span><span style="color:#E06C75;">c</span><span style="color:#ABB2BF;">: {</span></span>
<span class="line"><span style="color:#ABB2BF;">    </span><span style="color:#E06C75;">d</span><span style="color:#ABB2BF;">: </span><span style="color:#D19A66;">3</span><span style="color:#ABB2BF;">,</span></span>
<span class="line"><span style="color:#ABB2BF;">  },</span></span>
<span class="line"><span style="color:#ABB2BF;">  </span><span style="color:#E06C75;">f</span><span style="color:#ABB2BF;">: [</span></span>
<span class="line"><span style="color:#ABB2BF;">    {</span></span>
<span class="line"><span style="color:#ABB2BF;">      </span><span style="color:#E06C75;">a</span><span style="color:#ABB2BF;">: </span><span style="color:#D19A66;">1</span><span style="color:#ABB2BF;">,</span></span>
<span class="line"><span style="color:#ABB2BF;">      </span><span style="color:#E06C75;">b</span><span style="color:#ABB2BF;">: </span><span style="color:#D19A66;">2</span><span style="color:#ABB2BF;">,</span></span>
<span class="line"><span style="color:#ABB2BF;">    },</span></span>
<span class="line"><span style="color:#ABB2BF;">    </span><span style="color:#D19A66;">3</span><span style="color:#ABB2BF;">,</span></span>
<span class="line"><span style="color:#ABB2BF;">  ],</span></span>
<span class="line"><span style="color:#ABB2BF;">};</span></span>
<span class="line"><span style="color:#E5C07B;">Vue</span><span style="color:#ABB2BF;">.</span><span style="color:#61AFEF;">observable</span><span style="color:#ABB2BF;">(</span><span style="color:#E06C75;">obj</span><span style="color:#ABB2BF;">); </span><span style="color:#7F848E;font-style:italic;">//递归遍历</span></span>
<span class="line"></span></code></pre><pre class="shiki min-dark vp-code-light"><code><span class="line"><span style="color:#F97583;">var</span><span style="color:#B392F0;"> obj </span><span style="color:#F97583;">=</span><span style="color:#B392F0;"> {</span></span>
<span class="line"><span style="color:#B392F0;">  a</span><span style="color:#F97583;">:</span><span style="color:#B392F0;"> </span><span style="color:#F8F8F8;">1</span><span style="color:#BBBBBB;">,</span></span>
<span class="line"><span style="color:#B392F0;">  c</span><span style="color:#F97583;">:</span><span style="color:#B392F0;"> {</span></span>
<span class="line"><span style="color:#B392F0;">    d</span><span style="color:#F97583;">:</span><span style="color:#B392F0;"> </span><span style="color:#F8F8F8;">3</span><span style="color:#BBBBBB;">,</span></span>
<span class="line"><span style="color:#B392F0;">  }</span><span style="color:#BBBBBB;">,</span></span>
<span class="line"><span style="color:#B392F0;">  f</span><span style="color:#F97583;">:</span><span style="color:#B392F0;"> [</span></span>
<span class="line"><span style="color:#B392F0;">    {</span></span>
<span class="line"><span style="color:#B392F0;">      a</span><span style="color:#F97583;">:</span><span style="color:#B392F0;"> </span><span style="color:#F8F8F8;">1</span><span style="color:#BBBBBB;">,</span></span>
<span class="line"><span style="color:#B392F0;">      b</span><span style="color:#F97583;">:</span><span style="color:#B392F0;"> </span><span style="color:#F8F8F8;">2</span><span style="color:#BBBBBB;">,</span></span>
<span class="line"><span style="color:#B392F0;">    }</span><span style="color:#BBBBBB;">,</span></span>
<span class="line"><span style="color:#B392F0;">    </span><span style="color:#F8F8F8;">3</span><span style="color:#BBBBBB;">,</span></span>
<span class="line"><span style="color:#B392F0;">  ]</span><span style="color:#BBBBBB;">,</span></span>
<span class="line"><span style="color:#B392F0;">};</span></span>
<span class="line"><span style="color:#79B8FF;">Vue</span><span style="color:#B392F0;">.observable(obj); </span><span style="color:#6B737C;">//递归遍历</span></span>
<span class="line"></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br></div></div><p>在组件生命周期中，数据响应式发生在 <code>beforeCreate</code> 之后，<code>created</code> 之前。</p><p>具体实现上，它会递归遍历对象的所有属性，以完成深度的属性转换。</p><p>由于遍历时只能遍历到对象的当前属性，因此无法监测到将来动态增加或删除的属性，因此 vue 提供了<code>$set</code>和<code>$delete</code> 两个实例方法，让开发者通过这两个实例方法对已有响应式对象添加或删除属性。</p><p>对于数组，vue 会更改它的隐式原型，之所以这样做，是因为 vue 需要监听那些可能改变数组内容的方法</p><p><img src="`+o+`" alt=""></p><p>所以如果直接给数组的某一项（下标）直接赋值，监控不到</p><p>总之，Observer 的目标，就是要让一个对象，它属性的读取、赋值，内部数组的变化都要能够被 vue 感知到。</p><h2 id="dep" tabindex="-1">Dep <a class="header-anchor" href="#dep" aria-hidden="true">#</a></h2><p>这里有两个问题没解决，就是读取属性时要做什么事，而属性变化时要做什么事，这个问题需要依靠 Dep 来解决。 Dep 的含义是 Dependency，表示依赖的意思。 Vue 会为响应式对象中的每个属性、对象本身、数组本身创建一个 Dep 实例，</p><div class="language-js line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki one-dark-pro vp-code-dark"><code><span class="line"><span style="color:#C678DD;">const</span><span style="color:#ABB2BF;"> </span><span style="color:#E5C07B;">obj</span><span style="color:#ABB2BF;"> </span><span style="color:#56B6C2;">=</span><span style="color:#ABB2BF;"> {</span></span>
<span class="line"><span style="color:#ABB2BF;">  </span><span style="color:#7F848E;font-style:italic;">//dep</span></span>
<span class="line"><span style="color:#ABB2BF;">  </span><span style="color:#E06C75;">a</span><span style="color:#ABB2BF;">: </span><span style="color:#D19A66;">1</span><span style="color:#ABB2BF;">, </span><span style="color:#7F848E;font-style:italic;">//dep</span></span>
<span class="line"><span style="color:#ABB2BF;">  </span><span style="color:#E06C75;">n</span><span style="color:#ABB2BF;">: [</span><span style="color:#D19A66;">1</span><span style="color:#ABB2BF;">, </span><span style="color:#D19A66;">2</span><span style="color:#ABB2BF;">, </span><span style="color:#D19A66;">3</span><span style="color:#ABB2BF;">], </span><span style="color:#7F848E;font-style:italic;">//dep</span></span>
<span class="line"><span style="color:#ABB2BF;">  </span><span style="color:#E06C75;">d</span><span style="color:#ABB2BF;">: {</span></span>
<span class="line"><span style="color:#ABB2BF;">    </span><span style="color:#7F848E;font-style:italic;">//dep</span></span>
<span class="line"><span style="color:#ABB2BF;">    </span><span style="color:#E06C75;">p</span><span style="color:#ABB2BF;">: </span><span style="color:#D19A66;">1</span><span style="color:#ABB2BF;">, </span><span style="color:#7F848E;font-style:italic;">//dep</span></span>
<span class="line"><span style="color:#ABB2BF;">  },</span></span>
<span class="line"><span style="color:#ABB2BF;">};</span></span>
<span class="line"></span></code></pre><pre class="shiki min-dark vp-code-light"><code><span class="line"><span style="color:#F97583;">const</span><span style="color:#B392F0;"> </span><span style="color:#79B8FF;">obj</span><span style="color:#B392F0;"> </span><span style="color:#F97583;">=</span><span style="color:#B392F0;"> {</span></span>
<span class="line"><span style="color:#B392F0;">  </span><span style="color:#6B737C;">//dep</span></span>
<span class="line"><span style="color:#B392F0;">  a</span><span style="color:#F97583;">:</span><span style="color:#B392F0;"> </span><span style="color:#F8F8F8;">1</span><span style="color:#BBBBBB;">,</span><span style="color:#B392F0;"> </span><span style="color:#6B737C;">//dep</span></span>
<span class="line"><span style="color:#B392F0;">  n</span><span style="color:#F97583;">:</span><span style="color:#B392F0;"> [</span><span style="color:#F8F8F8;">1</span><span style="color:#BBBBBB;">,</span><span style="color:#B392F0;"> </span><span style="color:#F8F8F8;">2</span><span style="color:#BBBBBB;">,</span><span style="color:#B392F0;"> </span><span style="color:#F8F8F8;">3</span><span style="color:#B392F0;">]</span><span style="color:#BBBBBB;">,</span><span style="color:#B392F0;"> </span><span style="color:#6B737C;">//dep</span></span>
<span class="line"><span style="color:#B392F0;">  d</span><span style="color:#F97583;">:</span><span style="color:#B392F0;"> {</span></span>
<span class="line"><span style="color:#B392F0;">    </span><span style="color:#6B737C;">//dep</span></span>
<span class="line"><span style="color:#B392F0;">    p</span><span style="color:#F97583;">:</span><span style="color:#B392F0;"> </span><span style="color:#F8F8F8;">1</span><span style="color:#BBBBBB;">,</span><span style="color:#B392F0;"> </span><span style="color:#6B737C;">//dep</span></span>
<span class="line"><span style="color:#B392F0;">  }</span><span style="color:#BBBBBB;">,</span></span>
<span class="line"><span style="color:#B392F0;">};</span></span>
<span class="line"></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br></div></div><p>每个 Dep 实例都有能力做以下两件事：</p><ul><li><p>记录依赖：是谁在用我</p></li><li><p>派发更新：我变了，我要通知那些用到我的人</p></li></ul><p>当读取响应式对象的某个属性时，它会进行依赖收集：有人用到了我</p><p>当改变某个属性时，它会派发更新：那些用我的人听好了，我变了</p><p><img src="`+r+'" alt=""></p><p>举个例子：</p><p><img src="'+c+`" alt=""></p><h2 id="watcher" tabindex="-1">Watcher <a class="header-anchor" href="#watcher" aria-hidden="true">#</a></h2><p>这里又出现一个问题，就是 Dep 如何知道是谁在用我？要解决这个问题，需要依靠另一个东西，就是 Watcher。</p><p>当某个函数执行的过程中，用到了响应式数据，响应式数据是无法知道是哪个函数在用自己的 vue 通过一种巧妙的办法来解决这个问题 <strong>我们不要直接执行函数，而是把函数交给一个叫做 watcher 的东西去执行</strong>，watcher 是一个对象，每个这样的函数执行时都应该创建一个 watcher，通过 watcher 去执行 <strong>watcher 会设置一个全局变量，让全局变量记录当前负责执行的 watcher 等于自己，然后再去执行函数，在函数的执行过程中，如果发生了依赖记录 dep.depend()，那么 Dep 就会把这个全局变量记录下来，表示有一个 watcher 用到了我这个属性</strong></p><div class="language-javascript line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">javascript</span><pre class="shiki one-dark-pro vp-code-dark"><code><span class="line"><span style="color:#E5C07B;">window</span><span style="color:#ABB2BF;">.</span><span style="color:#E06C75;">currentWatcher</span><span style="color:#ABB2BF;"> </span><span style="color:#56B6C2;">=</span><span style="color:#ABB2BF;"> </span><span style="color:#E5C07B;">this</span><span style="color:#ABB2BF;">; </span><span style="color:#7F848E;font-style:italic;">//接下来执行我</span></span>
<span class="line"><span style="color:#61AFEF;">render</span><span style="color:#ABB2BF;">(); </span><span style="color:#7F848E;font-style:italic;">// --&gt;get(){dep.depend()}//通过全局变量来收集</span></span>
<span class="line"><span style="color:#E5C07B;">window</span><span style="color:#ABB2BF;">.</span><span style="color:#E06C75;">currentWatcher</span><span style="color:#ABB2BF;"> </span><span style="color:#56B6C2;">=</span><span style="color:#ABB2BF;"> </span><span style="color:#D19A66;">null</span><span style="color:#ABB2BF;">;</span></span>
<span class="line"></span></code></pre><pre class="shiki min-dark vp-code-light"><code><span class="line"><span style="color:#79B8FF;">window</span><span style="color:#B392F0;">.currentWatcher </span><span style="color:#F97583;">=</span><span style="color:#B392F0;"> </span><span style="color:#79B8FF;">this</span><span style="color:#B392F0;">; </span><span style="color:#6B737C;">//接下来执行我</span></span>
<span class="line"><span style="color:#B392F0;">render(); </span><span style="color:#6B737C;">// --&gt;get(){dep.depend()}//通过全局变量来收集</span></span>
<span class="line"><span style="color:#79B8FF;">window</span><span style="color:#B392F0;">.currentWatcher </span><span style="color:#F97583;">=</span><span style="color:#B392F0;"> </span><span style="color:#79B8FF;">null</span><span style="color:#B392F0;">;</span></span>
<span class="line"></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br></div></div><p>当 Dep 进行派发更新时，它会通知之前记录的所有 watcher：我变了</p><p><img src="`+t+`" alt=""></p><p>每一个 vue 组件实例，都至少对应一个 watcher，该 watcher 中记录了该组件的 render 函数。 watcher 首先会把 render 函数运行一次以<strong>收集依赖</strong>，于是<strong>那些在 render 中用到的响应式数据就会记录这个 watcher。</strong> 当<strong>数据变化</strong>时，<strong>dep 就会通知该 watcher</strong>，而 watcher 将重新运行 render 函数，从而让界面重新渲染同时重新记录当前的依赖。</p><h2 id="scheduler" tabindex="-1">Scheduler <a class="header-anchor" href="#scheduler" aria-hidden="true">#</a></h2><p>现在还剩下最后一个问题，就是 Dep 通知 watcher 之后，如果 watcher 执行重运行对应的函数，就有可能导致函数频繁运行，从而导致效率低下</p><p>试想，如果一个交给 watcher 的函数，它里面用到了属性 a、b、c、d，那么 a、b、c、d 属性都会记录依赖，于是下面的代码将触发 4 次更新：</p><div class="language-javascript line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">javascript</span><pre class="shiki one-dark-pro vp-code-dark"><code><span class="line"><span style="color:#E5C07B;">state</span><span style="color:#ABB2BF;">.</span><span style="color:#E06C75;">a</span><span style="color:#ABB2BF;"> </span><span style="color:#56B6C2;">=</span><span style="color:#ABB2BF;"> </span><span style="color:#98C379;">&quot;new data&quot;</span><span style="color:#ABB2BF;">;</span></span>
<span class="line"><span style="color:#E5C07B;">state</span><span style="color:#ABB2BF;">.</span><span style="color:#E06C75;">b</span><span style="color:#ABB2BF;"> </span><span style="color:#56B6C2;">=</span><span style="color:#ABB2BF;"> </span><span style="color:#98C379;">&quot;new data&quot;</span><span style="color:#ABB2BF;">;</span></span>
<span class="line"><span style="color:#E5C07B;">state</span><span style="color:#ABB2BF;">.</span><span style="color:#E06C75;">c</span><span style="color:#ABB2BF;"> </span><span style="color:#56B6C2;">=</span><span style="color:#ABB2BF;"> </span><span style="color:#98C379;">&quot;new data&quot;</span><span style="color:#ABB2BF;">;</span></span>
<span class="line"><span style="color:#E5C07B;">state</span><span style="color:#ABB2BF;">.</span><span style="color:#E06C75;">d</span><span style="color:#ABB2BF;"> </span><span style="color:#56B6C2;">=</span><span style="color:#ABB2BF;"> </span><span style="color:#98C379;">&quot;new data&quot;</span><span style="color:#ABB2BF;">;</span></span>
<span class="line"></span></code></pre><pre class="shiki min-dark vp-code-light"><code><span class="line"><span style="color:#79B8FF;">state</span><span style="color:#B392F0;">.a </span><span style="color:#F97583;">=</span><span style="color:#B392F0;"> </span><span style="color:#FFAB70;">&quot;new data&quot;</span><span style="color:#B392F0;">;</span></span>
<span class="line"><span style="color:#79B8FF;">state</span><span style="color:#B392F0;">.b </span><span style="color:#F97583;">=</span><span style="color:#B392F0;"> </span><span style="color:#FFAB70;">&quot;new data&quot;</span><span style="color:#B392F0;">;</span></span>
<span class="line"><span style="color:#79B8FF;">state</span><span style="color:#B392F0;">.c </span><span style="color:#F97583;">=</span><span style="color:#B392F0;"> </span><span style="color:#FFAB70;">&quot;new data&quot;</span><span style="color:#B392F0;">;</span></span>
<span class="line"><span style="color:#79B8FF;">state</span><span style="color:#B392F0;">.d </span><span style="color:#F97583;">=</span><span style="color:#B392F0;"> </span><span style="color:#FFAB70;">&quot;new data&quot;</span><span style="color:#B392F0;">;</span></span>
<span class="line"></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br></div></div><p>这样显然是不合适的，因此，watcher 收到派发更新的通知后，实际上不是立即执行对应函数，而是把自己交给一个叫<strong>调度器</strong>的东西</p><p>调度器维护一个执行队列，该队列同一个 watcher 仅会存在一次，队列中的 watcher 不是立即执行，它会通过一个叫做 nextTick 的工具方法，把这些需要执行的 watcher 放入到事件循环的微队列中，nextTick 的具体做法是通过 Promise 完成的</p><p>nextTick 通过 this.$nextTick 暴露给开发者</p><p>也就是说，<strong>当响应式数据变化时，render 函数的执行是异步的，并且在微队列中</strong></p><h2 id="总体流程" tabindex="-1">总体流程 <a class="header-anchor" href="#总体流程" aria-hidden="true">#</a></h2><p><img src="`+B+'" alt=""></p><p>Vue.js 是采用<strong>数据劫持</strong>结合<strong>发布者-订阅者模式</strong>的方式，通过 Object.defineProperty()来劫持各个属性的 setter，getter，在数据变动时发布消息给订阅者，触发相应的监听回调。主要分为以下几个步骤：</p><ol><li><p>需要 observe 的数据对象进行递归遍历，包括子属性对象的属性，都加上 setter 和 getter 这样的话，给这个对象的某个值赋值，就会触发 setter，那么就能监听到了数据变化</p></li><li><p>compile 解析模板指令，将模板中的变量替换成数据，然后初始化渲染页面视图，并将每个指令对应的节点绑定更新函数，添加监听数据的订阅者，一旦数据有变动，收到通知，更新视图</p></li><li><p>Watcher 订阅者是 Observer 和 Compile 之间通信的桥梁，主要做的事情是:</p><p>① 在自身实例化时往属性订阅器(dep)里面添加自己</p><p>② 自身必须有一个 update()方法</p><p>③ 待属性变动 dep.notice()通知时，能调用自身的 update()方法，并触发 Compile 中绑定的回调，则功成身退。</p></li><li><p>MVVM 作为数据绑定的入口，整合 Observer、Compile 和 Watcher 三者，通过 Observer 来监听自己的 model 数据变化，通过 Compile 来解析编译模板指令，最终利用 Watcher 搭起 Observer 和 Compile 之间的通信桥梁，达到数据变化 -&gt; 视图更新；视图交互变化(input) -&gt; 数据 model 变更的双向绑定效果。</p></li></ol>',48),d=[y];function F(u,b,h,A,v,m){return a(),n("div",null,d)}const w=s(i,[["render",F]]);export{C as __pageData,w as default};
