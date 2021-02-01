<script>
    function toTree(list) {
        let tree = []
        let map = list.reduce((res,v) => (res[v.id] = v,res),{})
        console.log(map, '-----')
       for (const item of list) {
           if (item.parentId ===0) {
               tree.push(item)
               continue
           }
           if (item.parentId in map) {
               const parent = map[item.parentId]
               parent.children = parent.children || []
               parent.children.push(item)
           }
       }
       return tree
    }
    function print(tree,level) {
        level ++
        tree.forEach (item => {
            console.log(`%c${item.name}`,`padding-left: ${ level * 12}px`)
            if (item.children) {
                print(item.children)
            }
        })
        level --
    }
    
</script>
