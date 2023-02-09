export default function successMessage(store , id){
    store.dispatch({
        type : 'messages/ADD_MESSAGE' , 
        payload : {
          id ,
          title: "عملیات با موفقیت انجام شد",
          type: "success",
        }
      })
}