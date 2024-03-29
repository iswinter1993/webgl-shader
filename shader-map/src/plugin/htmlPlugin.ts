const htmlPlugin = () => {
    return {
        name:'html-kokomi',
        transformIndexHtml(html:any){
            return{
                html,
                tags:[
                    {
                        // 放到 body 末尾，可取值还有`head`|`head-prepend`|`body-prepend`，顾名思义
                        injectTo: 'body',
                        // 标签属性定义
                        attrs: { src: 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/16327/SplitText3.min.js' },
                        // 标签名
                        tag: 'script',
                    },
                    // {
                    //     // 放到 body 末尾，可取值还有`head`|`head-prepend`|`body-prepend`，顾名思义
                    //     injectTo: 'body',
                    //     // 标签属性定义
                    //     attrs: { src: 'https://unpkg.com/three@0.154.0/build/three.min.js',type:'module' },
                    //     // 标签名
                    //     tag: 'script',
                    // }
                ]
            }
        }
    }
}
export default htmlPlugin;