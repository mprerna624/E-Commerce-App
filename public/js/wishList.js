const allLikeButton = document.querySelectorAll('.like-btn');


async function likeButton(productId , btn){
    try{
        let response = await axios({   //another way of axios.post() to send post request through axios
            method: 'post',
            url: `/product/${productId}/like`,  //for adding product in wishList array in User Model(DB)
            headers: {'X-Requested-With': 'XMLHttpRequest'},
        });
        
        if(btn.children[0].classList.contains('fa-solid')){
            btn.children[0].classList.remove('fa-solid')
            btn.children[0].classList.add('fa-regular')
        } else{
            btn.children[0].classList.remove('fa-regular')
            btn.children[0].classList.add('fa-solid')
        }
    }
    catch (e) {
        window.location.replace('/login'); //alternative to redirect method as in public folder we write client-side logic we don't have res.redirect() which is available in server-side
    }
}


for(let btn of allLikeButton){
    btn.addEventListener('click' , ()=>{
        let productId = btn.getAttribute('product-id'); 
        likeButton(productId,btn);
    })
}