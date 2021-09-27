"use strict";(self.webpackChunkvariant_site=self.webpackChunkvariant_site||[]).push([[1404],{3905:function(e,t,n){n.d(t,{Zo:function(){return c},kt:function(){return m}});var r=n(7294);function a(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function i(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function o(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?i(Object(n),!0).forEach((function(t){a(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):i(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function l(e,t){if(null==e)return{};var n,r,a=function(e,t){if(null==e)return{};var n,r,a={},i=Object.keys(e);for(r=0;r<i.length;r++)n=i[r],t.indexOf(n)>=0||(a[n]=e[n]);return a}(e,t);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);for(r=0;r<i.length;r++)n=i[r],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(a[n]=e[n])}return a}var s=r.createContext({}),p=function(e){var t=r.useContext(s),n=t;return e&&(n="function"==typeof e?e(t):o(o({},t),e)),n},c=function(e){var t=p(e.components);return r.createElement(s.Provider,{value:t},e.children)},d={inlineCode:"code",wrapper:function(e){var t=e.children;return r.createElement(r.Fragment,{},t)}},u=r.forwardRef((function(e,t){var n=e.components,a=e.mdxType,i=e.originalType,s=e.parentName,c=l(e,["components","mdxType","originalType","parentName"]),u=p(n),m=a,h=u["".concat(s,".").concat(m)]||u[m]||d[m]||i;return n?r.createElement(h,o(o({ref:t},c),{},{components:n})):r.createElement(h,o({ref:t},c))}));function m(e,t){var n=arguments,a=t&&t.mdxType;if("string"==typeof e||a){var i=n.length,o=new Array(i);o[0]=u;var l={};for(var s in t)hasOwnProperty.call(t,s)&&(l[s]=t[s]);l.originalType=e,l.mdxType="string"==typeof e?e:a,o[1]=l;for(var p=2;p<i;p++)o[p]=n[p];return r.createElement.apply(null,o)}return r.createElement.apply(null,n)}u.displayName="MDXCreateElement"},5779:function(e,t,n){n.r(t),n.d(t,{frontMatter:function(){return l},contentTitle:function(){return s},metadata:function(){return p},toc:function(){return c},default:function(){return u}});var r=n(7462),a=n(3366),i=(n(7294),n(3905)),o=["components"],l={title:'Introducing "Kind of Super"'},s=void 0,p={unversionedId:"tutorial/part-zero",id:"tutorial/part-zero",isDocsHomePage:!1,title:'Introducing "Kind of Super"',description:"For this next section, we're going to demonstrate how a typically complex task can be simplified through variant by building a text-based browser game.",source:"@site/docs/tutorial/part-zero.md",sourceDirName:"tutorial",slug:"/tutorial/part-zero",permalink:"/variant/docs/next/tutorial/part-zero",tags:[],version:"current",frontMatter:{title:'Introducing "Kind of Super"'},sidebar:"someSidebar",previous:{title:"Introduction",permalink:"/variant/docs/next/intro"},next:{title:"Making Variants",permalink:"/variant/docs/next/book/creation"}},c=[{value:"Philosophy on Dependencies",id:"philosophy-on-dependencies",children:[]},{value:"Upcoming content",id:"upcoming-content",children:[{value:"Part 1 - Defining a Hero",id:"part-1---defining-a-hero",children:[]},{value:"Part 2 - Shaping a World",id:"part-2---shaping-a-world",children:[]},{value:"Part 3 - Identifying Threats",id:"part-3---identifying-threats",children:[]},{value:"Part 4 - Making Enemies",id:"part-4---making-enemies",children:[]}]}],d={toc:c};function u(e){var t=e.components,n=(0,a.Z)(e,o);return(0,i.kt)("wrapper",(0,r.Z)({},d,n,{components:t,mdxType:"MDXLayout"}),(0,i.kt)("p",null,"For this next section, we're going to demonstrate how a typically complex task can be simplified through variant by building a text-based browser game."),(0,i.kt)("p",null,"The game ",(0,i.kt)("strong",{parentName:"p"},"Kind of Super")," will be a text-based game that has the player create a hero of their choosing and attempt to survive a\nvariety of threats to their city. We will explore"),(0,i.kt)("ul",null,(0,i.kt)("li",{parentName:"ul"},"domain modeling of a complex space (powers, heroes, and the types to make it all flow)"),(0,i.kt)("li",{parentName:"ul"},"conditional rendering of UI and form elements based on domain model"),(0,i.kt)("li",{parentName:"ul"},"procedural generation of heroes and enemies. How do you create a random power when each power has different parameters?")),(0,i.kt)("p",null,"Throughout this project we'll also discuss the design decisions that went into doing something one way. "),(0,i.kt)("h3",{id:"philosophy-on-dependencies"},"Philosophy on Dependencies"),(0,i.kt)("p",null,"To keep the code as clear as possible, ",(0,i.kt)("strong",{parentName:"p"},"I will not use any frameworks or UI libraries")," like chakra-ui, blueprintjs,\nor TailwindCSS. The ",(0,i.kt)("em",{parentName:"p"},"only")," dependencies will be ",(0,i.kt)("inlineCode",{parentName:"p"},"variant"),", and ",(0,i.kt)("inlineCode",{parentName:"p"},"react-redux"),". Vue or Angular would work just as well\u2014in\nfact variant has some delightful composability with angular's heavy use of rxjs. React was chosen because TSX files are simple, and its ability to incorporate expressions into components synergizes remarkably well with pattern matching. The project has been created with\n",(0,i.kt)("a",{parentName:"p",href:"https://github.com/facebook/create-react-app"},"CRA"),". I will also not be demonstrating persistence, error boundaries,\nor logging techniques in this tutorial, though all of these are excellent elements to consider in your real applications.\nWe're going to build a game in the most intuitive way and a lot of this book-keeping can be very confusing for new developers."),(0,i.kt)("ul",null,(0,i.kt)("li",{parentName:"ul"},"No component frameworks, use simple ",(0,i.kt)("inlineCode",{parentName:"li"},"<input>"),"s, ",(0,i.kt)("inlineCode",{parentName:"li"},"<select>"),"s, and ",(0,i.kt)("inlineCode",{parentName:"li"},"<button>"),"s"),(0,i.kt)("li",{parentName:"ul"},"No icon packages or svgs, use emoji \u2764\ufe0f"),(0,i.kt)("li",{parentName:"ul"},"No loggers or middleware"),(0,i.kt)("li",{parentName:"ul"},"No redux-toolkit",(0,i.kt)("ul",{parentName:"li"},(0,i.kt)("li",{parentName:"ul"},"This project is meant to demonstrate that with proper language primitives, a lot of structures become unnecessary.\nVariant gives you the ability to organize by subdomain rather than by slice."),(0,i.kt)("li",{parentName:"ul"},"The ",(0,i.kt)("inlineCode",{parentName:"li"},"variant()")," function and its supporting tools are superior to ",(0,i.kt)("inlineCode",{parentName:"li"},"createAction()")),(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("inlineCode",{parentName:"li"},"matcher()")," provides more utility than the redux-toolkit match builder."))),(0,i.kt)("li",{parentName:"ul"},"No complex popovers or css tooltips. Just the ",(0,i.kt)("inlineCode",{parentName:"li"},"title")," attribute.")),(0,i.kt)("div",{className:"admonition admonition-danger alert alert--danger"},(0,i.kt)("div",{parentName:"div",className:"admonition-heading"},(0,i.kt)("h5",{parentName:"div"},(0,i.kt)("span",{parentName:"h5",className:"admonition-icon"},(0,i.kt)("svg",{parentName:"span",xmlns:"http://www.w3.org/2000/svg",width:"12",height:"16",viewBox:"0 0 12 16"},(0,i.kt)("path",{parentName:"svg",fillRule:"evenodd",d:"M5.05.31c.81 2.17.41 3.38-.52 4.31C3.55 5.67 1.98 6.45.9 7.98c-1.45 2.05-1.7 6.53 3.53 7.7-2.2-1.16-2.67-4.52-.3-6.61-.61 2.03.53 3.33 1.94 2.86 1.39-.47 2.3.53 2.27 1.67-.02.78-.31 1.44-1.13 1.81 3.42-.59 4.78-3.42 4.78-5.56 0-2.84-2.53-3.22-1.25-5.61-1.52.13-2.03 1.13-1.89 2.75.09 1.08-1.02 1.8-1.86 1.33-.67-.41-.66-1.19-.06-1.78C8.18 5.31 8.68 2.45 5.05.32L5.03.3l.02.01z"}))),"danger")),(0,i.kt)("div",{parentName:"div",className:"admonition-content"},(0,i.kt)("p",{parentName:"div"},"I am dealing with a wrist injury and have limited typing. This tutorial is still coming, but will be posted in stages. For now, please ",(0,i.kt)("a",{parentName:"p",href:"../book/creation"},"continue on to the book.")))),(0,i.kt)("h2",{id:"upcoming-content"},"Upcoming content"),(0,i.kt)("p",null,"When the tutorial does drop, my plan is to have it on several parts in order for it to be digestable."),(0,i.kt)("h3",{id:"part-1---defining-a-hero"},"Part 1 - Defining a Hero"),(0,i.kt)("p",null,"Here, we will create the variants that represent the powers a hero can have, and use ",(0,i.kt)("inlineCode",{parentName:"p"},"flags()")," along with some fun with generic types in order to describe heroes with any combination of powers."),(0,i.kt)("p",null,"We will"),(0,i.kt)("ul",null,(0,i.kt)("li",{parentName:"ul"},"define the hero data model"),(0,i.kt)("li",{parentName:"ul"},"write the character creation form"),(0,i.kt)("li",{parentName:"ul"},"create a display component to conditionally render our current hero's state and powers")),(0,i.kt)("h3",{id:"part-2---shaping-a-world"},"Part 2 - Shaping a World"),(0,i.kt)("p",null,"Part 2 will describe the data model for the city the heroes are defending, and some other elements in the world."),(0,i.kt)("h3",{id:"part-3---identifying-threats"},"Part 3 - Identifying Threats"),(0,i.kt)("p",null,"Part 3 will create scenarios that will require your set of chosen heroes to leverage their powers."),(0,i.kt)("h3",{id:"part-4---making-enemies"},"Part 4 - Making Enemies"),(0,i.kt)("p",null,"Finally we'll add supervillians to the mix - enemies who share your power set and may even have access to powers that heroes consider immoral like mind control."))}u.isMDXComponent=!0}}]);