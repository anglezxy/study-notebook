<script>
    function toTree(list) {
        let tree = []
        let map = list.reduce((res,v) => (res[v.id] = v,res),{})
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
                print(item.children,level)
            }
        })
        level --
    }
let list = [
    {id: 1,name: 'A',parentId: 0},
    { id: 2,name: 'B',parentId:1},
]
    let tree = toTree(list)
    print(tree,-1)

</script>
