export function getBooks(){
    return new Promise(function(resolve,reject){
        fetch("https://edubig.vn/api/books", {
            method: "GET",
            headers: {
                "Content-Type": "text/plain"
            }
        }).then(function(response) {
            return response.json();
        }).then(function(response){
            resolve(response);
        });
    });
}

export function getListCategory(){
    return new Promise(function(resolve,reject){
        fetch("http://bvxk.vatphamtamlinh.net/api/category_parrent.php", {
            method: "GET",
            headers: {
                "Content-Type": "text/plain"
            }
        }).then(function(response) {
            return response.json();
        }).then(function(response){
            resolve(response);
        });
    });
}

export function getListCategorySmall(id){
    return new Promise(function(resolve,reject){
        fetch("http://bvxk.vatphamtamlinh.net/api/category_child.php?term_id="+id, {
            method: "GET",
            headers: {
                "Content-Type": "text/plain"
            }
        }).then(function(response) {
            return response.json();
        }).then(function(response){
            resolve(response);
        });
    });
}

export function getContentView(id){
    console.log("hainn--api--",id);
    return new Promise(function(resolve,reject){
        fetch("http://bvxk.vatphamtamlinh.net/api/content.php?term_id="+id, {
            method: "GET",
            headers: {
                "Content-Type": "text/plain"
            }
        }).then(function(response) {
            // console.log("result api--",response.json());
            return response.json();
        }).then(function(response){
            resolve(response);
        });
    });
}