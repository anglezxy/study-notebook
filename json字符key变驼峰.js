<script>
        /**
     * let json = {hello_world: '134',a_bc_d: '1234',a_b: [{'c_dd': 11}]}
        变成 { hello_World: '134',a_Bc_D: '1234',a_B: [{'c_Dd': 11}] }
     * */
    function convert(str) {
        if(str instanceof Array) {
            // 如果是数组
           str.forEach(item => {
                convert(item)
           })
        } else if (str instanceof Object) {
            // 如果是对象
            // 获取所有的key
            let keys = Object.keys(str);
            keys.forEach(key => {
                let newKey = hump2Underline(key)
                let value = str[key]
                delete str[key]
                str[newKey] = value 
                if (value  instanceof Object || value instanceof Array) {
                     convert(value)
                }
            })
           return str
        }
    }
    function hump2Underline(s){
        let words = s.split("_")
        let newWord = words[0]
        if (words.length >1) {
            for (let i =1;i<words.length;i++) {
                let str = words[i].substr(0,1).toUpperCase() +words[i].substr(1,words[i].length)
                newWord = newWord +'_' + str
            }
        }
        return newWord
   }
</script>
