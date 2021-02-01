
<script>
     /**
     * 
     * 把一个数字格式化为 千分位   例如：12345.6789  -> 12,345.678,9 
     * 
     * */
    console.log(covert('12345.6789'))
   function covert(str) {
       // 把str 转换成字符串
        // 根据小数点分割
        let arr = str.split('.')
        let newArr = []
        // 整数和小数部分都有
        if (arr.length >1) {
            // 整数部分 长度大于3才进行处理
                newArr[0] = zhengshu(arr[0])
                newArr[1] = xiaoshu(arr[1])
                return newArr[0] + '.'+ newArr[1]
        }else {
            // 只有整数部分
            newArr[0] = zhengshu(arr[0])
            return newArr[0] 
        }
        return ''
   }

   function zhengshu(str) {
        // 从右到左3位为一个依次进入
        if (str.length >3) {
            let length = str.length
            let arr = str.split('')
            let newMap = []
            for (let i=length-1;i >=0; i--) {
                if ((i+ 1) % 3 ==0) {
                    newMap.push(arr[i] + ',')
                } else {
                    newMap.push(arr[i])
                }  
            }
            let newStr = ''
            for (let i = newMap.length-1;i>=0;i--) {
                newStr = newStr + newMap[i] 
            }
            return newStr
        } else {
            return str
        }
       
   }

   function xiaoshu(str) {
    // 从左到右依次截取加入,符号
    let length = str.length
    let newStr = ''
    if (length > 3) {
        let arr = str.split('')
        for (let i=0;i <length; i++) {
            if ((i+ 1) % 3 ==0) {
                newStr = newStr + arr[i] + ','
            } else {
                newStr = newStr + arr[i]
            }   
        }
    } else {
        newStr = str
    }
     return newStr 
   }

</script>
