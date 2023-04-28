const API_URL='https://gorest.co.in/public/v2/posts';
const posts_list=document.getElementById('posts_list');


const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const id = urlParams.get('id');
console.log(id); // 1203756

function createPostsList(posts){
    const post=document.createElement('div');
    post.classList.add('post');

    //create post_title
    const post_title=document.createElement('a');
    post_title.classList.add('post_title');
    post_title.href=`post.html?id=${posts.id}`
    post_title.innerText=posts.title;

    //create post_text
    const post_text=document.createElement('p');
    post_text.classList.add('post_text');
    post_text.innerText=posts.body;

    //appending
    post.appendChild(post_title);
    post.appendChild(post_text)
    return post;
}



function getPosts(){
    return fetch(API_URL)
    .then(response=>response.json())
    .then((data)=> {
        let n=0;
        for(let i=0; i<data.length; i++){
            if(data[i].user_id===id){
            const card= createPostsList(data[i]);
            posts_list.appendChild(card);
            console.log(i);
            }
            else{
                n++;
            }
        }
        if(n!=0){
            const message=document.createElement('h5');
            message.classList.add('message');
            message.innerText='У даного користувача відсутні пости';
            document.body.appendChild(message);
            const back_link=document.createElement('a');
            back_link.classList.add('back_link');
            back_link.innerText='Назад';
            back_link.href=`index.html`;
            document.body.appendChild(back_link);
        }
    })
    /*.then(data=>{
        console.log(data);
    })*/
    /*.then((data)=>{
        for(let i=0; i<data.length; i++){
            const card= createPostsList(data[i]);
            posts_list.appendChild(card);
            console.log(data[i]);
        }
    })*/
}

getPosts();
