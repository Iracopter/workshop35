const API_URL='https://gorest.co.in/public/v2/users';
const user_list=document.getElementById('user_list');

function createUserList(users){
    const user=document.createElement('div');
    user.classList.add('user');

    //create user_name_title
    const user_name=document.createElement('a');
    user_name.classList.add('user_name');
    user_name.innerText=users.name;
    user_name.href=`user.html?id=${users.id}`;
    user_name.id=user.id;

    //appending
    user.appendChild(user_name);
    return user;
}

function getProducts(){
    return fetch(API_URL)
    .then(response=>response.json())
    .then((data)=> {
        if(data.length>0){
            for(let i=0; i<data.length; i++){
                const card= createUserList(data[i]);
                user_list.appendChild(card);
            }
        }
        else{
            const message=document.createElement('h3');
            message.classList.add('message');
            message.innerText='Користувачі не знайдені';
            document.body.appendChild(message);                   //add a message
        }
    })
}

getProducts();

