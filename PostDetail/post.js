let UserID;
async function start(){
    let ID = new URLSearchParams(location.search).get('ID');
    if(ID){
        await fetch(`https://pinterest-clone-restful-api.herokuapp.com/api/Posts/${ID}`, {
            method: 'GET',
            headers: {
             Accept: 'application/json',
            }
        }
        ).then(async response=>{
            response.json().then(async json=>{
                const post = json.payload.post;
                document.getElementById("postImage").src = post.picture;
                document.getElementById("title").innerHTML = post.title;
                document.getElementById("caption").innerHTML = post.caption;
                userID=post.userID;
                await fetch(`https://pinterest-clone-restful-api.herokuapp.com/api/User/${post.userID}`).then(response=>{
                response.json().then(json=>{
                    const user = json.payload.user;
                    document.getElementById("userImg").src = user.profilePicture;
                    document.getElementById("userName").innerHTML = user.name;
                    document.getElementById("followers").innerHTML = `${user.followers} Followers`;
                    document.getElementById("breadcrumb-userName").innerHTML=user.name;
                    document.getElementById("breadcrumb-image").innerHTML = post.title;
                })
                }).catch(err=>{
               console.log(err);
            })
            }).catch(err=>{
                console.log(err);
            });
        }).catch(err=>{
            console.log(err);
        })
    }else{
        alert("No ID")
    }
}
start();

document.getElementById("download").addEventListener("click",function(){
const img  = document.getElementById("postImage").src;
this.setAttribute('href',img);
this.setAttribute('download','img');
this.click();
},false)

// document.getElementById("breadcrumb-userName").addEventListener("click",function(){
//     window.location.href = `profile.html/${userID}`
// })