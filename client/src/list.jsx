 import React from "react"

const List = (props)=>{
     const {categories}=props
     
  const rootCategory = categories.find((category) => category?._id?.toString() === '62bfd4c158c0a636474a8b7f')
  console.log(rootCategory, "list1")
   console.log(categories,"list")
    // let array = new Array(rootCategory.subCategories.length)
    function  recut (arr, categories){
        console.log(arr,"11")
        if(arr.categories.subCategories.length===0 ||arr.categories.subCategories.length===0){
            return
        }
        console.log(arr,"12")
        for(let i=0; i<arr.categories.subCategories.length; i++){ 
            for(let j=0; j<categories.length; j++){
             if(arr.categories.subCategories[i]._id===categories[j]._id){
                console.log("mage")
                  arr.children.push({
                    title:categories[j].name,
                         key:categories[j].name,
                      children:[],
                       categories:(categories[j])
                  })
                  
                  console.log(arr.children)
                //   recut (arr, categories)  

             }
             else if (arr.categories.subCategories[i]===categories[j]._id){
                 console.log("mage")
                arr.children.push({
                    title:categories[j].name,
                         key:categories[j].name,
                      children:[],
                       categories:(categories[j])
                  })
                  console.log(arr)
                //   recut (arr, categories)
                }
             }

         }
         
        // const  apped = categories.find((arr) => arr.categories.subCategories[0]?._id?.toString() ==="62c038f2fa340bb416c9c29b" )
        // console.log(apped,"13")

        //   for(let i=0; i<arr.length; i++){
        //     let  arr1=  arr[i].categories.subCategories
        //    let id = arr[i].subCategories_id.toString()
        // let children = arr[i].children
        //         reacurtion (arr1, children,categories)
        //        console.log(arr1 , "recution")

        //  }
          function  reacurtion (arr1, children,categories){

        //      if(arr1._id.toString()==null){
        //         return
        //      }

        //   for(let j=0; j<categories.length; j++){
        //     for(let k=0; k<arr1.length; k++){

        //      if(categories[j]._id.toString()===arr1._id.toString()){
        //          children.push({
        //             title:categories[j].name,
        //             key:categories[j].name,
        //             children:[],
        //             categories:(categories[j])

        //          })
        //           arr1=children.categories.subCategories
        //           children=children.categories.children

        //          reacurtion(arr1,children,categories)
        //      }
        //      else if(categories[j]._id.toString()===arr1){
        //         children.push({
        //             title:categories[j].name,
        //             key:categories[j].name,
        //             children:[],
        //             categories:(categories[j])

        //          })
        //           arr1=children.categories.subCategories
        //           children=children.categories.children

        //          reacurtion(arr1,children,categories)

        //      }
        //     }
        //    }

            
      }
    }
     function sagar (){
        console.log(rootCategory.subCategories.length,"sagar")
        let arr =[]
        for( let i=0;  i<rootCategory.subCategories.length; i++){
            for( let j=0;  j<categories.length; j++){
               if(rootCategory.subCategories[i]._id.toString()===categories[j]._id.toString()){
                    arr.push({
                        title :categories[j].name,
                        children:[],
                        key:categories[j].name,
                        categories: (categories[j])
                           
                        
                    })
                       recut (arr[i], categories) 

               }
        }

        }
        // console.log(arr)
        
     }
  
  return (
    <>
   { rootCategory ?  sagar ():""}
    </>
  )

    
}
export default List