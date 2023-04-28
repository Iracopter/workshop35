//сторінка окремого поста

const API_URL='https://gorest.co.in/public/v2/posts';
const API_URL2='https://gorest.co.in/public/v2/comments';
const post=document.getElementById('post');
const coment=document.getElementById('coments');


const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const id = urlParams.get('id');
console.log(id); // 1203756

function createPost(posts){
    const post=document.createElement('div');
    post.classList.add('post');

    //create post_title
    const post_title=document.createElement('h3');
    post_title.classList.add('post_title');
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

/*function createBtn(){                   //додай перенесення на поч сторінку
    const mess=document.createElement('div');
    mess.classList.add('mess'); 

    const back_btn=document.createElement('button');
    back_btn.classList.add('back_btn');
    back_btn.innerText="Back";
    back_btn.href="index.html";

    mess.appendChild(back_btn);
    return mess;
}*/

function getPosts(){
    return fetch(API_URL)
    .then(response=>response.json())
    .then((data)=>{
        for(let i=0; i<data.length; i++){
            if(data[i].id==id){
                const card= createPost(data[i]);
                post.appendChild(card);
                const back_link=document.createElement('a');
                back_link.classList.add('back_link');
                back_link.innerText='Назад';
                back_link.href=`user.html`;
                document.body.appendChild(back_link);
            }
        }
    })
}

getPosts();

function showComents(coments){
    const coment=document.createElement('div');
    coment.classList.add('coment');

    //add coment_user_name
    const user_name=document.createElement('h4');
    user_name.classList.add('coment_user_name');
    user_name.innerText=coments.name;

    //add coment_text
    const coment_text=document.createElement('p');
    coment_text.classList.add('coment_text');
    coment_text.innerText=coments.body;

    //append
    coment.appendChild(user_name);
    coment.appendChild(coment_text);

    return coment;
}

function getComent(){
    return fetch(API_URL2)
    .then(response=>response.json())
    .then((data)=>{
        let n=0;
        for(let i=0; i<data.length; i++){
            if(data[i].post_id==id){
                const card= showComents(data[i]);
                coment.appendChild(card);
                n++;
            }
        }
        if(n==0){
            const message=document.createElement('h5');
            message.classList.add('message');
            message.innerText='Коментарі відсутні';
            document.body.appendChild(message);
        }
        n=0;
    })

}

getComent();